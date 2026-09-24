import { CreateCategoryInput, UpdateCategoryInput } from './category.dto';
export interface ActorContext {
    actorId?: string | null;
    ip?: string | null;
}
export declare class CategoryService {
    private repository;
    getAllCategories(query: any): Promise<{
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
        page: number;
        limit: number;
    }>;
    getCategoryBySlug(slug: string): Promise<{
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
    }>;
    createCategory(data: CreateCategoryInput, ctx?: ActorContext): Promise<{
        name: string;
        id: string;
        parent_id: string | null;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        image_url: string | null;
        is_active: boolean;
    }>;
    updateCategory(id: string, data: UpdateCategoryInput, ctx?: ActorContext): Promise<{
        name: string;
        id: string;
        parent_id: string | null;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        image_url: string | null;
        is_active: boolean;
    }>;
    deleteCategory(id: string, ctx?: ActorContext): Promise<void>;
}
//# sourceMappingURL=category.service.d.ts.map