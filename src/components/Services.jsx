import { SERVICES } from '../config.js'
import { Sofa, Armchair, CushionTrio, PALETTES } from './Art.jsx'

const ART = [
  <Sofa key="s" body={PALETTES.slate} drops cushions={[
    { kind: 'stripes', a: '#e8f5ff', b: '#3aa7ff', x: 128, y: 92, s: 0.95, rot: -10 },
    { kind: 'dots', a: '#f4ead2', b: '#c9884e', x: 418, y: 96, s: 0.95, rot: 8 },
  ]} />,
  <Armchair key="a" />,
  <CushionTrio key="c" />,
]

export default function Services() {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section className="section services" id="servicos">
      <h2 className="h2">O que a HL Concept faz pelo seu estofado</h2>
      <ul className="services__list">
        {SERVICES.map((s, i) => (
          <li key={s.title} className="service" onPointerMove={onMove}>
            <h3 className="service__title">{s.title}</h3>
            <div className="service__body">
              <p>{s.text}</p>
              <ul className="tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="service__art" aria-hidden="true">
              {ART[i]}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
