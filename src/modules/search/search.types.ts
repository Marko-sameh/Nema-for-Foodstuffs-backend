export interface SearchResult {
  products: any[];
  categories: any[];
}

export interface SearchQuery {
  q: string;
  limit?: number;
}
