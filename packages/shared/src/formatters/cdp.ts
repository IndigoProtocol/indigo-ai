import type { FormatAdapter, CDPData, CDPHealthData } from "../types.js";

export function formatCDP(adapter: FormatAdapter, cdp: CDPData): string {
  const lines = [
    adapter.header(`CDP #${cdp.id}`),
    adapter.keyValue("Owner", adapter.code(cdp.owner)),
    adapter.keyValue("Asset", cdp.asset),
    adapter.keyValue("Collateral", `${cdp.collateral.toLocaleString()} ADA`),
    adapter.keyValue("Minted", `${cdp.minted.toLocaleString()} ${cdp.asset}`),
    adapter.keyValue("Ratio", `${cdp.ratio.toFixed(1)}%`),
    adapter.keyValue("Min Ratio", `${cdp.minRatio.toFixed(1)}%`),
  ];
  return lines.join("\n");
}

export function formatCDPHealth(adapter: FormatAdapter, cdp: CDPHealthData): string {
  const statusLabel =
    cdp.healthStatus === "healthy"
      ? "Healthy"
      : cdp.healthStatus === "warning"
        ? "Warning"
        : "Danger";

  const statusType =
    cdp.healthStatus === "healthy"
      ? "success"
      : cdp.healthStatus === "warning"
        ? "warning"
        : "error";

  const lines = [
    adapter.header(`CDP #${cdp.id} Health`),
    adapter.keyValue("Status", `${adapter.statusIcon(statusType as "success" | "warning" | "error")} ${statusLabel}`),
    adapter.keyValue("Collateral Ratio", `${cdp.ratio.toFixed(1)}%`),
    adapter.keyValue("Min Ratio", `${cdp.minRatio.toFixed(1)}%`),
    adapter.keyValue("Liquidation Price", `$${cdp.liquidationPrice.toFixed(4)}`),
    adapter.keyValue("Current Price", `$${cdp.currentPrice.toFixed(4)}`),
  ];
  return lines.join("\n");
}

export function formatCDPList(adapter: FormatAdapter, cdps: CDPData[]): string {
  if (cdps.length === 0) return "No CDPs found.";

  const header = adapter.header(`CDPs (${cdps.length})`);
  const items = cdps.map(
    (cdp) =>
      `CDP #${cdp.id}: ${cdp.collateral.toLocaleString()} ADA → ${cdp.minted.toLocaleString()} ${cdp.asset} (${cdp.ratio.toFixed(1)}%)`
  );
  return `${header}\n${adapter.list(items)}`;
}
