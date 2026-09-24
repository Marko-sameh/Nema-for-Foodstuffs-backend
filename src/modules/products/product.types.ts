import { UnitType } from '@prisma/client';

export interface ProductVariant {
  id: string;
  weight_option_id: string;
  price: number;
  stock_in_grams: number | null;
  sku: string | null;
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  unit_type: UnitType;
  price_per_kg: number | null;
  fixed_price: number | null;
  thumbnail_url: string | null;
  brand: string | null;
  is_featured: boolean;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  isFeatured?: string;
  search?: string;
  page?: string;
  limit?: string;
}
