export type OrderStatsResponse = {
  status: "received" | "delivering" | "complete" | "new";
  count: number;
};
