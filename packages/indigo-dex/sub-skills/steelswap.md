# SteelSwap

Query available tokens and get swap estimates through the SteelSwap DEX aggregator on Cardano.

## MCP Tools

### get_steelswap_tokens

List all tokens available for swapping on SteelSwap.

**Parameters:** None

**Returns:** Array of token objects with name, ticker, policy ID, and decimals.

### get_steelswap_estimate

Get a swap estimate for a given token pair, including expected output, price impact, and routing information.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | string | Yes | Source token ticker or policy ID |
| `to` | string | Yes | Destination token ticker or policy ID |
| `amount` | number | Yes | Amount of the source token to swap |

**Returns:** Swap estimate with expected output amount, price impact, and route details.

## Example Prompts

- "What tokens can I swap on SteelSwap?"
- "Get a swap estimate for 500 ADA to iUSD"
- "How much iBTC would I get for 1000 ADA on SteelSwap?"
- "What is the price impact of swapping 10000 ADA to iETH?"
