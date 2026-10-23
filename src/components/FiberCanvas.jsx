import { useEffect, useRef } from 'react'

// Tecido sujo coberto de poeira. O ponteiro "limpa" e revela a trama azul-gelo.
// A poeira volta devagar, então a página nunca fica estática.
export default function FiberCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const dust = document.createElement('canvas')
    const dctx = dust.getContext('2d')
    const pattern = document.createElement('canvas')
    const pctx = pattern.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let dpr = 1
    let raf = 0
    let frame = 0
    let visible = true
    let last = null
    let sparks = []
    const start = performance.now()

    const rand = (a, b) => a + Math.random() * (b - a)

    const paintDust = () => {
      dctx.globalCompositeOperation = 'source-over'
      dctx.globalAlpha = 1
      dctx.clearRect(0, 0, dust.width, dust.height)
      dctx.fillStyle = 'rgba(38,32,27,0.95)'
      dctx.fillRect(0, 0, dust.width, dust.height)
      for (let i = 0; i < 70; i++) {
        const x = rand(0, dust.width)
        const y = rand(0, dust.height)
        const r = rand(60, 260) * dpr
        const g = dctx.createRadialGradient(x, y, 0, x, y, r)
        const light = Math.random() > 0.5
        g.addColorStop(0, light ? 'rgba(92,78,60,0.55)' : 'rgba(14,11,9,0.6)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        dctx.fillStyle = g
        dctx.fillRect(x - r, y - r, r * 2, r * 2)
      }
      const speckles = Math.floor((dust.width * dust.height) / 900)
      for (let i = 0; i < speckles; i++) {
        dctx.fillStyle = Math.random() > 0.5 ? 'rgba(120,104,82,0.5)' : 'rgba(10,8,6,0.55)'
        const s = rand(0.6, 2.2) * dpr
        dctx.fillRect(rand(0, dust.width), rand(0, dust.height), s, s)
      }
      pattern.width = dust.width
      pattern.height = dust.height
      pctx.drawImage(dust, 0, 0)
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      W = host.clientWidth
      H = host.clientHeight
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      dust.width = canvas.width
      dust.height = canvas.height
      paintDust()
    }

    const wipe = (x, y, radius) => {
      const px = x * dpr
      const py = y * dpr
      const r = radius * dpr
      dctx.globalCompositeOperation = 'destination-out'
      dctx.globalAlpha = 1
      const g = dctx.createRadialGradient(px, py, 0, px, py, r)
      g.addColorStop(0, 'rgba(0,0,0,1)')
      g.addColorStop(0.55, 'rgba(0,0,0,0.85)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      dctx.fillStyle = g
      dctx.fillRect(px - r, py - r, r * 2, r * 2)
      if (sparks.length < 140 && Math.random() > 0.35) {
        sparks.push({
          x: x + rand(-radius, radius) * 0.6,
          y: y + rand(-radius, radius) * 0.6,
          vx: rand(-0.3, 0.3),
          vy: rand(-0.9, -0.2),
          life: 1,
          size: rand(1, 2.6),
        })
      }
    }

    const wipeLine = (x0, y0, x1, y1, radius) => {
      const dist = Math.hypot(x1 - x0, y1 - y0)
      const steps = Math.max(1, Math.ceil(dist / (radius * 0.35)))
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        wipe(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, radius)
      }
    }

    const onMove = (e) => {
      const rect = host.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (last) wipeLine(last.x, last.y, x, y, 90)
      else wipe(x, y, 90)
      last = { x, y }
    }
    const onLeave = () => {
      last = null
    }

    const drawWeave = (t) => {
      ctx.lineWidth = 1 * dpr
      const gap = 18 * dpr
      const wave = (x, y) => Math.sin(y * 0.009 + t * 0.0007 + x * 0.015) * 3 * dpr
      ctx.strokeStyle = 'rgba(95,185,255,0.30)'
      ctx.beginPath()
      for (let x = 0; x < canvas.width + gap; x += gap) {
        for (let y = 0; y <= canvas.height; y += 14 * dpr) {
          const px = x + wave(x, y)
          if (y === 0) ctx.moveTo(px, y)
          else ctx.lineTo(px, y)
        }
      }
      ctx.stroke()
      ctx.strokeStyle = 'rgba(190,230,255,0.20)'
      ctx.beginPath()
      for (let y = gap / 2; y < canvas.height + gap; y += gap) {
        for (let x = 0; x <= canvas.width; x += 14 * dpr) {
          const py = y + Math.cos(x * 0.009 + t * 0.0006 + y * 0.015) * 3 * dpr
          if (x === 0) ctx.moveTo(x, py)
          else ctx.lineTo(x, py)
        }
      }
      ctx.stroke()
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      frame++
      const t = now - start

      // varredura automática: a abertura da página
      if (!reduced && t > 500 && t < 3300) {
        const p = (t - 500) / 2800
        const x = W * (0.04 + p * 0.92)
        const y = H * (0.6 + 0.16 * Math.sin(p * 5.2))
        if (!window.__hlSweep) window.__hlSweep = { x, y }
        wipeLine(window.__hlSweep.x, window.__hlSweep.y, x, y, Math.min(150, W * 0.16))
        window.__hlSweep = { x, y }
      }

      // a poeira volta devagar
      if (!reduced && frame % 6 === 0) {
        dctx.globalCompositeOperation = 'source-over'
        dctx.globalAlpha = 0.02
        dctx.drawImage(pattern, 0, 0)
        dctx.globalAlpha = 1
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const bg = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.55, 0,
        canvas.width * 0.5, canvas.height * 0.55, canvas.width * 0.7
      )
      bg.addColorStop(0, 'rgba(40,120,200,0.30)')
      bg.addColorStop(1, 'rgba(5,10,18,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawWeave(t)

      ctx.drawImage(dust, 0, 0)

      // faíscas de gelo
      sparks = sparks.filter((s) => s.life > 0)
      for (const s of sparks) {
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.014
        ctx.fillStyle = `rgba(200,235,255,${Math.max(0, s.life)})`
        ctx.beginPath()
        ctx.arc(s.x * dpr, s.y * dpr, s.size * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    resize()
    window.__hlSweep = null
    raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(host)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      window.__hlSweep = null
    }
  }, [])

  return <canvas ref={canvasRef} className="fiber" aria-hidden="true" />
}
