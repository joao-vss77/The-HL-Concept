import { useId } from 'react'

const TAU = Math.PI * 2
const useUid = () => useId().replace(/:/g, '')

/* ------------------------------------------------------------------
   Estampas (patterns) — usadas em almofadas e na faixa de amostras
------------------------------------------------------------------- */
export function PatternDef({ id, kind, a, b, c = '#f4ead2' }) {
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

const placeCushion = ({ x, y, s, rot }) =>
  `translate(${x} ${y}) rotate(${rot} ${60 * s} ${60 * s}) scale(${s})`

/* Trio de almofadas (ilustração de serviço) */
export function CushionTrio({ className = '' }) {
  const uid = useUid()
  const items = [
    { kind: 'floral', a: '#1d3a57', b: '#8fd3ff', x: 96, y: 10, s: 1.05, rot: -4 },
    { kind: 'plaid', a: '#d9cbb0', b: '#b9654a', x: 14, y: 78, s: 1.1, rot: -14 },
    { kind: 'stripes', a: '#f1f6fa', b: '#3aa7ff', x: 150, y: 90, s: 1.15, rot: 10 },
  ]
  return (
    <svg viewBox="0 0 320 250" className={className} aria-hidden="true">
      <defs>
        <Shades uid={uid} />
        {items.map((it, i) => (
          <PatternDef key={i} id={`${uid}-p${i}`} kind={it.kind} a={it.a} b={it.b} />
        ))}
      </defs>
      <ellipse cx="165" cy="236" rx="130" ry="8" fill="#000" opacity=".28" />
      {items.map((it, i) => (
        <g key={i} transform={placeCushion(it)}>
          <g className="sway" style={{ animationDelay: `${-i * 1.7}s` }}>
            <CushionG fill={`url(#${uid}-p${i})`} uid={uid} />
          </g>
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------
   Sofá
------------------------------------------------------------------- */
export const PALETTES = {
  blue: '#3f78a8',
  stone: '#cfc3ad',
  slate: '#5b7f95',
}

const DEFAULT_CUSHIONS = [
  { kind: 'stripes', a: '#e8f5ff', b: '#3aa7ff', x: 128, y: 92, s: 0.95, rot: -10 },
  { kind: 'dots', a: '#f4ead2', b: '#c9884e', x: 292, y: 136, s: 0.7, rot: -3 },
  { kind: 'geo', a: '#16324d', b: '#8fd3ff', x: 418, y: 88, s: 1.0, rot: 9 },
]

const SOFA_PARTS = [
  ['back', { x: 84, y: 44, width: 472, height: 176, rx: 48 }],
  ['bcL', { x: 104, y: 64, width: 212, height: 136, rx: 30 }],
  ['bcR', { x: 324, y: 64, width: 212, height: 136, rx: 30 }],
  ['base', { x: 56, y: 214, width: 528, height: 88, rx: 22 }],
  ['scL', { x: 120, y: 168, width: 200, height: 84, rx: 28 }],
  ['scR', { x: 320, y: 168, width: 200, height: 84, rx: 28 }],
  ['armL', { x: 22, y: 110, width: 104, height: 192, rx: 46 }],
  ['armR', { x: 514, y: 110, width: 104, height: 192, rx: 46 }],
]

const STAINS = [
  [190, 130, 62, 40],
  [440, 118, 46, 30],
  [250, 226, 52, 26],
  [470, 240, 40, 22],
  [76, 250, 36, 30],
  [566, 190, 30, 40],
  [330, 84, 30, 18],
]

export function Sofa({
  body = PALETTES.blue,
  cushions = DEFAULT_CUSHIONS,
  dirty = false,
  sparkle = false,
  drops = false,
  float = false,
  className = '',
}) {
  const uid = useUid()
  const ref = (id) => `#${uid}-${id}`

  return (
    <svg
      viewBox="0 0 640 340"
      className={`${className} ${float ? 'bob' : ''} ${dirty ? 'is-dirty' : ''}`}
      aria-hidden="true"
    >
      <defs>
        <Shades uid={uid} />
        {SOFA_PARTS.map(([id, p]) => (
          <rect key={id} id={`${uid}-${id}`} {...p} />
        ))}
        <clipPath id={`${uid}-clip`}>
          {SOFA_PARTS.map(([id]) => (
            <use key={id} href={ref(id)} />
          ))}
        </clipPath>
        <radialGradient id={`${uid}-stain`}>
          <stop offset="0" stopColor="#2a1808" stopOpacity=".8" />
          <stop offset=".6" stopColor="#2a1808" stopOpacity=".35" />
          <stop offset="1" stopColor="#2a1808" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-speck`} width="29" height="23" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="6" r="1.2" fill="#2a1808" opacity=".45" />
          <circle cx="19" cy="14" r="1.6" fill="#2a1808" opacity=".35" />
          <circle cx="25" cy="3" r=".9" fill="#2a1808" opacity=".5" />
          <circle cx="11" cy="20" r="1" fill="#2a1808" opacity=".4" />
        </pattern>
        {cushions.map((c, i) => (
          <PatternDef key={i} id={`${uid}-cp${i}`} kind={c.kind} a={c.a} b={c.b} />
        ))}
      </defs>

      <ellipse cx="320" cy="324" rx="285" ry="12" fill="#000" opacity=".32" />
      <rect x="70" y="296" width="18" height="26" rx="4" fill="#16202c" />
      <rect x="552" y="296" width="18" height="26" rx="4" fill="#16202c" />

      {SOFA_PARTS.map(([id]) => (
        <g key={id}>
          <use href={ref(id)} fill={body} stroke="rgba(0,0,0,.3)" strokeWidth="2" />
          <use href={ref(id)} fill={`url(#${uid}-weave)`} />
          <use href={ref(id)} fill={`url(#${uid}-shine)`} />
        </g>
      ))}

      {/* pesponto nas almofadas do assento */}
      {['scL', 'scR'].map((id) => (
        <use
          key={id}
          href={ref(id)}
          fill="none"
          stroke="rgba(255,255,255,.16)"
          strokeWidth="2"
          strokeDasharray="3 6"
          transform="translate(0 -4)"
        />
      ))}

      {cushions.map((c, i) => (
        <g key={i} transform={placeCushion(c)}>
          <g className="sway" style={{ animationDelay: `${-i * 1.4}s` }}>
            <CushionG fill={`url(#${uid}-cp${i})`} uid={uid} />
          </g>
        </g>
      ))}

      {dirty && (
        <g clipPath={`url(#${uid}-clip)`}>
          {STAINS.map(([cx, cy, rx, ry], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${uid}-stain)`} />
          ))}
          <rect width="640" height="340" fill={`url(#${uid}-speck)`} />
        </g>
      )}

      {sparkle &&
        [
          [160, 70, 0],
          [470, 60, 1.1],
          [330, 120, 2.2],
          [560, 190, 0.6],
          [90, 200, 1.7],
        ].map(([x, y, d], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              className="twinkle"
              style={{ animationDelay: `${d}s` }}
              d="M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3Z"
              fill="#fff"
            />
          </g>
        ))}

      {drops &&
        [
          [200, 4, 0],
          [330, 0, 0.9],
          [450, 6, 1.7],
        ].map(([x, y, d], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              className="drop"
              style={{ animationDelay: `${d}s` }}
              d="M0 -10 C6 -2 8 2 8 5 A8 8 0 1 1 -8 5 C-8 2 -6 -2 0 -10Z"
              fill="#8fd3ff"
            />
          </g>
        ))}
    </svg>
  )
}

/* ------------------------------------------------------------------
   Poltrona de couro
------------------------------------------------------------------- */
const CHAIR_PARTS = [
  ['back', { x: 62, y: 26, width: 176, height: 190, rx: 56 }],
  ['bc', { x: 82, y: 46, width: 136, height: 150, rx: 40 }],
  ['base', { x: 44, y: 200, width: 212, height: 66, rx: 20 }],
  ['seat', { x: 74, y: 166, width: 152, height: 70, rx: 26 }],
  ['armL', { x: 22, y: 112, width: 70, height: 150, rx: 32 }],
  ['armR', { x: 208, y: 112, width: 70, height: 150, rx: 32 }],
]

export function Armchair({ body = '#8b4a2b', className = '' }) {
  const uid = useUid()
  const ref = (id) => `#${uid}-${id}`
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      <defs>
        <Shades uid={uid} />
        {CHAIR_PARTS.map(([id, p]) => (
          <rect key={id} id={`${uid}-${id}`} {...p} />
        ))}
        <clipPath id={`${uid}-clip`}>
          {CHAIR_PARTS.map(([id]) => (
            <use key={id} href={ref(id)} />
          ))}
        </clipPath>
        <linearGradient id={`${uid}-sweep`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="292" rx="120" ry="9" fill="#000" opacity=".3" />
      <rect x="62" y="260" width="10" height="30" rx="3" fill="#16202c" />
      <rect x="228" y="260" width="10" height="30" rx="3" fill="#16202c" />

      {CHAIR_PARTS.map(([id]) => (
        <g key={id}>
          <use href={ref(id)} fill={body} stroke="rgba(0,0,0,.35)" strokeWidth="2" />
          <use href={ref(id)} fill={`url(#${uid}-shine)`} />
          <use href={ref(id)} fill={`url(#${uid}-shine)`} />
        </g>
      ))}

      <use href={ref('seat')} fill="none" stroke="rgba(255,225,190,.22)" strokeWidth="1.6" strokeDasharray="3 5" transform="translate(0 -4)" />

      <g clipPath={`url(#${uid}-clip)`}>
        <rect className="sweep" x="-90" y="0" width="70" height="300" fill={`url(#${uid}-sweep)`} />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   Amostra de tecido (faixa de estampas)
------------------------------------------------------------------- */
export function Swatch({ kind, a, b, c, label }) {
  const uid = useUid()
  return (
    <figure className="swatch">
      <svg viewBox="0 0 170 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <PatternDef id={`${uid}-p`} kind={kind} a={a} b={b} c={c} />
          <linearGradient id={`${uid}-f`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".22" />
            <stop offset=".45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".35" />
          </linearGradient>
        </defs>
        <rect width="170" height="120" fill={`url(#${uid}-p)`} />
        <rect width="170" height="120" fill={`url(#${uid}-f)`} />
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  )
}
