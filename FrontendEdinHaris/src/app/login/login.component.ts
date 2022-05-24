import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import { MojConfig } from '../moj-config';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import { LoginInformacije } from '../_helpers/login-informacije';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

  txtPassword : any;
  txtKorisnickoIme: any;
  AntiForgery:any=this.cookie.get('XSRF-TOKEN');
  show: boolean = false;
korisnik:any;
  constructor(private httpKlijent: HttpClient, private  router :Router, private cookie:CookieService) { }

  ngOnInit(): void {
  }

  btnLogin()
  {
    let saljemo={
      korisnickoIme:this.txtKorisnickoIme,
      lozinka:this.txtPassword
    };
    
    const headers = new HttpHeaders() .set('X-XSRF-TOKEN', this.AntiForgery);
    console.log(headers);
    this.httpKlijent.post<LoginInformacije>("https://localhost:44308/Autentifikacija/Login", saljemo,{'headers': headers})
    .subscribe((x:LoginInformacije)=>{
      if(x !=null )
      {
        console.log("x", x);
        AutentifikacijaHelper.setLoginInfo(x);
        this.httpKlijent.get("https://localhost:44308/Korisnik/Get/"+x.autentifikacijaToken.korisnickiNalogId)
        .subscribe(x=>{
          console.log("korisnik", x);
          this.korisnik = x;
          if(this.korisnik.twoway===false){
            alert("Dobrodosli!");
            this.router.navigate(['homepage'])
            .then(() => {
               window.location.reload();
             });
          }
          if(this.korisnik.twoway===true){
            alert("Potrebna je validacija maila!");
            localStorage.setItem('idza2way', this.korisnik.id)
            this.router.navigate(['two-way']);
            
          }
        });
        
        if(this.korisnik.twoway==false){
     
    }
      }
      else{
        AutentifikacijaHelper.setLoginInfo(null as any)
        alert("Neispravan login,pokusajte ponovo!" );
      }

    });
  }
  
  password() {
    this.show = !this.show;
}

}
