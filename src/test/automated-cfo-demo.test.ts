import { describe, expect, it } from "vitest";
import { cashFloor, cashProjection, demoReducer, initialDemoState, monthlyPrice, systems } from "@/lib/automated-cfo-demo";

describe("Automated CFO sample rules", () => {
  it("connects exactly four tools without counting repeated clicks", () => {
    let state = initialDemoState;
    for (const system of systems) state = demoReducer(state, { type: "connect", name: system.name });
    state = demoReducer(state, { type: "connect", name: "Shopify" });
    expect(state.connected).toEqual(["Shopify", "Stripe", "Your bank", "QuickBooks"]);
  });
  it("starts with six reviews and removes one per confirmation", () => {
    expect(initialDemoState.remaining).toBe(6);
    expect(demoReducer(initialDemoState, { type: "confirm" }).remaining).toBe(5);
  });
  it("clears the remaining reviews and never counts below zero", () => {
    const cleared = demoReducer(initialDemoState, { type: "clear" });
    expect(cleared.remaining).toBe(0);
    expect(demoReducer(cleared, { type: "confirm" }).remaining).toBe(0);
  });
  it("saves the selected category and remember choice in demo state", () => {
    const selected = demoReducer(initialDemoState, { type: "category", value: "Supplies" });
    const remembered = demoReducer(selected, { type: "remember", value: true });
    expect(demoReducer(remembered, { type: "confirm" })).toMatchObject({ category: "Supplies", remember: true, remaining: 5 });
  });
  it("resolves the sales tax exception only after the choice", () => {
    expect(initialDemoState.taxResolved).toBe(false);
    expect(demoReducer(initialDemoState, { type: "resolve-tax" }).taxResolved).toBe(true);
  });
  it("projects the November 14 low point beneath the $10,000 floor", () => {
    expect(cashFloor).toBe(10000);
    expect(cashProjection.find(point => point.date === "Nov 14")?.cash).toBe(8610);
    expect(Math.min(...cashProjection.map(point => point.cash))).toBeLessThan(cashFloor);
  });
  it("prices the automated plan at $499 monthly", () => {
    expect(monthlyPrice).toBe(499);
  });
});