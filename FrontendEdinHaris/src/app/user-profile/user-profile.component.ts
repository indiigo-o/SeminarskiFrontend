import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutentifikacijaHelper } from '../_helpers/autentifikacija-helper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
Korisnik:any;
porukakorisniku :any;
ifAdmin:any=AutentifikacijaHelper.getLoginInfo().isPermisijaKorisnik;
KorisnikID:any=Number(this.route.snapshot.paramMap.get('id'));
  constructor(private route: ActivatedRoute,private httpKlijent: HttpClient, private  router :Router) { }

  ngOnInit(): void {
    this.UcitajKorisnika();
    console.log(this.ifAdmin)
  }
UcitajKorisnika(){
  this.httpKlijent.get("https://localhost:44308/Korisnik/Get/"+ this.KorisnikID)
  .subscribe(x=>{
    console.log("Korisnik", x);
    this.Korisnik = x;

  });
}

btnposalji()
{
  let podaci={
    Posiljaoc_id:  AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,
    Sadrzaj: this.porukakorisniku,
    Primaoc_id:this.KorisnikID
  }

  console.log(podaci);

  this.httpKlijent.post("https://localhost:44308/Poruka/Add",podaci).subscribe((x:any)=>
  {
    if (x != null) {
      alert("Uspjesno poslana Poruka");
      console.log("x", x);
    }
    else {
      alert("Pogresan unos");
    }
  })
}
}
