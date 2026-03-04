# @indigoprotocol/indigo-oracle

Oracle Operations skill for the Indigo Protocol on Cardano.

> **Restricted use:** These tools are only available to designated oracle operators and protocol administrators. They are not intended for general users.

## Tools

| Tool | Description |
|------|-------------|
| `feed_interest_oracle` | Feed a new interest rate to the interest oracle for a given iAsset |
| `start_interest_oracle` | Initialize a new interest oracle (one-time admin setup) |

## Sub-Skills

| Sub-Skill | Description |
|-----------|-------------|
| [Interest Oracle](sub-skills/interest-oracle.md) | Feed data to and start the interest oracle |

## Installation

```bash
npm install @indigoprotocol/indigo-oracle
```

## License

MIT