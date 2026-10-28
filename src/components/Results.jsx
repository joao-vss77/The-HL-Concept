import { useState } from 'react'
import { DIFFERENTIALS, GALLERY, TESTIMONIALS, SERVICE_AREA, PLACES, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config.js'
import { Reveal, SplitHeading, MaskImage } from './Reveal.jsx'
import { Cushion } from './Cushion.jsx'

function Gallery() {
  // Só aparece com fotos reais cadastradas em GALLERY (config.js).
  if (!GALLERY.length) return null
  return (
    <div className="gallery">
      {GALLERY.map((g, i) => (
        <figure key={i} className="gallery__item">
          <div className="gallery__pair">
            <MaskImage src={g.before} alt={`Antes: ${g.label}`} />
            <MaskImage src={g.after} alt={`Depois: ${g.label}`} delay={0.1} />
          </div>
          <figcaption>{g.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function Testimonials() {
  // Só aparece com depoimentos reais cadastrados em TESTIMONIALS (config.js).
  if (!TESTIMONIALS.length) return null
  return (
    <div className="testimonials">
      {TESTIMONIALS.map((t, i) => (
        <Reveal as="blockquote" key={i} className="testimonial" delay={i * 0.08}>
          <p>“{t.text}”</p>
          <footer>
            {t.name}
            {t.place ? ` · ${t.place}` : ''}
            {t.source ? <span className="muted"> · via {t.source}</span> : null}
          </footer>
        </Reveal>
      ))}
    </div>
  )
}

function Area() {
  const keys = Object.keys(PLACES)
  const [tab, setTab] = useState(keys[0])
  const data = PLACES[tab]
  const hasArea = SERVICE_AREA.city || SERVICE_AREA.regions.length

  return (
    <div className="area">
      <div className="area__float" aria-hidden="true">
        <Cushion className="ac ac--1" kind="floral" a="#1d3a57" b="#8fd3ff" />
        <Cushion className="ac ac--2" kind="stripes" a="#f1f6fa" b="#3aa7ff" />
        <Cushion className="ac ac--3" kind="dots" a="#3f78a8" b="#e8f5ff" />
        <Cushion className="ac ac--4" kind="geo" a="#d9cbb0" b="#8b4a2b" />
      </div>
      <Reveal className="area__intro">
        <h3 className="h3">Onde atendemos</h3>
        <p className="muted">
          {hasArea
            ? `Atendimento em ${[SERVICE_AREA.city, ...SERVICE_AREA.regions].filter(Boolean).join(', ')}.`
            : 'O serviço acontece no seu endereço. Informe seu bairro no orçamento para confirmarmos o atendimento.'}
        </p>
      </Reveal>
      <Reveal className="area__tabs" delay={0.1}>
        <div className="tabs" role="tablist" aria-label="Tipo de atendimento">
          {keys.map((k) => (
            <button
              key={k}
              role="tab"
              id={`tab-${k}`}
              aria-selected={tab === k}
              aria-controls="area-panel"
              className={tab === k ? 'is-on' : ''}
              onClick={() => setTab(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="area__panel" key={tab} role="tabpanel" id="area-panel" aria-labelledby={`tab-${tab}`}>
          <p>{data.text}</p>
          <ul>
            {data.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  )
}

export default function Results() {
  return (
    <section className="section results" id="resultados" aria-labelledby="resultados-title">
      <div className="results__head">
        <p className="eyebrow">Por que a HL Concept</p>
        <SplitHeading className="h2" text="Confiança se vê no detalhe" />
      </div>

      <ol className="diffs">
        {DIFFERENTIALS.map((d, i) => (
          <Reveal as="li" key={d.title} delay={i * 0.08} className="diff">
            <span className="diff__n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{d.title}</h3>
            <p className="muted">{d.text}</p>
          </Reveal>
        ))}
      </ol>

      <Gallery />
      <Testimonials />

      <Reveal className="insta">
        <p>
          Trabalhos reais, antes e depois e bastidores do atendimento estão no Instagram{' '}
          <a className="link link--strong" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            {INSTAGRAM_HANDLE}
          </a>
          .
        </p>
      </Reveal>

      <Area />
    </section>
  )
}
