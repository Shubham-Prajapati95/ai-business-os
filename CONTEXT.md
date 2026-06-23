# Product Analytics

This context covers how users inspect product performance in the analytics UI. It defines the user-facing concepts we want the page to support clearly and consistently.

## Language

**Product Selection**:
The interaction where a user chooses one or more products to analyze on the product analytics page. It must support both fast lookup of known products and easy browsing of the wider catalog.
_Avoid_: Product picking, product checkbox list

**Known-Product Lookup**:
The flow where a user already knows the product they want and expects to find it quickly by typing or narrowing results.
_Avoid_: Search only, direct select

**Catalog Browsing**:
The flow where a user explores the product catalog without knowing the exact product name in advance, using scanning, grouping, or sorting cues to discover candidates.
_Avoid_: Manual scrolling, hunting

**Comparison Mode**:
The default analysis mode where a user selects multiple products and evaluates them side by side in the same charts and summaries. The UI should help users keep comparisons readable rather than allowing unbounded selection without feedback.
_Avoid_: Unlimited overlay mode, single-focus default

**Filter Grouping**:
The structure used inside the product selection pane to make browsing manageable at catalog scale. Grouping should reflect meaningful business labels that help users scan the list, not just technical ordering.
_Avoid_: Flat unstructured list

**Revenue Display**:
The way monetary values are rendered in the analytics UI so users can read them quickly and accurately. On this page, revenue should use Indian digit grouping rather than unformatted or western-style separators.
_Avoid_: Raw numbers, western grouping by default
