'use client'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  )
}
