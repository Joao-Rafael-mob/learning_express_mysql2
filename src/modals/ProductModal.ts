import { ProductCategory } from "./ProductCategoryModal";
import { ProductImage } from "./ProductImageModal";
import { ProductOption } from "./ProductOption";

export interface Product {
  id: number;
  enabled?: boolean;
  name: string;
  slug: string;
  useInMenu?: boolean;
  stock?: number;
  description?: string;
  price: number;
  priceWithDiscount: number;
  createdAt: Date;
  updatedAt: Date;
  ProductImage: ProductImage[];
  ProductOption: ProductOption[];
  ProductCategory: ProductCategory[];
}
