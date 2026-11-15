export const systems = [
  { name: "Shopify", detail: "Orders and payouts", tile: "Sh", tint: "bg-chart-2" },
  { name: "Stripe", detail: "Payments and fees", tile: "St", tint: "bg-chart-3" },
  { name: "Your bank", detail: "Checking 4821", tile: "Bk", tint: "bg-chart-1" },
  { name: "QuickBooks", detail: "Your ledger", tile: "QB", tint: "bg-chart-4" },
] as const;

export const bankLines = [
  ["Oct 02", "SHOPIFY PAYMENTS PAYOUT SP-1001", "$1,281.04", "Sales payout (to reconcile)"],
  ["Oct 05", "SBA LOAN PMT", "−$1,412.66", "Loan payment"],
  ["Oct 06", "ACH PMT HOLLIS GROUP", "−$2,850.00", "Needs you"],
  ["Oct 09", "NETFLIX.COM", "−$22.99", "Needs you"],
  ["Oct 12", "PAYMENT TO LINEN MILL CO", "−$18,400.00", "Inventory purchases"],
  ["Oct 14", "ADP PAYROLL FUNDING", "−$11,464.73", "Payroll (to reconcile)"],
  ["Oct 19", "GOOGLE *ADS", "−$3,200.00", "Marketing"],
] as const;

export const cashProjection = [
  { date: "Oct 31", cash: 42310.55 },
  { date: "Nov 7", cash: 47120 },
  { date: "Nov 14", cash: 8610 },
  { date: "Nov 21", cash: 19440 },
  { date: "Nov 28", cash: 27930 },
  { date: "Dec 5", cash: 33210 },
];
export const cashFloor = 10000;
export const monthlyPrice = 499;

export type DemoState = { connected: string[]; remaining: number; taxResolved: boolean; category: string; remember: boolean; toast: string };
export const initialDemoState: DemoState = { connected: [], remaining: 6, taxResolved: false, category: "Inventory purchases", remember: false, toast: "" };
export type DemoAction =
  | { type: "connect"; name: string }
  | { type: "category"; value: string }
  | { type: "remember"; value: boolean }
  | { type: "confirm" }
  | { type: "clear" }
  | { type: "resolve-tax" }
  | { type: "dismiss-toast" };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "connect": return state.connected.includes(action.name) ? state : { ...state, connected: [...state.connected, action.name] };
    case "category": return { ...state, category: action.value };
    case "remember": return { ...state, remember: action.value };
    case "confirm": return state.remaining === 0 ? state : { ...state, remaining: state.remaining - 1, toast: state.remember ? "Saved. Applied to 1 other Hollis payment." : "Saved." };
    case "clear": return { ...state, remaining: 0 };
    case "resolve-tax": return { ...state, taxResolved: true };
    case "dismiss-toast": return { ...state, toast: "" };
  }
}