# CDP Liquidation & Recovery

Handle CDP liquidation, redemption, freezing, and merging.

## Tools

### liquidate_cdp
Liquidate an undercollateralized CDP. Caller receives liquidation bonus.

### redeem_cdp
Redeem iAssets against a CDP at oracle price.

### freeze_cdp
Freeze a CDP to prevent further operations.

### merge_cdps
Merge multiple CDPs of the same iAsset type into a single position.
