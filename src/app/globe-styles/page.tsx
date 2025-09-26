'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ThemeToggle';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Globe...</div>
});

export default function GlobeStylesPage() {
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state until client-side rendering is ready
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading 3D Globe...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
          Crystal Globe
        </h1>
        <p className="text-white text-sm mt-2 drop-shadow-lg">
          Scroll to rotate the globe
        </p>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/*
        This is a crystal-like globe with:
        - Dodecahedron mesh (geometric shape with 12 faces)
        - Transparent blue color
        - Glowing pink edges
        - Cyan point light that moves around
        - Glow effect
        - Particle system
        - Scroll rotation enabled
        - Pulsing effect
      */}
      <GlobeScene
        meshType="dodecahedron"
        mainColor="#00aaff"
        edgeColor="#ff00aa"
        pointLightColor="#00ffff"
        wireframe={false}
        opacity={0.6}
        enableScrollRotation={true}
        enableGlow={true}
        enableParticles={true}
        rotationSpeed={1}
        pulseEffect={true}
      />

      {/* Add some content to enable scrolling */}
      <div className="absolute top-[100vh] w-full p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Scroll to rotate the globe</h2>
        <p className="mb-4">The globe rotates as you scroll up and down this page.</p>

        {/* Add more content to ensure there's enough to scroll */}
        <div className="max-w-2xl mx-auto mt-8 text-left">
          <h3 className="text-lg font-bold mb-2">Crystal Globe Features</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Dodecahedron geometry (12 pentagonal faces)</li>
            <li>Transparent blue surface with pink edges</li>
            <li>Outer glow effect that follows the rotation</li>
            <li>Particle system that orbits around the globe</li>
            <li>Pulsing opacity effect for a dynamic appearance</li>
            <li>Scroll-based rotation for interactive experience</li>
          </ul>
        </div>

        {/* Add a tall div to ensure scrollability */}
        <div className="h-[300vh]"></div>
      </div>
    </div>
  );
}
