import { AnalyticsRepository } from "./analytics.repository";

function getDateRange(days: number): {
  from: Date;
  to: Date;
  truncUnit: "day" | "month";
} {
  const now = new Date();
  const to = new Date(now.getTime() + 24 * 60 * 60 * 1000); // exclusive upper bound: tomorrow

  const from = new Date(now);
  from.setDate(from.getDate() - (days - 1));
  from.setHours(0, 0, 0, 0);
  return { from, to, truncUnit: "day" };
}

export class AnalyticsService {
  private repository = new AnalyticsRepository();

  async getOverview() {
    const totalUsers = await this.repository.getTotalUsers();
    const totalOrders = await this.repository.getTotalOrders();
    const totalRevenue = await this.repository.getTotalRevenue();

    return { totalUsers, totalOrders, totalRevenue };
  }

  async getSales(days: number) {
    const { from, to, truncUnit } = getDateRange(days);
    const rows = await this.repository.getSalesByRange(from, to, truncUnit);

    return rows.map((r) => ({
      date:
        truncUnit === "day"
          ? new Date(r.bucket).toISOString().split("T")[0]
          : `${new Date(r.bucket).getFullYear()}-${String(new Date(r.bucket).getMonth() + 1).padStart(2, "0")}`,
      revenue: Number(r.revenue) || 0,
    }));
  }

  async getTopProducts(limit: number = 5) {
    const items = await this.repository.getTopProducts(limit);

    return items.map((i: any) => ({
      id: i.product_id,
      name: i.product_name_snapshot,
      totalSold: i._sum.quantity || 0,
      revenue: i._sum.total_price || 0,
    }));
  }
}
