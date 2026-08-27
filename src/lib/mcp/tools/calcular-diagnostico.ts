import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { calcularResultado } from "../../../features/diagnostico/engine/recomendacao";

const PERFIL = z.enum([
  "Autônomo ou freelancer — sou eu que faço e entrego",
  "Consultor — presto serviço recorrente pra alguns clientes",
  "Agência — tenho um time entregando pra vários clientes",
  "Empresa com time — operação interna com funcionários",
]);
const P1 = z.enum([
  "Atendimento ao cliente — demoro para responder, perco gente no caminho",
  "Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade",
  "Operação interna — processo manual, retrabalho, tarefa repetitiva",
  "Financeiro — não sei prever caixa, cobrança de cliente é manual",
]);
const P2 = z.enum(["Só eu", "2 a 5 pessoas", "6 a 20 pessoas", "Mais de 20 pessoas"]);
const P3 = z.enum(["Menos de 10", "Entre 10 e 50", "Mais de 50"]);

export default defineTool({
  name: "calcular_diagnostico",
  title: "Calcular diagnóstico de agente de IA",
  description:
    "Roda o motor de recomendação do Focus Diagnóstico e retorna qual frente de IA (atendimento, vendas, operação ou financeiro) o negócio deve priorizar, com justificativa, ferramentas recomendadas, guia de implementação e um playbook.",
  inputSchema: {
    perfil: PERFIL.describe("Resposta da pergunta 1: como a pessoa trabalha."),
    gargalo_principal: P1.describe("Resposta da pergunta 2: onde está o maior gargalo do negócio."),
    tamanho_time: P2.describe("Resposta da pergunta 3: tamanho da operação."),
    volume_contatos_dia: P3.describe("Resposta da pergunta 4: volume de contatos por dia."),
    tarefa_que_mais_consome: z
      .string()
      .min(1)
      .max(200)
      .describe("Resposta da pergunta 5: tarefa manual que mais consome tempo (texto livre)."),
    meta_tres_meses: z
      .string()
      .max(300)
      .optional()
      .describe("Resposta da pergunta 6 (opcional): o que mudaria no dia a dia daqui a 3 meses se der certo."),
    ja_usa: z
      .string()
      .max(400)
      .optional()
      .describe(
        "Resposta da pergunta 7 (opcional): o que a pessoa já usa hoje, separado por ponto e vírgula (ex.: 'ChatGPT no dia a dia; Um CRM'). Use 'Nada ainda' se for a primeira vez.",
      ),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const respostas: Record<number, string> = {
      1: input.perfil,
      2: input.gargalo_principal,
      3: input.tamanho_time,
      4: input.volume_contatos_dia,
      5: input.tarefa_que_mais_consome,
      6: input.meta_tres_meses ?? "",
      7: input.ja_usa ?? "",
    };
    const resultado = calcularResultado(respostas);
    return {
      content: [{ type: "text", text: JSON.stringify(resultado, null, 2) }],
      structuredContent: { resultado },
    };
  },
});
