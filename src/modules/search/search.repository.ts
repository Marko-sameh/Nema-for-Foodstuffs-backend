import { prisma } from '../../config/db';

export class SearchRepository {
  async searchProducts(normalizedQuery: string, skip: number, take: number) {
    const where = {
      is_active: true,
      search_text: { contains: normalizedQuery, mode: 'insensitive' as const },
    };

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          weight_variants: { include: { weight_option: true } },
        },
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    return { data, total };
  }

  async searchCategories(query: string, limit: number) {
    return prisma.category.findMany({
      where: {
        is_active: true,
        name: { contains: query, mode: 'insensitive' },
      },
      take: limit,
    });
  }
}
