import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { loginData } from './loginData.interface';
import { delay, Observable, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { QuinielaService } from '../quiniela/quiniela.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users:loginData[] = [];
  data:loginData = {
    username:'',
    password:''
  };

  constructor(private loginSvc:LoginService,private quinielaSvc:QuinielaService, private router:Router){
    if(localStorage.getItem("token")){
      this.router.navigate(['/quiniela']);
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit({value:loginForm}:NgForm):void{
    this.loginSvc.login(loginForm).subscribe(
      (res) => {
        if(res.status == "success_approved"){
          let jwt_obj:any = jwtDecode(res.jwt);
          localStorage.setItem("token",res.jwt);
          this.quinielaSvc.getQuiniela(jwt_obj.userid);
          Swal.fire({
            title: 'Bienvenido',
            text: 'Autenticación Completada.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Continue',
          }).then(() => {
            delay(1000);
            this.router.navigate(['/quiniela'])
          })
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'Autenticación Fallida.',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Continue',
          }).then(() => {
            window.location.reload()
          })          
        }
      }
    );
  }
}
