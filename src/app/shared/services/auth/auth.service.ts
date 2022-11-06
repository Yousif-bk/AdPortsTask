import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from '../../models/ApiRoutes';
import { AppRoutes } from '../../models/AppRoutes';
import { LocallyStoredItemsKeys } from '../../models/LocallyStoredItemsKeys';
import { LoginReq } from '../../models/LoginReq';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:5021/api/";
  jwtHelper = new JwtHelperService();
  isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(loginReq: LoginReq): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.Auth.Login, loginReq).pipe(
      tap((res: any) => {
          console.log("resss", res.token)
          // Save access token on local storage
          localStorage.setItem(LocallyStoredItemsKeys.JWT, res.token);

          // Set authenticated user flag
          this.setIsLoggedIn(true);
      })
    );
  }

  async logout(): Promise<any> {

    // Clear JWT from localstorage
    /*  await localStorage.removeItem(LocallyStoredItemsKeys.JWT); */
    await localStorage.clear();

    // Update logged in status
    this.setIsLoggedIn(false);

    // Navigate user back to login page
    await this.router.navigate([AppRoutes.Auth.login.full]);

  }
  private isTokenAvailable(): boolean {
    return !!localStorage.getItem(LocallyStoredItemsKeys.JWT);
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }




  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }



}
