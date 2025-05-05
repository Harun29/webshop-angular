import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto } from '../models/product.model';
import { ProductRequestDto, UpdateProductRequestDto } from '../models/product.model';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(
    name?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    minStock?: number,
    sortBy: string = 'name',
    sortOrder: string = 'asc'
  ): Observable<ProductDto[]> {
    let params = new HttpParams()
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    if (name) params = params.set('name', name);
    if (category) params = params.set('category', category);
    if (minPrice != null) params = params.set('minPrice', minPrice.toString());
    if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString());
    if (minStock != null) params = params.set('minStock', minStock.toString());

    return this.http.get<ProductDto[]>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/category/${category}`);
  }

  createProduct(product: ProductRequestDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.apiUrl, product, { withCredentials: true });
  }

  updateProduct(id: number, product: UpdateProductRequestDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/${id}`, product, { withCredentials: true });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  updateStock(id: number, quantity: number): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/update-stock/${id}/${quantity}`, {}, { withCredentials: true });
  }
}
