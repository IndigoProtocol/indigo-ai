/**
 * Staking Commands
 *
 * Chat commands for managing INDY staking positions.
 */

export const stakingCommands = {
  name: "staking",
  description: "Manage INDY staking positions",

  commands: {
    "/stake info": {
      description: "View staking overview and APR",
      usage: "/stake info",
      handler: "get_staking_info",
    },
    "/stake list": {
      description: "List your staking positions",
      usage: "/stake list",
      handler: "get_staking_positions_by_owner",
    },
    "/stake open": {
      description: "Open a new staking position",
      usage: "/stake open <amount>",
      handler: "open_staking_position",
    },
    "/stake adjust": {
      description: "Adjust an existing staking position",
      usage: "/stake adjust <position_address> <new_amount>",
      handler: "adjust_staking_position",
    },
    "/stake close": {
      description: "Close a staking position",
      usage: "/stake close <position_address>",
      handler: "close_staking_position",
    },
  },
} as const;
