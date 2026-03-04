# @indigoprotocol/indigo-redemption

Redemption and LRP (Limited Redemption Protocol) skill package for Indigo Protocol on Cardano.

## Tools

| Tool | Description |
|------|-------------|
| `get_order_book` | Query open LRP positions, filterable by asset or owner |
| `get_redemption_orders` | Retrieve redemption orders with optional timestamp/price filters |
| `get_redemption_queue` | Aggregated redemption queue per iAsset, sorted by max price |
| `open_lrp` | Open a new LRP position with ADA deposit and price limit |
| `cancel_lrp` | Cancel an LRP position and reclaim ADA |
| `adjust_lrp` | Adjust ADA amount or max price on an existing LRP position |
| `claim_lrp` | Claim received iAssets from a filled LRP position |
| `redeem_lrp` | Redeem iAssets against LRP positions |

## Sub-skills

| Sub-skill | File | Description |
|-----------|------|-------------|
| Order Book | [sub-skills/order-book.md](sub-skills/order-book.md) | LRP order book and redemption order queries |
| Redemption Queue | [sub-skills/redemption-queue.md](sub-skills/redemption-queue.md) | Aggregated queue data per iAsset |
| LRP Management | [sub-skills/lrp-manage.md](sub-skills/lrp-manage.md) | Open, cancel, adjust, claim, and redeem LRP positions |

## Installation

```bash
npm install @indigoprotocol/indigo-redemption
```

## Prerequisites

- Node.js 20+
- `@indigoprotocol/indigo-mcp` server running

## License

MIT
