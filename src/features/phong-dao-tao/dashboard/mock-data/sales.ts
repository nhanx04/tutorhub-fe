// Mock sales data: Units (bar) + Total Transaction USD (line)
export type SalesPoint = { month: string; units: number; totalUSD: number };

export const salesData: SalesPoint[] = [
  { month: 'Jan', units: 50, totalUSD: 1200 },
  { month: 'Feb', units: 100, totalUSD: 3000 },
  { month: 'Mar', units: 30, totalUSD: 1800 },
  { month: 'Apr', units: 110, totalUSD: 6000 },
  { month: 'May', units: 90, totalUSD: 4500 },
  { month: 'Jun', units: 150, totalUSD: 7800 },
];
