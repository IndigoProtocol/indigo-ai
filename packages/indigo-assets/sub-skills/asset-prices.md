# Asset Prices

Query prices and details for Indigo Protocol iAssets: iUSD, iBTC, iETH, and iSOL.

## MCP Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_assets` | Get all iAssets with prices and interest data | None |
| `get_asset` | Get details for a specific iAsset | `asset` (iUSD, iBTC, iETH, iSOL) |
| `get_asset_price` | Get the current price for a specific iAsset | `asset` (iUSD, iBTC, iETH, iSOL) |

## Examples

### Get all iAsset prices

Use `get_assets` to retrieve a full list of all iAssets with their current prices and interest data.

### Get a specific iAsset price

Use `get_asset_price` with `asset: "iBTC"` to get the current iBTC price.

### Get detailed iAsset information

Use `get_asset` with `asset: "iUSD"` to get full details for iUSD including price and interest data.
