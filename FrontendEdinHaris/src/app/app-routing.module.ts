import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomePageComponent } from './home-page/home-page.component';

import { LoginComponent } from './login/login.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AddArticleComponent} from "./add-article/add-article.component";
import { UserObjavljeniArtikliComponent } from './user-objavljeni-artikli/user-objavljeni-artikli.component';
import {AutomobiliComponent} from "./kategorija/automobili/automobili.component";
import {BiciklaComponent} from "./kategorija/bicikla/bicikla.component";
import {PorukeComponent} from "./poruke/poruke.component";
import { CategoriesComponent } from './categories/categories.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TwoWayAuthComponent } from './two-way-auth/two-way-auth.component';

const routes: Routes = [
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'user-profile/:id',component:UserProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'two-way',component:TwoWayAuthComponent},

  {path:'homepage',component:HomePageComponent},
  {path:'signup',component:SignUpComponent},
  {path:'categories/:id',component:CategoriesComponent},
  {path:'edit-profile',component:EditProfileComponent},
  {path:'product/:id',component:ProductPageComponent},
  {path:'Objava',component:AddArticleComponent},
  {path:'moje-objave',component:UserObjavljeniArtikliComponent},
  {path:'automobili',component:AutomobiliComponent},
  {path:'bicikla',component:BiciklaComponent},
  {path:'poruke',component:PorukeComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
