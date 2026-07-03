import { defineMcp } from "@lovable.dev/mcp-js";
import calcularDiagnosticoTool from "./tools/calcular-diagnostico";
import listarFerramentasTool from "./tools/listar-ferramentas";

export default defineMcp({
  name: "focus-diagnostico-mcp",
  title: "Focus Diagnóstico — Agentes de IA",
  version: "0.1.0",
  instructions:
    "Ferramentas do Focus Diagnóstico. Use `calcular_diagnostico` para descobrir qual tipo de agente de IA (atendimento, vendas, operação ou financeiro) um negócio deve priorizar, dadas as 5 respostas do diagnóstico. Use `listar_ferramentas_por_categoria` para obter ferramentas recomendadas em uma categoria específica.",
  tools: [calcularDiagnosticoTool, listarFerramentasTool],
});
