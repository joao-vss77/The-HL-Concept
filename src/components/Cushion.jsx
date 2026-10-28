import { useId } from 'react'

// Almofadas em SVG trazidas da versão anterior do site (branch main).
// Usadas como elementos decorativos para preencher espaços vazios.
const TAU = Math.PI * 2
const useUid = () => useId().replace(/:/g, '')

/* ------------------------------------------------------------------
   Estampas (patterns) — usadas em almofadas e na faixa de amostras
------------------------------------------------------------------- */
function PatternDef({ id, kind, a, b, c = '#f4ead2' }) {
  const common = { id, patternUnits: 'userSpaceOnUse' }
  switch (kind) {
    case 'stripes':
      return (
        <pattern {...common} width="20" height="20">
          <rect width="20" height="20" fill={a} />
          <rect width="8" height="20" fill={b} />
        </pattern>
      )
    case 'dots':
      return (
        <pattern {...common} width="22" height="22">
          <rect width="22" height="22" fill={a} />
          <circle cx="11" cy="11" r="3.4" fill={b} />
          <circle cx="0" cy="0" r="2" fill={b} opacity=".6" />
          <circle cx="22" cy="22" r="2" fill={b} opacity=".6" />
          <circle cx="22" cy="0" r="2" fill={b} opacity=".6" />
          <circle cx="0" cy="22" r="2" fill={b} opacity=".6" />
        </pattern>
      )
    case 'herringbone':
      return (
        <pattern {...common} width="24" height="14">
          <rect width="24" height="14" fill={a} />
          <path d="M0 14 L6 4 L12 14 L18 4 L24 14" stroke={b} strokeWidth="2.4" fill="none" />
        </pattern>
      )
    case 'plaid':
      return (
        <pattern {...common} width="32" height="32">
          <rect width="32" height="32" fill={a} />
          <rect width="10" height="32" fill={b} opacity=".55" />
          <rect width="32" height="10" fill={b} opacity=".55" />
          <rect x="22" width="2" height="32" fill={c} opacity=".7" />
          <rect y="22" width="32" height="2" fill={c} opacity=".7" />
        </pattern>
      )
    case 'geo':
      return (
        <pattern {...common} width="32" height="32">
          <rect width="32" height="32" fill={a} />
          <path d="M16 3 L29 16 L16 29 L3 16Z" stroke={b} strokeWidth="2.2" fill="none" />
          <path d="M16 10 L22 16 L16 22 L10 16Z" fill={b} opacity=".65" />
        </pattern>
      )
    case 'floral': {
      const petals = [0, 1, 2, 3, 4].map((i) => {
        const t = (i / 5) * TAU
        return <circle key={i} cx={19 + Math.cos(t) * 6.5} cy={19 + Math.sin(t) * 6.5} r="3.8" fill={b} />
      })
      return (
        <pattern {...common} width="38" height="38">
          <rect width="38" height="38" fill={a} />
          {petals}
          <circle cx="19" cy="19" r="2.8" fill={c} />
          <circle cx="0" cy="0" r="2" fill={b} opacity=".5" />
          <circle cx="38" cy="38" r="2" fill={b} opacity=".5" />
        </pattern>
      )
    }
    default:
      return (
        <pattern {...common} width="6" height="6">
          <rect width="6" height="6" fill={a} />
          <rect width="6" height="1.4" fill={b} opacity=".1" />
          <rect width="1.4" height="6" fill={b} opacity=".07" />
        </pattern>
      )
  }
}

/* Gradientes compartilhados (volume de almofada, brilho, trama) */
function Shades({ uid }) {
  return (
    <>
      <radialGradient id={`${uid}-cs`} cx=".35" cy=".3" r=".85">
        <stop offset="0" stopColor="#fff" stopOpacity=".3" />
        <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".4" />
      </radialGradient>
      <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".22" />
        <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".3" />
      </linearGradient>
      <pattern id={`${uid}-weave`} width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="1.2" fill="#fff" opacity=".07" />
        <rect width="1.2" height="5" fill="#000" opacity=".1" />
      </pattern>
    </>
  )
}

/* ------------------------------------------------------------------
   Almofada
------------------------------------------------------------------- */
const PILLOW = 'M12 10 Q60 -2 108 10 Q122 60 108 110 Q60 122 12 110 Q-2 60 12 10Z'

function CushionG({ fill, uid }) {
  return (
    <g>
      <path d={PILLOW} fill={fill} stroke="rgba(0,0,0,.32)" strokeWidth="1.5" />
      <path d={PILLOW} fill={`url(#${uid}-cs)`} />
      <path
        d="M60 60 L20 20 M60 60 L100 20 M60 60 L20 100 M60 60 L100 100"
        stroke="rgba(0,0,0,.16)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="60" r="3.2" fill="rgba(0,0,0,.38)" />
    </g>
  )
}

export function Cushion({ kind = 'stripes', a = '#3f78a8', b = '#e8f5ff', className = '', style }) {
  const uid = useUid()
  return (
    <svg viewBox="-6 -6 132 132" className={className} style={style} aria-hidden="true">
      <defs>
        <PatternDef id={`${uid}-p`} kind={kind} a={a} b={b} />
        <Shades uid={uid} />
      </defs>
      <CushionG fill={`url(#${uid}-p)`} uid={uid} />
    </svg>
  )
}
