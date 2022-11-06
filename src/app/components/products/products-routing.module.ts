import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/shared/models/AppRoutes';


const routes: Routes = [
  {
     path: "",
     children: [
        {
           path: AppRoutes.products.new.main,
           component: ProductFormComponent,
        },
        {
           path: AppRoutes.products.sub,
           component: ProductListComponent
        },
        {
          path: AppRoutes.products.edit.main,
          component: ProductFormComponent
       },
     ],
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsRoutingModule { }
