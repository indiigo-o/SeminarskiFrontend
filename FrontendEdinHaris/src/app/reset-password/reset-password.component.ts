import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MojConfig } from '../moj-config';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import { LoginInformacije } from '../_helpers/login-informacije';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  show: boolean = false;
  staralozinka:any;
  novalozinka1:any;
  novalozinka2:any;
  Korisnik:any;
  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    this.httpKlijent.get("https://localhost:44308/Korisnik/Get/"+ AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId)
    .subscribe(x=>{
      console.log("Korisnik", x);
      this.Korisnik = x;
  
    });
  }
  btnPromjenilozinku()
  {
    
    if(this.staralozinka!=this.Korisnik.lozinka){
      alert("Stara lozinka se ne poklapa!");
    }
    if(this.novalozinka1!=this.novalozinka2){
      alert("Pogresna potvrda lozinke!")
    }
    if(this.staralozinka===this.Korisnik.lozinka && this.novalozinka1===this.novalozinka2){
      let saljemo={
        lozinka:this.novalozinka2
      }
      console.log(this.novalozinka1);

    this.httpKlijent.post<LoginInformacije>("https://localhost:44308/Korisnik/ResetPassword/" + this.Korisnik.id, saljemo)
    .subscribe((x:LoginInformacije)=>{
      if(x !=null)
      {
        alert("Uspjesno ste promjenili lozinku!");
       let mail={
        emailToId: this.Korisnik.email,
        emailToName: this.Korisnik.ime +" "+ this.Korisnik.prezime,
        emailSubject: "Promjenili ste lozinku",
        emailBody: "Postovani, upravo ste promjenili svoju lozinku. U koliko se ne radi o Vasoj akciji molimo da nas obavjestite."
       }
       this.httpKlijent.post<LoginInformacije>("https://localhost:44308/Email", mail) .subscribe(x=>{
        console.log("Mail", x);
    
      });
       
      }
      else{
        AutentifikacijaHelper.setLoginInfo(null as any)
        alert("Neispravan login,pokusajte ponovo!" );
      }

    });}
  }
  
  password() {
    this.show = !this.show;
}
}
