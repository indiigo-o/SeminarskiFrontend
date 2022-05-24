import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
<<<<<<< HEAD:Frontend/angular-bootstrap-examples/src/app/app.module.ts
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
=======
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    SignUpComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
>>>>>>> 2dc1eba528f3a16af3acef63d2cef8e36f205b82:EdinHarisFrontend/src/app/app.module.ts
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
