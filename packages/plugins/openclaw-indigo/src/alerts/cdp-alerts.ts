/**
 * CDP Alerts
 *
 * Notifications for CDP health and liquidation risk.
 */

export interface CDPAlertConfig {
  /** CDP address to monitor */
  cdpAddress: string;
  /** Alert when collateral ratio drops below this percentage */
  minRatio?: number;
  /** Alert when CDP is at liquidation risk */
  liquidationWarning?: boolean;
  /** Notification channels */
  channels: ("telegram" | "discord" | "slack")[];
}

export const cdpAlerts = {
  name: "cdp-alerts",
  description: "CDP health and liquidation risk notifications",

  triggers: {
    lowCollateralRatio: {
      description: "Alert when CDP collateral ratio drops below threshold",
      mcpTool: "analyze_cdp_health",
      defaultThreshold: 150,
    },
    liquidationRisk: {
      description: "Alert when CDP is approaching liquidation",
      mcpTool: "analyze_cdp_health",
      defaultThreshold: 120,
    },
    liquidated: {
      description: "Alert when a CDP has been liquidated",
      mcpTool: "get_cdps_by_owner",
    },
  },
} as const;
