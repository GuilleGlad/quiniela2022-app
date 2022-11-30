import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, tap, timer, BehaviorSubject, delay, debounceTime, concat, throttle, throttleTime} from 'rxjs';
import { LoginService } from '../login/login.service';
import { MarcadorService } from '../marcador/marcador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  IsLoggedIn!:Observable<boolean>;
  username$ = new BehaviorSubject<string>('');
  puntos$ = new BehaviorSubject<number>(0);
  interval$ = timer(1, 2000);
  loader_hide$ = new BehaviorSubject<boolean>(false);


  constructor(private loginSvc:LoginService,private marcadorSvc:MarcadorService) { 
    this.IsLoggedIn = this.loginSvc.isLoggedIn();
    this.IsLoggedIn.pipe(
      tap((res) =>{
        if(res){
          const jwt:any = localStorage.getItem("token");
          const jwt_obj:any = jwtDecode(jwt);
          this.username$.next(jwt_obj.username);
        }
      })
    ).subscribe();
    this.interval$.pipe(
      tap(() => this.loader_hide$.next(false)),
      throttleTime(5000),
      tap(() => {
          const quiniela_id = localStorage.getItem("quiniela_id");
          this.getPuntosHeader(quiniela_id);
          this.loader_hide$.next(true); 
      })
    ).subscribe();
  }

  public getPuntosHeader(quiniela_id:any) {
    this.marcadorSvc.getPuntos(quiniela_id).pipe(
      tap((res) => {
        this.puntos$.next(res);
      })
    ).subscribe();
  }

  public call_logout():void{
    this.loginSvc.logout();
  }

  ngOnInit(): void {
    
  }

}
