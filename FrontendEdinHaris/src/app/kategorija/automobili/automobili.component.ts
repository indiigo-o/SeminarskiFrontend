import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.css']
})
export class AutomobiliComponent implements OnInit {

  Artikli:any;

  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajArtikle();

  }

  UcitajArtikle(){
    this.httpKlijent.get("https://localhost:44308/Artikal/GetPoKategoriji/2")
      .subscribe(x=>{
        console.log("Artikli", x);
        this.Artikli = x;

      });
  }


  ProduktDetalji(id:any){
    this.router.navigate(['product'])
    localStorage.setItem("ProduktDetalji", id);
  }
}
