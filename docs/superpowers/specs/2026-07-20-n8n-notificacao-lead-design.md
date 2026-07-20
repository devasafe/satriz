# Notificação de lead em tempo real via n8n + Telegram

**Data:** 2026-07-20
**Status:** aprovado, em implementação

## Objetivo

Quando um lead é registrado no site (`POST /api/lead`), o dono do estúdio deve
receber uma mensagem no celular, em tempo real, com os dados do lead. O canal
escolhido é o Telegram, através de um workflow no n8n hospedado na VPS.

## Decisões

- **Canal: Telegram.** Gratuito, sem aprovação de template, sem risco de
  banimento do número. Bot `@SatrizStudio_bot` já criado e validado.
- **Gatilho: webhook a partir do site.** O `route.ts` dispara para o n8n logo
  após salvar o lead. Escolhido em vez de polling no Mongo por ser tempo real
  (~1s) e não exigir marcação de "já notificado" no banco.
- **Segurança: segredo compartilhado.** O webhook fica exposto na internet; um
  header `X-Satriz-Secret` é validado pelo primeiro nó do workflow para
  descartar requisições forjadas.

## Arquitetura

Três peças, cada uma com uma responsabilidade única:

| Peça | Responsabilidade |
|---|---|
| `lib/notify.ts` (novo) | Monta o payload do lead e faz o POST para o n8n. Não sabe nada de Telegram. |
| `app/api/lead/route.ts` (editar) | Chama `notificarLead()` depois de salvar, sem bloquear a resposta ao visitante. |
| `satriz-lead-telegram.json` (novo) | Workflow n8n: Webhook → IF (valida segredo) → formata → Telegram sendMessage. |

O site não conhece o Telegram. Trocar de canal (Discord, e-mail, etc.) muda só
o workflow do n8n; o código do satriz fica intacto.

## Fluxo de dados

```
visitante envia form
   ↓
POST /api/lead → Lead.create() no MongoDB
   ↓  (não aguarda)
notificarLead(lead) → POST webhook n8n
   body: { nome, contato, tipo, mensagem, origem, criadoEm }
   header: X-Satriz-Secret
   ↓
n8n: IF segredo confere → formata texto → Telegram sendMessage → push no celular
```

## Contrato do payload

```json
{
  "nome": "string",
  "contato": "string",
  "tipo": "string",
  "mensagem": "string",
  "origem": "orcamento | club | criador",
  "criadoEm": "ISO 8601"
}
```

## Tratamento de erros

Regra invariável: **falha de notificação nunca custa um lead.**

- `Lead.create()` acontece primeiro; a resposta HTTP não depende do webhook.
- `notificarLead()` é chamado sem `await` bloqueante — erros caem em
  `console.error` e a resposta ao visitante segue sendo `201`.
- Timeout curto (3s) via `AbortSignal` para não segurar recurso se o n8n travar.
- A fonte da verdade continua sendo o painel `/admin`. O Telegram é conveniência.

## Configuração (variáveis de ambiente do satriz)

```
N8N_LEAD_WEBHOOK_URL=https://<n8n-da-vps>/webhook/satriz-lead
N8N_LEAD_WEBHOOK_SECRET=<string aleatória longa>
```

Se `N8N_LEAD_WEBHOOK_URL` não estiver definida, `notificarLead()` vira no-op —
o site funciona normalmente sem a integração (útil em dev).

O token do bot e o `chat_id` ficam nas **credenciais do n8n**, nunca no JSON do
workflow nem no repositório.

## Testes

- `curl` no webhook do n8n com payload falso + segredo correto → valida o
  workflow isolado.
- `curl` no webhook com segredo errado → deve ser rejeitado.
- `curl` no `/api/lead` local → valida ponta a ponta.

## Segurança operacional

O token do bot foi exposto em texto durante a configuração. Após o setup,
revogar via `@BotFather` → `/revoke` e cadastrar o token novo apenas na
credencial do n8n.
