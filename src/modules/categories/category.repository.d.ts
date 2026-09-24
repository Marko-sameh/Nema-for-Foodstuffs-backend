import { CreateCategoryInput, UpdateCategoryInput } from './category.dto';
export declare class CategoryRepository {
    findAllTree(query?: any): Promise<{
        data: ({
            children: ({
                children: {
                    name: string;
                    id: string;
                    parent_id: string | null;
                    name_ar: string | null;
                    name_en: string | null;
                    slug: string;
                    image_url: string | null;
                    is_active: boolean;
                }[];
            } & {
                name: string;
                id: string;
                parent_id: string | null;
                name_ar: string | null;
                name_en: string | null;
                slug: string;
                image_url: string | null;
                is_active: boolean;
            })[];
        } & {
            name: string;
            id: string;
            parent_id: string | null;
            name_ar: string | null;
            name_en: string | null;
            slug: string;
            image_url: string | null;
            is_active: boolean;
        })[];
        total: number;
    }>;
    findBySlug(slug: string): Promise<({
        parent: {
            name: string;
            id: string;
            parent_id: string | null;
            name_ar: string | null;
            name_en: string | null;
            slug: string;
            image_url: string | null;
            is_active: boolean;
        } | null;
        children: {
            name: string;
            id: string;
            parent_id: string | null;
            name_ar: string | null;
            name_en: string | null;
            slug: string;
            image_url: string | null;
            is_active: boolean;
        }[];
    } & {
        name: string;
        id: string;
        parent_id: string | null;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        image_url: string | null;
        is_active: boolean;
    }) | null>;
    findById(id: string): Promise<{
        name: string;
        id: string;
        parent_id: string | null;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        image_url: string | null;
        is_active: boolean;
    } | null>;
    create(data: CreateCategoryInput, slug: string): Promise<{
        name: string;
        id: string;
        parent_id: string | null;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        image_url: string | null;
        is_active: boolean;
    }>;
    update(id: string, data: UpdateCategoryInput, newSlug?: string): Promise<{
        name: string;
        id: string;
        parent_id: string | null;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        image_url: string | null;
        is_active: boolean;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        parent_id: string | null;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        image_url: string | null;
        is_active: boolean;
    }>;
    countChildren(id: string): Promise<number>;
    countProducts(categoryId: string): Promise<number>;
}
//# sourceMappingURL=category.repository.d.ts.map