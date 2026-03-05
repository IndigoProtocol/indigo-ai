# @indigoprotocol/openclaw-indigo

OpenClaw plugin for the [Indigo Protocol](https://indigoprotocol.io) on Cardano. Brings Indigo Protocol functionality to Telegram, Discord, and Slack through the OpenClaw platform.

## Features

| Feature | Description |
|---------|-------------|
| MCP Integration | Indigo MCP server integration via OpenClaw |
| Chat Interfaces | Telegram, Discord, and Slack bot support |
| CDP Management | Create, adjust, and close CDPs from chat |
| Price Alerts | Configurable alerts for iAsset and INDY prices |
| Portfolio Tracking | Track wallet positions and get notifications |
| Staking | Manage INDY staking positions from chat |

## Architecture

```
src/
  index.ts          — Plugin entry point, config, and exports
  commands/         — Chat command handlers
    cdp.ts          — CDP management commands
    price.ts        — Price query commands
    staking.ts      — Staking commands
    portfolio.ts    — Portfolio and stats commands
  alerts/           — Notification alert definitions
    price-alerts.ts — Price threshold notifications
    cdp-alerts.ts   — CDP health notifications
    staking-alerts.ts — Staking and governance notifications
  formatters/       — Platform-specific message formatters
    cdp-formatter.ts       — CDP data formatting
    price-formatter.ts     — Price data formatting
    portfolio-formatter.ts — Portfolio summary formatting
```

## Commands

### CDP Management
- `/cdp list` — List your CDPs
- `/cdp open <asset> <collateral>` — Open a new CDP
- `/cdp deposit <address> <amount>` — Add collateral
- `/cdp withdraw <address> <amount>` — Withdraw collateral
- `/cdp close <address>` — Close a CDP
- `/cdp health [address]` — Check CDP health
- `/cdp mint <address> <amount>` — Mint iAssets
- `/cdp burn <address> <amount>` — Burn iAssets

### Prices
- `/price <asset>` — Get iAsset price
- `/price ada` — Get ADA price
- `/price indy` — Get INDY price
- `/price all` — Get all iAsset prices

### Staking
- `/stake info` — View staking overview and APR
- `/stake list` — List your staking positions
- `/stake open <amount>` — Open a new staking position
- `/stake adjust <address> <amount>` — Adjust position
- `/stake close <address>` — Close position

### Portfolio
- `/portfolio [address]` — Full portfolio summary
- `/balance [address]` — Check wallet balances
- `/tvl` — View protocol TVL
- `/stats` — View protocol statistics

## Alerts

Configure notifications for:
- **Price thresholds** — Alert when iAsset or INDY price crosses a threshold
- **Price changes** — Alert on significant percentage moves
- **iUSD depeg** — Alert when iUSD deviates from $1.00
- **CDP health** — Alert when collateral ratio drops
- **Liquidation risk** — Alert when CDP approaches liquidation
- **Staking rewards** — Alert on reward distributions
- **Governance** — Alert on new polls and ending votes

## Setup

1. Install the plugin in your OpenClaw instance
2. Configure the Indigo MCP server connection
3. Connect your Telegram, Discord, or Slack bot

```json
{
  "mcpServers": {
    "indigo": {
      "command": "npx",
      "args": ["@indigoprotocol/indigo-mcp"]
    }
  }
}
```

## Development

```bash
npm install
npm run build
```

## License

MIT — 3rd Eye Labs
