import { Swatch } from './Art.jsx'

const ROW_A = [
  { kind: 'stripes', a: '#e9e4d8', b: '#3f78a8', label: 'Listrado' },
  { kind: 'plaid', a: '#2b3442', b: '#b9654a', c: '#e9e4d8', label: 'Xadrez' },
  { kind: 'floral', a: '#7a8f7a', b: '#e9e4d8', c: '#c9884e', label: 'Floral' },
  { kind: 'solid', a: '#8b4a2b', b: '#000', label: 'Couro' },
  { kind: 'geo', a: '#16324d', b: '#8fd3ff', label: 'Geométrico' },
  { kind: 'dots', a: '#d8c7a8', b: '#2b3442', label: 'Poá' },
  { kind: 'herringbone', a: '#3f78a8', b: '#e8f5ff', label: 'Espinha de peixe' },
]

const ROW_B = [
  { kind: 'solid', a: '#5b7f95', b: '#fff', label: 'Veludo' },
  { kind: 'geo', a: '#d8c7a8', b: '#8b4a2b', label: 'Losango' },
  { kind: 'stripes', a: '#16324d', b: '#e8f5ff', label: 'Risca de giz' },
  { kind: 'floral', a: '#b9654a', b: '#f4ead2', c: '#2b3442', label: 'Jacquard' },
  { kind: 'herringbone', a: '#e9e4d8', b: '#7a8f7a', label: 'Linho' },
  { kind: 'plaid', a: '#3f78a8', b: '#16324d', c: '#e8f5ff', label: 'Tartan' },
  { kind: 'solid', a: '#c9b79a', b: '#6a5a45', label: 'Suede' },
]

function Row({ items, reverse }) {
  const list = [...items, ...items]
  return (
    <div className={`marquee ${reverse ? 'marquee--rev' : ''}`}>
      <div className="marquee__track">
        {list.map((it, i) => (
          <Swatch key={i} {...it} />
        ))}
      </div>
    </div>
  )
}

export default function Swatches() {
  return (
    <section className="swatches" aria-labelledby="estampas-title">
      <div className="swatches__head">
        <h2 className="h2" id="estampas-title">Estampas, texturas e couro</h2>
        <p className="muted">
          Cada tecido pede um cuidado diferente. Por isso a gente avalia antes de escolher o produto.
        </p>
      </div>
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </section>
  )
}
