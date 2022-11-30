import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EquipoComponent } from './partido/equipo/equipo.component';
import { QuinielaComponent } from './quiniela/quiniela.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { PartidosComponent } from './partidos/partidos.component';
import { InfoComponent } from './info/info.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path: 'login',     component:LoginComponent},
  {path: 'signup',    component:SignupComponent},
  {path: 'quiniela',  component:QuinielaComponent},
  {path: 'equipo' ,   component:EquipoComponent},
  {path: 'users' ,    component:UserComponent},
  {path: 'partidos',  component:PartidosComponent},
  {path: 'info' ,     component:InfoComponent},
  {path: 'view/:id',  component:ViewComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
