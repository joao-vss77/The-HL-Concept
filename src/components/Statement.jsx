import { useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { Cushion } from './Art.jsx'

const TEXT =
  'Poeira, ácaros, manchas e odores se acumulam no fundo da fibra. A gente tira tudo e deixa o tecido protegido para o próximo susto.'

export default function Statement() {
  const section = useRef(null)
  const words = TEXT.split(' ')
  const refs = useRef([])

  useScrollProgress(section, (p) => {
    const n = words.length
    refs.current.forEach((el, i) => {
      if (!el) return
      const k = p * (n + 5) - i
      const o = 0.16 + 0.84 * Math.min(1, Math.max(0, k / 3))
      el.style.opacity = o.toFixed(3)
    })
  })

  return (
    <section className="statement" ref={section}>
      <div className="statement__sticky">
        <div className="statement__float" aria-hidden="true">
          <Cushion className="sf sf--1" kind="floral" a="#1d3a57" b="#8fd3ff" />
          <Cushion className="sf sf--2" kind="stripes" a="#f1f6fa" b="#3aa7ff" />
          <Cushion className="sf sf--3" kind="geo" a="#d9cbb0" b="#8b4a2b" />
          <Cushion className="sf sf--4" kind="dots" a="#3f78a8" b="#e8f5ff" />
        </div>
        <p className="statement__text">
          {words.map((w, i) => (
            <span key={i} ref={(el) => (refs.current[i] = el)}>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
