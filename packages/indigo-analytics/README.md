# @indigoprotocol/indigo-analytics

Protocol Analytics skill for the [Indigo Protocol](https://indigoprotocol.io) on Cardano. Query TVL, protocol statistics, APR rewards, and DEX yield data.

## Tools

| Tool | Description |
|------|-------------|
| `get_tvl` | Get the total value locked in Indigo Protocol |
| `get_protocol_stats` | Get protocol-wide statistics and metrics |
| `get_apr_rewards` | Get APR reward rates across Indigo pools |
| `get_apr_by_key` | Get APR reward rate for a specific pool key |
| `get_dex_yields` | Get current DEX yield data for Indigo iAsset pairs |

## Sub-Skills

- **[TVL & Stats](sub-skills/tvl-stats.md)** — Total value locked and protocol statistics
- **[APR Rewards](sub-skills/apr-rewards.md)** — APR reward rates for pools
- **[DEX Yields](sub-skills/dex-yields.md)** — DEX yield data for iAsset pairs

## Setup

Requires the Indigo MCP server:

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

## References

- [MCP Tools Reference](references/mcp-tools.md) — full parameter and return type documentation
- [Analytics Concepts](references/concepts.md) — TVL, APR/APY, pool types

## License

MIT — 3rd Eye Labs
