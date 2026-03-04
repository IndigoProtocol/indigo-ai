# Redemption Queue

Query the aggregated redemption queue for Indigo Protocol iAssets.

## Tools

### get_redemption_queue

Get the aggregated redemption queue for a specific iAsset, sorted by max price ascending.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | `iUSD` \| `iBTC` \| `iETH` \| `iSOL` | Yes | The iAsset to query |

**Example prompt:** "Show me the iUSD redemption queue"

## Typical Workflows

1. **Assess redemption pressure** — Call `get_redemption_queue` for an asset to see total ADA queued and the price levels at which positions will be filled.
2. **Compare across assets** — Query the queue for each iAsset to identify which has the deepest or shallowest redemption demand.
