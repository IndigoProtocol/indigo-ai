/**
 * Portfolio Commands
 *
 * Chat commands for tracking wallet positions and protocol activity.
 */

export const portfolioCommands = {
  name: "portfolio",
  description: "Track wallet positions and protocol stats",

  commands: {
    "/portfolio": {
      description: "View full portfolio summary",
      usage: "/portfolio [address]",
      handlers: [
        "get_cdps_by_owner",
        "get_staking_positions_by_owner",
        "get_sp_account_by_owner",
        "get_blockfrost_balances",
      ],
    },
    "/balance": {
      description: "Check wallet balances",
      usage: "/balance [address]",
      handler: "get_blockfrost_balances",
    },
    "/tvl": {
      description: "View protocol TVL",
      usage: "/tvl",
      handler: "get_tvl",
    },
    "/stats": {
      description: "View protocol statistics",
      usage: "/stats",
      handler: "get_protocol_stats",
    },
  },
} as const;
