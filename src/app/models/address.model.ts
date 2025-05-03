export type Address = {
  id: number;
  country: string;
  city: string;
  postalCode: string;
  street: string;
}

export interface AddressRequestDto {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface AddressDto extends AddressRequestDto {
  id: number;
}

export interface UpdateAddressRequest {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

