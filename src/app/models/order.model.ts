import {ProductDto} from './product.model';
import {AddressDto, AddressRequestDto} from './address.model';

export type OrderDto = {
  id: number;
  products: ProductDto[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

export interface OrderRequest {
  items: {
    productId: number;
    quantity: number;
  }[];
  addressId: number;
  paymentMethod: string;
}


