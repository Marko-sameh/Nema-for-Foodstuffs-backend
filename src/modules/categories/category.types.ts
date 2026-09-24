export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  is_active: boolean;
  parent_id: string | null;
  children?: CategoryNode[];
}
