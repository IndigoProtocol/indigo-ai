export interface CDPData {
  id: string;
  owner: string;
  asset: string;
  collateral: number;
  minted: number;
  ratio: number;
  minRatio: number;
}

export interface CDPHealthData extends CDPData {
  healthStatus: "healthy" | "warning" | "danger";
  liquidationPrice: number;
  currentPrice: number;
}

export interface PriceData {
  asset: string;
  price: number;
  change24h?: number;
}

export interface StakingPositionData {
  id: string;
  owner: string;
  stakedAmount: number;
  rewardsEarned: number;
  asset: string;
  startDate: string;
}

export interface StabilityAccountData {
  id: string;
  owner: string;
  deposited: number;
  asset: string;
  rewards: number;
}

export interface APRData {
  pool: string;
  apr: number;
  tvl: number;
  asset: string;
}

export interface TVLData {
  protocol: string;
  tvl: number;
  change24h?: number;
  breakdown?: Record<string, number>;
}

export interface ErrorData {
  message: string;
  code?: string;
  details?: string;
}

export interface FormatAdapter {
  bold(text: string): string;
  italic(text: string): string;
  code(text: string): string;
  codeBlock(text: string): string;
  link(text: string, url: string): string;
  header(text: string, level?: number): string;
  divider(): string;
  statusIcon(status: "success" | "warning" | "error" | "info"): string;
  list(items: string[]): string;
  keyValue(key: string, value: string): string;
}
