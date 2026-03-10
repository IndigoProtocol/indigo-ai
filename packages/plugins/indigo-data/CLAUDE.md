# Indigo Data Skills

Agent instructions for querying Indigo Protocol data on Cardano. All tools are read-only.

## MCP Server

All tools require the `@indigoprotocol/indigo-mcp` server. Start it with:

```bash
npx @indigoprotocol/indigo-mcp
```

## Available Tools (23)

### Asset Prices (5 tools)

| Tool | Description |
|------|-------------|
| `get_assets` | Get all Indigo iAssets with prices and interest data |
| `get_asset` | Get details for a specific iAsset (iUSD, iBTC, iETH, iSOL) |
| `get_asset_price` | Get the current price for a specific iAsset |
| `get_ada_price` | Get the current ADA price in USD |
| `get_indy_price` | Get the current INDY token price in ADA and USD |

### Protocol Analytics (5 tools)

| Tool | Description |
|------|-------------|
| `get_tvl` | Get the total value locked in Indigo Protocol |
| `get_protocol_stats` | Get protocol-wide statistics and metrics |
| `get_apr_rewards` | Get APR reward rates across Indigo pools |
| `get_apr_by_key` | Get APR reward rate for a specific pool key |
| `get_dex_yields` | Get current DEX yield data for Indigo iAsset pairs |

### Governance (4 tools)

| Tool | Description |
|------|-------------|
| `get_protocol_params` | Get current Indigo Protocol parameters |
| `get_temperature_checks` | Get active governance temperature checks |
| `get_polls` | Get governance polls and voting data |

### DEX Integration (4 tools)

| Tool | Description |
|------|-------------|
| `get_steelswap_tokens` | List tokens available for swapping on SteelSwap |
| `get_steelswap_estimate` | Get a swap estimate for a token pair on SteelSwap |
| `get_iris_liquidity_pools` | Retrieve liquidity pool data from Iris |
| `get_blockfrost_balances` | Get wallet token balances via Blockfrost |

### Oracle (2 tools)

| Tool | Description |
|------|-------------|

### IPFS & Collector (3 tools)

| Tool | Description |
|------|-------------|
| `store_on_ipfs` | Store text content on IPFS |
| `retrieve_from_ipfs` | Retrieve content from IPFS by CID |
| `get_collector_utxos` | Get collector UTXOs for fee distribution |

## Skills

- `skills/indigo-assets/SKILL.md` — iAsset prices and data
- `skills/indigo-analytics/SKILL.md` — TVL, stats, APR, DEX yields
- `skills/indigo-governance/SKILL.md` — Protocol params, polls, sync status
- `skills/indigo-dex/SKILL.md` — SteelSwap, Iris pools, wallet balances
- `skills/indigo-ipfs/SKILL.md` — IPFS storage and collector UTXOs

## Important Notes

- Most tools in this package are read-only queries and do not require wallet signing.
- `store_on_ipfs` writes data to IPFS but does not require a Cardano transaction.
