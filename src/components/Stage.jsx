import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { stage, clamp01, hasWebGL } from '../lib/stage.js'
import { useTheme } from '../hooks/useTheme.js'
import { STEPS } from '../config.js'
import Hero from './Hero.jsx'
import CleanStory from './CleanStory.jsx'
import FallbackSofa from './FallbackSofa.jsx'

// A cena 3D é carregada à parte: o conteúdo da página não espera o modelo.
const SofaScene = lazy(() => import('../three/SofaScene.jsx'))

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

const MOBILE = '(max-width: 760px)'

export default function Stage() {
  const root = useRef(null)
  const hero = useRef(null)
  const story = useRef(null)
  const { theme } = useTheme()
  const [webgl] = useState(hasWebGL)
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState(0)
  // No celular não há cena 3D: o chunk nem é carregado.
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE).matches)
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      const vh = window.innerHeight
      const h = hero.current.getBoundingClientRect()
      const s = story.current.getBoundingClientRect()
      stage.hero = clamp01(-h.top / h.height)
      // seção presa (desktop) vs. seção em fluxo normal (celular)
      stage.story = window.matchMedia(MOBILE).matches
        ? clamp01((vh * 0.75 - s.top) / Math.max(1, s.height * 0.7))
        : clamp01(-s.top / Math.max(1, s.height - vh))
      root.current.style.setProperty('--hero', stage.hero.toFixed(4))
      root.current.style.setProperty('--story', stage.story.toFixed(4))
      root.current.style.setProperty('--clean', clamp01((stage.story - 0.18) / 0.62).toFixed(4))
      const idx = Math.min(STEPS.length - 1, Math.floor(stage.story * STEPS.length))
      setStep((p) => (p === idx ? p : idx))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    const fine = window.matchMedia('(pointer: fine)').matches
    const onPointer = (e) => {
      stage.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      stage.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    calc()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    if (fine) window.addEventListener('pointermove', onPointer, { passive: true })
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(root.current)
    const mq = window.matchMedia(MOBILE)
    const onMq = () => {
      setMobile(mq.matches)
      schedule()
    }
    mq.addEventListener('change', onMq)
    return () => {
      mq.removeEventListener('change', onMq)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('pointermove', onPointer)
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="stage" ref={root}>
      {!mobile && (
        // Trilho do tamanho do palco: o canvas fica preso e só solta junto com o fim da demonstração.
        <div className="stage__track" aria-hidden="true">
          <div className={`stage__canvas ${ready || !webgl ? 'is-ready' : ''}`}>
            <div className="stage__glow" />
            {webgl ? (
              <SceneBoundary fallback={<FallbackSofa />}>
                <Suspense fallback={null}>
                  <SofaScene theme={theme} active={visible} onReady={onReady} />
                </Suspense>
              </SceneBoundary>
            ) : (
              <FallbackSofa />
            )}
          </div>
        </div>
      )}
      <Hero ref={hero} />
      <CleanStory ref={story} step={step} />
    </div>
  )
}
