import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SERVICES } from '../config.js'
import { EASE, Reveal, SplitHeading } from './Reveal.jsx'
import { Arrow } from './Hero.jsx'

const QUOTE_TYPE = {
  sofa: 'Sofá',
  colchao: 'Colchão',
  poltrona: 'Poltrona',
  cadeira: 'Cadeiras estofadas',
  couro: 'Estofado de couro',
  automotivo: 'Bancos automotivos',
}

// Pré-seleciona o tipo de estofado no formulário de orçamento.
export function requestQuote(type) {
  window.dispatchEvent(new CustomEvent('hl:quote', { detail: { type } }))
}

const LIST = SERVICES.filter((s) => s.offered)

// Antes x Depois lado a lado quando o serviço tem o par de fotos da mesma peça;
// senão, uma foto do atendimento com legenda.
function Shot({ service, eager = false }) {
  const load = eager ? undefined : 'lazy'
  if (service.before && service.after) {
    return (
      <div className="shot shot--pair">
        <figure>
          <img src={service.before} alt={`${service.title}: antes`} loading={load} decoding="async" />
          <figcaption className="shot__tag">Antes</figcaption>
        </figure>
        <figure>
          <img src={service.after} alt={`${service.title}: depois`} loading={load} decoding="async" />
          <figcaption className="shot__tag shot__tag--after">Depois</figcaption>
        </figure>
      </div>
    )
  }
  return (
    <figure className="shot">
      <img src={service.photo} alt={service.title} loading={load} decoding="async" />
      {service.photoLabel && <figcaption className="shot__tag shot__tag--muted">{service.photoLabel}</figcaption>}
    </figure>
  )
}

export default function Services() {
  const [active, setActive] = useState(0)
  const rows = useRef([])
  const current = LIST[active]

  // O serviço ativo é o que cruza a faixa central da tela durante o scroll;
  // a imagem presa à esquerda acompanha.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    rows.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section services tone-alt" id="servicos" aria-labelledby="servicos-title">
      <div className="services__head">
        <p className="eyebrow">Serviços · Antes e depois</p>
        <SplitHeading className="h2" text="Cada peça com o cuidado que o material pede" />
        <Reveal as="p" className="muted services__lead" delay={0.1}>
          Fotos reais dos nossos atendimentos, do jeito que a peça estava e do jeito que ficou.
        </Reveal>
      </div>

      <div className="services__grid">
        <div className="services__stage">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.id}
              className="services__shot"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Shot service={current} eager />
            </motion.div>
          </AnimatePresence>
          <span className="services__count">
            {String(active + 1).padStart(2, '0')} / {String(LIST.length).padStart(2, '0')}
          </span>
          <span className="services__dots">
            {LIST.map((s, i) => (
              <i key={s.id} className={i === active ? 'is-on' : ''} />
            ))}
          </span>
        </div>

        <ul className="services__list">
          {LIST.map((s, i) => (
            <li
              key={s.id}
              ref={(el) => (rows.current[i] = el)}
              data-index={i}
              className={`service ${i === active ? 'is-active' : ''}`}
            >
              <Reveal className="service__inner">
                <div className="service__img">
                  <Shot service={s} />
                </div>
                <span className="service__n">{String(i + 1).padStart(2, '0')}</span>
                <div className="service__body">
                  <h3 className="service__title">{s.title}</h3>
                  <p>{s.text}</p>
                  <ul className="tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a className="link link--strong" href="#orcamento" onClick={() => requestQuote(QUOTE_TYPE[s.id])}>
                    Pedir orçamento <Arrow />
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <p className="credit">Fotos de atendimentos reais da HL Concept.</p>
    </section>
  )
}
