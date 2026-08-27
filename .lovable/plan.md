# Teste de fluência com 5 perfis de usuário

Rodar o funil completo do diagnóstico no navegador (preview local), como 5 usuários diferentes, e reportar onde o fluxo trava, confunde ou entrega recomendação incoerente.

## Perfis a testar

1. Autônomo · gargalo atendimento · só eu · menos de 10 contatos/dia · nunca usou nada
2. Consultor · gargalo vendas · 2 a 5 pessoas · 10 a 50 · já usa CRM
3. Empresa com time · operação interna · 6 a 20 pessoas · 10 a 50 · planilhas + ChatGPT
4. Agência · financeiro · mais de 20 pessoas · mais de 50 · ferramenta de cobrança
5. Autônomo · respostas conflitantes (gargalo financeiro, tarefa descrita é atendimento) · "já testei IA e não engatou" — caso de baixa confiança

## O que será verificado em cada rodada

- Abertura → perguntas: avanço automático na múltipla escolha, botão Voltar, barra de progresso
- Perguntas 5 e 6 (texto livre): limite de 140 caracteres, contador, validação de vazio
- Pergunta 7 multi-seleção: opção exclusiva "Nada ainda" zerando as demais
- Tela de análise → resultado: tempo, ausência de tela branca
- Resultado: coerência da recomendação com as respostas, nível de confiança (só citar "Agente de X" quando alta), meta em 3 meses, blocos de ferramentas
- Captura de e-mail → caixa de feedback aparecendo logo depois
- Erros de console e requisições com falha em cada etapa

## Entrega

Relatório em chat com: o que cada perfil recebeu como recomendação, screenshots dos pontos críticos, e lista priorizada de problemas de fluência encontrados (bloqueante / atrito / cosmético). Nenhuma alteração de código nesta rodada — as correções entram em um plano seguinte, após você escolher o que corrigir.

## Notas técnicas

- Execução via Playwright headless contra `http://localhost:8080`, viewport 1280x1800.
- E-mails de teste usam endereços descartáveis (`teste+perfilN@exemplo.com`); isso grava linhas reais nas tabelas de sessões/respostas/leads e pode enfileirar e-mails. Se preferir, posso usar apenas 1 e-mail real e pular a captura nos outros 4.
