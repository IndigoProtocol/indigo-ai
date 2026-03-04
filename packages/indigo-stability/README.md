# @indigoprotocol/indigo-stability

Stability Pool skill for the Indigo Protocol on Cardano.

## MCP Tools

| Tool | Description |
|------|-------------|
| `get_stability_pools` | List all stability pools |
| `get_stability_pool_accounts` | List pool accounts |
| `get_sp_account_by_owner` | Account by owner |
| `create_sp_account` | Create pool account |
| `adjust_sp_account` | Adjust deposit |
| `close_sp_account` | Close account |
| `process_sp_request` | Process pending request |
| `annul_sp_request` | Cancel pending request |

## Sub-skills

- **Pool Queries** — pool state, accounts, owner lookup
- **Pool Management** — create, adjust, close accounts
- **Request Processing** — process and cancel requests

## References

- [MCP Tools Reference](references/mcp-tools.md) — full parameter and return type documentation
- [Stability Pool Concepts](references/concepts.md) — pool mechanics, rewards, pending requests

## License

MIT
