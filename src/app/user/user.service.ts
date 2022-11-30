import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    apiUrl:string = environment.apiUrl;

    constructor(private http_con:HttpClient){

    }

    public getUsers():Observable<User[]>{
        const url_str = this.apiUrl+"/user";
        return this.http_con.get<User[]>(url_str);
    }

    public getResult():Observable<User[]> {
        const url_str = this.apiUrl+"/resultado";
        return this.http_con.get<User[]>(url_str);
    }    
    public getUser(user_id:number):Observable<User>{
        const url_str = this.apiUrl+"/user?id="+user_id;
        return this.http_con.get<User>(url_str);
    }
}