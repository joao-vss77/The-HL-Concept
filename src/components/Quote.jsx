import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { QUOTE_ENDPOINT, UPHOLSTERY_TYPES, WHATSAPP_URL, whatsappLink } from '../config.js'
import { EASE, Reveal, SplitHeading } from './Reveal.jsx'
import { Arrow } from './Hero.jsx'

const EMPTY = { name: '', phone: '', type: '', qty: '1', region: '', details: '' }
const MAX_PHOTOS = 5
const MAX_PHOTO_MB = 8

const digits = (v) => v.replace(/\D/g, '')

function formatPhone(v) {
  const d = digits(v).slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validate(f, photos) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Informe seu nome.'
  const p = digits(f.phone)
  if (p.length < 10 || p.length > 11) e.phone = 'Informe um WhatsApp com DDD, ex.: (11) 99999-9999.'
  if (!f.type) e.type = 'Escolha o tipo de estofado.'
  const q = Number(f.qty)
  if (!Number.isInteger(q) || q < 1 || q > 50) e.qty = 'Informe uma quantidade entre 1 e 50.'
  if (f.region.trim().length < 2) e.region = 'Informe seu bairro ou região.'
  if (photos.length > MAX_PHOTOS) e.photos = `Envie no máximo ${MAX_PHOTOS} fotos.`
  else if (photos.some((ph) => ph.size > MAX_PHOTO_MB * 1024 * 1024))
    e.photos = `Cada foto pode ter até ${MAX_PHOTO_MB} MB.`
  return e
}

function message(f) {
  return [
    'Olá! Quero um orçamento de higienização.',
    `Nome: ${f.name.trim()}`,
    `Estofado: ${f.type}`,
    `Quantidade de peças: ${f.qty}`,
    `Bairro/região: ${f.region.trim()}`,
    f.details.trim() && `Detalhes: ${f.details.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export default function Quote() {
  const [form, setForm] = useState(EMPTY)
  const [photos, setPhotos] = useState([])
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | opened | error
  const formRef = useRef(null)

  useEffect(() => {
    const onQuote = (e) => {
      const type = e.detail?.type
      if (type && UPHOLSTERY_TYPES.includes(type)) setForm((f) => ({ ...f, type }))
    }
    window.addEventListener('hl:quote', onQuote)
    return () => window.removeEventListener('hl:quote', onQuote)
  }, [])

  const set = (key) => (e) => {
    const value = key === 'phone' ? formatPhone(e.target.value) : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form, photos)
    setErrors(errs)
    if (Object.keys(errs).length) {
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      return
    }

    if (!QUOTE_ENDPOINT) {
      // Sem servidor: o pedido segue pelo WhatsApp, e quem envia é o próprio cliente.
      window.open(whatsappLink(message(form)), '_blank', 'noopener')
      setStatus('opened')
      return
    }

    setStatus('sending')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      data.append('phone_digits', digits(form.phone))
      photos.forEach((p) => data.append('photos', p, p.name))
      const res = await fetch(QUOTE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setForm(EMPTY)
      setPhotos([])
    } catch {
      setStatus('error')
    }
  }

  const field = (key, label, input, hint) => (
    <div className={`field ${errors[key] ? 'has-error' : ''}`}>
      <label htmlFor={`q-${key}`}>{label}</label>
      {input}
      {hint && !errors[key] && <small className="field__hint">{hint}</small>}
      {errors[key] && (
        <small className="field__error" id={`q-${key}-err`} role="alert">
          {errors[key]}
        </small>
      )}
    </div>
  )

  const aria = (key) => ({
    id: `q-${key}`,
    'aria-invalid': errors[key] ? 'true' : 'false',
    'aria-describedby': errors[key] ? `q-${key}-err` : undefined,
  })

  return (
    <section className="section quote" id="orcamento" aria-labelledby="orcamento-title">
      <div className="quote__intro">
        <p className="eyebrow">Orçamento</p>
        <SplitHeading className="h2" text="Conte o que precisa limpar" />
        <Reveal as="p" className="muted" delay={0.1}>
          Com essas informações a gente já consegue montar o orçamento e combinar o melhor horário.
        </Reveal>
        <Reveal delay={0.2} className="quote__direct">
          <span className="muted">Prefere conversar direto?</span>
          <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
        </Reveal>
      </div>

      <Reveal className="quote__card" delay={0.1}>
        <form ref={formRef} onSubmit={onSubmit} noValidate>
          <div className="quote__grid">
            {field('name', 'Nome', <input {...aria('name')} autoComplete="name" value={form.name} onChange={set('name')} />)}
            {field(
              'phone',
              'WhatsApp',
              <input {...aria('phone')} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(11) 99999-9999" value={form.phone} onChange={set('phone')} />
            )}
            {field(
              'type',
              'Tipo de estofado',
              <select {...aria('type')} value={form.type} onChange={set('type')}>
                <option value="">Selecione</option>
                {UPHOLSTERY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            )}
            {field('qty', 'Quantidade de peças', <input {...aria('qty')} type="number" min="1" max="50" inputMode="numeric" value={form.qty} onChange={set('qty')} />)}
            <div className="quote__wide">
              {field('region', 'Bairro ou região', <input {...aria('region')} autoComplete="address-level3" value={form.region} onChange={set('region')} />)}
            </div>
            <div className="quote__wide">
              {field(
                'details',
                'Descreva a necessidade (opcional)',
                <textarea {...aria('details')} rows="3" placeholder="Ex.: sofá retrátil de 3 lugares com mancha de café no assento" value={form.details} onChange={set('details')} />
              )}
            </div>
            {QUOTE_ENDPOINT ? (
              <div className="quote__wide">
                {field(
                  'photos',
                  'Fotos (opcional)',
                  <input
                    {...aria('photos')}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      setPhotos(Array.from(e.target.files || []))
                      setErrors((er) => ({ ...er, photos: undefined }))
                    }}
                  />,
                  `Até ${MAX_PHOTOS} fotos de ${MAX_PHOTO_MB} MB.`
                )}
              </div>
            ) : (
              <p className="quote__wide field__hint">Fotos ajudam no orçamento: você pode enviá-las na conversa do WhatsApp.</p>
            )}
          </div>

          <button className="btn quote__submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : QUOTE_ENDPOINT ? 'Enviar pedido de orçamento' : 'Continuar no WhatsApp'}
            <Arrow />
          </button>

          <AnimatePresence>
            {status !== 'idle' && status !== 'sending' && (
              <motion.p
                key={status}
                className={`quote__status quote__status--${status}`}
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {status === 'sent' && 'Pedido enviado. Vamos responder pelo seu WhatsApp.'}
                {status === 'opened' &&
                  'Abrimos o WhatsApp com o seu pedido preenchido. Para concluir, é só enviar a mensagem por lá.'}
                {status === 'error' && (
                  <>
                    Não foi possível enviar agora. Tente de novo ou{' '}
                    <a className="link link--strong" href={whatsappLink(message(form))} target="_blank" rel="noreferrer">
                      envie pelo WhatsApp
                    </a>
                    .
                  </>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </Reveal>
    </section>
  )
}
