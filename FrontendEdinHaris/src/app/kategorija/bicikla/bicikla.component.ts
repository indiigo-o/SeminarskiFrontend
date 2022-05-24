import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bicikla',
  templateUrl: './bicikla.component.html',
  styleUrls: ['./bicikla.component.css']
})
export class BiciklaComponent implements OnInit {

  Artikli:any;
  id:any;

  constructor(private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajArtikle();
  }

  UcitajArtikle(){
    this.httpKlijent.get("https://localhost:44308/Artikal/GetPoKategoriji/4")
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
