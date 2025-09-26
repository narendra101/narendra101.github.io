'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Globe...</div>
});

export default function GlobeTorusPage() {
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
    <div className="relative min-h-screen bg-black">
      {/* Torus background */}
      <div className="fixed inset-0" style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
        <GlobeScene
          ref={globeRef}
          meshType="torus"
          mainColor="#9900ff"
          edgeColor="#ff00aa"
          pointLightColor="#00ffff"
          wireframe={false}
          opacity={0.5}
          enableScrollRotation={false} // We handle scroll rotation in the page component
          enableGlow={true}
          enableParticles={true}
          rotationSpeed={0.3} // Slower base rotation
          pulseEffect={true}
        />
      </div>

      {/* Content that scrolls over the torus */}
      <div className="relative" style={{ zIndex: 100 }}>
        {/* Header */}
        <header className="sticky top-0 bg-black/50 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Cosmic Torus</h1>
          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <section className="bg-black/50 p-8 rounded-lg mb-20">
              <h2 className="text-3xl font-bold mb-6 text-white">Scroll to Rotate the Torus</h2>
              <p className="text-white mb-6 text-lg">
                This page features a 3D torus (donut shape) as a background that rotates as you scroll.
              </p>
              <p className="text-white mb-6">
                The torus has a deep purple color with pink edges and cyan point light.
              </p>
              <Link href="/globe-index" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
                View More Globe Examples
              </Link>
            </section>

            {/* Features section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 text-white text-center">Torus Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureCard
                  title="Unique Shape"
                  description="Unlike a traditional sphere, the torus (donut) shape creates a distinctive visual effect."
                />
                <FeatureCard
                  title="Cosmic Colors"
                  description="Deep purple surface with pink edges and cyan lighting creates a cosmic aesthetic."
                />
                <FeatureCard
                  title="Particle Effects"
                  description="Particles orbit around the torus, adding depth and visual interest."
                />
                <FeatureCard
                  title="Scroll Rotation"
                  description="The torus rotates smoothly as you scroll, creating an interactive experience."
                />
              </div>
            </section>

            {/* Add more content to ensure there's enough to scroll */}
            <div className="space-y-20">
              {[...Array(5)].map((_, i) => (
                <section key={i} className="bg-black/50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4 text-white">Section {i + 1}</h2>
                  <p className="text-white mb-4">
                    This is a section of content that allows you to scroll the page.
                    As you scroll, the torus in the background will rotate.
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
          <p>Cosmic Torus Example</p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-purple-900/30 backdrop-blur-md p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}
