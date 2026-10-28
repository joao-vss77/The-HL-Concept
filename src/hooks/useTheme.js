import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })
export const useTheme = () => useContext(ThemeContext)

const COLORS = { dark: '#050a12', light: '#ffffff' }

// O tema inicial é definido no index.html (antes da pintura) para evitar flash.
export function useThemeState() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme])
    try {
      localStorage.setItem('hl-theme', theme)
    } catch {
      /* armazenamento indisponível: o tema só não é lembrado */
    }
  }, [theme])

  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}
