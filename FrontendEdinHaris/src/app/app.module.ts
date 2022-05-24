import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { UserObjavljeniArtikliComponent } from './user-objavljeni-artikli/user-objavljeni-artikli.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutomobiliComponent } from './kategorija/automobili/automobili.component';
import { BiciklaComponent } from './kategorija/bicikla/bicikla.component';
import { PorukeComponent } from './poruke/poruke.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TwoWayAuthComponent } from './two-way-auth/two-way-auth.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    SignUpComponent,
TwoWayAuthComponent,
    EditProfileComponent,
    ProductPageComponent,
    AddArticleComponent,
    UserObjavljeniArtikliComponent,
    AutomobiliComponent,
    BiciklaComponent,
    PorukeComponent,
    CategoriesComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    TwoWayAuthComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
     HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    }),
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    CommonModule,

  ],
  providers: [[CookieService]],
  bootstrap: [AppComponent]
})
export class AppModule { }
