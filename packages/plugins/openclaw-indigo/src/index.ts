import { Type } from "@sinclair/typebox";
import axios, { type AxiosInstance } from "axios";
import {
  markdownAdapter,
  formatPrice,
  formatPriceList,
  formatCDPList,
  formatCDPHealth,
  formatStabilityList,
  formatStakingList,
  formatAPRList,
  formatTVL,
  formatError,
  type PriceData,
  type CDPData,
  type CDPHealthData,
  type StabilityAccountData,
  type StakingPositionData,
  type APRData,
  type TVLData,
  type FormatAdapter,
} from "@indigoprotocol/shared";

const DEFAULT_BASE_URL = "https://analytics.indigoprotocol.io/api/v1";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function text(value: string) {
  return { content: [{ type: "text" as const, text: value }] };
}

function errText(adapter: FormatAdapter, message: string, code?: string) {
  return text(formatError(adapter, { message, code }));
}

// ---------------------------------------------------------------------------
// Data mapping helpers — map indexer responses to shared types
// ---------------------------------------------------------------------------

function mapAssetToPrice(asset: Record<string, unknown>): PriceData {
  return {
    asset: String(asset.name ?? asset.asset ?? ""),
    price: Number(asset.price ?? 0),
    change24h: asset.change24h != null ? Number(asset.change24h) : undefined,
  };
}

function mapLoanToCDP(loan: Record<string, unknown>): CDPData {
  return {
    id: String(loan.id ?? loan.nftId ?? ""),
    owner: String(loan.owner ?? ""),
    asset: String(loan.asset ?? loan.iasset ?? ""),
    collateral: Number(loan.collateral ?? loan.adaAmount ?? 0),
    minted: Number(loan.minted ?? loan.mintedAmount ?? 0),
    ratio: Number(loan.ratio ?? loan.collateralRatio ?? 0),
    minRatio: Number(loan.minRatio ?? loan.minimumRatio ?? 0),
  };
}

function mapLoanToCDPHealth(
  loan: Record<string, unknown>,
  currentPrice: number
): CDPHealthData {
  const cdp = mapLoanToCDP(loan);
  const ratio = cdp.ratio;
  const healthStatus =
    ratio > cdp.minRatio * 1.5
      ? "healthy"
      : ratio > cdp.minRatio
        ? "warning"
        : "danger";

  const liquidationPrice =
    cdp.minted > 0 ? (cdp.collateral * currentPrice) / (cdp.minted * (cdp.minRatio / 100)) : 0;

  return { ...cdp, healthStatus, liquidationPrice, currentPrice };
}

function mapStabilityAccount(
  account: Record<string, unknown>
): StabilityAccountData {
  return {
    id: String(account.id ?? ""),
    owner: String(account.owner ?? ""),
    deposited: Number(account.deposited ?? account.amount ?? 0),
    asset: String(account.asset ?? ""),
    rewards: Number(account.rewards ?? 0),
  };
}

function mapStakingPosition(
  pos: Record<string, unknown>
): StakingPositionData {
  return {
    id: String(pos.id ?? ""),
    owner: String(pos.owner ?? ""),
    stakedAmount: Number(pos.stakedAmount ?? pos.amount ?? 0),
    rewardsEarned: Number(pos.rewardsEarned ?? pos.rewards ?? 0),
    asset: String(pos.asset ?? "INDY"),
    startDate: String(pos.startDate ?? pos.createdAt ?? ""),
  };
}

function mapAPR(apr: Record<string, unknown>): APRData {
  return {
    pool: String(apr.pool ?? apr.name ?? ""),
    apr: Number(apr.apr ?? 0),
    tvl: Number(apr.tvl ?? 0),
    asset: String(apr.asset ?? ""),
  };
}

// ---------------------------------------------------------------------------
// Plugin register function
// ---------------------------------------------------------------------------

