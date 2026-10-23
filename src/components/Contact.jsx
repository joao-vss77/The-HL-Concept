import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config.js'
import { Logo } from './Nav.jsx'
import { Cushion } from './Art.jsx'

export default function Contact() {
  return (
    <>
      <section className="contact" id="contato">
        <div className="contact__glow" aria-hidden="true" />
        <Cushion className="contact__cush contact__cush--l" kind="floral" a="#1d3a57" b="#8fd3ff" />
        <Cushion className="contact__cush contact__cush--r" kind="stripes" a="#f1f6fa" b="#3aa7ff" />
        <h2 className="contact__title">Seu estofado pode começar de novo.</h2>
        <p className="contact__lead">
          Conte o que você quer limpar e a gente combina o orçamento e o horário.
        </p>
        <div className="hero__actions hero__actions--center">
          <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Agendar pelo WhatsApp
          </a>
          <a className="btn btn--ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Seguir {INSTAGRAM_HANDLE}
          </a>
        </div>
      </section>

      <footer className="footer">
        <Logo />
        <p>Higienização de estofados. Atendimento residencial e comercial.</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          {INSTAGRAM_HANDLE}
        </a>
      </footer>

      <a
        className="wa-float"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-1.9c1.8 1 3.800 1.500 5.600 1.500 7 0 12.700-5.600 12.700-12.500S23 3 16 3zm0 22.800c-1.800 0-3.500-.5-5-1.400l-.4-.2-4.400 1.100 1.200-4.200-.3-.4a10 10 0 0 1-1.600-5.500C5.500 10 10.200 5.300 16 5.300s10.500 4.700 10.500 10.200S21.800 25.800 16 25.800zm5.800-7.500c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.6c.2-.2.200-.3.300-.5.100-.2.100-.4 0-.6-.1-.2-.7-1.800-1-2.400-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400-.3.300-1.200 1.200-1.200 2.800s1.200 3.200 1.400 3.500c.2.200 2.400 3.700 5.800 5.100.8.400 1.400.6 1.900.8.800.3 1.500.2 2.100.1.600-.1 1.900-.8 2.200-1.500.3-.7.300-1.400.2-1.500-.1-.2-.3-.2-.6-.4z"
          />
        </svg>
      </a>
    </>
  )
}
