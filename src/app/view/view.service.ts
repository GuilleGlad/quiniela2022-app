import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partido } from '../partido/partido.interface';
import { View } from './view.interface';

@Injectable({
  providedIn: 'root'
})

export class ViewService {
    apiUrl:string = environment.apiUrl;

    constructor(private http_con:HttpClient){

    }
    
    getUserQuiniela(user_id:any):Observable<any>{
        const _url = this.apiUrl+"/quiniela?user_id_quiniela="+user_id;
        return this.http_con.get<View[]>(_url);
    }

}