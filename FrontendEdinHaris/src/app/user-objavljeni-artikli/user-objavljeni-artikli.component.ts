import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';

@Component({
  selector: 'app-user-objavljeni-artikli',
  templateUrl: './user-objavljeni-artikli.component.html',
  styleUrls: ['./user-objavljeni-artikli.component.css']
})
export class UserObjavljeniArtikliComponent implements OnInit {


Artikli:any;
uredi:boolean[] = [];

txtNaziv:any;
txtCijena:any;
txtDatumObjave:any;
txtGrad:any;
txtBrend:any;
txtKategorija:any;
txtSpol:any;
txtStanje:any;

Korisnik:any;

Kategorije:any;
Gradovi:any;
Brendovi:any;
Spolovi:any;
Stanja:any;

  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajArtikle();
    this.UcitajGradove();
    this.UcitajKategorije();
    this.UcitajBrendove();
    this.UcitajSpolove();
    this.UcitajSatnje();
  }




  UcitajArtikle(){
    this.httpKlijent.get("https://localhost:44308/Artikal/GetPoKorisniku/"+ AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId )
    .subscribe(x=>{
      console.log("Artikli", x);
      this.Artikli = x;
    });

  }
  IzbrisiProizvod(id:any){
    this.httpKlijent.delete("https://localhost:44308/Artikal/Delete/"+ id)
    .subscribe(x=>{
      alert("Objava uspjesno izbrisana!")
this.UcitajArtikle();
    });
  }
  UrediProizvod(index:any){
   this.uredi[index]=!this.uredi[index];
  }
  UcitajKategorije(){
    this.httpKlijent.get("https://localhost:44308/KategorijaProdukta/GetAll").subscribe((x:any)=>{
      this.Kategorije =x;
    })
  }
  UcitajGradove(){
    this.httpKlijent.get("https://localhost:44308/Grad/GetAll").subscribe((x:any)=>{
      this.Gradovi = x;
    })
  }
  UcitajBrendove(){
    this.httpKlijent.get("https://localhost:44308/Brand/GetAll").subscribe((x:any)=>{
      this.Brendovi = x;
    })
  }
  UcitajSpolove(){
    this.httpKlijent.get("https://localhost:44308/Spol/GetAll").subscribe((x:any)=>{
      this.Spolovi=x;
    })
  }
  UcitajSatnje(){
    this.httpKlijent.get("https://localhost:44308/Stanje/GetAll").subscribe((x:any)=>{
      this.Stanja= x;
    })
  }
  BtnUredi(artikal:any, ){
    let saljemo={
      kategorija_Produkta_id: artikal.kategorija_Produkta_id,
      brend_id: artikal.brend_id,
      spol_id: artikal.spol_id,
      korisnik_id: artikal.korisnik_id,
      nazivArtikla: artikal.nazivArtikla,
      cijena: artikal.cijena,
      aktivan: true,
      datumObjave: new Date(),
      stanje: artikal.stanje_id
    };
    this.httpKlijent.post("https://localhost:44308/Artikal/Update/" + artikal.id, saljemo)
    .subscribe((x:any)=>{
      if(x !=null)
      {
        alert("uspjesno uredjivanje");
        this.UcitajArtikle();
      }
      else{

        alert("neispravno uredjivanje" );
      }

    });
  }
}
