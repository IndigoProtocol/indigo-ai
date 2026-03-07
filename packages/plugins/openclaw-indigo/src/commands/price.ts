/**
 * Price Query Commands
 *
 * Chat commands for checking iAsset and token prices.
 */

export const priceCommands = {
  name: "price",
  description: "Check iAsset and token prices",

  commands: {
    "/price": {
      description: "Get price of an iAsset",
      usage: "/price <asset>",
      handler: "get_asset_price",
    },
    "/price ada": {
      description: "Get the current ADA price",
      usage: "/price ada",
      handler: "get_ada_price",
    },
    "/price indy": {
      description: "Get the current INDY price",
      usage: "/price indy",
      handler: "get_indy_price",
    },
    "/price all": {
      description: "Get all iAsset prices",
      usage: "/price all",
      handler: "get_assets",
    },
  },
} as const;
