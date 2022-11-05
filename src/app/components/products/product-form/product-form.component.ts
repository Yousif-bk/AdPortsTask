import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  /* Forms */
  productFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.initForms();
  }
  initForms() {
    this.productFormGroup = this.formBuilder.group({
      productName: [null, [Validators.required]],
      productCode: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null],
      rating: [null,[Validators.required]]
    });
  }


  createProduct() {
    this.uiState.createProductData.isLoading = true;
    this.uiState.isSubmitting = true;
    console.log("value", this.productFormGroup.value)

    // Validate form
    if (this.productFormGroup.invalid) {
      this.uiState.createProductData.isLoading = false;
      return;
    }
    // Send login request
    this.productsService.createProducts(this.productFormGroup.value).subscribe(
       (res) => {
          this.uiState.createProductData.isLoading = false;
          this.uiState.isSubmitting = false;
       },
       (err) => {
          // Stop the loader
          this.uiState.createProductData.isLoading = false;
          this.uiState.isSubmitting = false;

          // Display error alert

       }
    );
  }
}
