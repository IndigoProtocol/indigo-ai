/**
 * CDP Message Formatter
 *
 * Formats CDP data for Telegram, Discord, and Slack output.
 */

type Platform = "telegram" | "discord" | "slack" | "plain";

interface CDPData {
  asset: string;
  collateral: number;
  minted: number;
  ratio: number;
  address: string;
}

export function formatCDPMessage(
  cdps: CDPData[],
  platform: Platform = "plain",
): string {
  if (cdps.length === 0) {
    return "No CDPs found.";
  }

  switch (platform) {
    case "telegram":
      return formatTelegram(cdps);
    case "discord":
      return formatDiscord(cdps);
    case "slack":
      return formatSlack(cdps);
    default:
      return formatPlain(cdps);
  }
}

function formatTelegram(cdps: CDPData[]): string {
  const lines = ["<b>Your CDPs</b>\n"];
  for (const cdp of cdps) {
    const status = cdp.ratio > 200 ? "🟢" : cdp.ratio > 150 ? "🟡" : "🔴";
    lines.push(
      `${status} <b>${cdp.asset}</b>`,
      `  Collateral: ${cdp.collateral.toLocaleString()} ADA`,
      `  Minted: ${cdp.minted} ${cdp.asset}`,
      `  Ratio: ${cdp.ratio}%\n`,
    );
  }
  return lines.join("\n");
}

function formatDiscord(cdps: CDPData[]): string {
  const lines = ["**Your CDPs**\n"];
  for (const cdp of cdps) {
    const status = cdp.ratio > 200 ? "🟢" : cdp.ratio > 150 ? "🟡" : "🔴";
    lines.push(
      `${status} **${cdp.asset}**`,
      `> Collateral: ${cdp.collateral.toLocaleString()} ADA`,
      `> Minted: ${cdp.minted} ${cdp.asset}`,
      `> Ratio: ${cdp.ratio}%\n`,
    );
  }
  return lines.join("\n");
}

function formatSlack(cdps: CDPData[]): string {
  const lines = ["*Your CDPs*\n"];
  for (const cdp of cdps) {
    const status = cdp.ratio > 200 ? ":green:" : cdp.ratio > 150 ? ":yellow:" : ":red:";
    lines.push(
      `${status} *${cdp.asset}*`,
      `  Collateral: ${cdp.collateral.toLocaleString()} ADA`,
      `  Minted: ${cdp.minted} ${cdp.asset}`,
      `  Ratio: ${cdp.ratio}%\n`,
    );
  }
  return lines.join("\n");
}

function formatPlain(cdps: CDPData[]): string {
  const lines = ["Your CDPs\n"];
  for (const cdp of cdps) {
    lines.push(
      `${cdp.asset}`,
      `  Collateral: ${cdp.collateral.toLocaleString()} ADA`,
      `  Minted: ${cdp.minted} ${cdp.asset}`,
      `  Ratio: ${cdp.ratio}%\n`,
    );
  }
  return lines.join("\n");
}
