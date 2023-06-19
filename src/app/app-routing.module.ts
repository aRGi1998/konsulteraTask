import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TrashComponent } from './trash/trash.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { 
    path: 'products/:id', 
    component: ProductDetailComponent
  },
  {
    path:'trash',
    component: TrashComponent
  },
  {
    path: 'addProduct',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
