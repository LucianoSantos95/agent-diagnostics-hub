import type { Categoria, Forma, Perfil } from '../engine/recomendacao';

export type { Perfil, Forma };
export { PERFIL_LABEL } from '../engine/recomendacao';

export interface PassoPlaybook {
  /** Frase curta de ação — vira título do passo. */
  titulo: string;
  /** Detalhe do passo. Pode ter linhas separadas por \n; linhas com "- " viram sub-bullets. */
  detalhe: string;
}

export interface FerramentaPlaybook {
  id: string;
  nome: string;
  url: string;
  categorias: Categoria[];
  /** Perfis pra quem essa é uma boa primeira escolha (usado no ranqueamento). */
  perfis: Perfil[];
  oQueResolve: string;
  /** 1 = qualquer pessoa monta · 2 = exige atenção · 3 = precisa de mão técnica. */
  dificuldade: 1 | 2 | 3;
  tempoSetup: string;
  /** Faixa de preço real e honesta, em texto. */
  precoBRL: string;
  precisaCartao: boolean;
  requisitos: string[];
  passos: PassoPlaybook[];
  /** Como validar que funcionou. */
  primeiroTeste: string;
  /** Erros comuns nesse setup específico. */
  erros: string[];
}

export interface IntegracaoPlaybook {
  id: string;
  titulo: string;
  /** id de ferramenta OU rótulo livre (ex.: "WhatsApp", "Planilha"). */
  de: string;
  para: string;
  via: 'api' | 'mcp' | 'make' | 'zapier' | 'n8n' | 'nativo';
  categorias: Categoria[];
  quando: string;
  precisaChaveApi: boolean;
  passos: PassoPlaybook[];
  /** O que passa a acontecer sozinho depois de pronto. */
  resultado: string;
}

export interface Playbook {
  geradoEm: string;
  forma: Forma;
  perfil: Perfil;
  categoria: Categoria;
  /** Título do documento (ex.: "Agente de Atendimento"). */
  tituloResultado: string;
  /** Headline da tela, direto e ciente da forma. */
  headline: string;
  /** 1 frase de porquê, abaixo do headline. */
  subheadline: string;
  /** Quando forma = 'ferramenta-mais-complemento': o que ligar. Vazio nas outras. */
  complementoLabel: string;
  /** 2–3 bullets curtos na tela — o passo a passo completo fica no PDF. */
  resumoBullets: string[];
  /** Parágrafo de abertura do PDF, ciente do perfil. */
  resumo: string;
  /** O que o usuário marcou que já usa (rótulos legíveis). */
  jaUsa: string[];
  pontoDePartida: FerramentaPlaybook;
  /** Preenchido só quando a forma justifica mostrar alternativas. */
  alternativas: FerramentaPlaybook[];
  /** 0 (uma-ferramenta / agente / validar) ou 1 (ferramenta-mais-complemento). */
  integracoes: IntegracaoPlaybook[];
  quandoEvoluir: string[];
  checklist: string[];
  notaFerramentasGerais: string;
}
