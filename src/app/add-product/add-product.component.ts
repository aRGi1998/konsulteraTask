import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  locations: string[] = ['Malappuram', 'Kochi', 'Kozhikode', 'Wayanad'];
  products!: any[];
  product:any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService
    ) {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      description: ['', [Validators.required, Validators.minLength(150)]],
      priceRange: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      locations: [[]],
      stock: ['inStock']
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.crudService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  editProduct(product: any) {
    // Implement edit logic here
  }

  deleteProduct(product: any) {
    // Implement delete logic here
  }

  addProduct() {
    if (this.productForm.invalid) {
      return;
    }

    this.product = this.productForm.value;
    console.log(this.product,'yy')
    this.crudService.addProduct(this.product);
    this.productForm.reset();
  }

  toggleEditMode(product: any) {
    product.editMode = !product.editMode;
  }

  saveChanges(product: any) {
    // Save the changes
    product.editMode = false;
    this.crudService.updateProduct(product);
  }
}