import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  idKategorije:any= Number(this.route.snapshot.paramMap.get('id'));
  Artikli:any;
  searchtext : any;
  
  constructor(private route: ActivatedRoute,private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
 this.UcitajArtikle()
  }
  UcitajArtikle(){
    this.httpKlijent.get("https://localhost:44308/Artikal/GetPoKategoriji/"+ this.idKategorije)
      .subscribe(x=>{
        console.log("Artikli", x);
        this.Artikli = x;
      });
  }
}
