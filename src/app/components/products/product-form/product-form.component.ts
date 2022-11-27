import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppRoutes } from 'src/app/shared/models/AppRoutes';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ProductForm } from 'src/app/shared/models/ProductForm';
import { ProductsService } from 'src/app/shared/services/app/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  /* UiState */
  uiState = {
    isLoading: false,
    isSubmitting: false,
    appLang: '',
    createProductData: {
      isSubmitting: false,
      isLoading: false
    },
  };

  products: IProduct[] = [];
  sub: Subscription;
  errorMessage = '';
  /* Forms */
  productFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.initForms();
    this.getProductDetails();
  }

  initForms() {
    this.productFormGroup = this.formBuilder.group({
      productName: [null, [Validators.required]],
      productCode: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      rating: [null, [Validators.required]]
    });
  }

  // Form Controls
  get f(): { [key: string]: AbstractControl } { return this.productFormGroup.controls; }

  // Get product details
  getProductDetails() {
    const productId = this.router.url.split('/products/edit/')[1];
    if (productId) {
      this.sub = this.productsService.getProductDetails(productId).subscribe({
        next: products => {
          this.setSavedProductData(products);
        },
        error: err => this.errorMessage = err
      });
    }
  }

  // Set product data to form
  private setSavedProductData(savedProduct: any): void {
    // Consturct form patch data
    const patchData: ProductForm = {
      id: savedProduct.id,
      productName: savedProduct.productName,
      productCode: savedProduct.productCode,
      price: savedProduct.price,
      description: savedProduct.description,
      rating: savedProduct.rating
    }    // Patch the form data
    this.productFormGroup.patchValue(patchData);
  }

  // On Summit product
  onSummit() {
    this.uiState.createProductData.isLoading = true;
    this.uiState.isSubmitting = true;
    const productId = this.router.url.split('/products/edit/')[1];
    // Validate form
    if (this.productFormGroup.invalid) {
      this.uiState.createProductData.isLoading = false;
      return;
    }
    if (productId) {
      this.productsService.updateProducts(this.productFormGroup.value, productId).subscribe({
        next: res => {
          this.uiState.createProductData.isLoading = false;
          this.uiState.isSubmitting = false;
          this.router.navigate([AppRoutes.products.full]);
        },
        error: error => {
          // Stop the loader
          this.uiState.createProductData.isLoading = false;
          this.uiState.isSubmitting = false;
        }
      })
    } else {
      this.productsService.createProducts(this.productFormGroup.value).subscribe({
        next: res => {
          this.uiState.createProductData.isLoading = false;
          this.uiState.isSubmitting = false;
          this.router.navigate([AppRoutes.products.full]);
        },
        error: error => {
          // Stop the loader
          this.uiState.createProductData.isLoading = false;
          this.uiState.isSubmitting = false;
        }
      })
    }
  }
}
