import {Component,} from '@angular/core';
import { LoginInformacije } from './_helpers/login-informacije';
import { AutentifikacijaHelper } from './_helpers/autentifikacija-helper';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MojConfig} from "./moj-config";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'FrontendEdinHaris';
  isLog:boolean = AutentifikacijaHelper.getLoginInfo().isLogiran;
  Kategorije:any;
  constructor(private httpKlijent: HttpClient, private router: Router) {
  }





logout(){
  if(this.isLog==true){
    this.httpKlijent.post("https://localhost:44308/Autentifikacija/Logout", "")
    .subscribe((x:any)=>{

  })
  AutentifikacijaHelper.setLoginInfo(null as any);
  console.log("isLogiran nakon logout", AutentifikacijaHelper.getLoginInfo().isLogiran);
  this.router.navigate(['homepage'])
  .then(() => {
    window.location.reload();
  });
}
else{

  this.router.navigateByUrl("/login");

}
}


  ngOnInit(): void {
    this.UcitajKategorije();

  }
  UcitajKategorije(){
    this.httpKlijent.get("https://localhost:44308/KategorijaProdukta/GetAll")
      .subscribe(x=>{
        this.Kategorije = x;
      });

  }


  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }


}



