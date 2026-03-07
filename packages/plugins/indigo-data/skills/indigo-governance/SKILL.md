---
name: indigo-governance
description: "Query Indigo Protocol governance data including protocol parameters, polls, and sync status."
allowed-tools: Read, Glob, Grep
license: MIT
metadata:
  author: indigoprotocol
  version: '0.1.0'
---

# Governance & Params

Query Indigo Protocol governance data including protocol parameters, temperature checks, polls, and chain sync status.

## MCP Tools

| Tool | Description |
|------|-------------|
| `get_protocol_params` | Get current Indigo Protocol parameters |
| `get_temperature_checks` | Get active governance temperature checks |
| `get_polls` | Get governance polls and voting data |
| `get_sync_status` | Get the current chain synchronization status |

## Sub-Skills

- [Protocol Params](sub-skills/protocol-params.md) — Query protocol parameters
- [Polls](sub-skills/polls.md) — Temperature checks and governance polls
- [Sync Status](sub-skills/sync-status.md) — Chain synchronization status

## References

- [MCP Tools Reference](references/mcp-tools.md) — Detailed tool parameters and return types
- [Governance Concepts](references/concepts.md) — Voting process, protocol parameters, and sync status
