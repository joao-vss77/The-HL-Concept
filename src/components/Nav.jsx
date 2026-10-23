import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '../config.js'

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="The HL Concept, início">
      <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M32 8v48M11 20l42 24M11 44l42-24" />
        </g>
        <circle cx="32" cy="32" r="6" fill="var(--ice)" />
      </svg>
      <span>
        The HL <b>Concept</b>
      </span>
    </a>
  )
}

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <Logo />
      <nav className="nav__links" aria-label="Principal">
        <a href="#servicos" onClick={close}>Serviços</a>
        <a href="#como-funciona" onClick={close}>Como funciona</a>
        <a href="#antes-depois" onClick={close}>Antes e depois</a>
        <a href="#duvidas" onClick={close}>Dúvidas</a>
        <a className="btn btn--small" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Pedir orçamento
        </a>
      </nav>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}
