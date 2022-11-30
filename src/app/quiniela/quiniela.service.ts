import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partido } from '../partido/partido.interface';
import { Quiniela } from './quiniela.interface';

@Injectable({
  providedIn: 'root'
})

export class QuinielaService {
    partidos:Partido[] = [];
    apiUrl:string = environment.apiUrl;
    public quiniela_result!:Quiniela[];

    constructor(private http_con:HttpClient) { 
        
    }    

    public getQuiniela(user_id:string):void{
        this.getUserQuiniela(user_id).subscribe(
            (res:any) => {
                const jwt_obj:any = jwtDecode(res.jwt);
                localStorage.setItem("quiniela_id",jwt_obj.quiniela.id_quiniela);
            }
        );
    }

    getUserQuiniela(user_id:any):Observable<any>{
        const _url = this.apiUrl+"/quiniela?user_id_quiniela="+user_id;
        return this.http_con.get<Quiniela[]>(_url);
    }

    getQuinielas():Observable<any>{
        const _url = this.apiUrl+"/quiniela";
        return this.http_con.get<Quiniela[]>(_url);
    }
    setQuinielaSoloLectura(v:boolean):Observable<any>{
        const token = localStorage.getItem("token");
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': `${token}`,
            })
          };
        let value:string = "0";
        if(v)
            value = "1";
        else
            value = "0";
        const _url = this.apiUrl+"/quiniela?solo_lectura="+value;
        return this.http_con.put<string>(_url,value,httpOptions);
    }
    quinielaSoloLectura(q_id:number):Observable<string>{
        let res:boolean = false;
        const _url = this.apiUrl+"/quinielaSL?q_id="+q_id;
        return this.http_con.get<string>(_url);

    }
}