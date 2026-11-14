import { describe, expect, it } from "vitest";
import { consultants, findConsultants, serviceLabels } from "@/lib/consultant-matching";

describe("Consultant matching", () => {
  it("shows exactly the four provided consultants by default", () => {
    expect(findConsultants().map(({ consultant }) => consultant.name)).toEqual([
      "Amanda Roberts", "Fiara Causo", "Maansi Nema", "Cindy Balaji",
    ]);
  });
  it("matches budget and forecast to Fiara", () => {
    expect(findConsultants("budget-forecast").map(({ consultant }) => consultant.slug)).toEqual(["fiara-causo"]);
  });
  it("matches loans and cash runway to Fiara and Cindy", () => {
    expect(findConsultants("loan-runway").map(({ consultant }) => consultant.slug)).toEqual(["fiara-causo", "cindy-balaji"]);
  });
  it("puts the consultant covering more selected services first and explains why", () => {
    const results = findConsultants("ma-readiness", ["compliance-controls", "loan-runway"]);
    expect(results.map(({ consultant }) => consultant.slug)).toEqual(["cindy-balaji", "amanda-roberts"]);
    expect(results[0]?.reason).toBe("A match for getting ready to buy or sell a business and 2 more selected services.");
  });
  it("returns no matches for incompatible dropdown and chip selections", () => {
    expect(findConsultants("budget-forecast", ["banking-track"])).toEqual([]);
  });
  it("has a label for every service and the exact requested photo paths", () => {
    expect(Object.keys(serviceLabels)).toHaveLength(15);
    for (const consultant of consultants) {
      expect(consultant.photo).toBe(`/consultants/${consultant.slug}.jpg`);
      for (const service of consultant.services) expect(serviceLabels[service]).toBeTruthy();
    }
  });
});