---
name: openclaw-indigo
description: "Indigo Protocol integration for OpenClaw with CDP management, price alerts, and portfolio tracking."
allowed-tools: Read, Glob, Grep
license: MIT
metadata:
  author: indigoprotocol
  version: '0.1.0'
---

# OpenClaw Indigo Plugin

Indigo Protocol integration for the OpenClaw platform. Enables CDP management, price alerts, and portfolio tracking through Telegram, Discord, and Slack.

## Features

- Indigo MCP integration via OpenClaw
- Telegram, Discord, and Slack bot support
- CDP management from chat
- Price alerts for iAssets and INDY
- Portfolio tracking and notifications

## Commands

| Command | Description |
|---------|-------------|
| `/cdp list` | List your CDPs |
| `/cdp open <asset> <amount>` | Open a new CDP |
| `/cdp deposit <address> <amount>` | Add collateral |
| `/cdp withdraw <address> <amount>` | Withdraw collateral |
| `/cdp close <address>` | Close a CDP |
| `/cdp health [address]` | Check CDP health |
| `/cdp mint <address> <amount>` | Mint iAssets |
| `/cdp burn <address> <amount>` | Burn iAssets |
| `/price <asset>` | Get iAsset price |
| `/price ada` | Get ADA price |
| `/price indy` | Get INDY price |
| `/price all` | Get all prices |
| `/stake info` | Staking overview |
| `/stake list` | List staking positions |
| `/stake open <amount>` | Open staking position |
| `/stake adjust <address> <amount>` | Adjust position |
| `/stake close <address>` | Close position |
| `/portfolio [address]` | Full portfolio summary |
| `/balance [address]` | Check wallet balances |
| `/tvl` | Protocol TVL |
| `/stats` | Protocol statistics |

## Alerts

| Alert | Description |
|-------|-------------|
| Price Above/Below | Threshold alerts for any iAsset or INDY |
| Price Change | Percentage change alerts |
| iUSD Depeg | Alert when iUSD deviates from $1.00 peg |
| Low Collateral Ratio | CDP health warnings |
| Liquidation Risk | CDP approaching liquidation |
| Liquidated | CDP liquidation notification |
| Reward Distribution | INDY staking rewards distributed |
| New Poll | Governance poll created |
| Poll Ending | Governance poll about to close |

## Setup

Configure the plugin in your OpenClaw instance with the Indigo MCP server connection.
