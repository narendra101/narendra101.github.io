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

export default function GlobeBackgroundPage() {
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
        <div className="text-lg">Loading 3D Globe Background...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Globe background - using absolute positioning and higher z-index */}
      <div className="fixed inset-0 z-0 overflow-hidden" style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
        <GlobeScene
          ref={globeRef}
          meshType="icosahedron"
          mainColor="#00aaff"
          edgeColor="#ff00aa"
          pointLightColor="#ffffff"
          wireframe={false}
          opacity={0.7} // Increased opacity to be more visible
          enableScrollRotation={false} // We handle scroll rotation in the page component
          enableGlow={true}
          enableParticles={true}
          rotationSpeed={0.3} // Slower base rotation
          pulseEffect={true}
        />
      </div>

      {/* Page content that scrolls over the globe */}
      <div className="relative z-20">
        {/* Header */}
        <header className="sticky top-0 bg-black/30 backdrop-blur-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Globe Background</h1>
          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <section className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl mb-20">
              <h2 className="text-3xl font-bold mb-6 text-white">Scroll to Rotate the Globe</h2>
              <p className="text-white/90 mb-6 text-lg">
                This page features a 3D globe as a background that rotates as you scroll.
                The content of the page is layered on top of the globe, creating a dynamic
                and interactive experience.
              </p>
              <p className="text-white/90 mb-6 text-lg">
                Try scrolling down to see how the globe rotates in response to your scrolling.
              </p>
              <Link href="/globe-index" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                View More Globe Examples
              </Link>
            </section>

            {/* Features section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10 text-white text-center">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureCard
                  title="Scroll Rotation"
                  description="The globe rotates smoothly as you scroll up and down the page, creating an interactive background effect."
                />
                <FeatureCard
                  title="Transparent Design"
                  description="The globe is semi-transparent, allowing it to serve as a background without overwhelming the content."
                />
                <FeatureCard
                  title="Particle Effects"
                  description="Particles orbit around the globe, adding depth and visual interest to the background."
                />
                <FeatureCard
                  title="Glow Effect"
                  description="A subtle glow surrounds the globe, enhancing its visual appeal and creating a sense of depth."
                />
              </div>
            </section>

            {/* How it works section */}
            <section className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl mb-20">
              <h2 className="text-3xl font-bold mb-6 text-white">How It Works</h2>
              <p className="text-white/90 mb-4 text-lg">
                This effect is created using Three.js, a powerful JavaScript library for creating 3D graphics in the browser.
                The globe is positioned as a fixed background element with a negative z-index, allowing content to scroll over it.
              </p>
              <p className="text-white/90 mb-4 text-lg">
                When you scroll, a JavaScript event listener calculates how far you've scrolled and rotates the globe accordingly.
                This creates the illusion that your scrolling is directly controlling the globe's rotation.
              </p>
              <p className="text-white/90 text-lg">
                The globe itself is an icosahedron geometry with a semi-transparent material, edge highlighting, and particle effects.
              </p>
            </section>

            {/* Add more sections to ensure there's enough content to scroll */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-6 text-white">Customization Options</h2>
              <p className="text-white/90 mb-6 text-lg">
                The globe background can be customized in various ways:
              </p>
              <ul className="list-disc pl-5 text-white/90 space-y-2 mb-6">
                <li>Change the mesh type (sphere, icosahedron, octahedron, etc.)</li>
                <li>Adjust the colors of the globe, edges, and point light</li>
                <li>Toggle wireframe mode on or off</li>
                <li>Control the opacity and transparency</li>
                <li>Enable or disable glow and particle effects</li>
                <li>Adjust the rotation speed and sensitivity</li>
              </ul>
              <p className="text-white/90 text-lg">
                These options allow you to create a unique background effect that matches your website's design.
              </p>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black/30 backdrop-blur-md p-8 text-center text-white/70">
          <p>Scroll-Rotating Globe Background Example</p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}
