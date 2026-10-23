import FiberCanvas from './FiberCanvas.jsx'
import { Sofa } from './Art.jsx'
import { WHATSAPP_URL } from '../config.js'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <FiberCanvas />
      <div className="hero__art" aria-hidden="true">
        <Sofa float />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content">
        <h1 className="hero__title">
          <span className="line"><span>O que o olho</span></span>
          <span className="line"><span>não vê no estofado,</span></span>
          <span className="line"><span>a gente tira.</span></span>
        </h1>
        <p className="hero__lead">
          Higienização, impermeabilização e hidratação de couro para a sua casa ou empresa.
        </p>
        <div className="hero__actions">
          <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Agendar pelo WhatsApp
          </a>
          <a className="btn btn--ghost" href="#como-funciona">
            Ver como funciona
          </a>
        </div>
      </div>
    </section>
  )
}
