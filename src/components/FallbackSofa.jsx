// Alternativa sem WebGL (e versão do celular): foto do mesmo sofá, com a
// "limpeza" feita por máscara conforme o scroll (variável --clean).
export default function FallbackSofa({ className = 'stage__fallback' }) {
  return (
    <div className={className}>
      <img src="/images/sofa.webp" alt="" loading="lazy" decoding="async" />
      <img className="stage__fallback-dirty" src="/images/sofa.webp" alt="" loading="lazy" decoding="async" />
    </div>
  )
}
