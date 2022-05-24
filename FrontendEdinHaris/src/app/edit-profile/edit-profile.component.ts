import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  korisnik:any;
  Gradovi:any;
  txtPassword : any;
  txtKorisnickoIme: any;
  txtIme:any;
  txtPrezime:any;
  txtEmail:any;
  txtDatumRodjenja:any;
  txtGrad:any;
  txtAdresa:any;
  file: any;




  constructor(private httpKlijent: HttpClient, private  router :Router,) { }

  ngOnInit(): void {
    this.UcitajKorisnika();
    this.UcitajGradove();

  }
  selectFile(e: any) {
    this.file = e.target.files[0];

    console.log(this.file);

    this.file = e.target.files;
    console.log(this.file);


  }
  UcitajKorisnika(){
    this.httpKlijent.get("https://localhost:44308/Korisnik/Get/"+AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId)
    .subscribe(x=>{
      console.log("korisnik", x);
      this.korisnik = x;
    });
  }
  UcitajGradove() {
    this.httpKlijent.get("https://localhost:44308/Grad/GetAll")
    .subscribe((x:any)=>{
    console.log("Gradovi",x);
    this.Gradovi=x;

  })}
  Ukljuci(){
    this.httpKlijent.post("https://localhost:44308/Korisnik/UpdateTwoway/"+ AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,true)
      .subscribe((x:any)=>{
        if(x !=null)
        {
          alert("uspjesna Promjena");

        }
        else{

          alert("neispravna Promjena" );
        }

      });
  }
  Iskljuci(){
    this.httpKlijent.post("https://localhost:44308/Korisnik/UpdateTwoway/"+ AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,false)
    .subscribe((x:any)=>{
      if(x !=null)
      {
        alert("uspjesna Promjena");

      }
      else{

        alert("neispravna Promjena" );
      }

    });
  }
  SacuvajPromjene()
    {
    //  let formData = new FormData();

   //  formData.append('file', this.file.name);
     //console.log(formData);

      let saljemo={

        ime:this.korisnik.ime,
        prezime:this.korisnik.prezime,
        email:this.korisnik.email,
        grad_id:Number(this.korisnik.grad.id) ,
        adresa:this.korisnik.adresa,
        KontaktTelefon:this.korisnik.kontaktTelefon,

        slikaArtikla:this.file.name,

      };
      console.log("ovo su podatci",saljemo);


      this.httpKlijent.post("https://localhost:44308/Korisnik/Update/"+ AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,saljemo)
      .subscribe((x:any)=>{
        if(x !=null)
        {
          alert("uspjesna Promjena");

          console.log("x",x);
          console.log("korisnik", this.korisnik);
        }
        else{

          alert("neispravna Promjena" );
        }

      });

      const formData = new FormData();
      formData.append("file",this.file, this.file.name)
console.log("aa",formData);
      this.httpKlijent.post("https://localhost:44308/Korisnik/DodajSlike/"+ AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,formData , {responseType: 'blob'})
        .subscribe((x:any)=>{
         console.log(x);
        });


    }



}
