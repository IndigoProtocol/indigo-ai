# Indigo DeFi Skills

Agent instructions for DeFi operations on the Indigo Protocol (Cardano).

## MCP Server

All tools require the `@indigoprotocol/indigo-mcp` server. Start it with:

```bash
npx @indigoprotocol/indigo-mcp
```

## Available Tools (37)

### CDP Management (15 tools)

| Tool | Description |
|------|-------------|
| `open_cdp` | Open a new CDP |
| `deposit_cdp` | Deposit collateral into a CDP |
| `withdraw_cdp` | Withdraw collateral from a CDP |
| `close_cdp` | Close a CDP and reclaim collateral |
| `mint_cdp` | Mint iAssets against a CDP |
| `burn_cdp` | Burn iAssets to reduce CDP debt |
| `analyze_cdp_health` | Check CDP health and liquidation risk |
| `liquidate_cdp` | Liquidate an unhealthy CDP |
| `redeem_cdp` | Redeem iAssets against a CDP |
| `freeze_cdp` | Freeze a CDP |
| `merge_cdps` | Merge multiple CDPs into one |
| `leverage_cdp` | Open a leveraged CDP position via ROB |
| `get_all_cdps` | List all CDPs |
| `get_cdps_by_owner` | List CDPs by owner |
| `get_cdps_by_address` | List CDPs by address |

### Stability Pools (8 tools)

| Tool | Description |
|------|-------------|
| `get_stability_pools` | List all stability pools |
| `get_stability_pool_accounts` | List accounts in a stability pool |
| `get_sp_account_by_owner` | Get stability pool account by owner |
| `create_sp_account` | Create a new stability pool account |
| `adjust_sp_account` | Adjust deposit in a stability pool account |
| `close_sp_account` | Close a stability pool account |
| `process_sp_request` | Process a pending stability pool request |
| `annul_sp_request` | Cancel a pending stability pool request |

### Staking (8 tools)

| Tool | Description |
|------|-------------|
| `get_staking_info` | Get general INDY staking information |
| `get_staking_positions` | Get all active staking positions |
| `get_staking_positions_by_owner` | Get staking positions for a specific owner |
| `get_staking_position_by_address` | Get a staking position by its address |
| `open_staking_position` | Open a new INDY staking position |
| `adjust_staking_position` | Adjust an existing staking position |
| `close_staking_position` | Close an existing staking position |
| `distribute_staking_rewards` | Distribute pending staking rewards |

### Redemption & ROB (8 tools)

| Tool | Description |
|------|-------------|
| `get_order_book` | Get open ROB positions from the order book |
| `get_redemption_orders` | Get redemption orders |
| `get_redemption_queue` | Get aggregated redemption queue for a specific iAsset |
| `open_rob` | Open a new ROB position |
| `cancel_rob` | Cancel an existing ROB position |
| `adjust_rob` | Adjust ADA amount in an ROB position |
| `claim_rob` | Claim received iAssets from an ROB position |
| `redeem_rob` | Redeem iAssets against ROB positions |

## Skills

- `skills/indigo-cdp/SKILL.md` — CDP & loan management
- `skills/indigo-stability/SKILL.md` — Stability pool operations
- `skills/indigo-staking/SKILL.md` — INDY staking positions
- `skills/indigo-redemption/SKILL.md` — Redemption & ROB management

## Important Notes

- All write operations (open, deposit, mint, etc.) return unsigned transactions that must be signed by the user's wallet.
- CDPs require a minimum collateral ratio; use `analyze_cdp_health` before withdrawing or minting.
- Stability pool requests have a processing delay; use `process_sp_request` after the epoch boundary.
- Staking positions earn INDY governance rewards and grant voting power.
