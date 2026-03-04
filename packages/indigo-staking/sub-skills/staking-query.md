# Staking Queries

Query INDY staking information and browse staking positions on Indigo Protocol.

## MCP Tools

### get_staking_info

Get general INDY staking information including total staked, reward parameters, and staking configuration.

**Parameters:** None

**Returns:** Staking info object with total staked INDY, reward rates, and configuration parameters.

### get_staking_positions

Get all active INDY staking positions across the protocol.

**Parameters:** None

**Returns:** Array of staking position objects with owner, staked amount, and reward data.

### get_staking_positions_by_owner

Get all staking positions owned by a specific address.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | string | Yes | Owner stake key hash or address |

**Returns:** Array of staking positions for the specified owner.

### get_staking_position_by_address

Get a specific staking position by its on-chain address.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Staking position UTxO address |

**Returns:** Staking position details for the specified address.

## Example Prompts

- "What is the current INDY staking info?"
- "Show me all active staking positions"
- "What are my staking positions?"
- "Look up staking position at this address"
