import { Component, AfterViewInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit{
  products!: Product[];
  filteredProducts: any;
  searchTerm: string = ''; 
  selectedPriceRange: string = '';
  constructor(
    private productService: ProductService,
    private router: Router
    )
     { }

  ngOnInit(): void {
      this.products = this.productService.getProducts();
      console.log(this.products,'listing the products');
    }
    searchProducts() {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
   // Function to filter the products based on the search term and price range
   filterProductsByPrice() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      this.filterByPriceRange(product.price)
    );
  }

  // Function to check if a product's price falls within the selected range
  filterByPriceRange(price: number): boolean {
    if (this.selectedPriceRange === '') {
      return true; // If no price range is selected, return all products
    }

    const [minPrice, maxPrice] = this.selectedPriceRange.split('-').map(Number);

    return price >= minPrice && price <= maxPrice;
  }
    
  ngAfterViewInit(): void {
    $(document).ready(function () {
      var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {
        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
      }

      $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
      });
    });
  }

  addToRemove(product:any) {
    this.productService.addToRemove(product);
    product.isInWishlist = true;
   }

  addToWishlist(product:any){
    this.productService.addToWishlist(product);
    product.isInWishlist
  }

  viewDetail(product:any, prooductId:any) {
    console.log(product,'any')
    this.router.navigate(['/products', prooductId]);
  }
}