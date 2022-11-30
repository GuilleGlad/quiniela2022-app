import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, concatMap, delay, Observable, tap,map } from 'rxjs';
import { loginData } from './loginData.interface';
import Swal from 'sweetalert2';
import { QuinielaService } from '../quiniela/quiniela.service';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http_con:HttpClient,private router:Router,private quinielaSvc:QuinielaService) { }

  apiUrl:string = environment.apiUrl + "/user";

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  public getConfig(): any {
    return this.http_con.get<any>(environment.apiUrl + "/settings");
  }

  private hasToken(): boolean {
    return !!localStorage.getItem("token");
  }

  public login(loginForm:loginData):Observable<any>{
    const data = {
      'username':loginForm.username,
      'password':loginForm.password
    };
    return this.http_con.post<loginData>(this.apiUrl+"/login",data);
  }

  public logout():void{
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("quiniela_id");
    localStorage.removeItem("username");
    this.isLoginSubject.next(false);
    this.router.navigate(['/login']);
    window.location.reload();
  }
  public isLoggedIn():Observable<boolean>{
    if(localStorage.getItem("token")){
      this.isLoginSubject.next(true);
    }else{
      this.isLoginSubject.next(false);
    }
    return this.isLoginSubject;
  }

}
