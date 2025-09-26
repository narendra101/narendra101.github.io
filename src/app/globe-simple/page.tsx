'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ThemeToggle';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Globe...</div>
});

export default function SimpleGlobePage() {
  const [isMounted, setIsMounted] = useState(false);
  const globeRef = useRef<any>(null);
  const lastScrollY = useRef(0);

  // Only render on client-side
  useEffect(() => {
    setIsMounted(true);

    // Direct scroll handler for the page
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // If we have a reference to the globe component
      if (globeRef.current && globeRef.current.rotateGlobe) {
        // Call a method on the globe component to rotate it
        // Use a larger multiplier for more noticeable rotation
        globeRef.current.rotateGlobe(delta * 0.03);

        // Log for debugging
        console.log('Rotating globe by:', delta * 0.03);
      }

      lastScrollY.current = currentScrollY;
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
          3D Globe
        </h1>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/*
        To change the globe properties, modify these props:
        - meshType: 'sphere' | 'icosahedron' | 'octahedron' | 'dodecahedron' | 'torus'
        - mainColor: hex color for the main globe material
        - edgeColor: hex color for the edges
        - pointLightColor: hex color for the moving point light
        - wireframe: true | false
        - opacity: 0.0 to 1.0
        - enableScrollRotation: true | false - rotate the globe when scrolling
        - enableGlow: true | false - add a glow effect around the globe
        - enableParticles: true | false - add particle effects around the globe
        - rotationSpeed: number - control the rotation speed (default: 1)
        - pulseEffect: true | false - add a pulsing opacity effect
      */}
      <GlobeScene
        ref={globeRef}
        meshType="icosahedron"
        mainColor="#00aaff"
        edgeColor="#ff00aa"
        pointLightColor="#ffffff"
        wireframe={false}
        opacity={0.7}
        enableScrollRotation={false} // We'll handle scroll rotation in the page component
        enableGlow={true}
        enableParticles={true}
        rotationSpeed={1.2}
        pulseEffect={true}
      />

      {/* Add some content to enable scrolling */}
      <div className="absolute top-[100vh] w-full p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Scroll to rotate the globe</h2>
        <p className="mb-4">The globe rotates as you scroll up and down this page.</p>

        {/* Add more content to ensure there's enough to scroll */}
        <div className="max-w-2xl mx-auto mt-8 text-left">
          <h3 className="text-lg font-bold mb-2">How it works</h3>
          <p className="mb-4">
            This globe uses Three.js to create a 3D visualization with transparent colors and shining edges.
            The rotation is controlled by your scrolling, creating an interactive experience.
          </p>
          <p className="mb-4">
            Try scrolling up and down to see the effect. The faster you scroll, the faster the globe rotates.
          </p>
        </div>

        {/* Add a tall div to ensure scrollability */}
        <div className="h-[300vh]"></div>
      </div>
    </div>
  );
}
