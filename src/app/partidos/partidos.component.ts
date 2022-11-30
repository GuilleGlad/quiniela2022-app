import { Component, OnInit} from '@angular/core';
import jwtDecode from 'jwt-decode';
import { from, interval, map, tap } from 'rxjs';
import { Marcador } from '../marcador/marcador.interface';
import { MarcadorService } from '../marcador/marcador.service';
import { Partido } from '../partido/partido.interface';
import { PartidoService } from '../partido/partido.service';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { QuinielaService } from '../quiniela/quiniela.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-quiniela',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {
  


  public quiniela_id:string = '';
  public partidos!:Partido[];
  public marcadores!:Marcador[];
  public username:string = '';
  public config$:any;
  public users!:User[];
  public interval$ = interval(10000);
  public timezone$:any;
  public my_datetime = new Date();
  public my_tz:string = "";

  constructor(private quinielaSvc:QuinielaService,private partidoSvc:PartidoService,private marcadorSvc:MarcadorService, private userSvc:UserService) { 
    this.initPartidos();
    this.my_tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log(Intl.DateTimeFormat().resolvedOptions());
    // console.log(this.my_tz);
  }

  private toIsoString(date:Date):string {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num: number) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }

  private initPartidos():void {
    this.partidoSvc.getPartidos().pipe(
      tap((res:any) => {
        const jwt_obj:any = jwtDecode(res.jwt);
        this.partidos = jwt_obj.partidos;
        this.initMarcadores("1");
      })
    ).subscribe();
  }

  private initMarcadores(quiniela_id:string):void{
    this.marcadorSvc.getMarcadores(quiniela_id).pipe(
      tap((res:any) => {
        const jwt_obj:any = jwtDecode(res.jwt);
        const marcadores = jwt_obj.marcadores;
        from(marcadores).pipe(
          map((marcador:any,index_marcador) => {
            // console.log(marcador)
            from(this.partidos).pipe(
              map((partido:any,index_partido) => {
                // console.log(p)
                if(marcador.partido_id_marcador == partido.id_partido){
                  this.partidos[index_partido].marcador1_quiniela = +marcador.marcador1_marcador;
                  this.partidos[index_partido].marcador2_quiniela = +marcador.marcador2_marcador;
                  this.partidos[index_partido].marcador_id = marcador.id_marcador;                  
                }
              })
            ).subscribe();
          })
        ).subscribe();
      })
    ).subscribe();
  }

  ngOnInit(): void {
    const subscription_interval = this.interval$.pipe(
      tap(() => {
        this.initMarcadores("1");
      })
    ).subscribe();
  }

}
