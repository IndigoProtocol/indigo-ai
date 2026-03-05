# @indigoprotocol/indigo-dex

DEX Integration skill for the [Indigo Protocol](https://indigoprotocol.io) on Cardano. Query tokens, get swap estimates via SteelSwap, explore Iris liquidity pools, and check wallet balances.

## Tools

| Tool | Description |
|------|-------------|
| `get_steelswap_tokens` | List all tokens available for swapping on SteelSwap |
| `get_steelswap_estimate` | Get a swap estimate for a token pair on SteelSwap |
| `get_iris_liquidity_pools` | Retrieve liquidity pool data from Iris |
| `get_blockfrost_balances` | Get wallet token balances via Blockfrost |

## Sub-Skills

- **[SteelSwap](sub-skills/steelswap.md)** — Token listing and swap estimates
- **[Iris Pools](sub-skills/iris-pools.md)** — Liquidity pool data from Iris
- **[Balances](sub-skills/balances.md)** — Wallet balances via Blockfrost

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
- [DEX Concepts](references/concepts.md) — SteelSwap, Iris, Blockfrost, swap routing

## License

MIT — Indigo Protocol
