export declare class AnalyticsRepository {
    getTotalUsers(): Promise<number>;
    getTotalOrders(): Promise<number>;
    getTotalRevenue(): Promise<number>;
    getSalesByRange(from: Date, to: Date, truncUnit: 'day' | 'month'): Promise<{
        bucket: Date;
        revenue: number;
    }[]>;
    getTopProducts(limit: number): Promise<(import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.OrderItemGroupByOutputType, ("product_id" | "product_name_snapshot")[]> & {
        _sum: {
            quantity: number | null;
            total_price: number | null;
        };
    })[]>;
}
//# sourceMappingURL=analytics.repository.d.ts.map