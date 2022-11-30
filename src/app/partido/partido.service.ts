import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marcador } from '../marcador/marcador.interface';
import { Partido } from './partido.interface';

@Injectable({
  providedIn: 'root'
})

export class PartidoService {
    apiUrl:string = environment.apiUrl;
    constructor(private http_con:HttpClient){

    }

    public getPartidos():Observable<Partido[]>{
      const partidos$ = this.http_con.get<any>(this.apiUrl+"/partido");
      return partidos$;
    }
}