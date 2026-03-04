# IPFS Storage

Store and retrieve data on IPFS for the Indigo Protocol.

## Tools

### store_on_ipfs

Store text content on IPFS. Returns the content identifier (CID) that can be used to retrieve the data later.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | string | Yes | Text content to store on IPFS |

### retrieve_from_ipfs

Retrieve content from IPFS using a content identifier (CID).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cid` | string | Yes | IPFS content identifier (CID) |

## Examples

### Store content on IPFS

Use `store_on_ipfs` with the text you want to persist. The returned CID is an immutable reference to that content.

### Retrieve content from IPFS

Use `retrieve_from_ipfs` with a known CID to fetch the stored text content.
