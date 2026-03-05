# @indigoprotocol/indigo-governance

Governance & Params skill for the [Indigo Protocol](https://indigoprotocol.io) on Cardano. Query protocol parameters, governance polls, temperature checks, and chain sync status.

## Tools

| Tool | Description |
|------|-------------|
| `get_protocol_params` | Get current Indigo Protocol parameters |
| `get_temperature_checks` | Get active governance temperature checks |
| `get_polls` | Get governance polls and voting data |
| `get_sync_status` | Get the current chain synchronization status |

## Sub-Skills

- **[Protocol Params](sub-skills/protocol-params.md)** — Query protocol parameters
- **[Polls](sub-skills/polls.md)** — Temperature checks and governance polls
- **[Sync Status](sub-skills/sync-status.md)** — Chain synchronization status

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
- [Governance Concepts](references/concepts.md) — voting process, parameters, sync

## License

MIT — 3rd Eye Labs
