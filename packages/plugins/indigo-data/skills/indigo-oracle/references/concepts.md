# Oracle Concepts

Key concepts for understanding the Indigo Protocol interest oracle system.

## Interest Oracles

Each iAsset has an associated interest oracle that tracks the interest rate applied to CDPs. The oracle:

- Stores the current interest rate on-chain
- Is updated periodically by a designated operator
- Affects CDP debt accumulation over time

## Interest Rate

The interest rate determines how quickly CDP debt grows:

```
Debt at time T = Original Debt × (1 + rate)^(T - T0)
```

Higher interest rates mean CDPs accumulate debt faster, incentivizing users to maintain healthy collateral ratios.

## Rate Representation

Interest rates are stored as bigint strings on-chain:
- Protocol uses a fixed-point representation
- Example: 5% = `"50000000"` (rate × 10^9)
- Precision allows for very fine-grained rate adjustments

## Bias Time

Bias time is a safety parameter that accounts for the delay between when an oracle reads a rate and when the transaction is submitted:

- Measured in milliseconds
- Typical value: 120,000 ms (2 minutes)
- Prevents manipulation via timing attacks

## Unitary Interest

Unitary interest is a cumulative multiplier that tracks total interest accrued since the oracle was initialized:

- Starts at a base value (e.g., `1000000000000`)
- Increases with each rate feed
- Used to calculate interest owed on individual CDPs

## Oracle Operator

The oracle operator is a designated entity responsible for:

1. Monitoring off-chain interest rate data sources
2. Periodically calling `feed_interest_oracle` to update on-chain rates
3. Signing and submitting oracle update transactions

Only the operator's public key hash (set at initialization) is authorized to feed rates.

## Oracle Lifecycle

1. **Initialization** — admin calls `start_interest_oracle` to create the oracle
2. **Feeding** — operator periodically calls `feed_interest_oracle` with new rates
3. **Consumption** — CDP operations read the oracle to calculate interest owed
