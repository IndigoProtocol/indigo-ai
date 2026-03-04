# Order Book

Query the LRP order book and historical redemption orders on Indigo Protocol.

## Tools

### get_order_book

Get open limited redemption positions from the order book.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | `iUSD` \| `iBTC` \| `iETH` \| `iSOL` | No | Filter by iAsset |
| `owners` | `string[]` | No | Filter by owner addresses |

**Example prompt:** "Show me all open LRP positions for iUSD"

### get_redemption_orders

Get redemption orders, optionally filtered by timestamp or price range.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `timestamp` | `number` | No | Unix timestamp in milliseconds |
| `in_range` | `boolean` | No | Filter by price range |

**Example prompt:** "Show me recent redemption orders"

## Typical Workflows

1. **Check LRP depth** — Call `get_order_book` with an asset to see available liquidity at each price level.
2. **Review order history** — Call `get_redemption_orders` to see past fills and timestamps.
