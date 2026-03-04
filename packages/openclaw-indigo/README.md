# @indigoprotocol/openclaw-indigo

OpenClaw plugin for the [Indigo Protocol](https://indigoprotocol.io) on Cardano. Brings Indigo Protocol functionality to Telegram, Discord, and Slack through the OpenClaw platform.

## Features

| Feature | Description |
|---------|-------------|
| MCP Integration | Indigo MCP server integration via OpenClaw |
| Chat Interfaces | Telegram, Discord, and Slack bot support |
| CDP Management | Create, adjust, and close CDPs from chat |
| Price Alerts | Configurable alerts for iAsset and INDY prices |
| Portfolio Tracking | Track wallet positions and get notifications |

## Setup

1. Install the plugin in your OpenClaw instance
2. Configure the Indigo MCP server connection
3. Connect your Telegram, Discord, or Slack bot

```json
{
  "mcpServers": {
    "indigo": {
      "command": "npx",
      "args": ["@indigoprotocol/indigo-mcp"]
    }
  }
}
```

## Development

```bash
npm install
npm run build
```

## License

MIT — 3rd Eye Labs
