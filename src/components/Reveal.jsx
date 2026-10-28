import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1]
const VIEW = { once: true, margin: '0px 0px -12% 0px' }

// Entrada por opacidade + deslocamento vertical, com desaceleração natural.
export function Reveal({ as = 'div', delay = 0, y = 28, children, ...rest }) {
  const reduced = useReducedMotion()
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: reduced ? 0.01 : 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Título revelado palavra por palavra, de baixo para cima.
export function SplitHeading({ as = 'h2', text, className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
      transition={{ staggerChildren: reduced ? 0 : 0.045, delayChildren: delay }}
      aria-label={text}
    >
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          <span className="split" aria-hidden="true">
            <motion.span
              variants={{
                hidden: { y: reduced ? 0 : '110%', opacity: reduced ? 0 : 1 },
                show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </M>
  )
}

// Imagem revelada por máscara (clip-path) com leve ajuste de escala.
export function MaskImage({ src, alt, className = '', delay = 0, ...img }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={`mask ${className}`}
      initial={{ clipPath: reduced ? 'inset(0% 0% 0% 0%)' : 'inset(14% 10% 14% 10%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={VIEW}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={{ scale: reduced ? 1 : 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.4, ease: EASE, delay }}
        {...img}
      />
    </motion.div>
  )
}

// Curva que costura uma seção na outra.
export function Curve({ flip = false, className = '' }) {
  return (
    <svg
      className={`curve ${flip ? 'curve--flip' : ''} ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0 80 C 320 10, 620 120, 900 60 S 1300 20, 1440 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: EASE }}
      />
    </svg>
  )
}
