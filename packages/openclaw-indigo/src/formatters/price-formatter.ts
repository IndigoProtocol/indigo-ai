/**
 * Price Message Formatter
 *
 * Formats price data for Telegram, Discord, and Slack output.
 */

type Platform = "telegram" | "discord" | "slack" | "plain";

interface PriceData {
  asset: string;
  price: number;
  change24h?: number;
}

export function formatPriceMessage(
  prices: PriceData[],
  platform: Platform = "plain",
): string {
  if (prices.length === 0) {
    return "No price data available.";
  }

  switch (platform) {
    case "telegram":
      return formatTelegram(prices);
    case "discord":
      return formatDiscord(prices);
    case "slack":
      return formatSlack(prices);
    default:
      return formatPlain(prices);
  }
}

function changeIndicator(change?: number): string {
  if (change === undefined) return "";
  return change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
}

function formatTelegram(prices: PriceData[]): string {
  const lines = ["<b>Indigo Prices</b>\n"];
  for (const p of prices) {
    const change = changeIndicator(p.change24h);
    lines.push(`<b>${p.asset}</b>: $${p.price.toFixed(4)} ${change}`);
  }
  return lines.join("\n");
}

function formatDiscord(prices: PriceData[]): string {
  const lines = ["**Indigo Prices**\n"];
  for (const p of prices) {
    const change = changeIndicator(p.change24h);
    lines.push(`**${p.asset}**: $${p.price.toFixed(4)} ${change}`);
  }
  return lines.join("\n");
}

function formatSlack(prices: PriceData[]): string {
  const lines = ["*Indigo Prices*\n"];
  for (const p of prices) {
    const change = changeIndicator(p.change24h);
    lines.push(`*${p.asset}*: $${p.price.toFixed(4)} ${change}`);
  }
  return lines.join("\n");
}

function formatPlain(prices: PriceData[]): string {
  const lines = ["Indigo Prices\n"];
  for (const p of prices) {
    const change = changeIndicator(p.change24h);
    lines.push(`${p.asset}: $${p.price.toFixed(4)} ${change}`);
  }
  return lines.join("\n");
}
