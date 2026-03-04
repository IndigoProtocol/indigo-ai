# Wallet Balances

Query wallet token balances on Cardano via the Blockfrost API.

## MCP Tools

### get_blockfrost_balances

Retrieve all token balances for a given wallet address using Blockfrost.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Cardano wallet address (bech32 format) |

**Returns:** Array of token balance objects with policy ID, asset name, and quantity for each token held.

## Example Prompts

- "What are the token balances for addr1q...?"
- "Show me all assets held by this wallet"
- "Check how much iUSD this address holds"
