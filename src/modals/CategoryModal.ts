export interface Category {
    id: number;
    name: string;
    slug: string;
    useInMenu?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }