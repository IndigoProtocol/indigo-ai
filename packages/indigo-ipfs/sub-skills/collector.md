# Collector

Query collector UTXOs for fee distribution in the Indigo Protocol.

## Tools

### get_collector_utxos

Get collector UTXOs that hold accumulated protocol fees. These UTXOs can be queried to inspect fee distribution state.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `length` | number | No | Maximum number of UTXOs to return |

## Examples

### List collector UTXOs

Use `get_collector_utxos` to retrieve the current set of collector UTXOs. Optionally pass `length` to limit the number of results.

### Inspect fee accumulation

Query collector UTXOs to see what protocol fees have accumulated and are available for distribution.
