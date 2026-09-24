import { createUniqueSlug } from '../../shared/utils/slugify';
import { getPaginationData } from '../../shared/utils/paginate';
import { writeAuditLog } from '../../shared/utils/auditLog';
import { prisma } from '../../config/db';
import { ProductRepository } from './product.repository';
import { CreateProductInput, UpdateProductInput, AddProductImageInput } from './product.dto';

export interface ActorContext {
  actorId?: string | null;
  ip?: string | null;
}

export class ProductService {
  private repository = new ProductRepository();

  async getProducts(query: any) {
    const { skip, take, page, limit } = getPaginationData(query);
    const { data, total } = await this.repository.findAll({ ...query, skip, take });
    return { data, total, page, limit };
  }

  async getProductBySlug(slug: string, isAdmin: boolean) {
    const product = await this.repository.findBySlug(slug, isAdmin);
    if (!product) throw { statusCode: 404, message: 'Product not found' };
    return product;
  }

  async createProduct(data: CreateProductInput, ctx: ActorContext = {}) {
    const slug = createUniqueSlug(data.nameEn || data.name);
    const product = await this.repository.create(data, slug);
    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'CREATE',
      entity: 'Product',
      entityId: product.id,
      after: product,
      ip: ctx.ip,
    });
    return product;
  }

  async updateProduct(id: string, data: UpdateProductInput, ctx: ActorContext = {}) {
    const product = await this.repository.findById(id);
    if (!product) throw { statusCode: 404, message: 'Product not found' };

    let newSlug: string | undefined;
    const nextName = data.nameEn || data.name;
    if (nextName && nextName !== (product as any).name_en && nextName !== product.name) {
      newSlug = createUniqueSlug(nextName);
    }

    const updated = await this.repository.update(id, data, newSlug);
    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'UPDATE',
      entity: 'Product',
      entityId: id,
      before: product,
      after: updated,
      ip: ctx.ip,
    });
    return updated;
  }

  async deleteProduct(id: string, ctx: ActorContext = {}) {
    const product = await this.repository.findById(id);
    if (!product) throw { statusCode: 404, message: 'Product not found' };

    const orderItemsCount = await this.repository.countOrderItemsForProduct(id);
    if (orderItemsCount > 0) {
      throw { statusCode: 400, message: 'Cannot delete a product that appears in existing orders' };
    }

    await this.repository.delete(id);
    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'DELETE',
      entity: 'Product',
      entityId: id,
      before: product,
      ip: ctx.ip,
    });
  }

  async addProductImage(productId: string, data: AddProductImageInput) {
    const product = await this.repository.findById(productId);
    if (!product) throw { statusCode: 404, message: 'Product not found' };
    return this.repository.addImage(productId, data);
  }

  async deleteProductImage(productId: string, imgId: string) {
    const image = await this.repository.findImageForProduct(productId, imgId);
    if (!image) throw { statusCode: 404, message: 'Product image not found' };
    await this.repository.deleteImage(imgId);
  }
}
