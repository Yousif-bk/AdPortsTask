import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/models/AppRoutes';
import { LoginReq } from 'src/app/shared/models/LoginReq';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uiState = {
    isLoading: false,
    login: {
      isLoading: false,
      isSubmitting: false,
    },
  }


  /* Forms */
  loginFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    // Construct login form
    this.loginFormGroup = this.formBuilder.group({
      emailCtrl: [null, Validators.compose([Validators.required, Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)])],
      passwordCtrl: [null, Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } { return this.loginFormGroup.controls; }

  login(): void {

    // Set submission state to true (used for form validation)
    this.uiState.login.isSubmitting = true;

    // Display loader
    this.uiState.login.isLoading = true;

    // Validate form
    if (this.loginFormGroup.invalid) {
      this.uiState.login.isLoading = false;
      return;
    }


    // Construct login data
    let loginReq: LoginReq = {
      email: this.loginFormGroup.get("emailCtrl")?.value,
      password: this.loginFormGroup.get("passwordCtrl")?.value,
    };

    // Send login request
    this.authService.login(loginReq).subscribe({
      next: res => {
        this.uiState.login.isLoading = false;
        this.uiState.login.isSubmitting = false;
         // Navigate to home
         this.router.navigate([AppRoutes.products.full]);
      },
      error: err => {
        // Stop the loader
        this.uiState.login.isLoading = false;
        this.uiState.login.isSubmitting = false;
      }
    })


  }

}
