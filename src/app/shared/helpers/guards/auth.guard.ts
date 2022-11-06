import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AppRoutes } from '../../models/AppRoutes';


@Injectable({
   providedIn: 'root'
})


export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) { }

   canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.authService.getIsLoggedIn().value) { return true; }
      this.router.navigate([AppRoutes.Auth.login.full]);
      return false;
   }

}
