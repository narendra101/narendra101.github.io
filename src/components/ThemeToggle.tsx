'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
    console.log('Current theme:', theme)
  }, [theme])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('Switching theme from', theme, 'to', newTheme)
    setTheme(newTheme)
  }

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <MoonIcon className="h-6 w-6 text-yellow-300" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      )}
    </div>
  )
}
