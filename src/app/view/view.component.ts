import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, from, map, Observable, tap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { MarcadorService } from '../marcador/marcador.service';
import { Partido } from '../partido/partido.interface';
import { PartidoService } from '../partido/partido.service';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  IsLoggedIn:Observable<boolean>;

  public quiniela_id:string = '';
  public partidos!:Partido[];
  // public marcadores!:Marcador[];
  public username:string = '';
  // public config$:any;
  // public users!:User[];
  // public user_id$ = new BehaviorSubject<string>("1");
  // public quinielas_modo_lectura:boolean = false;
  // public solo_lectura$:boolean = false;
  public user$ = new BehaviorSubject<String>('');
  // public interval$ = timer(1000,10000);
  user_id: any;

  constructor(private loginSvc:LoginService, private router:Router,private activeRouter:ActivatedRoute,private partidoSvc:PartidoService,private marcadorSvc:MarcadorService,private userSvc:UserService) { 
    this.IsLoggedIn = this.loginSvc.isLoggedIn();
    this.activeRouter.params.subscribe((params) => {
      this.user_id = params['id'];
      const user = this.userSvc.getUser(this.user_id).pipe(
        tap((res:any) => this.user$.next(res[0].username))
      ).subscribe();
    })
  }

  ngOnInit(): void {

    this.IsLoggedIn.pipe(
      tap((res) =>{
        if(res == false){
          this.router.navigate(['/login']);
        }else{

          this.partidoSvc.getPartidos().pipe(
            tap((res:any) => {
              const jwt_obj:any = jwtDecode(res.jwt);
              this.partidos = jwt_obj.partidos;
              this.marcadorSvc.getMarcadores(this.user_id).pipe(
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
            })
          ).subscribe();
          }
        }) 
    ).subscribe();     

  }

}
