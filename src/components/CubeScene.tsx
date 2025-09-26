'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CubeScene() {
  const mountRef = useRef(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    if (mountRef.current) {
      (mountRef.current as HTMLDivElement).appendChild(renderer.domElement);
    }

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube as THREE.Mesh;
    scene.add(cube);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Scroll listener
    const onScroll = () => {
      const scrollY = window.scrollY;
      cube.rotation.x = scrollY * 0.01;
      cube.rotation.y = scrollY * 0.01;
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (mountRef.current) {
        (mountRef.current as HTMLDivElement).removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }} />;
}
