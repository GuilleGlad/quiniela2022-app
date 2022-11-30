declare var $: any;
import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { UserService } from './user.service';
import { auditTime, BehaviorSubject, concat, concatAll, concatMap, delay, filter, forkJoin, from, fromEvent, interval, map, mapTo, mergeMap, Observable, of, sampleTime, switchMap, take, tap, throttleTime, timer, toArray, zip} from 'rxjs';
import { MarcadorService } from '../marcador/marcador.service';
import { QuinielaService } from '../quiniela/quiniela.service';
import { Quiniela } from '../quiniela/quiniela.interface';
import { Marcador } from '../marcador/marcador.interface';
import jwtDecode from 'jwt-decode';
import * as _ from 'lodash';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  users = new BehaviorSubject<User[]>([]);
  users_temp!:User[];
  quinielas = new BehaviorSubject<Quiniela[]>([]);
  marcadores = new BehaviorSubject<Marcador[]>([]);
  MarcadoresPrincipales = new BehaviorSubject<Marcador[]>([]);
  interval$ = timer(0,10000);
  mobile$ = new BehaviorSubject<boolean>(false);
  resizeObservable$!: Observable<Event>;


  constructor(private userSvc:UserService,private marcadorSvc:MarcadorService,private quinielaSvc:QuinielaService) { 
    
  }

  calcularPuntosX():void{
    timer(0,5000).pipe(
      tap(() => {
        this.loadUsersX()
        .subscribe((res) => {
          this.users.next(res);
        });
      })
    ).subscribe();

  }

  loadUsersX():Observable<User[]>{
    return this.userSvc.getResult()
  }
  
  // calcularPuntos():void{
  //   this.interval$.pipe(
  //     tap(() => {
  //       this.loadUsers()
  //     })
  //   ).subscribe((res) => {
  //       this.users_temp =_.orderBy(this.users_temp,[function(o) { return o.puntos; }],['desc']),    
  //       this.users.next(this.users_temp)
  //     }
  //   )

  // }

  // loadUsers():void{
  //   this.userSvc.getUsers().pipe(
  //     switchMap(users => from(users)),
  //     switchMap(user => of(user).pipe(
  //       filter(v => v.id != 1),
  //       // delay(1000),
  //       map(user => {
  //         user.puntos = 0;
  //         user.marcador_exacto = 0;
  //         user.marcador_parcial = 0;
  //         // console.log(user);
  //         this.quinielaSvc.getUserQuiniela(user.id).pipe(
  //           map(q => {
  //             const jwt_obj:any = jwtDecode(q.jwt);
  //             q = jwt_obj.quiniela;
  //             // console.log(q);
  //             this.marcadorSvc.getMarcadores("1").pipe(
  //               map((marcadoresAdmin) => {
  //                 const jwt_obj:any = jwtDecode(marcadoresAdmin.jwt);
  //                 return jwt_obj.marcadores;
  //               }),                
  //               switchMap(marcadoresAdmin => from(marcadoresAdmin).pipe (
  //                 map((marcadorAdmin:any) => {
  //                     // console.log(marcadorAdmin)
  //                     this.marcadorSvc.getMarcadores(q.id_quiniela.toString()).pipe(
  //                       map((marcadores) => {
  //                         const jwt_obj:any = jwtDecode(marcadores.jwt);
  //                         return jwt_obj.marcadores;
  //                       }),
  //                       switchMap(marcadores => from(marcadores).pipe (
  //                         tap((marcador:any) => {
  //                           // console.log(marcador);
  //                           // console.log(marcadorAdmin);
  //                           if(marcador.partido_id_marcador == marcadorAdmin.partido_id_marcador){
  //                             if(marcador.marcador1_marcador == marcadorAdmin.marcador1_marcador && marcador.marcador2_marcador == marcadorAdmin.marcador2_marcador){
  //                               user.puntos += 3;
  //                               user.marcador_exacto += 1;
  //                             }else{
  //                               if(marcador.marcador1_marcador == marcador.marcador2_marcador && marcadorAdmin.marcador1_marcador == marcadorAdmin.marcador2_marcador && (marcador.marcador1_marcador != marcadorAdmin.marcador1_marcador || marcador.marcador2_marcador != marcadorAdmin.marcador2_marcador)){
  //                                 user.puntos += 1;
  //                                 user.marcador_parcial += 1;
  //                               }
  //                               if(marcadorAdmin.marcador1_marcador > marcadorAdmin.marcador2_marcador && marcador.marcador1_marcador > marcador.marcador2_marcador){
  //                                 user.puntos += 1;
  //                                 user.marcador_parcial += 1;
  //                               }
  //                               if(marcadorAdmin.marcador1_marcador < marcadorAdmin.marcador2_marcador && marcador.marcador1_marcador < marcador.marcador2_marcador){
  //                                 user.puntos += 1;
  //                                 user.marcador_parcial += 1;
  //                               }
  //                             }
  //                           }    
  //                           return user
  //                         })
  //                       ))
  //                     ).subscribe()
  //                 return user
  //                 })
  //               ))
  //             ).subscribe()
  //             return user
  //           })
  //         ).subscribe();
  //         return user
  //       }),
  //     )),
  //     toArray(),
  //     ).subscribe((users_result) => {
  //       this.users_temp = users_result;
  //     });
  // }

  ngOnInit(): void {
    this.responsiveCheck();
    this.resizeObservable$ = fromEvent(window,'resize');
    this.resizeObservable$.subscribe(evt => {
      this.responsiveCheck();
    })
    this.calcularPuntosX();
    
  }

  responsiveCheck():void{
    if (window.screen.width <= 600) {
      this.mobile$.next(true);
    }else{
      this.mobile$.next(false);
    }
  }

  // divsAnimate():void{
  //   var animating = false;

  //   $('#container').on('click', '.move',  (obj:any) => {
  //     var clickedDiv = $(obj.target),
    
  //     prevDiv = $("#container > :first-child"),
  //     secondDiv = $("#container > div:nth-child(2)"),
  //     lastDiv = $("#container > div:last"),
  //     allDivs = $("#container div:not([id="+clickedDiv.attr('id')+"])"),
  //     prevAll = $(clickedDiv).prevAll(".move"),
  //     distance = clickedDiv.offset().top - prevDiv.offset().top,
  //     distance_2 = secondDiv.offset().top - prevDiv.offset().top;
  

  //     if($(clickedDiv).attr('id') == $(prevDiv).attr('id'))
  //     {
  //       return;
  //     }

  //     if($(clickedDiv).attr('id') == $(lastDiv).attr("id")){
  //       if (prevDiv.length) {
  //         animating = true;
  //       const timer = 500;
  //         $.when(clickedDiv.animate({
  //           top: -distance
  //         }, timer),
  //         allDivs.animate({
  //             top: distance_2
  //         }, timer)).done(function () {
  //           allDivs.css('top', '0px');
  //             clickedDiv.css('top', '0px');
  //             clickedDiv.insertBefore(prevDiv);
  //             animating = false;
  //         });
  //       }
  //     }else{
  //       var prevAll = $(clickedDiv).prevAll(".move");
  //       if (prevDiv.length) {
  //         animating = true;
  //       const timer = 500;
  //         $.when(clickedDiv.animate({
  //           top: -distance
  //         }, timer),
  //         prevAll.animate({
  //             top: distance_2
  //         }, timer)).done(function () {
  //           prevAll.css('top', '0px');
  //             clickedDiv.css('top', '0px');
  //             clickedDiv.insertBefore(prevDiv);
  //             animating = false;
  //         });
  //       }
  //     }

  //   });       
  // }

}
