import {Component, OnInit, Pipe} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";
import {ActivatedRoute, Router} from "@angular/router";
import { ChatService } from 'src/app/services/chat.service';
import {MessageDto } from 'src/app/Dto/MessageDto';


@Component({
  selector: 'app-poruke',
  templateUrl: './poruke.component.html',
  styleUrls: ['./poruke.component.css'],

})

export class PorukeComponent implements OnInit {
  posiljaoc: any;
  primaoc : any;
  txtporuka:any;
  korisnikid:any=Number(this.route.snapshot.paramMap.get('id'));


  constructor(private httpKlijent:HttpClient,private route: ActivatedRoute, private  router :Router , private chatService: ChatService)  { }

  ngOnInit(): void {
  this.ucitajposiljaoca();
  this.ucitajprimaoca();
    //this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj);});  // calls the service method to get the new messages sent
  }
  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
        window.alert("Both fields are required.");
        return;
      } else {
      //  this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);

  }


  ucitajposiljaoca()
  {
    this.httpKlijent.get("https://localhost:44308/Poruka/GetPosiljaocId/"
      +AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId)
      .subscribe(x=>{
        console.log("posiljaoc", x);
      this.posiljaoc = x;
    });
  }
  ucitajprimaoca()
  {
    this.httpKlijent.get("https://localhost:44308/Poruka/GetPrimaocId/"
      +AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId)
      .subscribe(x=>{
        console.log("primaoc", x);
        this.primaoc = x;
      });
  }
  btnPosaljiPoruku() {
    let podaci={
      sadrzaj:this.txtporuka,
      posiljaoc_id:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,
      primaoc_id: 9
    };
    console.log(podaci);
    this.httpKlijent.post("https://localhost:44308/Poruka/Add",podaci).subscribe((x:any)=>{
      if (x != null) {
        alert("Uspješno poslana poruka");
        console.log("x", x);
      }
      else {
        alert("Pogresan unos");
      }
    });
  }



}
