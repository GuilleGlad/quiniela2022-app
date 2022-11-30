import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-marcador-user',
  templateUrl: './marcador-user.component.html',
  styleUrls: ['./marcador-user.component.css']
})
export class MarcadorUserComponent implements OnInit {

  constructor() { }

  @Input() id_cell!:number;
  @Input() id_user!:number;
  @Input() username!:string;
  @Input() puntos!:number;
  @Input() firstname!:string;
  @Input() lastname!:string;
  @Input() icon!:string;
  @Input() marcador_parcial!:number;
  @Input() marcador_exacto!:number;
  @Input() mobile!:Observable<boolean>;

  ngOnInit(): void {
  }

}
