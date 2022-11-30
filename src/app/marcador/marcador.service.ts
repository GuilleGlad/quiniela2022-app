import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, tap, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partido } from '../partido/partido.interface';
import { Marcador } from './marcador.interface';

@Injectable({
  providedIn: 'root'
})

export class MarcadorService {

    partidos:Partido[] = [];
    apiUrl:string = environment.apiUrl;
    Marcadores:Marcador[] = [];
    MarcadoresPrincipales:Marcador[] = [];
    private puntos$ = new BehaviorSubject<number>(0);
    private requesting$ = new BehaviorSubject<boolean>(false);
    constructor(private http_con:HttpClient) { 

    }

    getMarcadores(quiniela_id: string):Observable<any> {
      const marcadores$ = this.http_con.get<Marcador[]>(this.apiUrl+"/marcador?quiniela_id_marcador="+quiniela_id);
      return marcadores$;
    }    

    getAllMarcadores():Observable<Marcador[]> {
      return this.http_con.get<Marcador[]>(this.apiUrl+"/marcador");
    }  

    guardaMarcadorQuiniela(data_marcador:Marcador):any{
      if(!this.requesting$.getValue())
      {
        this.requesting$.next(true);
        let res:Observable<Marcador>;
        const token = localStorage.getItem("token");
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `${token}`,
          })
        };
        if(data_marcador.id_marcador == 0){
          res = this.http_con.post<Marcador>(this.apiUrl+"/marcador",data_marcador,httpOptions);
          this.requesting$.next(false);
        }
        else{
          res = this.http_con.put<Marcador>(this.apiUrl+"/marcador?id="+data_marcador.id_marcador,data_marcador,httpOptions);
          this.requesting$.next(false);
        }
        return res;
      }
    }

    getMarcadoresPrincipales():Observable<Marcador[]>{
      return this.http_con.get<Marcador[]>(this.apiUrl+"/marcador?quiniela_id_marcador="+1);
    }

    getPuntos(quiniela_id:string):Observable<number>{
      var temp_puntos = 0;
      this.getMarcadoresPrincipales().pipe(
        tap((res:any) => {
          const jwt:any = jwtDecode(res.jwt);
          this.MarcadoresPrincipales = jwt.marcadores;
          this.getMarcadores(quiniela_id).pipe(
            tap((resx:any) => {
              const jwt:any = jwtDecode(resx.jwt);
              this.Marcadores = jwt.marcadores;
              this.Marcadores.forEach(marcador => {
                this.MarcadoresPrincipales.forEach(marcador_principal => {
                  if(marcador.partido_id_marcador == marcador_principal.partido_id_marcador){
                    if(marcador.marcador1_marcador == marcador_principal.marcador1_marcador && marcador.marcador2_marcador == marcador_principal.marcador2_marcador){
                      temp_puntos += 3;
                    }else{
                      if(marcador.marcador1_marcador == marcador.marcador2_marcador && marcador_principal.marcador1_marcador == marcador_principal.marcador2_marcador && (marcador.marcador1_marcador != marcador_principal.marcador1_marcador || marcador.marcador2_marcador != marcador_principal.marcador2_marcador)){
                        temp_puntos += 1;
                      }
                      if(marcador_principal.marcador1_marcador > marcador_principal.marcador2_marcador && marcador.marcador1_marcador > marcador.marcador2_marcador){
                        temp_puntos += 1;
                      }
                      if(marcador_principal.marcador1_marcador < marcador_principal.marcador2_marcador && marcador.marcador1_marcador < marcador.marcador2_marcador){
                        temp_puntos += 1;
                      }
                    }
                  } 
                });
              });
              this.puntos$.next(temp_puntos);
            })
          ).subscribe();
        })
      ).subscribe();
      return this.puntos$;
    }
  
}


