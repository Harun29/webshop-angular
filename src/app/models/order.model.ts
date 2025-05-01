import {ProductDto} from './product.model';

export type OrderDto = {
  id: number;
  products: ProductDto[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

export type OrderRequest = {
  productId: number;
  quantity: number;
  shippingAddress: string;
  paymentMethod: string;
};
