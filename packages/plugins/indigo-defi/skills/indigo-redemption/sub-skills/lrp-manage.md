# LRP Management

Open, cancel, adjust, claim, and redeem Limited Redemption Protocol positions on Indigo Protocol.

All write operations return an unsigned transaction (CBOR hex) for client-side signing.

## Tools

### open_lrp

Open a new LRP position with ADA and a max price limit.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | Yes | User Cardano bech32 address |
| `asset` | `iUSD` \| `iBTC` \| `iETH` \| `iSOL` | Yes | Target iAsset |
| `lovelacesAmount` | `string` | Yes | ADA amount in lovelace to deposit |
| `maxPrice` | `string` | Yes | Max price as an on-chain integer string |

**Example prompt:** "Open an LRP position for iUSD with 500 ADA at max price 1.05"

### cancel_lrp

Cancel an existing LRP position and reclaim deposited ADA.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | Yes | User Cardano bech32 address |
| `lrpTxHash` | `string` | Yes | Transaction hash of the LRP UTxO |
| `lrpOutputIndex` | `number` | Yes | Output index of the LRP UTxO |

**Example prompt:** "Cancel my LRP position"

### adjust_lrp

Adjust ADA amount in an LRP position (positive to increase, negative to decrease). Optionally update the max price.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | Yes | User Cardano bech32 address |
| `lrpTxHash` | `string` | Yes | Transaction hash of the LRP UTxO |
| `lrpOutputIndex` | `number` | Yes | Output index of the LRP UTxO |
| `lovelacesAdjustAmount` | `string` | Yes | Lovelace adjustment (positive to add, negative to remove) |
| `newMaxPrice` | `string` | No | New max price as on-chain integer string |

**Example prompt:** "Add 200 ADA to my LRP position and raise max price to 1.10"

### claim_lrp

Claim received iAssets from a filled or partially filled LRP position.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | Yes | User Cardano bech32 address |
| `lrpTxHash` | `string` | Yes | Transaction hash of the LRP UTxO |
| `lrpOutputIndex` | `number` | Yes | Output index of the LRP UTxO |

**Example prompt:** "Claim iAssets from my LRP position"

### redeem_lrp

Redeem iAssets against one or more LRP positions.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | Yes | User Cardano bech32 address |
| `redemptionLrps` | `array` | Yes | Array of LRP positions and amounts to redeem against |
| `priceOracleTxHash` | `string` | Yes | Transaction hash of the price oracle UTxO |
| `priceOracleOutputIndex` | `number` | Yes | Output index of the price oracle UTxO |
| `iassetTxHash` | `string` | Yes | Transaction hash of the iAsset UTxO |
| `iassetOutputIndex` | `number` | Yes | Output index of the iAsset UTxO |

Each entry in `redemptionLrps` contains:

| Field | Type | Description |
|-------|------|-------------|
| `txHash` | `string` | Transaction hash of the LRP UTxO |
| `outputIndex` | `number` | Output index of the LRP UTxO |
| `iAssetAmount` | `string` | Amount of iAssets to redeem against this LRP |

**Example prompt:** "Redeem 100 iUSD against the cheapest LRP positions"

## Typical Workflows

1. **Provide liquidity** — `open_lrp` to place a new order, then `claim_lrp` once filled.
2. **Manage position** — `adjust_lrp` to increase/decrease ADA or update price limit; `cancel_lrp` to exit entirely.
3. **Redeem iAssets** — Use `get_order_book` (Order Book sub-skill) to find positions, then `redeem_lrp` to execute.
