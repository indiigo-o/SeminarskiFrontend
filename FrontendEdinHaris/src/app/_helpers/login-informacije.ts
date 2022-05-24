


export class LoginInformacije {
  autentifikacijaToken:        AutentifikacijaToken=  null as any;
  isLogiran:                   boolean=false;
  isPermisijaKorisnik:         boolean=false;
  isPerimisijaAdmin:           boolean=false;

}

export interface AutentifikacijaToken {
  id:                   number;
  vrijednost:           string;
  korisnickiNalogId:    number;
  korisnickiNalog:      KorisnickiNalog;
  vrijemeEvidentiranja: Date;
  ipAdresa:             string;
}
  export interface KorisnickiNalog {
    id:                 number;
    korisnickoIme:      string;
    isKorisnik:         boolean;
    isAdmin:            boolean;

  }
