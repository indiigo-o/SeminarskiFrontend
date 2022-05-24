import { AutentifikacijaHelper } from "./_helpers/autentifikacija-helper";
import { AutentifikacijaToken } from "./_helpers/login-informacije";


export class MojConfig{
    static adresa_servera :"https://localhost:44308";

    static http_opcije=function () {

        let autentifikacijaToken:AutentifikacijaToken = AutentifikacijaHelper.getLoginInfo().autentifikacijaToken;
        let mojtoken = "";

        if(autentifikacijaToken!=null)
        mojtoken=autentifikacijaToken.vrijednost;
        return{
            Headers:{

                //preko hedera saljemo token u bekend
                //preko tokena pravimo provjeru i preko njega trazimo u bazi token koji smo poslali
                // i preko toga dobijamo korisnicki nalog
                'autentifikacija-token':mojtoken,
            }
        };
    }

}
