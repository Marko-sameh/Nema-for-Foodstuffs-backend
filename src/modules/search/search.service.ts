import { SearchRepository } from './search.repository';
import { normalizeSearchText } from './arabic';

export class SearchService {
  private repository = new SearchRepository();

  async search(query: string, page: number, limit: number) {
    if (!query || query.length < 2) {
      return { products: { data: [], total: 0, page, limit }, categories: [] };
    }

    const normalized = normalizeSearchText(query);
    const skip = (page - 1) * limit;

    const [{ data, total }, categories] = await Promise.all([
      this.repository.searchProducts(normalized, skip, limit),
      this.repository.searchCategories(query, 10),
    ]);

    return {
      products: { data, total, page, limit },
      categories,
    };
  }
}
