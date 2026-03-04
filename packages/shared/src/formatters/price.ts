import type { FormatAdapter, PriceData } from "../types.js";

export function formatPrice(adapter: FormatAdapter, price: PriceData): string {
  const changeStr = price.change24h !== undefined
    ? ` (${price.change24h >= 0 ? "+" : ""}${price.change24h.toFixed(2)}%)`
    : "";
  const icon = price.change24h !== undefined
    ? price.change24h >= 0
      ? adapter.statusIcon("success")
      : adapter.statusIcon("error")
    : "";

  return `${icon} ${adapter.bold(price.asset)}: $${price.price.toFixed(4)}${changeStr}`;
}

export function formatPriceList(adapter: FormatAdapter, prices: PriceData[]): string {
  if (prices.length === 0) return "No price data available.";

  const header = adapter.header("Asset Prices");
  const items = prices.map((p) => {
    const change = p.change24h !== undefined
      ? ` (${p.change24h >= 0 ? "+" : ""}${p.change24h.toFixed(2)}%)`
      : "";
    return `${p.asset}: $${p.price.toFixed(4)}${change}`;
  });
  return `${header}\n${adapter.list(items)}`;
}
