export interface ProductImage {
    id: number;
    productId: number;
    enabled?: boolean;
    path: string;
    createdAt: Date;
    updatedAt: Date;
  }