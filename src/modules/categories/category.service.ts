import { createUniqueSlug } from '../../shared/utils/slugify';
import { CategoryRepository } from './category.repository';
import { getPaginationData } from '../../shared/utils/paginate';
import { writeAuditLog } from '../../shared/utils/audit-log';
import { prisma } from '../../config/db';
import { CreateCategoryInput, UpdateCategoryInput } from './category.dto';

export interface ActorContext {
  actorId?: string | null;
  ip?: string | null;
}

export class CategoryService {
  private repository = new CategoryRepository();

  async getAllCategories(query: any) {
    const { skip, take, page, limit } = getPaginationData(query);
    const { data, total } = await this.repository.findAllTree({ skip, take });
    return { data, total, page, limit };
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.repository.findBySlug(slug);
    if (!category) throw { statusCode: 404, message: 'Category not found' };
    return category;
  }

  async createCategory(data: CreateCategoryInput, ctx: ActorContext = {}) {
    const slug = createUniqueSlug(data.nameEn || data.name);

    if (data.parentId) {
      const parent = await this.repository.findById(data.parentId);
      if (!parent) throw { statusCode: 400, message: 'Parent category not found' };
    }

    const category = await this.repository.create(data, slug);
    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'CREATE',
      entity: 'Category',
      entityId: category.id,
      after: category,
      ip: ctx.ip,
    });
    return category;
  }

  async updateCategory(id: string, data: UpdateCategoryInput, ctx: ActorContext = {}) {
    const category = await this.repository.findById(id);
    if (!category) throw { statusCode: 404, message: 'Category not found' };

    let newSlug;
    const nextName = data.nameEn || data.name;
    if (nextName && nextName !== category.name) {
      newSlug = createUniqueSlug(nextName);
    }

    if (data.parentId && data.parentId !== category.parent_id) {
       // Prevent self-referencing
       if (data.parentId === id) throw { statusCode: 400, message: 'Category cannot be its own parent' };
       const parent = await this.repository.findById(data.parentId);
       if (!parent) throw { statusCode: 400, message: 'Parent category not found' };

       let currentParent = parent;
       while (currentParent.parent_id) {
         if (currentParent.parent_id === id) {
           throw { statusCode: 400, message: 'Cannot set a descendant as a parent category' };
         }
         const grandParent = await this.repository.findById(currentParent.parent_id);
         if (!grandParent) break;
         currentParent = grandParent;
       }
    }

    const updated = await this.repository.update(id, data, newSlug);
    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'UPDATE',
      entity: 'Category',
      entityId: id,
      before: category,
      after: updated,
      ip: ctx.ip,
    });
    return updated;
  }

  async deleteCategory(id: string, ctx: ActorContext = {}) {
    const category = await this.repository.findById(id);
    if (!category) throw { statusCode: 404, message: 'Category not found' };

    const childrenCount = await this.repository.countChildren(id);
    if (childrenCount > 0) {
      throw { statusCode: 400, message: 'Cannot delete a category that contains subcategories' };
    }

    const productsCount = await this.repository.countProducts(id);
    if (productsCount > 0) {
      throw { statusCode: 400, message: 'Cannot delete a category that contains products' };
    }

    await this.repository.delete(id);
    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'DELETE',
      entity: 'Category',
      entityId: id,
      before: category,
      ip: ctx.ip,
    });
  }
}
