// ============================================================
//  EDITE AQUI: dados de contato e conteúdo do site
// ============================================================

// Número com DDI + DDD, só dígitos. Ex.: Brasil, SP -> 5511999999999
// ATENÇÃO: troque pelo WhatsApp real da HL Concept.
export const WHATSAPP_NUMBER = '5511999999999'

export const INSTAGRAM_URL = 'https://www.instagram.com/thehlconcept/'
export const INSTAGRAM_HANDLE = '@thehlconcept'

// Endpoint opcional para receber o formulário de orçamento (ex.: Formspree,
// função serverless). Deixe vazio para enviar o pedido pelo WhatsApp.
// Com endpoint, o formulário aceita fotos e só confirma o envio após resposta 2xx.
export const QUOTE_ENDPOINT = ''

const MESSAGE =
  'Olá! Vi o site da HL Concept e quero um orçamento de higienização de estofados.'

export const whatsappLink = (text = MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

export const WHATSAPP_URL = whatsappLink()

// Modelo 3D do herói (glTF). Atual: "Sofa 01" do Poly Haven (CC0).
// Para trocar, coloque o arquivo em /public/models e ajuste o caminho.
export const SOFA_MODEL_URL = '/models/sofa/sofa.gltf'

// Serviços. `offered: false` esconde o item do site.
// Fotos reais de atendimentos da HL Concept (public/images/servicos).
// Com `before` e `after`, o site mostra a comparação Antes x Depois.
// Só com `photo`, mostra uma foto do atendimento com a legenda `photoLabel`.
// Para ativar o antes x depois de um serviço, adicione as duas fotos da mesma peça.
export const SERVICES = [
  {
    id: 'sofa',
    title: 'Higienização de sofás',
    text: 'Limpeza profunda da fibra, tratamento de manchas e odores, com opção de impermeabilização para o tecido repelir líquidos.',
    tags: ['Retráteis', 'Chaise', 'Tecido e suede'],
    before: '/images/servicos/sofa-antes.webp',
    after: '/images/servicos/sofa-depois.webp',
    offered: true,
  },
  {
    id: 'colchao',
    title: 'Limpeza de colchões',
    text: 'Higienização das faces e laterais do colchão, onde suor, poeira e ácaros se acumulam com o uso.',
    tags: ['Solteiro', 'Casal', 'Queen e king', 'Cabeceiras'],
    photo: '/images/servicos/extracao.webp',
    photoLabel: 'Extração em andamento',
    offered: true,
  },
  {
    id: 'poltrona',
    title: 'Higienização de poltronas',
    text: 'Cuidado peça a peça para poltronas de leitura, de amamentação e de sala, respeitando o acabamento.',
    tags: ['Tecido', 'Veludo', 'Linho'],
    before: '/images/servicos/poltrona-antes.webp',
    after: '/images/servicos/poltrona-depois.webp',
    offered: true,
  },
  {
    id: 'cadeira',
    title: 'Limpeza de cadeiras estofadas',
    text: 'Assentos e encostos de cadeiras de jantar e de escritório, ideais para conjuntos inteiros de uma vez.',
    tags: ['Jantar', 'Escritório', 'Restaurantes'],
    photo: '/images/servicos/atendimento.webp',
    photoLabel: 'Higienização em andamento',
    offered: true,
  },
  {
    id: 'couro',
    title: 'Limpeza e hidratação de couro',
    text: 'Remove a sujeira da superfície e devolve a maciez ao couro, para ele não ressecar nem rachar com o tempo.',
    tags: ['Couro natural', 'Couro sintético'],
    photo: '/images/servicos/sofa-suede.webp',
    photoLabel: 'Atendimento real',
    offered: true,
  },
  {
    id: 'automotivo',
    title: 'Higienização de bancos automotivos',
    text: 'Bancos de tecido e couro, carpetes e forros do carro.',
    tags: ['Tecido', 'Couro'],
    photo: '/images/automotivo.webp',
    photoLabel: 'Imagem ilustrativa',
    // Mude para true se a HL Concept oferecer este serviço.
    offered: false,
  },
]

export const UPHOLSTERY_TYPES = [
  'Sofá',
  'Colchão',
  'Poltrona',
  'Cadeiras estofadas',
  'Estofado de couro',
  ...(SERVICES.find((s) => s.id === 'automotivo')?.offered ? ['Bancos automotivos'] : []),
  'Outro',
]

// Etapas exibidas na demonstração com o sofá 3D.
// Confira se a ordem e os nomes batem com o método usado pela empresa.
export const STEPS = [
  {
    title: 'Avaliação do tecido',
    text: 'Identificamos o tipo de fibra ou couro, o estado das manchas e o que cada peça aguenta antes de escolher qualquer produto.',
  },
  {
    title: 'Remoção da sujeira solta',
    text: 'Poeira, pelos e resíduos saem primeiro, para a limpeza profunda render mais.',
  },
  {
    title: 'Aplicação do produto adequado',
    text: 'Produto compatível com o material, com escovação suave quando o tecido precisa e permite.',
  },
  {
    title: 'Extração',
    text: 'A sujeira dissolvida é retirada de dentro da fibra junto com a umidade.',
  },
  {
    title: 'Proteção e entrega',
    text: 'Impermeabilização no tecido ou hidratação no couro, quando contratadas. Conferimos o resultado com você e orientamos sobre a secagem.',
  },
]

export const DIFFERENTIALS = [
  {
    title: 'Avaliação antes do produto',
    text: 'Cada tecido reage de um jeito. Olhamos a peça antes de decidir o que usar.',
  },
  {
    title: 'Atendimento no seu endereço',
    text: 'O serviço acontece na sua casa, escritório ou estabelecimento.',
  },
  {
    title: 'Tecido, suede e couro',
    text: 'Higienização para fibras e limpeza com hidratação para couro.',
  },
  {
    title: 'Orientação pós-serviço',
    text: 'Você recebe as recomendações de secagem e de uso nos primeiros dias.',
  },
]

// Área de atendimento. Preencha com as cidades/bairros reais.
export const SERVICE_AREA = {
  city: '',
  regions: [],
}

// Galeria de antes e depois REAIS. Exemplo de item:
// { before: '/images/galeria/sofa-1-antes.webp', after: '/images/galeria/sofa-1-depois.webp', label: 'Sofá 3 lugares, linho' }
export const GALLERY = []

// Depoimentos REAIS de clientes (com autorização). Exemplo:
// { name: 'Nome do cliente', place: 'Bairro', text: 'Depoimento...', source: 'Google' }
export const TESTIMONIALS = []

export const FAQ = [
  {
    q: 'Como faço para agendar?',
    a: 'Preencha o formulário de orçamento ou chame no WhatsApp. Você conta o que precisa limpar e a gente combina o valor e o melhor horário.',
  },
  {
    q: 'Vocês atendem na minha casa?',
    a: 'Sim. O atendimento é residencial e comercial: o serviço acontece no seu endereço.',
  },
  {
    q: 'Para que serve a impermeabilização?',
    a: 'Ela cria uma barreira de proteção na fibra. Quando cai água, suco ou café, o líquido demora mais para penetrar e fica mais fácil de limpar.',
  },
  {
    q: 'Quanto tempo o estofado leva para secar?',
    a: 'Depende do tecido, do ambiente e do serviço. Na avaliação a gente te passa a estimativa e as orientações de uso.',
  },
  {
    q: 'Toda mancha sai?',
    a: 'Depende da origem da mancha, do tempo que ela tem e do tecido. Na avaliação a gente diz com sinceridade o que dá para esperar.',
  },
]

export const PLACES = {
  Residencial: {
    text: 'Para quem quer o sofá da sala, as poltronas e os colchões limpos sem tirar nada de casa.',
    items: ['Sofás e poltronas', 'Cadeiras de jantar', 'Colchões e cabeceiras', 'Estofados de couro'],
  },
  Comercial: {
    text: 'Para negócios que recebem gente todo dia e precisam de um ambiente limpo e bem cuidado.',
    items: ['Escritórios e salas de reunião', 'Consultórios e clínicas', 'Restaurantes e cafés', 'Recepções e salas de espera'],
  },
}
