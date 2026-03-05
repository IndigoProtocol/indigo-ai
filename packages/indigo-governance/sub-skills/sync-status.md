# Sync Status

Check the current chain synchronization status for the Indigo Protocol indexer.

## MCP Tools

### get_sync_status

Get the current chain synchronization status, including the latest synced block and sync progress.

**Parameters:** None

**Returns:** Sync status object with current block height, sync percentage, and timestamp.

## Examples

### Check if the indexer is fully synced

Verify that the Indigo indexer is up to date before relying on query results.

**Prompt:** "Is the Indigo indexer fully synced?"

**Workflow:**
1. Call `get_sync_status()` to get the current sync state
2. Compare synced block with the chain tip
3. Report sync percentage and any lag

**Sample response:**
```
Indexer Status: Fully Synced
Current block: 10,842,391
Chain tip: 10,842,391
Sync: 100%
Last updated: 2 seconds ago
```

### Diagnose stale data

When query results seem outdated, check if the indexer is behind the chain tip.

**Prompt:** "Why are my CDP balances not updating?"

**Workflow:**
1. Call `get_sync_status()` to check for sync lag
2. If behind, calculate the estimated catch-up time
3. Advise the user on when data will be current

**Sample response:**
```
Indexer Status: Syncing
Current block: 10,841,200
Chain tip: 10,842,391
Sync: 99.89% (1,191 blocks behind)
Estimated catch-up: ~4 minutes

Data may be stale. Wait for full sync before checking balances.
```

### Monitor indexer health

Periodically check the indexer to ensure it's keeping pace with the chain.

**Prompt:** "What block is the Indigo indexer at?"

**Workflow:**
1. Call `get_sync_status()` to get block height and timing
2. Present the current state with chain tip comparison

**Sample response:**
```
Indexer Block: 10,842,391
Chain Tip: 10,842,391
Status: In sync
Last block time: 2025-03-05 14:32:01 UTC
```

## Example Prompts

- "Is the Indigo indexer fully synced?"
- "What is the current sync status?"
- "What block is the Indigo indexer at?"
- "Is the indexer behind the chain tip?"
