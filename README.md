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
```

Or install specific skills:

```bash
npx @indigoprotocol/indigo-skills --skill cdp-management
npx @indigoprotocol/indigo-skills --all
```

## Installation

### Via CLI Installer

```bash
# Interactive selection
npx @indigoprotocol/indigo-skills

# Install all skills
npx @indigoprotocol/indigo-skills --all

# Target specific agent
npx @indigoprotocol/indigo-skills --agent cursor
```

### Manual Setup

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

## Agent Configuration

Configuration templates for popular AI coding agents are available in the `templates/` directory.

### Claude Code

Add to your `.claude/config.json`:

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

### Cursor

Add to your `.cursor/mcp.json`:

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

### Windsurf

Add to your `.windsurf/mcp.json`:

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

### OpenClaw

See `templates/openclaw/SKILL.md` for the skill definition file.

## Skills Overview

| Skill | Description | MCP Tools |
|-------|-------------|-----------|
| CDP Management | Open, close, deposit, withdraw, mint, burn CDPs | `open_cdp`, `close_cdp`, `deposit_cdp`, `withdraw_cdp`, `mint_cdp`, `burn_cdp` |
| Stability Pools | Manage stability pool accounts | `create_sp_account`, `adjust_sp_account`, `close_sp_account` |
| Staking | INDY staking positions | `open_staking_position`, `adjust_staking_position`, `close_staking_position` |
| Price Feeds | Asset prices and protocol stats | `get_asset_price`, `get_ada_price`, `get_indy_price` |
| DEX Integration | Token swaps via SteelSwap | `get_steelswap_tokens`, `get_steelswap_estimate` |
| Governance | Temperature checks and polls | `get_temperature_checks`, `get_polls` |

## Workspace Structure

```
packages/           # npm workspace packages
  indigo-skills/    # CLI installer
templates/          # Agent configuration templates
.claude-plugin/     # Claude plugin discovery manifest
.github/workflows/  # CI/CD pipelines
marketplace.json    # skills.sh marketplace listing
```

## Links

- [Indigo Protocol](https://indigoprotocol.io)
- [Indigo MCP Server](https://github.com/IndigoProtocol/indigo-mcp)
- [Indigo Protocol Documentation](https://docs.indigoprotocol.io)

## License

MIT — Indigo Protocol
