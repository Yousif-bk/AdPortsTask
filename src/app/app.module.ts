import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { JwtInterceptors } from './shared/helpers/interceptors/interceptors';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptors, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
