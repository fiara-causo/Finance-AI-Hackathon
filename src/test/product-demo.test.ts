import { describe, expect, it } from "vitest";
import demo from "@/data/product-demo.json";

// The preview page shows numbers read from a real statement. These checks stop the sample data
// from drifting out of sync with itself.
describe("product demo data", () => {
  it("has 85 rows that add up from the opening to the closing balance", () => {
    const sum = demo.rows.reduce((a, r) => a + r.amount, 0);
    expect(demo.rows).toHaveLength(85);
    expect(Math.round((demo.statement.opening + sum) * 100) / 100).toBe(demo.statement.closing);
  });
  it("gives every row a source and a confidence", () => {
    expect(
      demo.rows.every((r) => /^p\d+-r\d+$/.test(r.source) && r.confidence > 0 && r.confidence <= 1),
    ).toBe(true);
  });
  it("labels estimated profit lines", () => {
    const est = demo.pnl.filter((l) => l.kind.includes("est")).map((l) => l.label);
    expect(est).toContain("Operating profit");
    expect(est).toContain("Inventory purchases");
  });
});
