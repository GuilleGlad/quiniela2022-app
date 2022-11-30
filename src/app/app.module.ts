import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuinielaComponent } from './quiniela/quiniela.component';
import { PartidoComponent } from './partido/partido.component';
import { MarcadorComponent } from './marcador/marcador.component';
import { EquipoComponent } from './partido/equipo/equipo.component';
import { UserComponent } from './user/user.component';
import { MarcadorUserComponent } from './marcador-user/marcador-user.component';
import { SignupComponent } from './signup/signup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatSelectModule } from '@angular/material/select';
import { PartidosComponent } from './partidos/partidos.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InfoComponent } from './info/info.component';
import { ViewComponent } from './view/view.component';
registerLocaleData(localEs,'es');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    QuinielaComponent,
    PartidoComponent,
    MarcadorComponent,
    EquipoComponent,
    UserComponent,
    MarcadorUserComponent,
    SignupComponent,
    PartidosComponent,
    InfoComponent,
    ViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    RecaptchaModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
