import type { FormatAdapter, StabilityAccountData } from "../types.js";

export function formatStabilityAccount(adapter: FormatAdapter, account: StabilityAccountData): string {
  const lines = [
    adapter.header(`Stability Pool Account #${account.id}`),
    adapter.keyValue("Owner", adapter.code(account.owner)),
    adapter.keyValue("Deposited", `${account.deposited.toLocaleString()} ${account.asset}`),
    adapter.keyValue("Rewards", `${account.rewards.toLocaleString()} ADA`),
  ];
  return lines.join("\n");
}

export function formatStabilityList(adapter: FormatAdapter, accounts: StabilityAccountData[]): string {
  if (accounts.length === 0) return "No stability pool accounts found.";

  const totalDeposited = accounts.reduce((sum, a) => sum + a.deposited, 0);
  const totalRewards = accounts.reduce((sum, a) => sum + a.rewards, 0);

  const header = adapter.header(`Stability Pool Accounts (${accounts.length})`);
  const items = accounts.map(
    (a) => `#${a.id}: ${a.deposited.toLocaleString()} ${a.asset} → ${a.rewards.toLocaleString()} ADA rewards`
  );
  const summary = [
    adapter.divider(),
    adapter.keyValue("Total Deposited", totalDeposited.toLocaleString()),
    adapter.keyValue("Total Rewards", `${totalRewards.toLocaleString()} ADA`),
  ].join("\n");

  return `${header}\n${adapter.list(items)}\n${summary}`;
}
