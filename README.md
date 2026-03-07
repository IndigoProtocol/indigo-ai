```
██╗███╗   ██╗██████╗ ██╗ ██████╗  ██████╗
██║████╗  ██║██╔══██╗██║██╔════╝ ██╔═══██╗
██║██╔██╗ ██║██║  ██║██║██║  ███╗██║   ██║
██║██║╚██╗██║██║  ██║██║██║   ██║██║   ██║
██║██║ ╚████║██████╔╝██║╚██████╔╝╚██████╔╝
╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚═════╝  ╚═════╝
███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝
```

# Indigo AI Skills

AI skills for the [Indigo Protocol](https://indigoprotocol.io) on Cardano — manage CDPs, stability pools, staking, and DeFi operations through AI agents.

## Quick Start

```bash
npx @indigoprotocol/indigo-skills

# Standard Agent Skills CLI
npx skills add IndigoProtocol/indigo-ai
```

## Packages

| Package | Description | Skills |
|---------|-------------|--------|
| [`@indigoprotocol/indigo-defi`](packages/plugins/indigo-defi) | DeFi operations — CDPs, stability pools, staking, redemptions | 4 skills, 37 MCP tools |
| [`@indigoprotocol/indigo-data`](packages/plugins/indigo-data) | Data & analytics — prices, TVL, governance, DEX, oracle, IPFS | 6 skills, 23 MCP tools |
| [`@indigoprotocol/openclaw-indigo`](packages/plugins/openclaw-indigo) | OpenClaw plugin — Telegram, Discord, Slack integration | commands, alerts, formatters |
| [`@indigoprotocol/indigo-skills`](packages/indigo-skills) | CLI installer — delegates to `npx skills add` | — |
| [`@indigoprotocol/shared`](packages/shared) | Shared utilities | — |

## Installation

### Agent Skills CLI

```bash
npx skills add IndigoProtocol/indigo-ai
```

### ClawHub

```bash
clawhub install indigo-cdp
```

### OpenClaw

```bash
openclaw plugins install @indigoprotocol/openclaw-indigo
```

### Manual MCP Setup

Add the Indigo MCP server to your agent configuration:

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

This works with Claude Code (`.claude/config.json`), Cursor (`.cursor/mcp.json`), Windsurf (`.windsurf/mcp.json`), and any MCP-compatible agent.

## Skills Overview

### indigo-defi

| Skill | Description | Key Tools |
|-------|-------------|-----------|
| [indigo-cdp](packages/plugins/indigo-defi/skills/indigo-cdp/SKILL.md) | CDP management — open, close, deposit, withdraw, mint, burn | `open_cdp`, `close_cdp`, `analyze_cdp_health`, `leverage_cdp` |
| [indigo-stability](packages/plugins/indigo-defi/skills/indigo-stability/SKILL.md) | Stability pool accounts | `create_sp_account`, `adjust_sp_account`, `close_sp_account` |
| [indigo-staking](packages/plugins/indigo-defi/skills/indigo-staking/SKILL.md) | INDY staking positions | `open_staking_position`, `adjust_staking_position`, `distribute_staking_rewards` |
| [indigo-redemption](packages/plugins/indigo-defi/skills/indigo-redemption/SKILL.md) | Redemption & LRP positions | `open_lrp`, `adjust_lrp`, `redeem_lrp`, `get_order_book` |

### indigo-data

| Skill | Description | Key Tools |
|-------|-------------|-----------|
| [indigo-assets](packages/plugins/indigo-data/skills/indigo-assets/SKILL.md) | iAsset and token prices | `get_assets`, `get_asset_price`, `get_ada_price`, `get_indy_price` |
| [indigo-analytics](packages/plugins/indigo-data/skills/indigo-analytics/SKILL.md) | TVL, APR, DEX yields | `get_tvl`, `get_protocol_stats`, `get_apr_rewards`, `get_dex_yields` |
| [indigo-governance](packages/plugins/indigo-data/skills/indigo-governance/SKILL.md) | Protocol params, polls, sync status | `get_protocol_params`, `get_polls`, `get_temperature_checks` |
| [indigo-dex](packages/plugins/indigo-data/skills/indigo-dex/SKILL.md) | SteelSwap, Iris pools, balances | `get_steelswap_estimate`, `get_iris_liquidity_pools` |
| [indigo-oracle](packages/plugins/indigo-data/skills/indigo-oracle/SKILL.md) | Interest oracle | `feed_interest_oracle`, `start_interest_oracle` |
| [indigo-ipfs](packages/plugins/indigo-data/skills/indigo-ipfs/SKILL.md) | IPFS storage and collector UTXOs | `store_on_ipfs`, `retrieve_from_ipfs`, `get_collector_utxos` |

## Workspace Structure

```
packages/
  plugins/
    indigo-defi/              # @indigoprotocol/indigo-defi
      CLAUDE.md               # Agent instructions (37 MCP tools)
      skills/
        indigo-cdp/
        indigo-stability/
        indigo-staking/
        indigo-redemption/
    indigo-data/              # @indigoprotocol/indigo-data
      CLAUDE.md               # Agent instructions (23 MCP tools)
      skills/
        indigo-assets/
        indigo-analytics/
        indigo-governance/
        indigo-dex/
        indigo-oracle/
        indigo-ipfs/
    openclaw-indigo/          # @indigoprotocol/openclaw-indigo
  indigo-skills/              # @indigoprotocol/indigo-skills (CLI installer)
  shared/                     # @indigoprotocol/shared
.claude-plugin/               # Claude plugin discovery manifest
marketplace.json              # skills.sh marketplace listing
```

## Links

- [Indigo Protocol](https://indigoprotocol.io)
- [Indigo MCP Server](https://github.com/IndigoProtocol/indigo-mcp)
- [Indigo Protocol Documentation](https://docs.indigoprotocol.io)

## License

MIT — Indigo Protocol