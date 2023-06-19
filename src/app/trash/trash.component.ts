import { Component, AfterViewInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})

export class TrashComponent implements AfterViewInit{
  trash_Items!: any[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.trash_Items = this.productService.getItems();
    console.log(this.trash_Items, 'Trash Items')
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

  removeProduct(product: any) {
    this.productService.removeFromList(product);
  }
  
  restoreProduct(product: any) {
    this.productService.addToRemove(product);
  }

}
