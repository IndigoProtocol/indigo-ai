# @indigoprotocol/openclaw-indigo

OpenClaw plugin for the [Indigo Protocol](https://indigoprotocol.io) on Cardano. Provides read-only tools and auto-reply commands for iAsset prices, CDPs, staking, stability pools, governance, and wallet balances.

## Architecture

The plugin exports a `register(api)` function that the OpenClaw gateway calls at load time. It registers 16 agent tools and 8 auto-reply commands, all hitting the Indigo indexer REST API directly via axios.

```
src/
  index.ts — register(api) entry point, tools, commands, service
```

Formatting uses `@indigoprotocol/shared` adapters and formatters with the `markdownAdapter` (OpenClaw renders markdown through its IR pipeline for all platforms).

## Configuration

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `indexerUrl` | string | `https://analytics.indigoprotocol.io/api/v1` | Indigo indexer REST API base URL |
| `walletAddress` | string | — | Default Cardano wallet address for `/balance` and `/cdps` |

## Agent Tools

| Tool | Description |
|------|-------------|
| `indigo_assets` | List all iAssets with prices |
| `indigo_asset_price` | Get a specific iAsset price |
| `indigo_ada_price` | Get current ADA price |
| `indigo_indy_price` | Get current INDY price |
| `indigo_tvl` | Protocol total value locked |
| `indigo_protocol_stats` | Protocol stats (TVL, assets, CDPs) |
| `indigo_apr_rewards` | Current APR rewards |
| `indigo_dex_yields` | DEX yield farming opportunities |
| `indigo_cdps` | List CDPs (filter by owner/asset) |
| `indigo_cdp_health` | Analyze CDP health for an owner |
| `indigo_stability_pools` | Stability pool info |
| `indigo_staking_info` | Staking overview |
| `indigo_staking_positions` | List staking positions |
| `indigo_polls` | Governance polls |
| `indigo_wallet_balances` | Wallet token balances |
| `indigo_order_book` | Redemption order book |

## Commands

| Command | Description |
|---------|-------------|
| `/price <asset>` | Single asset price (ADA, INDY, or any iAsset) |
| `/prices` | All iAsset prices |
| `/tvl` | Protocol TVL |
| `/balance [addr]` | Wallet balances (falls back to config wallet) |
| `/cdps [owner]` | List CDPs (falls back to config wallet) |
| `/staking` | Staking overview |
| `/pools` | Stability pools |
| `/polls` | Governance polls |

## Setup

```bash
openclaw plugin install @indigoprotocol/openclaw-indigo
openclaw gateway restart
```

## Development

```bash
npm install
npm run typecheck
```

## License

MIT — Indigo Protocol
