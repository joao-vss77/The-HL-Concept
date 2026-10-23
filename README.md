# The HL Concept — site

Site em React + Vite para a HL Concept (higienização de estofados).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/ para publicar
```

## Antes de publicar

Abra `src/config.js` e troque:

- `WHATSAPP_NUMBER`: hoje é um número de exemplo (`5511999999999`). Use o WhatsApp real, com DDI + DDD, só dígitos.
- Textos de serviços, etapas, dúvidas e atendimento: ajuste ao que a HL Concept realmente oferece.

## Imagens

Sofás, poltrona, almofadas e estampas são ilustrações em SVG desenhadas em `src/components/Art.jsx`
(cores, estampas e posições das almofadas são props). O antes e depois também é ilustração.
Para usar fotos reais do trabalho, coloque as imagens em `public/` e troque o conteúdo de
`.ba__layer--before` e `.ba__layer--after` em `src/components/BeforeAfter.jsx`.

## Publicar

A pasta `dist/` funciona em Vercel, Netlify, Cloudflare Pages ou qualquer hospedagem estática.
