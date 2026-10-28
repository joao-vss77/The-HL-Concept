import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { useTheme } from '../hooks/useTheme.js'
import { EASE } from './Reveal.jsx'

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="The HL Concept, início">
      <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M32 8v48M11 20l42 24M11 44l42-24" />
        </g>
        <circle cx="32" cy="32" r="6" fill="var(--accent)" />
      </svg>
      <span>
        The HL <b>Concept</b>
      </span>
    </a>
  )
}

const LINKS = [
  ['#processo', 'Como funciona'],
  ['#servicos', 'Serviços'],
  ['#antes-depois', 'Antes e depois'],
  ['#resultados', 'Diferenciais'],
  ['#duvidas', 'Dúvidas'],
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={dark ? 'Tema claro' : 'Tema escuro'}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        {dark ? (
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
          </g>
        ) : (
          <path
            d="M20 14.6A8.4 8.4 0 0 1 9.4 4a8.4 8.4 0 1 0 10.6 10.6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${solid || open ? 'nav--solid' : ''}`}>
      <motion.span className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Logo />
      <nav className="nav__links" aria-label="Principal">
        {LINKS.map(([href, label]) => (
          <a key={href} className="link" href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav__end">
        <ThemeToggle />
        <a className="btn btn--small nav__cta" href="#orcamento">
          Pedir orçamento
        </a>
        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            className="nav__sheet"
            aria-label="Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {LINKS.map(([href, label], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={close}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}
              >
                {label}
              </motion.a>
            ))}
            <a className="btn" href="#orcamento" onClick={close}>
              Pedir orçamento
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
