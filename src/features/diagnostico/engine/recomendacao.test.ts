import { describe, expect, it } from 'vitest';
import {
  calcularResultado,
  classificarPerfil,
  parseJaUsa,
  rotearSubFrente,
} from './recomendacao';

// Respostas válidas, nos textos exatos das opções do questionário.
const PERFIL_AUTONOMO = 'Autônomo ou freelancer — sou eu que faço e entrego';
const GARGALO_VENDAS = 'Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade';
const GARGALO_FINANCEIRO = 'Financeiro — não sei prever caixa, cobrança de cliente é manual';

describe('classificarPerfil', () => {
  it('mapeia cada opção do questionário pro perfil correspondente', () => {
    expect(classificarPerfil(PERFIL_AUTONOMO)).toBe('autonomo');
    expect(classificarPerfil('Consultor — presto serviço recorrente pra alguns clientes')).toBe('consultor');
    expect(classificarPerfil('Agência — tenho um time entregando pra vários clientes')).toBe('agencia');
    expect(classificarPerfil('Empresa com time — operação interna com funcionários')).toBe('empresa');
  });

  it('cai em "empresa" quando a resposta é desconhecida ou vazia', () => {
    expect(classificarPerfil('')).toBe('empresa');
    expect(classificarPerfil('qualquer coisa fora da lista')).toBe('empresa');
  });
});

describe('parseJaUsa', () => {
  it('separa a multi-seleção por ";" ou "|" e remove espaços', () => {
    expect(parseJaUsa('ChatGPT; Planilha | Make')).toEqual(['ChatGPT', 'Planilha', 'Make']);
  });

  it('descarta os marcadores de "não usa nada"', () => {
    expect(parseJaUsa('Nada ainda')).toEqual([]);
    expect(parseJaUsa('Primeira vez')).toEqual([]);
    expect(parseJaUsa('ChatGPT; Testei, mas não engatou')).toEqual(['ChatGPT']);
  });

  it('aceita vazio e undefined sem quebrar', () => {
    expect(parseJaUsa('')).toEqual([]);
    expect(parseJaUsa(undefined as unknown as string)).toEqual([]);
  });
});

describe('rotearSubFrente', () => {
  it('roteia o texto livre pelo primeiro sub-caso que casar', () => {
    expect(rotearSubFrente('atendimento', 'respondo muita DM no Instagram')).toEqual({
      id: 'instagram-dm',
      grupo: 'atendimento',
    });
    expect(rotearSubFrente('vendas', 'quero uma sequência de e-mail de nutrição')).toEqual({
      id: 'email-sequencia',
      grupo: null,
    });
    expect(rotearSubFrente('financeiro', 'preciso emitir nota fiscal todo mês')).toEqual({
      id: 'nota-fiscal',
      grupo: null,
    });
  });

  it('usa o último sub-caso de cada frente como padrão quando nada casa', () => {
    expect(rotearSubFrente('atendimento', 'xyz').id).toBe('whatsapp-faq');
    expect(rotearSubFrente('vendas', 'xyz').id).toBe('organizar-funil');
    expect(rotearSubFrente('operacao', 'xyz').id).toBe('automatizar');
    expect(rotearSubFrente('financeiro', 'xyz').id).toBe('cobranca');
  });

  it('trata texto ausente como "sem pista" (cai no padrão)', () => {
    expect(rotearSubFrente('vendas', undefined as unknown as string).id).toBe('organizar-funil');
  });
});

describe('calcularResultado', () => {
  const base = {
    1: PERFIL_AUTONOMO,
    2: GARGALO_VENDAS,
    3: 'Só eu',
    4: 'Menos de 10',
    5: 'esqueço de responder os leads que pedem proposta no whatsapp',
    6: 'quero fechar mais clientes por mês sem depender da memória',
    7: 'Planilha',
  };

  it('devolve o resultado completo pra respostas coerentes', () => {
    const r = calcularResultado(base);
    expect(r.categoria).toBe('vendas');
    expect(r.perfil).toBe('autonomo');
    expect(r.perfilLabel).toBe('autônomo / freelancer');
    expect(r.jaUsa).toEqual(['Planilha']);
    expect(r.perfilExperiencia).toBe('ja-usa');
    expect(r.metaTresMeses).toContain('fechar mais clientes');
    expect(['uma-ferramenta', 'ferramenta-mais-complemento', 'agente', 'validar']).toContain(r.forma);
    expect(r.ferramentas.length).toBeGreaterThan(0);
  });

  it('time mínimo + volume alto desloca a frente pra atendimento', () => {
    const r = calcularResultado({ ...base, 2: GARGALO_FINANCEIRO, 3: 'Só eu', 4: 'Mais de 50' });
    expect(r.categoria).toBe('atendimento');
  });

  it('não quebra com respostas vazias e assume os padrões', () => {
    const r = calcularResultado({});
    expect(r.categoria).toBe('atendimento');
    expect(r.perfil).toBe('empresa');
    expect(r.perfilExperiencia).toBe('iniciante');
    expect(r.jaUsa).toEqual([]);
  });

  it('marca quem já testou ferramentas e desistiu', () => {
    const r = calcularResultado({ ...base, 7: 'ChatGPT; Testei, mas não engatou' });
    expect(r.perfilExperiencia).toBe('testou-falhou');
    expect(r.avisoToolsGenericas).toBe(true);
    expect(r.jaUsa).toEqual(['ChatGPT']);
  });
});
