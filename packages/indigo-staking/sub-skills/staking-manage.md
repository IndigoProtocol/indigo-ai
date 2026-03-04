# Staking Management

Open, adjust, and close INDY staking positions on Indigo Protocol.

## MCP Tools

### open_staking_position

Open a new INDY staking position by locking INDY tokens.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | number | Yes | Amount of INDY to stake |

**Returns:** Transaction details for the new staking position.

### adjust_staking_position

Adjust an existing staking position by adding or removing staked INDY.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Staking position UTxO address |
| `amount` | number | Yes | New staked INDY amount |

**Returns:** Transaction details for the adjusted staking position.

### close_staking_position

Close an existing staking position and withdraw all staked INDY and accrued rewards.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | Yes | Staking position UTxO address |

**Returns:** Transaction details for closing the staking position.

## Example Prompts

- "Open a new staking position with 1000 INDY"
- "Increase my staking position to 2000 INDY"
- "Close my staking position and withdraw"
