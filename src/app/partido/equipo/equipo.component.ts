import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  codigos_paises:any;
  pais_abbr:string = "";
  constructor(private http_con:HttpClient) { 
    this.http_con.get('assets/json/codes.json').subscribe(
      (res) => {
        this.codigos_paises = res;
        for(let entry of Object.entries(this.codigos_paises)){
          if(this.nombre_equipo == entry[1])
            this.pais_abbr = entry[0];
        }
      }
    );
  }

  @Input() nombre_equipo:string = "";


  ngOnInit(): void {
  }

}
