import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
declare var $: any; // Declare the jQuery variable

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements AfterViewInit {
  productId: any;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.params['id']);
    this.getProductDetails();
  }

  ngAfterViewInit() {
    // Initialize the image zooming on the zoom-image element
    $('#zoom-image').zoomTarget();
  }

  getProductDetails() {
    this.product = this.productService.getProductById(this.productId);
  }
  goBack() {
    this.router.navigate(['/']);
  }
  addProduct() {
    this.router.navigate(['/addProduct'])
  }
}
