// Conteúdo central do site. Editar aqui é mais seguro do que mexer nos componentes.

export const NAV_LINKS = [
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
] as const;

export const CONTACT_EMAIL = "contatoasapdev@gmail.com";

export const WHATSAPP_DISPLAY = "+55 22 99201-0218";
export const WHATSAPP_HREF = `https://wa.me/5522992010218?text=${encodeURIComponent(
  "Olá! Vim pelo site da Satriz Club e quero um orçamento."
)}`;

export const SOCIALS = [
  { label: "Instagram", handle: "@satrizclub", href: "https://instagram.com/satrizclub" },
] as const;

// O "estatuto" — numerado porque é um código de regras de verdade.
export const ESTATUTO = [
  {
    n: "01",
    titulo: "Toda entrega leva nossa assinatura.",
    texto:
      "Cada projeto que sai daqui leva “desenvolvido por Satriz Club”. Marca é reputação que acumula — a gente trata cada cliente como prova.",
  },
  {
    n: "02",
    titulo: "Um braço por vez.",
    texto:
      "O estúdio paga as contas hoje. É ele que financia a revista e a moda amanhã. Sem afobação, sem dívida pra lançar tudo de uma vez.",
  },
  {
    n: "03",
    titulo: "Membros, não funcionários.",
    texto:
      "Quem cria, assina junto. O club é um coletivo de gente boa de ofício — dev, editor, designer, estilista — sob um nome só.",
  },
] as const;

export type Status = "ativo" | "em breve";

export const DIVISOES: {
  n: string;
  nome: string;
  oficio: string;
  descricao: string;
  status: Status;
}[] = [
  {
    n: "01",
    nome: "Estúdio",
    oficio: "Software sob medida",
    descricao:
      "Sites, sistemas e produtos digitais de ponta a ponta. É o carro-chefe — onde a Satriz nasceu e gera caixa.",
    status: "ativo",
  },
  {
    n: "02",
    nome: "Revista",
    oficio: "Editorial & cultura",
    descricao:
      "Jornalismo e conteúdo com a estética da casa. Audiência vira marca, marca vira porta pro resto.",
    status: "em breve",
  },
  {
    n: "03",
    nome: "Moda",
    oficio: "Vestuário da marca",
    descricao:
      "Roupa assinada pelo coletivo. Quando o nome já significa algo, ele vira algo que se veste.",
    status: "em breve",
  },
];

export type Projeto = {
  nome: string;
  tipo: string;
  ano: string;
  href?: string;
};

export const PROJETOS: Projeto[] = [
  {
    nome: "Gustavo Guedes Imóveis",
    tipo: "Site imobiliário & painel",
    ano: "2026",
    href: "https://gustavoguedesimoveis.com",
  },
  {
    nome: "DROP",
    tipo: "Marketplace com delivery",
    ano: "2026",
    href: "https://dropapp.com.br",
  },
  {
    nome: "Acapulco",
    tipo: "Plataforma de investimento",
    ano: "2025",
    href: "https://acapulco.vercel.app",
  },
];

// Papéis abertos no club.
export const PAPEIS = [
  "Desenvolvedor(a)",
  "Designer",
  "Editor(a) / Redator(a)",
  "Estilista",
  "Social media",
  "Audiovisual",
] as const;

// ─── Landing de conversão (estúdio fullstack) ───────────────────────────────

export const SERVICOS = [
  {
    nome: "Sites institucionais",
    resumo: "Presença que passa confiança.",
    descricao:
      "Sites rápidos e bonitos que transformam visita em contato. Da sua empresa, do seu produto, da sua marca.",
  },
  {
    nome: "Sistemas web & SaaS",
    resumo: "Software que roda seu negócio.",
    descricao:
      "Plataformas, painéis e sistemas sob medida — com login, banco de dados e tudo que sua operação precisa.",
  },
  {
    nome: "E-commerce & lojas",
    resumo: "Pronto pra vender.",
    descricao:
      "Lojas virtuais com pagamento integrado, gestão de produtos e checkout que não perde venda.",
  },
  {
    nome: "Landing pages de conversão",
    resumo: "Feitas pra converter.",
    descricao:
      "Páginas focadas em campanha: rápidas, persuasivas e otimizadas pra captar leads e fechar vendas.",
  },
  {
    nome: "Automações & robôs",
    resumo: "Menos trabalho manual.",
    descricao:
      "Bots, integrações e automação de processos que economizam horas — WhatsApp, planilhas, APIs e mais.",
  },
] as const;

export const DIFERENCIAIS = [
  {
    titulo: "Fullstack de verdade",
    texto: "Front, back, banco e deploy. Uma cabeça só do briefing ao ar — sem peça faltando.",
  },
  {
    titulo: "Você fala direto com o dev",
    texto: "Sem atravessador, sem telefone sem fio. Quem te atende é quem constrói.",
  },
  {
    titulo: "Stack moderna",
    texto: "Next.js, React, Node, MongoDB. Rápido, seguro e pronto pra escalar quando crescer.",
  },
  {
    titulo: "Do briefing ao suporte",
    texto: "A gente publica, acompanha e dá suporte. Seu projeto no ar e bem cuidado depois.",
  },
] as const;

export const PROCESSO = [
  { n: "01", titulo: "Briefing", texto: "Entendemos seu objetivo, escopo e prazo numa conversa rápida." },
  { n: "02", titulo: "Proposta", texto: "Você recebe escopo, prazo e valor sob medida — sem pegadinha." },
  { n: "03", titulo: "Desenvolvimento", texto: "Construímos em etapas e você acompanha a evolução." },
  { n: "04", titulo: "No ar & suporte", texto: "Publicamos, ajustamos e seguimos dando suporte." },
] as const;

export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind",
  "Express",
  "Vercel",
] as const;

export const FAQ = [
  {
    q: "Quanto custa um projeto?",
    a: "Cada projeto é orçado sob medida pelo escopo. Você pede um orçamento sem compromisso e recebe um valor fechado antes de começar.",
  },
  {
    q: "Quanto tempo leva pra ficar pronto?",
    a: "Depende do tamanho. Uma landing pode sair em poucos dias; um sistema, em algumas semanas. O prazo vem definido na proposta.",
  },
  {
    q: "Vocês dão manutenção depois?",
    a: "Sim. Oferecemos suporte e evolução contínua depois do lançamento — seu projeto não fica abandonado.",
  },
  {
    q: "De quem fica o código?",
    a: "Seu. Entregamos todo o código e os acessos, sem amarras nem dependência.",
  },
  {
    q: "Atende fora da minha cidade?",
    a: "Sim, trabalhamos 100% remoto. Toda a comunicação acontece online, do briefing à entrega.",
  },
] as const;
