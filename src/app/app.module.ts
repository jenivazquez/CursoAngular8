import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CorreoComponent } from './Components/correo/correo.component';
import { ListaCorreosComponent } from './Components/lista-correos/lista-correos.component';
import { NuevoCorreoComponent } from './Components/nuevo-correo/nuevo-correo.component';
import { CorreosRecibidosComponent } from './Views/correos-recibidos/correos-recibidos.component';
import { AvisosComponent } from './Components/avisos/avisos.component';
import { LoginComponent } from './Components/login/login.component';
import { GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig } from 'ng-gapi';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './Menu/menu/menu.component';
import { EnviarCorreoComponent } from './Views/enviar-correo/enviar-correo.component';
import { HomeComponent } from './Views/home/home.component';
import { DetalleCorreoComponent } from './Views/detalle-correo/detalle-correo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '477024369379-d47ctr8bpkisn9a3vo2mnsbmhdhp59do.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  ux_mode: 'popup',
  scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/gmail.labels',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.readonly'
  ].join(' ')
};
@NgModule({
  declarations: [
    AppComponent,
    CorreoComponent,
    ListaCorreosComponent,
    NuevoCorreoComponent,
    CorreosRecibidosComponent,
    AvisosComponent,
    LoginComponent,
    MenuComponent,
    EnviarCorreoComponent,
    HomeComponent,
    DetalleCorreoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
