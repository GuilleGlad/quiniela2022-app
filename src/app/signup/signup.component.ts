import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import * as _ from 'lodash';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuinielaService } from '../quiniela/quiniela.service';
import { signupInterface } from './signup.interface';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  captcha_valid$ = new BehaviorSubject(false);
  quinielas_modo_lectura$ = new BehaviorSubject<boolean>(false);
  

  constructor(private signupSvc:SignupService,private quinielaSvc:QuinielaService) { }

  data:signupInterface = {
    firstname:'',
    lastname:'',
    username:'',
    password:''
  }
  apiUrl:string = environment.apiUrl;

  ngOnInit(): void {
    this.quinielaSvc.getQuinielas().pipe(
      tap((quinielas) => {
        const jwt_obj:any = jwtDecode(quinielas.jwt);
        const q_array = jwt_obj.quiniela;
        const sq = _.filter(q_array,{status_quiniela:'2'});
        if(sq.length > 0){
          this.quinielas_modo_lectura$.next(true);
        }
      })
    ).subscribe();    
  }

  onSubmit({value:signupForm}:NgForm):void{
    this.signupSvc.signup(signupForm);
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha_valid$.next(true);
  }  
}