export default function register(api: any) {
  const config = api.pluginConfig ?? {};
  const baseURL = (config.indexerUrl as string) || DEFAULT_BASE_URL;
  const defaultWallet = (config.walletAddress as string) || "";

  const http: AxiosInstance = axios.create({ baseURL, timeout: 15_000 });
  const adapter = markdownAdapter;

  // =========================================================================
  // Agent Tools (16 read-only)
  // =========================================================================

  // 1. indigo_assets
  api.registerTool({
    name: "indigo_assets",
    description: "List all Indigo iAssets with current prices",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/assets/");
      const prices: PriceData[] = (data as Record<string, unknown>[]).map(mapAssetToPrice);
      return text(formatPriceList(adapter, prices));
    },
  });

  // 2. indigo_asset_price
  api.registerTool({
    name: "indigo_asset_price",
    description: "Get the price of a specific Indigo iAsset",
    parameters: Type.Object({
      asset: Type.String({ description: "iAsset name (e.g. iUSD, iBTC, iETH)" }),
    }),
    execute: async (params: { asset: string }) => {
      const { data } = await http.get("/assets/");
      const assets = data as Record<string, unknown>[];
      const match = assets.find(
        (a) =>
          String(a.name ?? a.asset ?? "").toLowerCase() ===
          params.asset.toLowerCase()
      );
      if (!match) return errText(adapter, `Asset "${params.asset}" not found`);
      return text(formatPrice(adapter, mapAssetToPrice(match)));
    },
  });

  // 3. indigo_ada_price
  api.registerTool({
    name: "indigo_ada_price",
    description: "Get the current ADA price",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.post("/ada-price/");
      return text(
        formatPrice(adapter, {
          asset: "ADA",
          price: Number((data as Record<string, unknown>).price ?? 0),
        })
      );
    },
  });

  // 4. indigo_indy_price
  api.registerTool({
    name: "indigo_indy_price",
    description: "Get the current INDY token price",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.post("/indy-price/");
      return text(
        formatPrice(adapter, {
          asset: "INDY",
          price: Number((data as Record<string, unknown>).price ?? 0),
        })
      );
    },
  });

  // 5. indigo_tvl
  api.registerTool({
    name: "indigo_tvl",
    description: "Get the total value locked in Indigo Protocol",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/analytics/tvl");
      const tvl: TVLData = {
        protocol: "Indigo Protocol",
        tvl: Number((data as Record<string, unknown>).tvl ?? 0),
        change24h:
          (data as Record<string, unknown>).change24h != null
            ? Number((data as Record<string, unknown>).change24h)
            : undefined,
        breakdown: (data as Record<string, unknown>).breakdown as
          | Record<string, number>
          | undefined,
      };
      return text(formatTVL(adapter, tvl));
    },
  });

  // 6. indigo_protocol_stats
  api.registerTool({
    name: "indigo_protocol_stats",
    description: "Get Indigo Protocol statistics (TVL, assets, CDPs)",
    parameters: Type.Object({}),
    execute: async () => {
      const [tvlRes, assetsRes, loansRes] = await Promise.all([
        http.get("/analytics/tvl"),
        http.get("/assets/"),
        http.get("/loans/"),
      ]);

      const tvl = Number((tvlRes.data as Record<string, unknown>).tvl ?? 0);
      const assets = (assetsRes.data as Record<string, unknown>[]).length;
      const cdps = (loansRes.data as Record<string, unknown>[]).length;

      const lines = [
        adapter.header("Indigo Protocol Stats"),
        adapter.keyValue("TVL", `$${tvl.toLocaleString()}`),
        adapter.keyValue("iAssets", String(assets)),
        adapter.keyValue("Active CDPs", String(cdps)),
      ];
      return text(lines.join("\n"));
    },
  });

  // 7. indigo_apr_rewards
  api.registerTool({
    name: "indigo_apr_rewards",
    description: "Get current APR rewards for Indigo pools",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/apr/");
      const aprs: APRData[] = (data as Record<string, unknown>[]).map(mapAPR);
      return text(formatAPRList(adapter, aprs));
    },
  });

  // 8. indigo_dex_yields
  api.registerTool({
    name: "indigo_dex_yields",
    description: "Get DEX yield farming opportunities for Indigo iAssets",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/dex/yields");
      return text(adapter.codeBlock(JSON.stringify(data, null, 2)));
    },
  });

  // 9. indigo_cdps
  api.registerTool({
    name: "indigo_cdps",
    description: "List CDPs, optionally filtered by owner address or asset",
    parameters: Type.Object({
      owner: Type.Optional(
        Type.String({ description: "Owner wallet address to filter by" })
      ),
      asset: Type.Optional(
        Type.String({ description: "iAsset name to filter by" })
      ),
    }),
    execute: async (params: { owner?: string; asset?: string }) => {
      const query: Record<string, string> = {};
      if (params.owner) query.owner = params.owner;
      if (params.asset) query.asset = params.asset;
      const { data } = await http.get("/loans/", { params: query });
      const cdps: CDPData[] = (data as Record<string, unknown>[]).map(mapLoanToCDP);
      return text(formatCDPList(adapter, cdps));
    },
  });

  // 10. indigo_cdp_health
  api.registerTool({
    name: "indigo_cdp_health",
    description:
      "Analyze health of CDPs for a given owner — shows collateral ratio, liquidation risk",
    parameters: Type.Object({
      owner: Type.String({ description: "Owner wallet address" }),
    }),
    execute: async (params: { owner: string }) => {
      const [loansRes, assetsRes] = await Promise.all([
        http.get("/loans/", { params: { owner: params.owner } }),
        http.get("/assets/"),
      ]);

      const loans = loansRes.data as Record<string, unknown>[];
      if (loans.length === 0)
        return errText(adapter, "No CDPs found for this address");

      const assets = assetsRes.data as Record<string, unknown>[];
      const priceMap = new Map<string, number>();
      for (const a of assets) {
        priceMap.set(
          String(a.name ?? a.asset ?? "").toLowerCase(),
          Number(a.price ?? 0)
        );
      }

      const healthItems: CDPHealthData[] = loans.map((loan) => {
        const assetName = String(loan.asset ?? loan.iasset ?? "").toLowerCase();
        const currentPrice = priceMap.get(assetName) ?? 0;
        return mapLoanToCDPHealth(loan, currentPrice);
      });

      const lines = healthItems.map((h) => formatCDPHealth(adapter, h));
      return text(lines.join(`\n${adapter.divider()}\n`));
    },
  });

  // 11. indigo_stability_pools
  api.registerTool({
    name: "indigo_stability_pools",
    description: "Get Indigo stability pool information",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/stability-pools/");
      const accounts: StabilityAccountData[] = (
        data as Record<string, unknown>[]
      ).map(mapStabilityAccount);
      return text(formatStabilityList(adapter, accounts));
    },
  });

  // 12. indigo_staking_info
  api.registerTool({
    name: "indigo_staking_info",
    description: "Get INDY staking overview and statistics",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/staking/");
      return text(adapter.codeBlock(JSON.stringify(data, null, 2)));
    },
  });

  // 13. indigo_staking_positions
  api.registerTool({
    name: "indigo_staking_positions",
    description: "List INDY staking positions, optionally filtered by owner",
    parameters: Type.Object({
      owner: Type.Optional(
        Type.String({ description: "Owner wallet address to filter by" })
      ),
    }),
    execute: async (params: { owner?: string }) => {
      const query: Record<string, string> = {};
      if (params.owner) query.owner = params.owner;
      const { data } = await http.get("/staking-positions/", {
        params: query,
      });
      const positions: StakingPositionData[] = (
        data as Record<string, unknown>[]
      ).map(mapStakingPosition);
      return text(formatStakingList(adapter, positions));
    },
  });

  // 14. indigo_polls
  api.registerTool({
    name: "indigo_polls",
    description: "Get current Indigo governance polls",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/polls/");
      return text(adapter.codeBlock(JSON.stringify(data, null, 2)));
    },
  });

  // 15. indigo_wallet_balances
  api.registerTool({
    name: "indigo_wallet_balances",
    description: "Get token balances for a Cardano wallet address",
    parameters: Type.Object({
      address: Type.String({ description: "Cardano wallet address" }),
    }),
    execute: async (params: { address: string }) => {
      const { data } = await http.get("/blockfrost/balances", {
        params: { address: params.address },
      });
      return text(adapter.codeBlock(JSON.stringify(data, null, 2)));
    },
  });

  // 16. indigo_order_book
  api.registerTool({
    name: "indigo_order_book",
    description: "Get the Indigo redemption order book",
    parameters: Type.Object({}),
    execute: async () => {
      const { data } = await http.get("/order-book/");
      return text(adapter.codeBlock(JSON.stringify(data, null, 2)));
    },
  });

  // =========================================================================
  // Auto-reply Commands (8)
  // =========================================================================

  // /price <asset>
  api.registerCommand({
    name: "price",
    description: "Get the price of an iAsset (e.g. /price iUSD)",
    parameters: Type.Object({
      asset: Type.String({ description: "Asset name" }),
    }),
    execute: async (params: { asset: string }) => {
      try {
        const assetLower = params.asset.toLowerCase();

        if (assetLower === "ada") {
          const { data } = await http.post("/ada-price/");
          return {
            text: formatPrice(adapter, {
              asset: "ADA",
              price: Number((data as Record<string, unknown>).price ?? 0),
            }),
          };
        }

        if (assetLower === "indy") {
          const { data } = await http.post("/indy-price/");
          return {
            text: formatPrice(adapter, {
              asset: "INDY",
              price: Number((data as Record<string, unknown>).price ?? 0),
            }),
          };
        }

        const { data } = await http.get("/assets/");
        const assets = data as Record<string, unknown>[];
        const match = assets.find(
          (a) =>
            String(a.name ?? a.asset ?? "").toLowerCase() === assetLower
        );
        if (!match)
          return { text: formatError(adapter, { message: `Asset "${params.asset}" not found` }) };
        return { text: formatPrice(adapter, mapAssetToPrice(match)) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "PRICE_ERROR" }) };
      }
    },
  });

  // /prices
  api.registerCommand({
    name: "prices",
    description: "Get all iAsset prices",
    execute: async () => {
      try {
        const { data } = await http.get("/assets/");
        const prices: PriceData[] = (data as Record<string, unknown>[]).map(
          mapAssetToPrice
        );
        return { text: formatPriceList(adapter, prices) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "PRICES_ERROR" }) };
      }
    },
  });

  // /tvl
  api.registerCommand({
    name: "tvl",
    description: "Show Indigo Protocol total value locked",
    execute: async () => {
      try {
        const { data } = await http.get("/analytics/tvl");
        const tvl: TVLData = {
          protocol: "Indigo Protocol",
          tvl: Number((data as Record<string, unknown>).tvl ?? 0),
          change24h:
            (data as Record<string, unknown>).change24h != null
              ? Number((data as Record<string, unknown>).change24h)
              : undefined,
          breakdown: (data as Record<string, unknown>).breakdown as
            | Record<string, number>
            | undefined,
        };
        return { text: formatTVL(adapter, tvl) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "TVL_ERROR" }) };
      }
    },
  });

  // /balance [addr]
  api.registerCommand({
    name: "balance",
    description: "Show wallet token balances (defaults to configured wallet)",
    parameters: Type.Object({
      address: Type.Optional(
        Type.String({ description: "Cardano wallet address" })
      ),
    }),
    execute: async (params: { address?: string }) => {
      try {
        const addr = params.address || defaultWallet;
        if (!addr)
          return {
            text: formatError(adapter, {
              message: "No wallet address provided. Pass an address or set walletAddress in plugin config.",
            }),
          };
        const { data } = await http.get("/blockfrost/balances", {
          params: { address: addr },
        });
        return { text: adapter.codeBlock(JSON.stringify(data, null, 2)) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "BALANCE_ERROR" }) };
      }
    },
  });

  // /cdps [owner]
  api.registerCommand({
    name: "cdps",
    description: "List CDPs (defaults to configured wallet)",
    parameters: Type.Object({
      owner: Type.Optional(
        Type.String({ description: "Owner wallet address" })
      ),
    }),
    execute: async (params: { owner?: string }) => {
      try {
        const owner = params.owner || defaultWallet;
        const query: Record<string, string> = {};
        if (owner) query.owner = owner;
        const { data } = await http.get("/loans/", { params: query });
        const cdps: CDPData[] = (data as Record<string, unknown>[]).map(
          mapLoanToCDP
        );
        return { text: formatCDPList(adapter, cdps) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "CDPS_ERROR" }) };
      }
    },
  });

  // /staking
  api.registerCommand({
    name: "staking",
    description: "Show INDY staking overview",
    execute: async () => {
      try {
        const { data } = await http.get("/staking/");
        return { text: adapter.codeBlock(JSON.stringify(data, null, 2)) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "STAKING_ERROR" }) };
      }
    },
  });

  // /pools
  api.registerCommand({
    name: "pools",
    description: "Show stability pool information",
    execute: async () => {
      try {
        const { data } = await http.get("/stability-pools/");
        const accounts: StabilityAccountData[] = (
          data as Record<string, unknown>[]
        ).map(mapStabilityAccount);
        return { text: formatStabilityList(adapter, accounts) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "POOLS_ERROR" }) };
      }
    },
  });

  // /polls
  api.registerCommand({
    name: "polls",
    description: "Show current governance polls",
    execute: async () => {
      try {
        const { data } = await http.get("/polls/");
        return { text: adapter.codeBlock(JSON.stringify(data, null, 2)) };
      } catch (e: any) {
        return { text: formatError(adapter, { message: e.message, code: "POLLS_ERROR" }) };
      }
    },
  });

  // =========================================================================
  // Service (placeholder)
  // =========================================================================

  api.registerService({
    name: "indigo-protocol-monitor",
    description: "Indigo Protocol monitoring service",
    start: async () => {
      console.log("[openclaw-indigo] monitor service started");
    },
    stop: async () => {
      console.log("[openclaw-indigo] monitor service stopped");
    },
  });
}
