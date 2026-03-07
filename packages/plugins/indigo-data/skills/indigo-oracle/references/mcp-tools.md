# Oracle MCP Tools Reference

Detailed reference for all oracle MCP tools. These tools are restricted to designated oracle operators and protocol administrators.

## feed_interest_oracle

Feed a new interest rate to the interest oracle for a specific iAsset.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `string` | Yes | Oracle operator Cardano bech32 address |
| `asset` | `"iUSD" \| "iBTC" \| "iETH" \| "iSOL"` | Yes | Target iAsset |
| `newInterestRate` | `string` | Yes | New interest rate as bigint string (e.g., "50000000" for 5%) |
| `biasTime` | `string` | Yes | Oracle bias time in milliseconds as bigint string |
| `owner` | `string` | Yes | Oracle operator public key hash (hex) |

**Returns:** `{ tx: string }` — unsigned CBOR transaction hex for operator signing.

**Access:** Oracle operator only.

---

## start_interest_oracle

Initialize a new interest oracle for an iAsset. One-time admin setup.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `string` | Yes | Admin Cardano bech32 address |
| `initialUnitaryInterest` | `string` | Yes | Initial unitary interest as bigint string |
| `initialInterestRate` | `string` | Yes | Initial interest rate as bigint string |
| `initialLastInterestUpdate` | `string` | Yes | Initial timestamp (ms) as bigint string |
| `biasTime` | `string` | Yes | Oracle bias time (ms) as bigint string |
| `owner` | `string` | Yes | Oracle operator public key hash (hex) |

**Returns:** `{ tx: string, oracleAssetClass: string }` — unsigned transaction and the minted oracle NFT identifier.

**Access:** Protocol administrator only.
