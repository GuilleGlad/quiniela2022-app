import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, map, tap } from "rxjs";
import { Quiniela } from "../quiniela/quiniela.interface";
import { signupInterface } from "./signup.interface";
import { Md5 } from "ts-md5/dist/esm/md5";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class SignupService {

    constructor(private http_con:HttpClient,private router:Router) {}
    
    apiUrl:string = environment.apiUrl;

    signup(form: signupInterface) {
        let md5_pass = Md5.hashStr(form.password);

        const data = {
            'firstname':form.firstname,
            'lastname':form.lastname,
            'username':form.username,
            'password':md5_pass
        }
        const response$:any = this.http_con.post<any>(this.apiUrl+"/user/signup",data).pipe(
            concatMap((res1) => this.http_con.post<Quiniela>(this.apiUrl+"/quiniela",res1).pipe(
                map((res2) => [res1,res2]),
                tap((res2:any) => {
                    if(res2[0].status == "existing" || res2[1].status == "error"){
                        Swal.fire("ERROR","No se ha podido realizar al registro").then(() => {
                            this.router.navigate(['/signup']);                        
                            window.location.reload();
                        })
                    }
                    if(res2[0].status == "created" && res2[1].status == "created"){
                        Swal.fire("INFORMACION","Se ha registrado con Exito").then(() => {
                            this.router.navigate(['/login']);                        
                        })
                    }
                }) 
            ))
        ).subscribe((resx) => {
            // console.log(resx);
        });
        return response$;
    }

}