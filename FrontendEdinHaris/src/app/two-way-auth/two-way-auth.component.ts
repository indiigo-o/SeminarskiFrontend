
import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import { MojConfig } from '../moj-config';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import { LoginInformacije } from '../_helpers/login-informacije';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-two-way-auth',
  templateUrl: './two-way-auth.component.html',
  styleUrls: ['./two-way-auth.component.css']
})
export class TwoWayAuthComponent implements OnInit {

  txtPassword : any;
  txtKod: any;
  show: boolean = false;
broj:any;
korisnik:any;
  constructor(private httpKlijent: HttpClient, private  router :Router, private cookie:CookieService) { }

  ngOnInit(): void {
    this.broj=Math.random().toString().slice(2,11);
    this.httpKlijent.get("https://localhost:44308/Korisnik/Get/"+localStorage.getItem('idza2way'))
    .subscribe(x=>{
      console.log("korisnik", x);
      this.korisnik = x;
      let saljemo={
        emailToId: this.korisnik.email,
        emailToName: this.korisnik.ime,
        emailSubject: "Email validacija",
        emailBody:"Postovani, ovo vam je kod za prijavljivanje na profil " +this.broj+" !"
      }
  console.log(saljemo);
      this.httpKlijent.post("https://localhost:44308/Email", saljemo)
      .subscribe((x:any)=>{
       
        console.log(x);
  
      });
    });

  }
refresh(){
  this.ngOnInit();
}
  btnProvjera()
  {
    if(this.txtKod===this.broj){
      alert("Dobrodosli!");
      this.router.navigate(['homepage'])
      .then(() => {
         window.location.reload();
       });
    }
    if(this.txtKod!=this.broj){
      alert("Niste unijeli dobar kod!");
      this.router.navigate(['login']);
      
    }
  }
  


}
