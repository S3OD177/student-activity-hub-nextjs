"use client"

import { useTheme } from '@/contexts/theme-context'
import { themes, ThemeKey } from '@/lib/theme-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Check } from 'lucide-react'
import { useState } from 'react'

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        title="Change theme color"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="h-5 w-5" />
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  setTheme(key as ThemeKey)
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.primary}`}></div>
                  <span className="text-sm">{theme.name}</span>
                </div>
                {currentTheme === key && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function ThemeSelectorCard() {
  const { currentTheme, setTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => setTheme(key as ThemeKey)}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                currentTheme === key
                  ? 'border-gray-900 dark:border-white shadow-lg'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className={`w-full h-12 rounded-md bg-gradient-to-r ${theme.primary} mb-2`}></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{theme.name}</p>
              {currentTheme === key && (
                <div className="flex items-center justify-center mt-1">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
