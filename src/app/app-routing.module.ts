import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ContentLayoutComponent } from './shared/components/content-layout/content-layout.component';
import { AuthGuard } from './shared/helpers/guards/auth.guard';
import { UnauthGuard } from './shared/helpers/guards/unauth.guard';
import { AppRoutes } from './shared/models/AppRoutes';
import { content } from './shared/routes/content-routes';

const routes: Routes = [
  {
    path: AppRoutes.Auth.login.full,
    component: LoginComponent,
    pathMatch: "full",
    canActivate: [UnauthGuard]
  },
  {
    path: "",
    redirectTo: AppRoutes.products.full,
    pathMatch: "full"
 },
  {
    path: "",
    component: ContentLayoutComponent,
    children: content,
    canActivate: [AuthGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
