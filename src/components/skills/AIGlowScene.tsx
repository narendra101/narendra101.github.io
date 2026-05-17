import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 24;
const CONNECT_DISTANCE = 1.25;

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const baseNodes = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.85 + Math.random() * 1.0;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const phases = useMemo(
    () => Float32Array.from({ length: NODE_COUNT }, (_, i) => (i / NODE_COUNT) * Math.PI * 2),
    []
  );

  const maxSegments = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
  const linePositions = useMemo(
    () => new Float32Array(maxSegments * 6),
    [maxSegments]
  );

  const animatedPositions = useMemo(
    () => new Float32Array(NODE_COUNT * 3),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.1;
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      const phase = phases[i];
      const pulse = 1 + Math.sin(t * 2.2 + phase) * 0.18;
      const bx = baseNodes[i * 3];
      const by = baseNodes[i * 3 + 1];
      const bz = baseNodes[i * 3 + 2];
      animatedPositions[i * 3] = bx * pulse + Math.sin(t * 0.9 + phase) * 0.1;
      animatedPositions[i * 3 + 1] = by * pulse + Math.cos(t * 0.7 + phase) * 0.1;
      animatedPositions[i * 3 + 2] = bz * pulse;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      attr.array.set(animatedPositions);
      attr.needsUpdate = true;
    }

    let segmentIndex = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = animatedPositions[i * 3] - animatedPositions[j * 3];
        const dy = animatedPositions[i * 3 + 1] - animatedPositions[j * 3 + 1];
        const dz = animatedPositions[i * 3 + 2] - animatedPositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECT_DISTANCE) {
          const base = segmentIndex * 6;
          linePositions[base] = animatedPositions[i * 3];
          linePositions[base + 1] = animatedPositions[i * 3 + 1];
          linePositions[base + 2] = animatedPositions[i * 3 + 2];
          linePositions[base + 3] = animatedPositions[j * 3];
          linePositions[base + 4] = animatedPositions[j * 3 + 1];
          linePositions[base + 5] = animatedPositions[j * 3 + 2];
          segmentIndex++;
        }
      }
    }

    if (linesRef.current) {
      const geom = linesRef.current.geometry;
      const attr = geom.attributes.position as THREE.BufferAttribute;
      attr.array.set(linePositions.subarray(0, segmentIndex * 6));
      attr.needsUpdate = true;
      geom.setDrawRange(0, segmentIndex * 2);
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxSegments * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={animatedPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#f97316"
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

    </group>
  );
}

function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.45;
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.58, 1]} />
        <meshBasicMaterial
          color="#f97316"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.36, 32, 32]} />
        <MeshDistortMaterial
          color="#140800"
          emissive="#f97316"
          emissiveIntensity={2.5}
          roughness={0}
          metalness={0.9}
          distort={0.5}
          speed={3.5}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.45;
      ring1.current.rotation.y = t * 0.25;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.35;
      ring2.current.rotation.z = t * 0.5;
    }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[1.55, 0.014, 8, 80]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.85, 0.01, 8, 80]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

export function AIGlowScene() {
  return (
    <group scale={0.55}>
      <ambientLight intensity={0.12} />
      <pointLight position={[2, 2, 3]} intensity={1.2} color="#f97316" />
      <pointLight position={[-2, -1, 2]} intensity={0.7} color="#8b5cf6" />

      <Sparkles
        count={60}
        scale={[3, 2, 1.2]}
        size={1.8}
        speed={0.35}
        color="#f97316"
        opacity={0.5}
      />
      <Sparkles
        count={30}
        scale={[2.5, 1.5, 1]}
        size={1.2}
        speed={0.25}
        color="#c4b5fd"
        opacity={0.35}
      />

      <EnergyCore />
      <NeuralNetwork />
      <OrbitalRings />
    </group>
  );
}
