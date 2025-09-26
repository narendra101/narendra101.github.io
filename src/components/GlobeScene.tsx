'use client';

import React, { useEffect, useRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Define mesh types
type MeshType = 'sphere' | 'icosahedron' | 'octahedron' | 'dodecahedron' | 'torus';

interface GlobeSceneProps {
  meshType?: MeshType;
  mainColor?: string;
  edgeColor?: string;
  pointLightColor?: string;
  wireframe?: boolean;
  opacity?: number;
  enableScrollRotation?: boolean;
  enableGlow?: boolean;
  enableParticles?: boolean;
  rotationSpeed?: number;
  pulseEffect?: boolean;
}

const GlobeScene = React.forwardRef(function GlobeScene(
  {
    meshType = 'sphere',
    mainColor = '#00aaff',
    edgeColor = '#ff00aa',
    pointLightColor = '#ffffff',
    wireframe = false,
    opacity = 0.7,
    enableScrollRotation = false,
    enableGlow = false,
    enableParticles = false,
    rotationSpeed = 1,
    pulseEffect = false,
  }: GlobeSceneProps,
  ref
) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const edgesRef = useRef<THREE.LineSegments | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const glowRef = useRef<THREE.Mesh | null>(null);
  const lastScrollY = useRef<number>(0);

  // Create the scene
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Make sure the canvas is visible
    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.position = 'absolute';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    mountRef.current.appendChild(canvas);
    rendererRef.current = renderer;

    // Controls setup - disabled to prevent zooming
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false; // Disable controls to prevent zooming
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point light for edge highlighting
    const pointLight = new THREE.PointLight(new THREE.Color(pointLightColor), 2, 10);
    pointLight.position.set(3, 0, 0);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // Create globe mesh based on selected type
    createGlobeMesh();

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (globeRef.current) {
        globeRef.current.rotation.x += 0.002 * rotationSpeed;
        globeRef.current.rotation.y += 0.003 * rotationSpeed;

        // Apply pulse effect if enabled
        if (pulseEffect && globeRef.current.material instanceof THREE.Material) {
          const material = globeRef.current.material as THREE.MeshPhysicalMaterial;
          const time = Date.now() * 0.001;
          material.opacity = opacity * (0.7 + 0.3 * Math.sin(time * 2));
        }
      }

      // Sync edges with globe rotation
      if (edgesRef.current && globeRef.current) {
        edgesRef.current.rotation.x = globeRef.current.rotation.x;
        edgesRef.current.rotation.y = globeRef.current.rotation.y;
        edgesRef.current.rotation.z = globeRef.current.rotation.z;
      }

      // Sync glow effect with globe rotation
      if (glowRef.current && globeRef.current) {
        glowRef.current.rotation.x = globeRef.current.rotation.x;
        glowRef.current.rotation.y = globeRef.current.rotation.y;
        glowRef.current.rotation.z = globeRef.current.rotation.z;
      }

      // Animate particles if they exist
      if (particlesRef.current && enableParticles) {
        const time = Date.now() * 0.0005;
        particlesRef.current.rotation.x = time * 0.2;
        particlesRef.current.rotation.y = time * 0.1;

        // Pulse the particles
        if (particlesRef.current.material instanceof THREE.PointsMaterial) {
          particlesRef.current.material.opacity = 0.4 + 0.2 * Math.sin(time * 5);
        }
      }

      // Move point light in a circular path
      if (pointLightRef.current) {
        const time = Date.now() * 0.001;
        pointLightRef.current.position.x = Math.sin(time) * 3;
        pointLightRef.current.position.z = Math.cos(time) * 3;
        pointLightRef.current.position.y = Math.sin(time * 0.7) * 3;
      }

      // Controls are disabled, no need to update

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    // Handle scroll for rotation
    const handleScroll = () => {
      if (!enableScrollRotation || !globeRef.current) return;

      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY.current;

      // Apply more significant rotation for better visual effect
      // Use a larger multiplier for more noticeable rotation
      if (globeRef.current) {
        // Apply rotation directly to the mesh
        globeRef.current.rotation.x += deltaY * 0.03;
        globeRef.current.rotation.y += deltaY * 0.03;

        // Log for debugging
        console.log('Scroll rotation applied:', deltaY, globeRef.current.rotation);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('resize', handleResize);

    // Always add scroll listener and check enableScrollRotation inside the handler
    window.addEventListener('scroll', handleScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    // Log for debugging
    console.log('Scroll rotation enabled:', enableScrollRotation);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      if (globeRef.current && sceneRef.current) {
        sceneRef.current.remove(globeRef.current);
      }

      if (edgesRef.current && sceneRef.current) {
        sceneRef.current.remove(edgesRef.current);
      }

      if (pointLightRef.current && sceneRef.current) {
        sceneRef.current.remove(pointLightRef.current);
      }

      if (glowRef.current && sceneRef.current) {
        sceneRef.current.remove(glowRef.current);
      }

      if (particlesRef.current && sceneRef.current) {
        sceneRef.current.remove(particlesRef.current);
      }
    };
  }, [enableScrollRotation]);

  // Update globe when props change
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    createGlobeMesh();

    // Update point light color
    if (pointLightRef.current) {
      pointLightRef.current.color.set(pointLightColor);
    }
  }, [meshType, mainColor, edgeColor, pointLightColor, wireframe, opacity, enableGlow, enableParticles, pulseEffect]);

  // Function to create the globe mesh
  const createGlobeMesh = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !sceneRef.current) return;

    // Remove existing globe and edges
    if (globeRef.current && sceneRef.current) {
      sceneRef.current.remove(globeRef.current);
    }

    if (edgesRef.current && sceneRef.current) {
      sceneRef.current.remove(edgesRef.current);
    }

    // Create geometry based on mesh type
    let geometry;
    switch (meshType) {
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(2, 1);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(2, 1);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(2, 0);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 50);
        break;
      case 'sphere':
      default:
        geometry = new THREE.SphereGeometry(2, 32, 32);
        break;
    }

    // Create transparent material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(mainColor),
      transparent: true,
      opacity: opacity,
      wireframe: wireframe,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    sceneRef.current.add(mesh);
    globeRef.current = mesh;

    // Create edges
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(edgeColor),
      linewidth: 2,
    });

    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    sceneRef.current.add(edges);
    edgesRef.current = edges;

    // Add glow effect if enabled
    if (enableGlow && sceneRef.current) {
      // Remove existing glow
      if (glowRef.current && sceneRef.current) {
        sceneRef.current.remove(glowRef.current);
      }

      // Create larger sphere for glow effect
      const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(mainColor),
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
      });

      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      sceneRef.current.add(glowMesh);
      glowRef.current = glowMesh;
    }

    // Add particle effect if enabled
    if (enableParticles && sceneRef.current) {
      // Remove existing particles
      if (particlesRef.current && sceneRef.current) {
        sceneRef.current.remove(particlesRef.current);
      }

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1000;
      const positionArray = new Float32Array(particleCount * 3);
      const sizeArray = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Create particles in a spherical distribution
        const radius = 2.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positionArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positionArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positionArray[i * 3 + 2] = radius * Math.cos(phi);

        sizeArray[i] = Math.random() * 0.05 + 0.01;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

      const particlesMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(edgeColor),
        transparent: true,
        opacity: 0.6,
        size: 0.05,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      sceneRef.current.add(particles);
      particlesRef.current = particles;
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    // Method to rotate the globe from outside
    rotateGlobe: (amount: number) => {
      if (globeRef.current) {
        globeRef.current.rotation.x += amount;
        globeRef.current.rotation.y += amount;

        // Also rotate edges and glow to keep in sync
        if (edgesRef.current) {
          edgesRef.current.rotation.x = globeRef.current.rotation.x;
          edgesRef.current.rotation.y = globeRef.current.rotation.y;
        }

        if (glowRef.current) {
          glowRef.current.rotation.x = globeRef.current.rotation.x;
          glowRef.current.rotation.y = globeRef.current.rotation.y;
        }
      }
    }
  }));

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'block'
      }}
    />
  );
});

export default GlobeScene;