import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { calcularResultado, type Categoria } from "../../../features/diagnostico/engine/recomendacao";

const CATEGORIAS: Categoria[] = ["atendimento", "vendas", "operacao", "financeiro"];

// Mapa reverso mínimo para reusar o motor sem duplicar conteúdo
const GARGALO_POR_CATEGORIA: Record<Categoria, string> = {
  atendimento: "Atendimento ao cliente — demoro para responder, perco gente no caminho",
  vendas: "Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade",
  operacao: "Operação interna — processo manual, retrabalho, tarefa repetitiva",
  financeiro: "Financeiro — não sei prever caixa, cobrança de cliente é manual",
};

export default defineTool({
  name: "listar_ferramentas_por_categoria",
  title: "Listar ferramentas por categoria de agente",
  description:
    "Retorna as ferramentas recomendadas (nome, URL, descrição, plano) para uma categoria de agente de IA: atendimento, vendas, operação ou financeiro.",
  inputSchema: {
    categoria: z
      .enum(CATEGORIAS as [Categoria, ...Categoria[]])
      .describe("Categoria do agente de IA."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ categoria }) => {
    const resultado = calcularResultado({
      1: GARGALO_POR_CATEGORIA[categoria],
      2: "2 a 5 pessoas",
      3: "Entre 10 e 50",
      4: "tarefas repetitivas",
      5: "Não, nunca tentei",
    });
    const payload = {
      categoria,
      titulo: resultado.titulo,
      ferramentas: resultado.ferramentas,
      ondeEncontrar: resultado.ondeEncontrar,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
