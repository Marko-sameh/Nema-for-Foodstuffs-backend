import { CreateProductInput, UpdateProductInput, AddProductImageInput } from './product.dto';
export interface ActorContext {
    actorId?: string | null;
    ip?: string | null;
}
export declare class ProductService {
    private repository;
    getProducts(query: any): Promise<{
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
        page: number;
        limit: number;
    }>;
    getProductBySlug(slug: string, isAdmin: boolean): Promise<{
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
    }>;
    createProduct(data: CreateProductInput, ctx?: ActorContext): Promise<any>;
    updateProduct(id: string, data: UpdateProductInput, ctx?: ActorContext): Promise<any>;
    deleteProduct(id: string, ctx?: ActorContext): Promise<void>;
    addProductImage(productId: string, data: AddProductImageInput): Promise<{
        id: string;
        product_id: string;
        url: string;
        sort_order: number;
    }>;
    deleteProductImage(productId: string, imgId: string): Promise<void>;
}
//# sourceMappingURL=product.service.d.ts.map