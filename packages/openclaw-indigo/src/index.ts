/**
 * OpenClaw Indigo Plugin
 *
 * Indigo Protocol integration for the OpenClaw platform.
 * Provides CDP management, price alerts, and portfolio tracking
 * through Telegram and Discord.
 */

export interface OpenClawIndigoConfig {
  /** Indigo MCP server endpoint */
  mcpEndpoint: string;
  /** Enable Telegram bot integration */
  telegram?: boolean;
  /** Enable Discord bot integration */
  discord?: boolean;
  /** Enable Slack bot integration */
  slack?: boolean;
  /** Enable price alert notifications */
  priceAlerts?: boolean;
  /** Enable portfolio tracking notifications */
  portfolioTracking?: boolean;
}

export const PLUGIN_NAME = "openclaw-indigo";

export const FEATURES = [
  "indigo-mcp-integration",
  "telegram-bot",
  "discord-bot",
  "slack-bot",
  "cdp-management",
  "price-alerts",
  "portfolio-tracking",
] as const;

export type Feature = (typeof FEATURES)[number];

export function createPlugin(config: OpenClawIndigoConfig) {
  return {
    name: PLUGIN_NAME,
    config,
    features: FEATURES,
  };
}
