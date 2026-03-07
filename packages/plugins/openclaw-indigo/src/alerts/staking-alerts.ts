/**
 * Staking Alerts
 *
 * Notifications for INDY staking rewards and governance events.
 */

export interface StakingAlertConfig {
  /** Owner address to monitor */
  ownerAddress: string;
  /** Alert on reward distribution */
  rewardDistribution?: boolean;
  /** Alert on governance proposals */
  governancePolls?: boolean;
  /** Notification channels */
  channels: ("telegram" | "discord" | "slack")[];
}

export const stakingAlerts = {
  name: "staking-alerts",
  description: "INDY staking and governance notifications",

  triggers: {
    rewardDistribution: {
      description: "Alert when staking rewards are distributed",
      mcpTool: "distribute_staking_rewards",
    },
    newPoll: {
      description: "Alert when a new governance poll is created",
      mcpTool: "get_polls",
    },
    pollEnding: {
      description: "Alert when a governance poll is about to end",
      mcpTool: "get_polls",
    },
  },
} as const;
