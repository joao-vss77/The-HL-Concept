import { useState } from 'react'
import { INSTAGRAM_URL } from '../config.js'
import { Sofa, PALETTES } from './Art.jsx'

const CUSHIONS = [
  { kind: 'stripes', a: '#e8f5ff', b: '#3aa7ff', x: 128, y: 92, s: 0.95, rot: -10 },
  { kind: 'geo', a: '#16324d', b: '#8fd3ff', x: 418, y: 88, s: 1.0, rot: 9 },
]

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)

  return (
    <section className="section ba" id="antes-depois">
      <div className="ba__intro">
        <h2 className="h2">Arraste e veja a diferença na fibra</h2>
        <p className="muted">
          Ilustração do efeito de uma higienização. Para ver trabalhos reais da HL Concept, acesse o
          Instagram.
        </p>
        <a className="btn btn--ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          Ver trabalhos no Instagram
        </a>
      </div>

      <div className="ba__frame" style={{ '--pos': `${pos}%` }}>
        <div className="ba__layer ba__layer--after">
          <Sofa body={PALETTES.stone} cushions={CUSHIONS} sparkle />
        </div>
        <div className="ba__layer ba__layer--before">
          <Sofa body={PALETTES.stone} cushions={CUSHIONS} dirty />
        </div>
        <span className="ba__chip ba__chip--l">Antes</span>
        <span className="ba__chip ba__chip--r">Depois</span>
        <div className="ba__handle" aria-hidden="true">
          <span />
        </div>
        <input
          className="ba__range"
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparar antes e depois da higienização"
        />
      </div>
    </section>
  )
}
