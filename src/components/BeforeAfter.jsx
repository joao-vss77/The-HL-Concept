import { useEffect, useRef, useState } from 'react'
import { INSTAGRAM_URL } from '../config.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { Reveal, SplitHeading } from './Reveal.jsx'

// Camada de sujeira gerada uma vez em canvas e aplicada (multiply) sobre a
// foto real do tecido. É uma ilustração, não um registro de serviço.
function makeGrime(size = 900) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

  g.fillStyle = 'rgb(232, 222, 204)'
  g.fillRect(0, 0, size, size)

  const blob = (x, y, r, color, alpha) => {
    const grd = g.createRadialGradient(x, y, 0, x, y, r)
    grd.addColorStop(0, `rgba(${color},${alpha})`)
    grd.addColorStop(0.7, `rgba(${color},${alpha * 0.45})`)
    grd.addColorStop(1, `rgba(${color},0)`)
    g.fillStyle = grd
    g.beginPath()
    for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 10) {
      const rr = r * (0.75 + rnd() * 0.35)
      g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr)
    }
    g.fill()
  }

  for (let i = 0; i < 26; i++) blob(rnd() * size, rnd() * size, 80 + rnd() * 200, '150,120,82', 0.22)
  blob(size * 0.36, size * 0.42, 120, '96,66,38', 0.6)
  blob(size * 0.7, size * 0.66, 90, '110,78,44', 0.5)
  blob(size * 0.22, size * 0.78, 60, '90,60,35', 0.45)

  // marca de água seca (anel)
  g.strokeStyle = 'rgba(120,88,52,0.45)'
  g.lineWidth = 7
  g.filter = 'blur(3px)'
  g.beginPath()
  g.ellipse(size * 0.64, size * 0.3, 95, 78, 0.4, 0, Math.PI * 2)
  g.stroke()
  g.filter = 'none'

  for (let i = 0; i < 2600; i++) {
    g.fillStyle = `rgba(70,52,34,${0.15 + rnd() * 0.35})`
    const s = 0.6 + rnd() * 2
    g.fillRect(rnd() * size, rnd() * size, s, s)
  }
  return c.toDataURL('image/webp', 0.8)
}

export default function BeforeAfter() {
  const [pos, setPos] = useState(78)
  const [grime, setGrime] = useState('')
  const touched = useRef(false)
  const section = useRef(null)

  useEffect(() => {
    try {
      setGrime(makeGrime())
    } catch {
      /* sem canvas 2D: o "antes" fica só com o filtro de cor */
    }
  }, [])

  // até o usuário mexer no controle, a rolagem conduz a revelação
  useScrollProgress(section, (p) => {
    if (touched.current) return
    const k = Math.min(1, Math.max(0, (p - 0.05) / 0.5))
    setPos(Math.round(88 - k * 40))
  })

  return (
    <section className="ba" id="antes-depois" ref={section}>
      <div className="ba__sticky">
        <div className="ba__intro">
          <p className="eyebrow">Antes e depois</p>
          <SplitHeading className="h2" text="Arraste e compare a fibra" />
          <Reveal as="p" className="muted" delay={0.1}>
            Demonstração ilustrativa sobre uma foto real de tecido de linho. Para ver trabalhos reais da HL
            Concept, acesse o Instagram.
          </Reveal>
          <Reveal delay={0.2}>
            <a className="link link--strong" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Ver trabalhos reais no Instagram
            </a>
          </Reveal>
        </div>

        <div className="ba__frame" style={{ '--pos': `${pos}%` }}>
          <div className="ba__layer ba__layer--after">
            <img src="/images/tecido.webp" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="ba__layer ba__layer--before" aria-hidden="true">
            <img src="/images/tecido.webp" alt="" loading="lazy" decoding="async" />
            {grime && <span className="ba__grime" style={{ backgroundImage: `url(${grime})` }} />}
          </div>
          <span className="ba__chip ba__chip--l">Antes</span>
          <span className="ba__chip ba__chip--r">Depois</span>
          <span className="ba__tag">Ilustração</span>
          <div className="ba__handle" aria-hidden="true">
            <span>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M9 6 3 12l6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <input
            className="ba__range"
            type="range"
            min="0"
            max="100"
            value={pos}
            onChange={(e) => {
              touched.current = true
              setPos(Number(e.target.value))
            }}
            aria-label="Comparar antes e depois da higienização (ilustração)"
          />
        </div>
      </div>
    </section>
  )
}
