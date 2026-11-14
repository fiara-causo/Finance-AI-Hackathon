import data from "@/data/consultants.json";

export type Consultant = (typeof data.consultants)[number];
export const serviceLabels: Record<string, string> = data.serviceLabels;
export const consultants = data.consultants;

export function findConsultants(need = "all", filters: string[] = []) {
  const requested = [...new Set([...(need === "all" ? [] : [need]), ...filters])];
  return consultants
    .map((consultant) => ({
      consultant,
      matches: requested.filter((service) => consultant.services.includes(service)),
    }))
    .filter(({ consultant, matches }) =>
      (need === "all" || consultant.services.includes(need)) &&
      (filters.length === 0 || filters.some((service) => matches.includes(service))),
    )
    .sort((a, b) => b.matches.length - a.matches.length)
    .map(({ consultant, matches }) => {
      const firstMatch = matches[0];
      const label = firstMatch ? serviceLabels[firstMatch] : undefined;
      return {
        consultant,
        reason: label ? `A match for ${label.toLowerCase()}${matches.length > 1 ? ` and ${matches.length - 1} more selected ${matches.length === 2 ? "service" : "services"}` : ""}.` : undefined,
      };
    });
}