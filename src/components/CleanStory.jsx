import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { STEPS } from '../config.js'
import { EASE } from './Reveal.jsx'
import FallbackSofa from './FallbackSofa.jsx'

// Seção "presa" na tela: o sofá 3D fica à esquerda e é limpo conforme o scroll,
// enquanto as etapas do serviço aparecem à direita.
const CleanStory = forwardRef(function CleanStory({ step }, ref) {
  const current = STEPS[step]

  return (
    <section
      className="story"
      id="processo"
      ref={ref}
      style={{ '--steps': STEPS.length }}
      aria-labelledby="processo-title"
    >
      <div className="story__sticky">
        <div className="story__panel">
          <p className="eyebrow">Como funciona</p>
          <h2 className="h2" id="processo-title">
            Da avaliação à entrega
          </h2>

          <ol className="story__steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className={i === step ? 'is-active' : i < step ? 'is-done' : ''}>
                <span className="story__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="story__t">{s.title}</span>
                <p className="story__text">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="story__detail" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {current.text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <FallbackSofa className="story__media" />

        <div className="story__meter" aria-hidden="true">
          <span>Antes</span>
          <span className="story__bar">
            <span />
          </span>
          <span>Depois</span>
        </div>
        <p className="story__note">
          Demonstração ilustrativa. O resultado real depende do tecido, da origem e do tempo da
          sujeira.
        </p>
      </div>
    </section>
  )
})

export default CleanStory
