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

**Revenue Workspace**:
A revenue analytics page shaped around rapid business interpretation, not just chart display. It should help users understand current revenue, change over time, and which periods deserve deeper investigation.
_Avoid_: Revenue-only chart page, single-visual report

**Revenue Summary Band**:
The first row of the revenue workspace that gives users the quickest possible business read before they inspect charts. It should prioritise current total revenue, change versus the previous comparable period, and the strongest and weakest periods.
_Avoid_: KPI overload, alert-first layout

**Comparison Cue**:
Supplementary context around the main revenue trend that helps users interpret change without turning the page into a multi-series comparison tool. It should highlight directional change or previous-period context while preserving a single primary revenue line.
_Avoid_: Full comparison mode, chart overload

**Revenue Drilldown Path**:
The navigation path from an overall revenue signal into the domain-specific page best suited to explain it. Revenue analytics should act as a jump-off point into product, category, or customer analytics rather than trying to answer every diagnostic question itself.
_Avoid_: Self-contained root-cause page, dead-end KPI cards

**Incomplete Period**:
A time bucket whose data is still accumulating and therefore cannot be treated as directly comparable to a fully closed bucket. The revenue workspace should label incomplete periods clearly and avoid overstating period-over-period change from them.
_Avoid_: Silent partial period, implied full-period comparison

**Analytics Guidance State**:
An explicit page state used when revenue data is empty, sparse, or unavailable. The interface should explain what is missing and what the user can do next, rather than rendering misleading defaults or silent blanks.
_Avoid_: Console-only failure, fake zero state

**Period Ranking**:
The interpretation of best and worst periods as the highest and lowest absolute revenue periods within the selected grain. Momentum-style changes should be labelled separately rather than folded into best/worst language.
_Avoid_: Change-based best period, ambiguous ranking language
