// Estado compartilhado entre o DOM (scroll, ponteiro) e a cena 3D.
// Mutável de propósito: o loop do WebGL lê a cada frame sem re-renderizar o React.
export const stage = {
  hero: 0, // 0..1 enquanto o herói sai da tela
  story: 0, // 0..1 ao longo da demonstração de limpeza
  pointer: { x: 0, y: 0 },
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export const clamp01 = (v) => Math.min(1, Math.max(0, v))
