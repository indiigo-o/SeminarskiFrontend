import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {LoginInformacije} from "../_helpers/login-informacije";
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  Logirani:any;
  islog:boolean=AutentifikacijaHelper.getLoginInfo().isLogiran;
  txtSadrzaj:any;
  logirani:any;
  Komentari:any;
  Artikal:any;
  Vlasnikid:any;
  isAdmin:boolean = AutentifikacijaHelper.getLoginInfo().isPerimisijaAdmin;
  isLog:boolean = AutentifikacijaHelper.getLoginInfo().isLogiran;
  porukakorisniku :any;
  idArtikla:any= Number(this.route.snapshot.paramMap.get('id'));
  SlikeArtikla:any;

  file: any;
  myFiles: string[] = [];

  sMsg: string = '';

  constructor(private route: ActivatedRoute,private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajArtikal();
    if(AutentifikacijaHelper.getLoginInfo().isLogiran==true){
      this.logirani=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId;
    this.UcitajLogiranog();}
    console.log(this.isLog);
    this.UcitajKomentare();
    this.UcitajSlikeArtikla();

  }
  UcitajSlikeArtikla(){
    this.httpKlijent.get("https://localhost:44308/Artikal/GetSlikepoID/"+this.idArtikla)
      .subscribe(x=>{
        console.log(x);
        this.SlikeArtikla = x;
      });
  }

  UcitajLogiranog(){
    this.httpKlijent.get("https://localhost:44308/Korisnik/Get/"+AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId)
    .subscribe(x=>{
      console.log("korisnik", x);
      this.Logirani = x;
    });
  }

  ObrisiObjavu(id:any){
    this.httpKlijent.delete("https://localhost:44308/Komentar/Delete/"+id )
    .subscribe(x=>{
      alert("Komentar uspjesno izbrisan!")
      this.UcitajKomentare();
    });
  }
  UcitajKomentare(){
     this.httpKlijent.get("https://localhost:44308/Komentar/Get/"+ this.idArtikla)
    .subscribe(x=>{
      console.log("Komentari", x);
      this.Komentari = x;


    });
  }
  UcitajArtikal(){
    this.httpKlijent.get("https://localhost:44308/Artikal/Get/"+ this.idArtikla)
    .subscribe(x=>{
      console.log("ArtikalProductPage", x);
      this.Artikal = x;

    });
  }
  Clear(){
    this.txtSadrzaj="";
  }
  DodajKomentar(){
     let podaci={
        pitanja: this.txtSadrzaj,
        artikalID: this.idArtikla,
        korisnikID: AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId
      }
      if(this.txtSadrzaj!=null){
      this.httpKlijent.post("https://localhost:44308/Komentar/Add",podaci).subscribe((x:any)=>
      {
        if (x != null) {
          alert("Uspjesno dodan komentar");
          this.UcitajKomentare();
          this.Clear();
        }
        else {
          alert("Pogresan unos");

        }
      })}else alert("Morate unijeti komentar");

  }
    btnposalji()
    {
      let podaci={
        Posiljaoc_id:  AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,
        Sadrzaj: this.porukakorisniku,
        Primaoc_id:this.Artikal.korisnik_id
      }

      console.log(podaci);

      this.httpKlijent.post("https://localhost:44308/Poruka/Add",podaci).subscribe((x:any)=>
      {
        if (x != null) {
          alert("Uspjesno poslana poruka");
          console.log("x", x);
        }
        else {
          alert("Pogresan unos");
        }
      })
    }


  getFileDetails(e:any) {
    console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }


  }


  dodajslike() {

    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("fileUpload", this.myFiles[i]);
    }
    console.log(frmData);
    console.log(this.myFiles);

    this.httpKlijent.post("https://localhost:44308/Artikal/DodajSlike/"+ this.idArtikla,frmData , {responseType: 'blob'} )
    let podaci={
      imageName : this.myFiles,
      artikal_id : this.idArtikla
    };
    console.log("prije",podaci);
    this.httpKlijent.post("https://localhost:44308/Artikal/DodajSlike/"+ this.idArtikla, frmData)
      .subscribe((x: any) => {
        if (x != null) {
          alert("Uspjesno dodane slike");
          console.log(x);
        }
        else
        {
          alert("Pogresan unos");
        }
      });
  }

}

