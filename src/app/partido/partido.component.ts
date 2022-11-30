import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, delay, from, switchMap, tap, timer } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Marcador } from '../marcador/marcador.interface';
import { MarcadorService } from '../marcador/marcador.service';
import { QuinielaService } from '../quiniela/quiniela.service';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {

  @Input() partido_id:number = 0;
  @Input() equipo1 = '';
  @Input() equipo2 = '';
  @Input() partido_fecha = '';
  @Input() marcador_id = 0;
  @Input() marcador1_quiniela = 0;
  @Input() marcador2_quiniela = 0;
  @Input() quiniela_id = 0;
  @Output() updateMarcadores = new EventEmitter();
  @Input() no_editable = false;
  @Input() flag_solo_lectura = false;
  solo_lectura$ = new BehaviorSubject<boolean>(false);
  @ViewChild('marcador1') marcador1_quiniela_input!:ElementRef;
  @ViewChild('marcador2') marcador2_quiniela_input!:ElementRef;
  
  marcador1_disabled$ = new BehaviorSubject<boolean>(false);
  marcador2_disabled$ = new BehaviorSubject<boolean>(false);
  marcador1_loader_status:boolean = true;
  marcador2_loader_status:boolean = true;

  constructor(private marcadorSvc:MarcadorService,private loginSvc:LoginService, private router: Router,private quinielaSvc:QuinielaService) {

   }

  ngOnInit(): void {
  }

  public check_marcador_undefined(marcador_quiniela:any){
    if(marcador_quiniela == undefined) 
      return '0';
    else 
      return marcador_quiniela;
  }

  public guardaMarcador(marcador_1o2:number,event:any,marcador_exist_value:number):void{
    var data_marcador:Marcador = {
      id_marcador:0,
      status_marcador:0,
      marcador1_marcador:0,
      marcador2_marcador:0,
      quiniela_id_marcador:0,
      partido_id_marcador:0
    };
    if(this.router.url.indexOf("partidos") != -1){
      Swal.fire("Deje la Trampa");
      return;
    }
    if(this.router.url.indexOf("quiniela") != -1 && this.solo_lectura$.getValue() && this.quiniela_id != 1){
      Swal.fire("Deje la Trampa");
      return;
    }
    if(event.target.value == "")
       return;

    if(this.marcador_id != undefined){
      data_marcador.id_marcador = this.marcador_id;
    }
    data_marcador.status_marcador = 1;

    if(marcador_1o2 == 1){
      // this.marcador2_disabled$.next(true);
      this.marcador1_loader_status = false;
      data_marcador.marcador1_marcador = +event.target.value;
      data_marcador.marcador2_marcador = +this.marcador2_quiniela;
      if(this.marcador2_quiniela != undefined)
        data_marcador.marcador2_marcador = +this.marcador2_quiniela;
      else
        data_marcador.marcador2_marcador = 0;
    }
    if(marcador_1o2 == 2){
      // this.marcador1_disabled$.next(true);
      this.marcador2_loader_status = false;
      data_marcador.marcador2_marcador = +event.target.value;
      if(this.marcador1_quiniela != undefined)
        data_marcador.marcador1_marcador = +this.marcador1_quiniela;
      else
        data_marcador.marcador1_marcador = 0;
    }
    
// console.log(data_marcador);

    data_marcador.quiniela_id_marcador =  this.quiniela_id;
    
    data_marcador.partido_id_marcador = this.partido_id;

    this.marcadorSvc.guardaMarcadorQuiniela(data_marcador).pipe(
      tap((res:any) => {
        if(res.code == 401){
          Swal.fire("Su sesión ha expirado, por favor ingrese nuevamente.")
          .then(() => {
            this.loginSvc.logout();
          });
          return;
        }
        this.updateMarcadores.emit();
        this.marcador1_loader_status = true;
        this.marcador2_loader_status = true;
        this.marcador1_disabled$.next(false);
        this.marcador2_disabled$.next(false);
        
        // console.log("UpdateMarcadores");
      })
    ).subscribe();    
   
  }
  // public quinielaSoloLectura():void {
  //   this.quinielaSvc.quinielaSoloLectura(this.quiniela_id).pipe(
  //     tap((res:any) => {
  //       if(res.status == "2")
  //       {
  //         if(this.solo_lectura$.getValue() == false)
  //         {
  //           Swal.fire("Ya no se pueden realizar modificaciones a la Quiniela. <br><br> Buena Suerte!");
  //           this.solo_lectura$.next(true);
  //         }
  //       }else{
  //         this.solo_lectura$.next(false);
  //       }
  //     })    
  //   ).subscribe();
  // }

  public selectContent(obj:any):void{
    if(obj.name == "marcador1")
      this.marcador2_disabled$.next(true);
    if(obj.name == "marcador2")
      this.marcador1_disabled$.next(true);
    obj.select();
  }

}
