export declare class SearchService {
    private repository;
    search(query: string, page: number, limit: number): Promise<{
        products: {
            data: ({
                weight_variants: ({
                    weight_option: {
                        id: string;
                        label: string;
                        is_active: boolean;
                        value_in_grams: number;
                    };
                } & {
                    id: string;
                    product_id: string;
                    stock_in_grams: number | null;
                    sku: string | null;
                    weight_option_id: string;
                    price: number;
                })[];
            } & {
                name: string;
                id: string;
                created_at: Date;
                updated_at: Date;
                name_ar: string | null;
                name_en: string | null;
                slug: string;
                is_active: boolean;
                category_id: string;
                description: string | null;
                description_ar: string | null;
                description_en: string | null;
                unit_type: import("@prisma/client").$Enums.UnitType;
                price_per_kg: number | null;
                fixed_price: number | null;
                stock_in_grams: number;
                sku: string;
                thumbnail_url: string | null;
                brand: string | null;
                is_featured: boolean;
                search_text: string | null;
            })[];
            total: number;
            page: number;
            limit: number;
        };
        categories: {
            name: string;
            id: string;
            parent_id: string | null;
            name_ar: string | null;
            name_en: string | null;
            slug: string;
            image_url: string | null;
            is_active: boolean;
        }[];
    }>;
}
//# sourceMappingURL=search.service.d.ts.map