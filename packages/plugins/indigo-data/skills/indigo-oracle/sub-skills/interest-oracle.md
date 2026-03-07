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

## Examples

### Feed a new interest rate for iUSD

Update the iUSD interest oracle with a new rate as part of regular oracle operation.

**Prompt:** "Feed a new interest rate of 5% for iUSD"

**Workflow:**
1. Calculate the on-chain rate representation (5% = "50000000" in protocol units)
2. Call `feed_interest_oracle({ address: "addr1qx...oracle", asset: "iUSD", newInterestRate: "50000000", biasTime: "120000", owner: "abc123...pubkeyhash" })`
3. Returns unsigned transaction CBOR for the oracle operator to sign
4. Sign and submit the transaction to update the on-chain rate

**Sample response:**
```
Interest rate update ready.
Asset: iUSD
New rate: 5.0%
Bias time: 120s
Transaction ready for signing by oracle operator.
```

### Initialize a new interest oracle for iSOL

One-time setup to create the interest oracle for a new iAsset.

**Prompt:** "Initialize the interest oracle for iSOL"

**Workflow:**
1. Call `start_interest_oracle({ address: "addr1qx...admin", initialUnitaryInterest: "1000000000000", initialInterestRate: "30000000", initialLastInterestUpdate: "1709654400000", biasTime: "120000", owner: "abc123...pubkeyhash" })`
2. Returns unsigned transaction CBOR and the minted oracle asset class
3. Admin signs and submits the transaction
4. The oracle is now live and ready to receive rate feeds

**Sample response:**
```
Oracle initialization ready.
Asset: iSOL
Initial rate: 3.0%
Oracle asset class: policy.oracleToken
Transaction ready for admin signing.
```

### Routine rate update across all iAssets

Update interest rates for all iAssets as part of scheduled oracle maintenance.

**Prompt:** "Update interest rates for all iAssets"

**Workflow:**
1. Call `feed_interest_oracle` for iUSD with the current rate
2. Call `feed_interest_oracle` for iBTC with the current rate
3. Call `feed_interest_oracle` for iETH with the current rate
4. Call `feed_interest_oracle` for iSOL with the current rate
5. Each returns a separate unsigned transaction for signing

**Sample response:**
```
Rate updates prepared for all iAssets:
  iUSD: 5.0% → transaction ready
  iBTC: 3.5% → transaction ready
  iETH: 4.2% → transaction ready
  iSOL: 6.1% → transaction ready

Sign and submit each transaction with the oracle operator wallet.
```

## Typical Workflow

1. **Initialize** (one-time): Use `start_interest_oracle` to create a new interest oracle for an iAsset.
2. **Feed rates**: Use `feed_interest_oracle` periodically to update the interest rate with fresh data.
3. **Sign and submit**: Each tool returns an unsigned transaction — sign it with the operator wallet and submit to the Cardano network.

## Example Prompts

- "Feed a new interest rate for iUSD"
- "Initialize the interest oracle for a new iAsset"
- "Update all iAsset interest rates"
- "What parameters are needed to feed the oracle?"
