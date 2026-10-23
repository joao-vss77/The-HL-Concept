import { useRef, useState } from 'react'
import { STEPS } from '../config.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

export default function Process() {
  const section = useRef(null)
  const [active, setActive] = useState(0)

  useScrollProgress(section, (p) => {
    section.current?.style.setProperty('--p', p.toFixed(4))
    const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length))
    setActive((prev) => (prev === idx ? prev : idx))
  })

  const step = STEPS[active]

  return (
    <section className="process" id="como-funciona" ref={section} style={{ '--p': 0 }}>
      <div className="process__sticky">
        <h2 className="h2 process__heading">Como funciona, da avaliação à entrega</h2>

        <div className="process__grid">
          <ol className="process__list">
            <span className="process__thread" aria-hidden="true">
              <span />
            </span>
            {STEPS.map((s, i) => (
              <li key={s.title} className={i === active ? 'is-active' : i < active ? 'is-done' : ''}>
                <span className="process__n">{i + 1}</span>
                <span>{s.title}</span>
              </li>
            ))}
          </ol>

          <div className="process__stage" aria-live="polite">
            <svg className="ring" viewBox="0 0 320 320" aria-hidden="true">
              <circle className="ring__track" cx="160" cy="160" r="140" />
              <circle className="ring__fill" cx="160" cy="160" r="140" pathLength="100" />
              <g className="ring__ticks">
                {Array.from({ length: 48 }).map((_, i) => {
                  const a = (i / 48) * Math.PI * 2
                  const x1 = 160 + Math.cos(a) * 124
                  const y1 = 160 + Math.sin(a) * 124
                  const x2 = 160 + Math.cos(a) * (i % 4 === 0 ? 112 : 118)
                  const y2 = 160 + Math.sin(a) * (i % 4 === 0 ? 112 : 118)
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                })}
              </g>
            </svg>
            <div className="process__card" key={active}>
              <span className="process__big">{active + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
