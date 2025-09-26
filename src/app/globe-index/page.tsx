'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function GlobeIndexPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">3D Globe Examples</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobeCard
            title="Basic Globe"
            description="A simple icosahedron globe with transparent colors and shining edges."
            href="/globe-simple"
          />

          <GlobeCard
            title="Crystal Globe"
            description="A dodecahedron crystal-like globe with glow and particles."
            href="/globe-styles"
          />

          <GlobeCard
            title="Neon Wireframe"
            description="A sphere with neon wireframe effect and glowing edges."
            href="/globe-wireframe"
          />

          <GlobeCard
            title="Cosmic Torus"
            description="A torus (donut) shape with cosmic effects and particles."
            href="/globe-torus"
          />

          <GlobeCard
            title="Scroll-Controlled Globe"
            description="An octahedron globe that rotates as you scroll the page."
            href="/globe-scroll"
          />

          <GlobeCard
            title="Globe Background"
            description="A page with a rotating globe background that responds to scrolling."
            href="/globe-background"
          />

          <GlobeCard
            title="Simple Globe Background"
            description="A simplified version with a wireframe globe background."
            href="/globe-bg-simple"
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How to Customize</h2>
          <p className="mb-4">
            To customize these globes, edit the properties in the respective page files.
            Here are the key properties you can modify:
          </p>

          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
{`<GlobeScene
  meshType="icosahedron"        // Options: sphere, icosahedron, octahedron, dodecahedron, torus
  mainColor="#00aaff"           // Main color of the globe (hex)
  edgeColor="#ff00aa"           // Color of the edges (hex)
  pointLightColor="#ffffff"     // Color of the moving point light (hex)
  wireframe={false}             // Show wireframe instead of solid surface
  opacity={0.7}                 // Transparency level (0.0 to 1.0)
  enableScrollRotation={true}   // Enable rotation on scroll
  enableGlow={true}             // Add outer glow effect
  enableParticles={true}        // Add particle system around the globe
  rotationSpeed={1.2}           // Control rotation speed
  pulseEffect={true}            // Enable pulsing opacity effect
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function GlobeCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="block">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-4 text-blue-500 dark:text-blue-400">View Example →</div>
      </div>
    </Link>
  );
}
