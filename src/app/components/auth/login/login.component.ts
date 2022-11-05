import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    console.log("Group Value", this.loginFormGroup.value)

    // Construct login data
    let loginReq: LoginReq = {
       username: this.loginFormGroup.get("emailCtrl")?.value,
       password: this.loginFormGroup.get("passwordCtrl")?.value,
    };

    // Send login request
    this.authService.login(loginReq).subscribe(
       (res) => {
          this.uiState.login.isLoading = false;
          this.uiState.login.isSubmitting = false;
       },
       (err) => {
          // Stop the loader
          this.uiState.login.isLoading = false;
          this.uiState.login.isSubmitting = false;

          // Display error alert

       }
    );
 }

}
