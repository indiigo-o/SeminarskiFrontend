import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MojConfig } from '../moj-config';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  Gradovi:any;
  txtPassword : any;
  txtKorisnickoIme: any;
  txtIme:any;
  txtPrezime:any;
  txtEmail:any;
  txtDatumRodjenja:any;
  txtGrad:any;
  txtAdresa:any;
  Spolovi:any;
  txtSpol:any;
  show: boolean = false;
  txtBrojtelefona:any;

  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajGradove();
    this.UcitajSpolove();
  }
  UcitajGradove() {
    this.httpKlijent.get("https://localhost:44308/Grad/GetAll")
    .subscribe((x:any)=>{
    console.log("Gradovi",x);
    this.Gradovi=x;

  })}
  UcitajSpolove() {
    this.httpKlijent.get("https://localhost:44308/Spol/GetAll").subscribe((x: any) => {
      console.log("Spolovi",x);
      this.Spolovi = x;
    })
  }
  password() {
    this.show = !this.show;
}

  btnLogin()
  {
    let saljemo={
      korisnickoime:this.txtKorisnickoIme,
      lozinka:this.txtPassword,
      ime:this.txtIme,
      prezime:this.txtPrezime,
      email:this.txtEmail,
      dtumRodjenja:this.txtDatumRodjenja,
      grad_id:this.txtGrad ,
      adresa:this.txtAdresa,
      spol_id: this.txtSpol,
      kontaktTelefon:this.txtBrojtelefona
    
    };
    this.httpKlijent.post("https://localhost:44308/Korisnik/Add", saljemo)
    .subscribe((x:any)=>{
      if(x !=null)
      {
        alert("uspjesna Registracija");

        localStorage.setItem("autentifikacija-token",x.vrijednost);

        this.router.navigateByUrl("/login");


      }
      else{
        localStorage.setItem("autentififkacija-token","")

        alert("neispravna registracija" );
      }
     
    });
  }

}
