/**
 * Price Alerts
 *
 * Configurable price threshold alerts for iAssets and INDY.
 */

export interface PriceAlertConfig {
  /** Asset to monitor (iUSD, iBTC, iETH, iSOL, ADA, INDY) */
  asset: string;
  /** Alert when price goes above this value */
  above?: number;
  /** Alert when price drops below this value */
  below?: number;
  /** Percentage change threshold to trigger alert */
  percentChange?: number;
  /** Notification channels */
  channels: ("telegram" | "discord" | "slack")[];
}

export const priceAlerts = {
  name: "price-alerts",
  description: "Price threshold notifications for iAssets and INDY",

  triggers: {
    priceAbove: {
      description: "Alert when asset price exceeds threshold",
      mcpTool: "get_asset_price",
    },
    priceBelow: {
      description: "Alert when asset price drops below threshold",
      mcpTool: "get_asset_price",
    },
    percentChange: {
      description: "Alert on significant price movement",
      mcpTool: "get_asset_price",
    },
    depeg: {
      description: "Alert when iUSD deviates from $1.00 peg",
      mcpTool: "get_asset_price",
      asset: "iUSD",
      threshold: 0.02,
    },
  },
} as const;
