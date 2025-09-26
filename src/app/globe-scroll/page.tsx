'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ThemeToggle';
import * as THREE from 'three';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Globe...</div>
});

export default function GlobeScrollPage() {
  const [isMounted, setIsMounted] = useState(false);
  const globeRef = useRef<any>(null);
  const lastScrollY = useRef(0);
  const scrollRotationRef = useRef({ x: 0, y: 0 });
  
  // Only render on client-side
  useEffect(() => {
    setIsMounted(true);
    
    // Direct scroll handler for the page
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      
      // Update rotation values
      scrollRotationRef.current.x += delta * 0.01;
      scrollRotationRef.current.y += delta * 0.01;
      
      // If we have a reference to the globe component
      if (globeRef.current && globeRef.current.rotateGlobe) {
        // Call a method on the globe component to rotate it
        globeRef.current.rotateGlobe(delta * 0.05);
        
        // Log for debugging
        console.log('Rotating globe by:', delta * 0.05);
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
          Scroll-Controlled Globe
        </h1>
        <p className="text-white text-sm mt-2 drop-shadow-lg">
          Scroll to rotate the globe
        </p>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* 
        This globe uses the ref approach for scroll rotation
      */}
      <GlobeScene 
        ref={globeRef}
        meshType="octahedron"
        mainColor="#00ffaa"
        edgeColor="#ff00ff"
        pointLightColor="#ffff00"
        wireframe={false}
        opacity={0.6}
        enableScrollRotation={false} // We handle scroll rotation in the page component
        enableGlow={true}
        enableParticles={true}
        rotationSpeed={0.5} // Slower base rotation
        pulseEffect={true}
      />
      
      {/* Add some content to enable scrolling */}
      <div className="absolute top-[100vh] w-full p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Scroll to rotate the globe</h2>
        <p className="mb-4">The globe rotates as you scroll up and down this page.</p>
        
        {/* Add more content to ensure there's enough to scroll */}
        <div className="max-w-2xl mx-auto mt-8 text-left">
          <h3 className="text-lg font-bold mb-2">How Scroll Rotation Works</h3>
          <p className="mb-4">
            This implementation uses React's useRef and forwardRef to expose a rotation method
            from the globe component. When you scroll, the page component calculates the scroll
            delta and calls this method to rotate the globe.
          </p>
          <p className="mb-4">
            The faster you scroll, the faster the globe rotates. Try scrolling in different
            directions to see how the rotation responds.
          </p>
        </div>
        
        {/* Add a tall div to ensure scrollability */}
        <div className="h-[300vh]"></div>
      </div>
    </div>
  );
}
