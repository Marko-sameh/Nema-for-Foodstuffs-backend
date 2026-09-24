import { prisma } from '../../config/db';

export class AnalyticsRepository {
  async getTotalUsers() {
    return prisma.user.count({ where: { role: 'CUSTOMER' } });
  }

  async getTotalOrders() {
    return prisma.order.count();
  }

  async getTotalRevenue() {
    const result = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'CANCELLED' } },
    });
    return result._sum.total || 0;
  }

  async getSalesByRange(from: Date, to: Date, truncUnit: 'day' | 'month') {
    return prisma.$queryRaw<Array<{ bucket: Date; revenue: number }>>`
      SELECT date_trunc(${truncUnit}, created_at) AS bucket, COALESCE(SUM(total), 0)::float AS revenue
      FROM orders
      WHERE status != 'CANCELLED' AND created_at >= ${from} AND created_at < ${to}
      GROUP BY bucket
      ORDER BY bucket ASC
    `;
  }

  async getTopProducts(limit: number) {
    return prisma.orderItem.groupBy({
      by: ['product_id', 'product_name_snapshot'],
      _sum: { quantity: true, total_price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit,
    });
  }
}
