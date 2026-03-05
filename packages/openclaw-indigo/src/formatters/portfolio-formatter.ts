/**
 * Portfolio Message Formatter
 *
 * Formats portfolio summary data for Telegram, Discord, and Slack output.
 */

type Platform = "telegram" | "discord" | "slack" | "plain";

interface PortfolioData {
  address: string;
  adaBalance: number;
  cdpCount: number;
  stakingPositions: number;
  stabilityAccounts: number;
  totalCollateral: number;
  totalMinted: Record<string, number>;
}

export function formatPortfolioMessage(
  data: PortfolioData,
  platform: Platform = "plain",
): string {
  switch (platform) {
    case "telegram":
      return formatTelegram(data);
    case "discord":
      return formatDiscord(data);
    case "slack":
      return formatSlack(data);
    default:
      return formatPlain(data);
  }
}

function mintedSummary(minted: Record<string, number>): string {
  return Object.entries(minted)
    .map(([asset, amount]) => `${amount} ${asset}`)
    .join(", ");
}

function formatTelegram(data: PortfolioData): string {
  return [
    "<b>Portfolio Summary</b>\n",
    `<b>Wallet:</b> ${data.address.slice(0, 12)}...${data.address.slice(-8)}`,
    `<b>ADA Balance:</b> ${data.adaBalance.toLocaleString()} ADA\n`,
    `<b>CDPs:</b> ${data.cdpCount}`,
    `<b>Total Collateral:</b> ${data.totalCollateral.toLocaleString()} ADA`,
    `<b>Minted:</b> ${mintedSummary(data.totalMinted)}\n`,
    `<b>Staking Positions:</b> ${data.stakingPositions}`,
    `<b>Stability Accounts:</b> ${data.stabilityAccounts}`,
  ].join("\n");
}

function formatDiscord(data: PortfolioData): string {
  return [
    "**Portfolio Summary**\n",
    `**Wallet:** \`${data.address.slice(0, 12)}...${data.address.slice(-8)}\``,
    `**ADA Balance:** ${data.adaBalance.toLocaleString()} ADA\n`,
    `**CDPs:** ${data.cdpCount}`,
    `**Total Collateral:** ${data.totalCollateral.toLocaleString()} ADA`,
    `**Minted:** ${mintedSummary(data.totalMinted)}\n`,
    `**Staking Positions:** ${data.stakingPositions}`,
    `**Stability Accounts:** ${data.stabilityAccounts}`,
  ].join("\n");
}

function formatSlack(data: PortfolioData): string {
  return [
    "*Portfolio Summary*\n",
    `*Wallet:* \`${data.address.slice(0, 12)}...${data.address.slice(-8)}\``,
    `*ADA Balance:* ${data.adaBalance.toLocaleString()} ADA\n`,
    `*CDPs:* ${data.cdpCount}`,
    `*Total Collateral:* ${data.totalCollateral.toLocaleString()} ADA`,
    `*Minted:* ${mintedSummary(data.totalMinted)}\n`,
    `*Staking Positions:* ${data.stakingPositions}`,
    `*Stability Accounts:* ${data.stabilityAccounts}`,
  ].join("\n");
}

function formatPlain(data: PortfolioData): string {
  return [
    "Portfolio Summary\n",
    `Wallet: ${data.address.slice(0, 12)}...${data.address.slice(-8)}`,
    `ADA Balance: ${data.adaBalance.toLocaleString()} ADA\n`,
    `CDPs: ${data.cdpCount}`,
    `Total Collateral: ${data.totalCollateral.toLocaleString()} ADA`,
    `Minted: ${mintedSummary(data.totalMinted)}\n`,
    `Staking Positions: ${data.stakingPositions}`,
    `Stability Accounts: ${data.stabilityAccounts}`,
  ].join("\n");
}
