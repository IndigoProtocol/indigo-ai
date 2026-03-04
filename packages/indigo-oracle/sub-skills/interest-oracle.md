# Interest Oracle

Feed data to and start the Indigo Protocol interest oracle.

## Tools

### feed_interest_oracle

Feed a new interest rate to the interest oracle for a specific iAsset. Returns an unsigned transaction (CBOR hex) for client-side signing. Only callable by the oracle operator.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Oracle operator Cardano bech32 address |
| `asset` | enum | Yes | iAsset name: iUSD, iBTC, iETH, or iSOL |
| `newInterestRate` | string | Yes | New interest rate as bigint string |
| `biasTime` | string | Yes | Oracle bias time in milliseconds as bigint string |
| `owner` | string | Yes | Oracle operator pub key hash (hex) |

### start_interest_oracle

Initialize a new interest oracle (one-time admin setup). Returns an unsigned transaction (CBOR hex) and the minted oracle asset class. Only callable by protocol administrators.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Admin Cardano bech32 address |
| `initialUnitaryInterest` | string | Yes | Initial unitary interest as bigint string |
| `initialInterestRate` | string | Yes | Initial interest rate as bigint string |
| `initialLastInterestUpdate` | string | Yes | Initial last interest update timestamp (milliseconds) as bigint string |
| `biasTime` | string | Yes | Oracle bias time in milliseconds as bigint string |
| `owner` | string | Yes | Oracle operator pub key hash (hex) |

## Typical Workflow

1. **Initialize** (one-time): Use `start_interest_oracle` to create a new interest oracle for an iAsset.
2. **Feed rates**: Use `feed_interest_oracle` periodically to update the interest rate with fresh data.
3. **Sign and submit**: Each tool returns an unsigned transaction — sign it with the operator wallet and submit to the Cardano network.