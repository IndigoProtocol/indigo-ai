# APR Rewards

Query APR reward rates for Indigo Protocol pools and staking positions.

## MCP Tools

### get_apr_rewards

Get APR reward rates across all Indigo pools.

**Parameters:** None

**Returns:** Array of pool reward objects with APR percentages for each pool type.

### get_apr_by_key

Get the APR reward rate for a specific pool identified by key.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Pool key identifier |

**Returns:** APR reward data for the specified pool.

## Example Prompts

- "What are the current APR rewards for Indigo pools?"
- "Show me the APR for the iUSD stability pool"
- "Which Indigo pool has the highest APR?"
