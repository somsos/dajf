import { ProductResponse } from './ProductResponse';

export interface FindProductsPageResponse {
  content: ProductResponse[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
