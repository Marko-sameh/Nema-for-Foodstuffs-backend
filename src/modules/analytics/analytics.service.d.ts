export declare class AnalyticsService {
    private repository;
    getOverview(): Promise<{
        totalUsers: number;
        totalOrders: number;
        totalRevenue: number;
    }>;
    getSales(period: 'daily' | 'monthly'): Promise<{
        date: string | undefined;
        revenue: number;
    }[]>;
    getTopProducts(limit?: number): Promise<{
        productId: any;
        name: any;
        quantitySold: any;
        revenue: any;
    }[]>;
}
//# sourceMappingURL=analytics.service.d.ts.map