'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 flex items-center justify-center">Loading 3D Globe...</div>
});

export default function GlobeBackgroundSimplePage() {
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
        globeRef.current.rotateGlobe(delta * 0.03);
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
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen bg-black">
      {/* Globe background */}
      <div className="fixed inset-0" style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
        <GlobeScene 
          ref={globeRef}
          meshType="sphere"
          mainColor="#00ffff"
          edgeColor="#ff00ff"
          pointLightColor="#ffffff"
          wireframe={true}
          opacity={0.8}
          enableScrollRotation={false}
          enableGlow={true}
          enableParticles={true}
          rotationSpeed={0.5}
          pulseEffect={true}
        />
      </div>
      
      {/* Content that scrolls over the globe */}
      <div className="relative" style={{ zIndex: 100 }}>
        {/* Header */}
        <header className="sticky top-0 bg-black/50 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Simple Globe Background</h1>
          <ThemeToggle />
        </header>
        
        {/* Main content */}
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <section className="bg-black/50 p-8 rounded-lg mb-20">
              <h2 className="text-3xl font-bold mb-6 text-white">Scroll to Rotate the Globe</h2>
              <p className="text-white mb-6 text-lg">
                This page features a 3D globe as a background that rotates as you scroll.
              </p>
              <Link href="/globe-index" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                View More Globe Examples
              </Link>
            </section>
            
            {/* Add more content to ensure there's enough to scroll */}
            <div className="space-y-20">
              {[...Array(10)].map((_, i) => (
                <section key={i} className="bg-black/50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4 text-white">Section {i + 1}</h2>
                  <p className="text-white mb-4">
                    This is a section of content that allows you to scroll the page.
                    As you scroll, the globe in the background will rotate.
                  </p>
                  <p className="text-white">
                    The rotation speed is proportional to how fast you scroll.
                  </p>
                </section>
              ))}
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-black/50 p-8 text-center text-white">
          <p>Globe Background Example</p>
        </footer>
      </div>
    </div>
  );
}
