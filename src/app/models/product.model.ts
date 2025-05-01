export type ProductDto = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type ProductRequestDto = {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  imageUrl: string;
};

export type UpdateProductRequestDto = {
  name?: string;
  description?: string;
  price?: number;
  stockQuantity?: number;
  category?: string;
  imageUrl?: string;
};
