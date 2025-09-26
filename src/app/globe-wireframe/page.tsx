'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ThemeToggle';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Globe...</div>
});

export default function GlobeWireframePage() {
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
          Neon Wireframe Globe
        </h1>
        <p className="text-white text-sm mt-2 drop-shadow-lg">
          Scroll to rotate the globe
        </p>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* 
        This is a neon wireframe globe with:
        - Sphere mesh
        - Neon purple wireframe
        - Bright green edges
        - Yellow point light
        - Glow effect
        - Fast rotation
        - Scroll rotation enabled
      */}
      <GlobeScene 
        meshType="sphere"
        mainColor="#ff00ff"
        edgeColor="#00ff00"
        pointLightColor="#ffff00"
        wireframe={true}
        opacity={0.8}
        enableScrollRotation={true}
        enableGlow={true}
        enableParticles={false}
        rotationSpeed={1.5}
        pulseEffect={false}
      />
      
      {/* Add some content to enable scrolling */}
      <div className="absolute top-[100vh] w-full p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Scroll to rotate the globe</h2>
        <p className="mb-4">The globe rotates as you scroll up and down this page.</p>
        <div className="h-[200vh]"></div>
      </div>
    </div>
  );
}
