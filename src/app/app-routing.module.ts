import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Views/home/home.component';
import { CorreosRecibidosComponent } from './Views/correos-recibidos/correos-recibidos.component';
import { EnviarCorreoComponent } from './Views/enviar-correo/enviar-correo.component';
import { CorreoComponent } from './Components/correo/correo.component';
import { DetalleCorreoComponent } from './Views/detalle-correo/detalle-correo.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'emails' , component: CorreosRecibidosComponent},
  {path: 'new' , component: EnviarCorreoComponent},
  {path: 'email' , component: DetalleCorreoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
