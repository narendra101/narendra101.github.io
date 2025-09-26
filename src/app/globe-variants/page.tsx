'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/ThemeToggle';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Globe...</div>
});

// Define different globe variants
const globeVariants = [
  {
    name: "Crystal Blue",
    props: {
      meshType: "icosahedron",
      mainColor: "#00aaff",
      edgeColor: "#ffffff",
      pointLightColor: "#00ffff",
      wireframe: false,
      opacity: 0.6,
      enableGlow: true,
      enableParticles: true,
      rotationSpeed: 1,
      pulseEffect: true,
    }
  },
  {
    name: "Neon Wireframe",
    props: {
      meshType: "sphere",
      mainColor: "#ff00ff",
      edgeColor: "#00ff00",
      pointLightColor: "#ffff00",
      wireframe: true,
      opacity: 0.8,
      enableGlow: true,
      enableParticles: false,
      rotationSpeed: 1.5,
      pulseEffect: false,
    }
  },
  {
    name: "Geometric Dodecahedron",
    props: {
      meshType: "dodecahedron",
      mainColor: "#ff5500",
      edgeColor: "#ffaa00",
      pointLightColor: "#ffffff",
      wireframe: false,
      opacity: 0.7,
      enableGlow: false,
      enableParticles: true,
      rotationSpeed: 0.8,
      pulseEffect: false,
    }
  },
  {
    name: "Cosmic Torus",
    props: {
      meshType: "torus",
      mainColor: "#9900ff",
      edgeColor: "#ff00aa",
      pointLightColor: "#00ffff",
      wireframe: false,
      opacity: 0.5,
      enableGlow: true,
      enableParticles: true,
      rotationSpeed: 1.2,
      pulseEffect: true,
    }
  },
];

export default function GlobeVariantsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(0);
  
  // Only render on client-side
  useEffect(() => {
    setIsMounted(true);
    
    // Auto-rotate through variants every 10 seconds
    const interval = setInterval(() => {
      setCurrentVariant((prev) => (prev + 1) % globeVariants.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Show loading state until client-side rendering is ready
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading 3D Globe Variants...</div>
      </div>
    );
  }
  
  const currentGlobe = globeVariants[currentVariant];
  
  return (
    <div className="min-h-screen">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
          {currentGlobe.name}
        </h1>
        <p className="text-white text-sm mt-2 drop-shadow-lg">
          Variants auto-rotate every 10 seconds
        </p>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <GlobeScene {...currentGlobe.props} />
      
      {/* Variant selector */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {globeVariants.map((variant, index) => (
          <button
            key={variant.name}
            className={`w-3 h-3 rounded-full ${
              index === currentVariant 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => setCurrentVariant(index)}
            aria-label={`Switch to ${variant.name}`}
          />
        ))}
      </div>
    </div>
  );
}
