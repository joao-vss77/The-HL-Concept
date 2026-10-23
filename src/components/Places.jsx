import { useState } from 'react'
import { PLACES } from '../config.js'

export default function Places() {
  const keys = Object.keys(PLACES)
  const [tab, setTab] = useState(keys[0])
  const data = PLACES[tab]

  return (
    <section className="section places">
      <h2 className="h2">Atendemos onde o estofado está</h2>
      <div className="tabs" role="tablist" aria-label="Tipo de atendimento">
        {keys.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            className={tab === k ? 'is-on' : ''}
            onClick={() => setTab(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="places__panel" key={tab} role="tabpanel">
        <p className="places__text">{data.text}</p>
        <ul className="places__items">
          {data.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
