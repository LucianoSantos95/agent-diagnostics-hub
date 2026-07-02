## Ajustes planejados

**1. FAQ com accordion (`ConteudoSEO.tsx`)**
Transformar cada pergunta em botão clicável. Só a pergunta ativa mostra a resposta (com animação de expandir). Ícone `+`/`−` à direita.

**2. Bloco "Sobre a Focus" (`ConteudoSEO.tsx`)**
Reescrever com base em focusinteligente.com.br — foco em *arquitetura de operação*, não no diagnóstico:

> **Focus Inteligente** desenha operações que trazem clareza, precisão e eficiência ao modo como sua empresa funciona — do mapeamento de processos aos agentes de IA sob medida. Como Lovable Partner oficial, a Focus combina auditoria de fluxos, arquitetura de automação e agentes customizados para eliminar trabalho manual em PMEs e agências. Mais de 50 empresas já operam com Focus.

Trocar título "Um produto da Focus Indica" → **"Sobre a Focus Inteligente"**. Link mantido.

**3. Rodapé (`Footer.tsx`)**
Remover a `<img>` do logo. Deixar apenas: `Um produto criado pela **Focus**` (Montserrat Alternates, mesmo tamanho da frase). Link segue apontando para focusinteligente.com.br.

**4. Depoimentos fictícios realistas (`CaseRealDialog.tsx`)**
Substituir os 3 placeholders `[EDITAR — …]` por depoimentos fictícios com tom natural (sem exagero, sem números redondos, sem "revolucionou"). Exemplo de tom:

- *Marina R. — Sócia, contabilidade em Curitiba* — "Achei que precisava de um chatbot, mas o diagnóstico mostrou que meu gargalo era cobrança. Implementamos o agente financeiro primeiro e reduzimos as inadimplências no segundo mês."
- *Rafael T. — Diretor comercial, distribuidora* — "O relatório foi direto ao ponto. Em vez de gastar com uma ferramenta que a equipe não usaria, começamos pelo follow-up automático — que era o que realmente estava travando as vendas."
- *Camila S. — Fundadora, agência de marketing* — "Gostei que não tentou vender nada no fim. As recomendações fizeram sentido pro tamanho da agência, e o passo a passo ajudou a saber por onde começar sem contratar consultoria."

Estrelas mantidas (5), avatar com iniciais.

**5. Teste de envio de e-mail**
A infraestrutura de e-mail ainda não está configurada neste projeto. Para conseguir testar o envio do PDF preciso que você configure o domínio de envio primeiro (uso o subdomínio `notify.focusinteligente.com.br` delegado por NS). Depois disso eu:

1. Rodo o setup da infra de e-mail (fila + cron + tabelas).
2. Scaffold do `send-transactional-email` + template React Email `diagnostico-resultado` com identidade Focus.
3. Ajusto a edge function `enviar-diagnostico` para usar esse template.
4. Faço deploy e disparo um envio de teste real para o e-mail que você me passar.

<presentation-actions>
<presentation-open-email-setup>Configurar domínio de e-mail</presentation-open-email-setup>
</presentation-actions>

Sem esse passo o PDF continua sendo gerado e salvo, mas o e-mail não sai da fila.

## Fora de escopo
Não mexo em cores, animação de fundo, header ou fluxo do diagnóstico.
