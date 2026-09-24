import { z } from 'zod';
export declare const productWeightVariantSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    weightOptionId: z.ZodString;
    price: z.ZodNumber;
    stockInGrams: z.ZodOptional<z.ZodNumber>;
    sku: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        categoryId: z.ZodString;
        name: z.ZodString;
        nameAr: z.ZodOptional<z.ZodString>;
        nameEn: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        descriptionAr: z.ZodOptional<z.ZodString>;
        descriptionEn: z.ZodOptional<z.ZodString>;
        unitType: z.ZodEnum<{
            WEIGHT: "WEIGHT";
            PIECE: "PIECE";
        }>;
        pricePerKg: z.ZodOptional<z.ZodNumber>;
        fixedPrice: z.ZodOptional<z.ZodNumber>;
        stockInGrams: z.ZodNumber;
        sku: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        brand: z.ZodOptional<z.ZodString>;
        isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        isFeatured: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        weightVariants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            weightOptionId: z.ZodString;
            price: z.ZodNumber;
            stockInGrams: z.ZodOptional<z.ZodNumber>;
            sku: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        categoryId: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        nameAr: z.ZodOptional<z.ZodString>;
        nameEn: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        descriptionAr: z.ZodOptional<z.ZodString>;
        descriptionEn: z.ZodOptional<z.ZodString>;
        unitType: z.ZodOptional<z.ZodEnum<{
            WEIGHT: "WEIGHT";
            PIECE: "PIECE";
        }>>;
        pricePerKg: z.ZodOptional<z.ZodNumber>;
        fixedPrice: z.ZodOptional<z.ZodNumber>;
        stockInGrams: z.ZodOptional<z.ZodNumber>;
        sku: z.ZodOptional<z.ZodString>;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        brand: z.ZodOptional<z.ZodString>;
        isActive: z.ZodOptional<z.ZodBoolean>;
        isFeatured: z.ZodOptional<z.ZodBoolean>;
        weightVariants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            weightOptionId: z.ZodString;
            price: z.ZodNumber;
            stockInGrams: z.ZodOptional<z.ZodNumber>;
            sku: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const productIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const productSlugParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        slug: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const addProductImageSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        url: z.ZodString;
        sortOrder: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteProductImageSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
        imgId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const productSortEnum: z.ZodEnum<{
    name: "name";
    newest: "newest";
    price_asc: "price_asc";
    price_desc: "price_desc";
}>;
export declare const getAllProductsSchema: z.ZodObject<{
    query: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        categories: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string[] | undefined, string | undefined>>;
        brand: z.ZodOptional<z.ZodString>;
        brands: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string[] | undefined, string | undefined>>;
        isFeatured: z.ZodPipe<z.ZodOptional<z.ZodEnum<{
            true: "true";
            false: "false";
        }>>, z.ZodTransform<boolean, "true" | "false" | undefined>>;
        search: z.ZodOptional<z.ZodString>;
        minPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        maxPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            name: "name";
            newest: "newest";
            price_asc: "price_asc";
            price_desc: "price_desc";
        }>>>;
        page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ProductSort = z.infer<typeof productSortEnum>;
export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
export type AddProductImageInput = z.infer<typeof addProductImageSchema>['body'];
//# sourceMappingURL=product.dto.d.ts.map