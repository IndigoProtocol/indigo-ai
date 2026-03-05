# @indigoprotocol/shared

Shared formatting utilities for Indigo Protocol plugins. Provides platform-specific format adapters and domain formatters for consistent output across Telegram, Discord, Slack, CLI, and plain text.

## Adapters

| Adapter | Platform | Description |
|---------|----------|-------------|
| `plainAdapter` | Plain text | No formatting, suitable for logs |
| `cliAdapter` | Terminal | ANSI color codes and box drawing |
| `telegramAdapter` | Telegram | Markdown V2 formatting |
| `discordAdapter` | Discord | Discord markdown with embeds |
| `slackAdapter` | Slack | Slack mrkdwn with Block Kit helpers |

## Formatters

| Formatter | Description |
|-----------|-------------|
| `formatCDP` / `formatCDPList` | CDP position display |
| `formatCDPHealth` | CDP health status with risk indicators |
| `formatStakingPosition` / `formatStakingList` | INDY staking positions |
| `formatStabilityAccount` / `formatStabilityList` | Stability pool accounts |
| `formatPrice` / `formatPriceList` | Asset prices with 24h change |
| `formatAPR` / `formatAPRList` | Pool APR rewards |
| `formatTVL` | Protocol TVL with breakdown |
| `formatError` | Error display with status icons |

## Usage

```typescript
import { discordAdapter, formatCDPHealth } from "@indigoprotocol/shared";

const output = formatCDPHealth(discordAdapter, {
  id: "42",
  owner: "addr1q...",
  asset: "iUSD",
  collateral: 5000,
  minted: 1000,
  ratio: 250,
  minRatio: 150,
  healthStatus: "healthy",
  liquidationPrice: 0.32,
  currentPrice: 0.45,
});
```

## License

MIT — Indigo Protocol
