import type { FormatAdapter, APRData, TVLData } from "../types.js";

export function formatAPR(adapter: FormatAdapter, apr: APRData): string {
  const lines = [
    adapter.keyValue("Pool", adapter.bold(apr.pool)),
    adapter.keyValue("Asset", apr.asset),
    adapter.keyValue("APR", `${apr.apr.toFixed(2)}%`),
    adapter.keyValue("TVL", `$${apr.tvl.toLocaleString()}`),
  ];
  return lines.join("\n");
}

export function formatAPRList(adapter: FormatAdapter, aprs: APRData[]): string {
  if (aprs.length === 0) return "No APR data available.";

  const header = adapter.header("APR Rewards");
  const items = aprs.map(
    (a) => `${a.pool} (${a.asset}): ${a.apr.toFixed(2)}% APR — $${a.tvl.toLocaleString()} TVL`
  );
  return `${header}\n${adapter.list(items)}`;
}

export function formatTVL(adapter: FormatAdapter, tvl: TVLData): string {
  const lines = [
    adapter.header(tvl.protocol),
    adapter.keyValue("TVL", `$${tvl.tvl.toLocaleString()}`),
  ];

  if (tvl.change24h !== undefined) {
    const icon = tvl.change24h >= 0 ? adapter.statusIcon("success") : adapter.statusIcon("error");
    lines.push(adapter.keyValue("24h Change", `${icon} ${tvl.change24h >= 0 ? "+" : ""}${tvl.change24h.toFixed(2)}%`));
  }

  if (tvl.breakdown) {
    lines.push(adapter.divider());
    for (const [key, value] of Object.entries(tvl.breakdown)) {
      lines.push(adapter.keyValue(key, `$${value.toLocaleString()}`));
    }
  }

  return lines.join("\n");
}
