"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeKey, getTheme } from '@/lib/theme-config'

interface ThemeContextType {
  currentTheme: ThemeKey
  setTheme: (theme: ThemeKey) => void
  themeConfig: ReturnType<typeof getTheme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('default')

  useEffect(() => {
    const saved = localStorage.getItem('color-theme') as ThemeKey
    if (saved && getTheme(saved)) {
      setCurrentTheme(saved)
    }
  }, [])

  const setTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme)
    localStorage.setItem('color-theme', theme)
  }

  const themeConfig = getTheme(currentTheme)

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
