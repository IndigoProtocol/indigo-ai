# @indigoprotocol/indigo-staking

INDY Staking skill for the [Indigo Protocol](https://indigoprotocol.io) on Cardano. Query staking info, browse positions, and manage INDY staking.

## Tools

| Tool | Description |
|------|-------------|
| `get_staking_info` | Get general INDY staking information and parameters |
| `get_staking_positions` | Get all active staking positions |
| `get_staking_positions_by_owner` | Get staking positions for a specific owner |
| `get_staking_position_by_address` | Get a staking position by its address |
| `open_staking_position` | Open a new INDY staking position |
| `adjust_staking_position` | Adjust an existing staking position |
| `close_staking_position` | Close an existing staking position |
| `distribute_staking_rewards` | Distribute pending staking rewards |

## Sub-Skills

- **[Staking Queries](sub-skills/staking-query.md)** — Query staking info and browse positions
- **[Staking Management](sub-skills/staking-manage.md)** — Open, adjust, and close staking positions
- **[Staking Rewards](sub-skills/staking-rewards.md)** — Distribute pending staking rewards

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

## License

MIT — 3rd Eye Labs
