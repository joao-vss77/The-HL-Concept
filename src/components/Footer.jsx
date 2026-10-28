import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config.js'
import { Logo } from './Nav.jsx'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__brand">
          <Logo />
          <p className="muted">Higienização de estofados. Atendimento residencial e comercial.</p>
        </div>
        <nav className="footer__links" aria-label="Rodapé">
          <a className="link" href="#servicos">Serviços</a>
          <a className="link" href="#orcamento">Orçamento</a>
          <a className="link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            {INSTAGRAM_HANDLE}
          </a>
        </nav>
        <p className="footer__credit muted">
          Modelo 3D e imagens ilustrativas: Poly Haven (CC0) e Wikimedia Commons (CC0).
        </p>
      </footer>

      <a className="wa-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-1.9c1.8 1 3.8 1.5 5.6 1.5 7 0 12.7-5.6 12.7-12.5S23 3 16 3zm0 22.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.4 1.1 1.2-4.2-.3-.4a10 10 0 0 1-1.6-5.5C5.5 10 10.2 5.3 16 5.3s10.5 4.7 10.5 10.2S21.8 25.8 16 25.8zm5.8-7.5c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.7 5.8 5.1.8.4 1.4.6 1.9.8.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"
          />
        </svg>
      </a>
    </>
  )
}
