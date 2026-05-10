import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const FloatingElements = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5, 64, 64]} position={[2, 0, -2]}>
          <MeshDistortMaterial
            color="#111"
            speed={2}
            distort={0.4}
            radius={1}
            roughness={0.1}
            metalness={1}
          />
        </Sphere>
      </Float>

      <mesh ref={meshRef} position={[-3, 2, -5]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#f97316" wireframe />
      </mesh>
    </>
  );
};

const Particles = () => {
  const count = 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
};

export const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      style={{ opacity: 0.8 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 5, 15]} />
      <Particles />
      <FloatingElements />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};
