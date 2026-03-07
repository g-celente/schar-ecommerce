export interface ProductFiltersState {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
  sortBy: "price_asc" | "price_desc" | "newest" | "rating";
  page: number;
}
