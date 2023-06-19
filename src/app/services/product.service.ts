import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  items: any[] = []; // array to hold remove items
  wishlist: any[] = []; //array to hold wishlist items

  constructor() { }

  private products: Product[] = [
    { id: 1, name: 'Black Tea', price: 10, imagePath: 'assets/images/product2.jpg', description: 'Black Tea: Special Seeds.Tea is a popular drink made from the leaves and buds of a plant called Camellia sinensis, which grows in tropical and subtropical regions.', qty: 1 , isInWishlist: false},
    { id: 2, name: 'Masala Tea', price: 15.5, imagePath: 'assets/images/product3.jpg', description: 'Masala Tea: Full of Masala.Tea is a popular drink made from the leaves and buds of a plant called Camellia sinensis, which grows in tropical and subtropical regions.', qty: 1, isInWishlist: false },
    { id: 3, name: 'Milk Tea', price: 18.99, imagePath: 'assets/images/product4.jpg', description: 'Milk Tea: Pure Milk.Tea is a popular drink made from the leaves and buds of a plant called Camellia sinensis, which grows in tropical and subtropical regions.', qty: 1 , isInWishlist: false},
    { id: 4, name: 'Lemon Tea', price: 100, imagePath: 'assets/images/product5.jpg', description: 'This Tea for only developers.Tea is a popular drink made from the leaves and buds of a plant called Camellia sinensis, which grows in tropical and subtropical regions.', qty: 1 , isInWishlist: false},
    { id: 5, name: 'Bedham Chai', price: 150, imagePath: 'assets/images/product6.jpg', description: 'Bedham chai from Kerala.Tea is a popular drink made from the leaves and buds of a plant called Camellia sinensis, which grows in tropical and subtropical regions.', qty: 1 , isInWishlist: false},
    { id: 6, name: 'RG special Tea', price: 199, imagePath: 'assets/images/product7.jpg', description: 'our own brand tea.Tea is a popular drink made from the leaves and buds of a plant called Camellia sinensis, which grows in tropical and subtropical regions.', qty: 1, isInWishlist: false }
  ];

  getProducts(searchTerm?: any): Product[] {
    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      return this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    } else {
      return this.products;
    }
  }
  
   getProductById(productId: number): Product | undefined {
    return this.products.find(product => product.id === productId);
  }

  addToRemove(product: any) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      window.alert('This product is already in your trash!');
    } else {
      this.items.push(product);
      window.alert('Your product has been added to the trash!');
    }
  }
  
  getItems() {
    return this.items;
  }


  addToWishlist(product: any) {
    const existingItem = this.wishlist.find(item => item.id === product.id);
    if (existingItem) {
      window.alert('This product is already in your wishlist!');
    } else {
      this.wishlist.push(product);
      product.isInWishlist = true;
      window.alert('Your product has been added to the wishlist!');
    }
  }
  
  getWishlist() {
    return this.wishlist;
  }

  clearCart() {
    this.items = []; // reset the array
    return this.items;
  }

  removeFromList(product: any) {
  const index = this.items.findIndex(item => item.id === product.id);
  if (index !== -1) {
    this.items.splice(index, 1);
    window.alert('Your product has been removed from the trash!');
  } else {
    window.alert('Product not found in the trash!');
  }
}


}
