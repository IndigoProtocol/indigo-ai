# @indigoprotocol/indigo-data

Data and analytics skills for the [Indigo Protocol](https://indigoprotocol.io) on Cardano.

## Skills

| Skill | Description |
|-------|-------------|
| indigo-assets | Query iAsset prices, ADA, and INDY token data |
| indigo-analytics | Protocol TVL, statistics, APR rewards, DEX yields |
| indigo-governance | Protocol parameters, polls, and sync status |
| indigo-dex | SteelSwap tokens/estimates, Iris pools, wallet balances |
| indigo-oracle | Interest oracle operations |
| indigo-ipfs | IPFS storage and collector UTXOs |

## Install

```bash
# Agent Skills CLI
npx skills add IndigoProtocol/indigo-ai

# Branded installer
npx @indigoprotocol/indigo-skills

# npm
npm install @indigoprotocol/indigo-data
```

## MCP Server

All tools require the `@indigoprotocol/indigo-mcp` server:

```bash
npx @indigoprotocol/indigo-mcp
```

## License

MIT
