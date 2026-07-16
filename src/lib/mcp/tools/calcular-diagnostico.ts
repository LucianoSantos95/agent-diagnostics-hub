import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { calcularResultado } from "../../../features/diagnostico/engine/recomendacao";

const P1 = z.enum([
  "Atendimento ao cliente — demoro para responder, perco gente no caminho",
  "Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade",
  "Operação interna — processo manual, retrabalho, tarefa repetitiva",
  "Financeiro — não sei prever caixa, cobrança de cliente é manual",
]);
const P2 = z.enum(["Só eu", "2 a 5 pessoas", "6 a 20 pessoas", "Mais de 20 pessoas"]);
const P3 = z.enum(["Menos de 10", "Entre 10 e 50", "Mais de 50"]);
const P5 = z.enum([
  "Não, seria minha primeira vez",
  "Sim, testei mas não deu certo",
  "Sim, uso algo hoje mas quero melhorar",
]);

export default defineTool({
  name: "calcular_diagnostico",
  title: "Calcular diagnóstico de agente de IA",
  description:
    "Roda o motor de recomendação do Focus Diagnóstico e retorna qual tipo de agente de IA (atendimento, vendas, operação ou financeiro) o negócio deve priorizar, com justificativa, ferramentas recomendadas e guia de implementação.",
  inputSchema: {
    gargalo_principal: P1.describe("Resposta da pergunta 1: onde está o maior gargalo do negócio."),
    tamanho_time: P2.describe("Resposta da pergunta 2: tamanho do time."),
    volume_contatos_dia: P3.describe("Resposta da pergunta 3: volume de contatos por dia."),
    tarefa_que_mais_consome: z
      .string()
      .min(1)
      .max(200)
      .describe("Resposta da pergunta 4: tarefa manual que mais consome tempo (texto livre)."),
    ja_tentou_automatizar: P5.describe("Resposta da pergunta 5: histórico de tentativas com automação."),
    meta_tres_meses: z
      .string()
      .max(300)
      .optional()
      .describe("Resposta da pergunta 6 (opcional): o que mudaria no dia a dia daqui a 3 meses se der certo."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const respostas: Record<number, string> = {
      1: input.gargalo_principal,
      2: input.tamanho_time,
      3: input.volume_contatos_dia,
      4: input.tarefa_que_mais_consome,
      5: input.ja_tentou_automatizar,
      6: input.meta_tres_meses ?? "",
    };
    const resultado = calcularResultado(respostas);
    return {
      content: [{ type: "text", text: JSON.stringify(resultado, null, 2) }],
      structuredContent: { resultado },
    };
  },
});
