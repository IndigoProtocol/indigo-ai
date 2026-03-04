# Indigo Redemption & LRP

Skill for managing redemptions and Limited Redemption Protocol (LRP) positions on Indigo Protocol.

## Prerequisites

- Node.js 20+
- `@indigoprotocol/indigo-mcp` server running

## MCP Server

```bash
npx @indigoprotocol/indigo-mcp
```

## Tools

| Tool | Description |
|------|-------------|
| `get_order_book` | Get open LRP positions from the order book, optionally filtered by asset or owners |
| `get_redemption_orders` | Get redemption orders, optionally filtered by timestamp or price range |
| `get_redemption_queue` | Get aggregated redemption queue for a specific iAsset, sorted by max price ascending |
| `open_lrp` | Open a new LRP position with ADA and a max price limit |
| `cancel_lrp` | Cancel an existing LRP position |
| `adjust_lrp` | Adjust ADA amount in an LRP position; optionally update max price |
| `claim_lrp` | Claim received iAssets from an LRP position |
| `redeem_lrp` | Redeem iAssets against one or more LRP positions |

## Sub-skills

- [Order Book](sub-skills/order-book.md) — Query LRP order book and redemption orders
- [Redemption Queue](sub-skills/redemption-queue.md) — Aggregated redemption queue per iAsset
- [LRP Management](sub-skills/lrp-manage.md) — Open, cancel, adjust, claim, and redeem LRP positions
