import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from './Reveal.jsx'

const LINES = ['O que o olho', 'não vê no estofado,', 'a gente tira.']

const CHIPS = [
  { label: 'Higienização profunda', pos: 'a' },
  { label: 'Cuidado com os tecidos', pos: 'b' },
  { label: 'Atendimento especializado', pos: 'c' },
]

const Hero = forwardRef(function Hero(_, ref) {
  const reduced = useReducedMotion()
  const enter = (delay, y = 24) => ({
    initial: { opacity: 0, y: reduced ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay: reduced ? 0 : delay },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__content">
        <motion.p className="eyebrow" {...enter(0.1)}>
          Higienização de estofados · Residencial e comercial
        </motion.p>
        <h1 className="hero__title">
          {LINES.map((l, i) => (
            <span className="line" key={l}>
              <motion.span
                initial={{ y: reduced ? 0 : '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, ease: EASE, delay: reduced ? 0 : 0.2 + i * 0.1 }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero__lead" {...enter(0.6)}>
          Higienização, impermeabilização e hidratação de couro feitas no seu endereço, com o produto
          certo para cada tecido.
        </motion.p>
        <motion.div className="hero__actions" {...enter(0.75)}>
          <a className="btn" href="#orcamento">
            Pedir orçamento
            <Arrow />
          </a>
          <a className="btn btn--ghost" href="#processo">
            Ver a limpeza
          </a>
        </motion.div>
      </div>

      <ul className="hero__chips" aria-label="Destaques">
        {CHIPS.map((c, i) => (
          <motion.li
            key={c.label}
            className={`chip chip--${c.pos}`}
            initial={{ opacity: 0, y: reduced ? 0 : 14, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : 1.3 + i * 0.18 }}
          >
            <span className="chip__dot" aria-hidden="true" />
            {c.label}
          </motion.li>
        ))}
      </ul>

      <a className="hero__scroll" href="#processo">
        <span>Role para ver a limpeza</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
})

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Hero
