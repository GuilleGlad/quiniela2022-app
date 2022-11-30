import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import * as _ from 'lodash';
import { BehaviorSubject, from, map, Observable, tap, timer } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Marcador } from '../marcador/marcador.interface';
import { MarcadorService } from '../marcador/marcador.service';
import { Partido } from '../partido/partido.interface';
import { PartidoService } from '../partido/partido.service';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { QuinielaService } from './quiniela.service';

@Component({
  selector: 'app-quiniela',
  templateUrl: './quiniela.component.html',
  styleUrls: ['./quiniela.component.css']
})
export class QuinielaComponent implements OnInit {
  
  IsLoggedIn:Observable<boolean>;

  public quiniela_id:string = '';
  // public quiniela_id$ = new BehaviorSubject<string>('');
  public partidos!:Partido[];
  public marcadores!:Marcador[];
  public username:string = '';
  public config$:any;
  public users!:User[];
  public user_id$ = new BehaviorSubject<string>("1");
  // public quinielas_modo_lectura:boolean = false;
  public quinielas_modo_lectura$ = new BehaviorSubject<boolean>(false);
  public solo_lectura$:boolean = false;
  public interval$ = timer(1000,10000);

  constructor(private loginSvc:LoginService,private router:Router,private quinielaSvc:QuinielaService,private partidoSvc:PartidoService,private marcadorSvc:MarcadorService, private userSvc:UserService) { 
    this.IsLoggedIn = this.loginSvc.isLoggedIn();
    // this.init();
  }

  private init():void{
    this.IsLoggedIn.pipe(
      tap((res) =>{
        if(res == false){
          this.router.navigate(['/login']);
        }else{
          let  q_id = localStorage.getItem("quiniela_id");
          if(q_id == "1")
            q_id = this.user_id$.getValue();
          // const q_id = this.user_id$;
          const token = localStorage.getItem("token");
          if(q_id){
            this.quiniela_id = q_id;
            // this.quiniela_id$.next(q_id);
          }
          if(token){
            const jwt_obj:any = jwtDecode(token);
            this.username = jwt_obj.username;
            if(this.username == "admin"){
              this.config$ = this.loginSvc.getConfig().pipe(
                // tap(res => console.log(res))
              ).subscribe();
            }
          }
          this.initPartidos();
          }
        }) 
    ).subscribe();    
  }

  private initPartidos():void {
    this.partidoSvc.getPartidos().pipe(
      tap((res:any) => {
        const jwt_obj:any = jwtDecode(res.jwt);
        this.partidos = jwt_obj.partidos;
        // this.initMarcadores(this.quiniela_id$.getValue());
        this.initMarcadores(this.quiniela_id);
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

  public updateMarcadores(){
    // this.initMarcadores(this.quiniela_id$.getValue());
    this.initMarcadores(this.quiniela_id);
  }

  ngOnInit(): void {
    this.userSvc.getUsers().pipe(
      map(res => {
        this.users = res;
        // console.log(this.users);
      })
    ).subscribe();
    this.init();
    this.user_id$.next("1");
    // if(+this.quiniela_id$.getValue() == 1)
    if(+this.quiniela_id == 1)
      this.checkModoLecturaAdmin();
    // if(this.router.url.indexOf("quiniela") != -1 && +this.quiniela_id$.getValue() != 1){
    if(this.router.url.indexOf("quiniela") != -1 && +this.quiniela_id != 1){
      this.interval$.pipe(
        tap(() => {
          this.quinielaSoloLectura()
          // console.log("checking");
        })
      ).subscribe();
    }  
  }

  public setUserId(e:any):void{
    this.user_id$.next(e.value);
    this.init();
  }

  public setQuinielaSoloLectura(ch:boolean){
    this.quinielaSvc.setQuinielaSoloLectura(ch).pipe().subscribe();
  }

  public checkModoLecturaAdmin():void {
    this.quinielaSvc.getQuinielas().pipe(
      tap((quinielas) => {
        const jwt_obj:any = jwtDecode(quinielas.jwt);
        const q_array = jwt_obj.quiniela;
        const sq = _.filter(q_array,{status_quiniela:'2'});
        if(sq.length > 0){
          // this.quinielas_modo_lectura = true;
          this.quinielas_modo_lectura$.next(true);
        }
      })
    ).subscribe();
  }

  public quinielaSoloLectura():void {
    // this.quinielaSvc.quinielaSoloLectura(+this.quiniela_id$.getValue()).pipe(
    this.quinielaSvc.quinielaSoloLectura(+this.quiniela_id).pipe(
      tap((res:any) => {
        if(res.status == "2")
        {
          if(this.solo_lectura$ == false)
          {
            Swal.fire("Ya no se pueden realizar modificaciones a la Quiniela. <br><br> Buena Suerte!");
            this.solo_lectura$ = true;
          }
        }else{
          this.solo_lectura$ = false;
        }
      })    
    ).subscribe();
  }  
}


