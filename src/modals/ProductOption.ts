export interface ProductOption {
    id: number;
    productId: number;
    title: string;
    shape?: 'Square' | 'Circle';
    radius?: number;
    type?: 'Text' | 'Color';
    values: string;
    createdAt: Date;
    updatedAt: Date;
  }