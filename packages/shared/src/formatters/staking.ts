import type { FormatAdapter, StakingPositionData } from "../types.js";

export function formatStakingPosition(adapter: FormatAdapter, pos: StakingPositionData): string {
  const lines = [
    adapter.header(`Staking Position #${pos.id}`),
    adapter.keyValue("Owner", adapter.code(pos.owner)),
    adapter.keyValue("Staked", `${pos.stakedAmount.toLocaleString()} INDY`),
    adapter.keyValue("Rewards", `${pos.rewardsEarned.toLocaleString()} ADA`),
    adapter.keyValue("Since", pos.startDate),
  ];
  return lines.join("\n");
}

export function formatStakingList(adapter: FormatAdapter, positions: StakingPositionData[]): string {
  if (positions.length === 0) return "No staking positions found.";

  const totalStaked = positions.reduce((sum, p) => sum + p.stakedAmount, 0);
  const totalRewards = positions.reduce((sum, p) => sum + p.rewardsEarned, 0);

  const header = adapter.header(`Staking Positions (${positions.length})`);
  const items = positions.map(
    (p) => `#${p.id}: ${p.stakedAmount.toLocaleString()} INDY → ${p.rewardsEarned.toLocaleString()} ADA rewards`
  );
  const summary = [
    adapter.divider(),
    adapter.keyValue("Total Staked", `${totalStaked.toLocaleString()} INDY`),
    adapter.keyValue("Total Rewards", `${totalRewards.toLocaleString()} ADA`),
  ].join("\n");

  return `${header}\n${adapter.list(items)}\n${summary}`;
}
