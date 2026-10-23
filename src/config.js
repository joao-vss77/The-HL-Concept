// ============================================================
//  EDITE AQUI: dados de contato e conteúdo do site
// ============================================================

// Número com DDI + DDD, só dígitos. Ex.: Brasil, SP -> 5511999999999
// ATENÇÃO: troque pelo WhatsApp real da HL Concept.
export const WHATSAPP_NUMBER = '5511999999999'

export const INSTAGRAM_URL = 'https://www.instagram.com/thehlconcept/'
export const INSTAGRAM_HANDLE = '@thehlconcept'

const MESSAGE =
  'Olá! Vi o Instagram da HL Concept e quero um orçamento de higienização de estofados.'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`

export const SERVICES = [
  {
    title: 'Higienização e impermeabilização',
    text: 'Limpeza profunda da fibra, remoção de manchas e odores, e uma camada de proteção que ajuda o tecido a repelir líquidos.',
    tags: ['Sofás', 'Poltronas', 'Cadeiras', 'Colchões'],
  },
  {
    title: 'Limpeza e hidratação de couro',
    text: 'Remove a sujeira da superfície e devolve a maciez ao couro, para ele não ressecar nem rachar com o tempo.',
    tags: ['Couro natural', 'Couro sintético', 'Revitalização'],
  },
  {
    title: 'Atendimento residencial e comercial',
    text: 'Vamos até a sua casa, escritório ou estabelecimento. Você agenda o horário e a gente cuida do resto.',
    tags: ['Casas e apartamentos', 'Escritórios', 'Consultórios', 'Restaurantes'],
  },
]

export const STEPS = [
  {
    title: 'Avaliação do estofado',
    text: 'Identificamos o tipo de tecido ou couro, o estado das manchas e o que cada peça aguenta.',
  },
  {
    title: 'Remoção da sujeira solta',
    text: 'Poeira, pelos e resíduos saem antes da lavagem, para a limpeza profunda render mais.',
  },
  {
    title: 'Higienização profunda',
    text: 'Produto e técnica certos para o material, trabalhando a fibra por dentro e tratando as manchas.',
  },
  {
    title: 'Impermeabilização ou hidratação',
    text: 'Tecido recebe a proteção contra líquidos. Couro recebe hidratação para manter a maciez.',
  },
  {
    title: 'Secagem e entrega',
    text: 'Conferimos o resultado com você e orientamos sobre o tempo de secagem e o uso nos primeiros dias.',
  },
]

export const FAQ = [
  {
    q: 'Como faço para agendar?',
    a: 'Chame no WhatsApp pelo botão do site. Você conta o que precisa limpar, a gente combina o orçamento e o melhor horário.',
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
    q: 'Meu sofá é de couro. Vocês fazem?',
    a: 'Fazemos limpeza e hidratação de couro, para tirar a sujeira e manter o material macio.',
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
