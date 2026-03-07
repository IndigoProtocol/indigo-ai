/**
 * CDP Management Commands
 *
 * Chat commands for managing Indigo Protocol CDPs.
 */

export interface CDPCommandContext {
  address: string;
  reply: (message: string) => Promise<void>;
}

export const cdpCommands = {
  name: "cdp",
  description: "Manage Indigo Protocol CDPs",

  commands: {
    "/cdp list": {
      description: "List your CDPs",
      usage: "/cdp list",
      handler: "get_cdps_by_owner",
    },
    "/cdp open": {
      description: "Open a new CDP",
      usage: "/cdp open <asset> <collateral_amount>",
      handler: "open_cdp",
    },
    "/cdp deposit": {
      description: "Add collateral to a CDP",
      usage: "/cdp deposit <cdp_address> <amount>",
      handler: "deposit_cdp",
    },
    "/cdp withdraw": {
      description: "Withdraw collateral from a CDP",
      usage: "/cdp withdraw <cdp_address> <amount>",
      handler: "withdraw_cdp",
    },
    "/cdp close": {
      description: "Close a CDP and reclaim collateral",
      usage: "/cdp close <cdp_address>",
      handler: "close_cdp",
    },
    "/cdp health": {
      description: "Check CDP health and collateral ratio",
      usage: "/cdp health [cdp_address]",
      handler: "analyze_cdp_health",
    },
    "/cdp mint": {
      description: "Mint iAssets from a CDP",
      usage: "/cdp mint <cdp_address> <amount>",
      handler: "mint_cdp",
    },
    "/cdp burn": {
      description: "Burn iAssets to reduce CDP debt",
      usage: "/cdp burn <cdp_address> <amount>",
      handler: "burn_cdp",
    },
  },
} as const;
