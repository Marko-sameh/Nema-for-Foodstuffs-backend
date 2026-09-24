import { CreateProductInput, UpdateProductInput, AddProductImageInput } from './product.dto';
export declare class ProductRepository {
    findAll(query: any): Promise<{
        data: ({
            category: {
                name: string;
                name_ar: string | null;
                name_en: string | null;
                slug: string;
            };
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
    }>;
    findBySlug(slug: string, includeInactive: boolean): Promise<({
        category: {
            name: string;
            id: string;
            parent_id: string | null;
            name_ar: string | null;
            name_en: string | null;
            slug: string;
            image_url: string | null;
            is_active: boolean;
        };
        images: {
            id: string;
            product_id: string;
            url: string;
            sort_order: number;
        }[];
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
    }) | null>;
    findById(id: string): Promise<({
        weight_variants: {
            id: string;
            product_id: string;
            stock_in_grams: number | null;
            sku: string | null;
            weight_option_id: string;
            price: number;
        }[];
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
    }) | null>;
    findImageForProduct(productId: string, imgId: string): Promise<{
        id: string;
        product_id: string;
        url: string;
        sort_order: number;
    } | null>;
    countOrderItemsForProduct(productId: string): Promise<number>;
    create(data: CreateProductInput, slug: string): Promise<any>;
    update(id: string, data: UpdateProductInput, newSlug?: string): Promise<any>;
    delete(id: string): Promise<{
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
    }>;
    addImage(productId: string, data: AddProductImageInput): Promise<{
        id: string;
        product_id: string;
        url: string;
        sort_order: number;
    }>;
    deleteImage(id: string): Promise<{
        id: string;
        product_id: string;
        url: string;
        sort_order: number;
    }>;
}
//# sourceMappingURL=product.repository.d.ts.map