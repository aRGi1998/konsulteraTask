import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private products: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor() { }
  
  addProduct(product: any) {
    const currentProducts = this.products.getValue();
    const updatedProducts = [...currentProducts, product];
    this.products.next(updatedProducts);
  }

  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }
  updateProduct(updatedProduct: any): void {
    this.products$
      .pipe(
        map(products => {
          const updatedProducts = products.map(product => {
            if (product.id === updatedProduct.id) {
              return { ...product, ...updatedProduct };
            }
            return product;
          });
          return updatedProducts;
        })
      )
      .subscribe(updatedProducts => {
        this.productsSubject.next(updatedProducts);
      });
  }

}