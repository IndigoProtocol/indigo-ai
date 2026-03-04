# Oracle Operations — Indigo Protocol

Manage the Indigo Protocol interest oracle. This skill covers feeding new interest rate data and initializing new interest oracles.

> **Restricted use:** These operations are only available to designated oracle operators and protocol administrators.

## Available MCP Tools

| Tool | Description |
|------|-------------|
| `feed_interest_oracle` | Feed a new interest rate to the interest oracle for a given iAsset. Returns an unsigned transaction for signing. |
| `start_interest_oracle` | Initialize a new interest oracle (one-time admin setup). Returns an unsigned transaction and the minted oracle asset class. |

## Sub-Skills

- [Interest Oracle](sub-skills/interest-oracle.md) — Feed data to and start the interest oracle

## Supported iAssets

The oracle tools support the following iAssets: iUSD, iBTC, iETH, iSOL.

## Prerequisites

- Oracle operator or protocol administrator credentials
- A Cardano wallet address (bech32)
- The operator's public key hash (hex)