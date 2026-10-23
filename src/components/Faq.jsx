import { useState } from 'react'
import { FAQ } from '../config.js'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq" id="duvidas">
      <h2 className="h2">Dúvidas frequentes</h2>
      <div className="faq__list">
        {FAQ.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
              <h3>
                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div className="faq__a" id={`faq-${i}`} role="region">
                <div>
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
