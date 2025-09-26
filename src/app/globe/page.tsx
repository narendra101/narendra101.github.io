'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Select, SelectItem, Slider, Switch } from '@heroui/react';
import { ThemeToggle } from '@/components/ThemeToggle';

// Dynamically import the GlobeScene component with SSR disabled
const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Globe...</div>
});

export default function GlobePage() {
  const [meshType, setMeshType] = useState<'sphere' | 'icosahedron' | 'octahedron' | 'dodecahedron' | 'torus'>('sphere');
  const [mainColor, setMainColor] = useState('#00aaff');
  const [edgeColor, setEdgeColor] = useState('#ff00aa');
  const [pointLightColor, setPointLightColor] = useState('#ffffff');
  const [wireframe, setWireframe] = useState(false);
  const [opacity, setOpacity] = useState(0.7);
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
          Interactive 3D Globe
        </h1>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <GlobeScene
        meshType={meshType}
        mainColor={mainColor}
        edgeColor={edgeColor}
        pointLightColor={pointLightColor}
        wireframe={wireframe}
        opacity={opacity}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 p-4 backdrop-blur-md">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Mesh Type
            </label>
            <Select
              value={meshType}
              onChange={(value) => setMeshType(value as any)}
              className="w-full"
            >
              <SelectItem value="sphere">Sphere</SelectItem>
              <SelectItem value="icosahedron">Icosahedron</SelectItem>
              <SelectItem value="octahedron">Octahedron</SelectItem>
              <SelectItem value="dodecahedron">Dodecahedron</SelectItem>
              <SelectItem value="torus">Torus</SelectItem>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Wireframe
            </label>
            <Switch
              checked={wireframe}
              onChange={setWireframe}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Main Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={mainColor}
                onChange={(e) => setMainColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={mainColor}
                onChange={(e) => setMainColor(e.target.value)}
                className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Edge Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={edgeColor}
                onChange={(e) => setEdgeColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={edgeColor}
                onChange={(e) => setEdgeColor(e.target.value)}
                className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Point Light Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={pointLightColor}
                onChange={(e) => setPointLightColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={pointLightColor}
                onChange={(e) => setPointLightColor(e.target.value)}
                className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Opacity: {opacity.toFixed(2)}
            </label>
            <Slider
              value={opacity}
              onChange={setOpacity}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
