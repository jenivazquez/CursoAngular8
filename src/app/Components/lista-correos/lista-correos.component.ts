import { Component, OnInit } from '@angular/core';
import { GmailService } from 'src/app/Services/gmail.service';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AvisosService } from 'src/app/Services/avisos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Correo } from 'src/app/Interface/Correo';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss'],
})

export class ListaCorreosComponent implements OnInit {

  listaCorreos: Correo[];
  respuesta = false;
  displayedColumns: string[] = ['emisor', 'asunto', 'acciones'];
  dataSource = new MatTableDataSource<Correo>();
  correoActivo: any;
  subscription: Subscription;

  constructor(private gmail: GmailService, private router: Router, private servicioAvisos: AvisosService) {
    this.listaCorreos = [];
  }

  ngOnInit(): void {
    this.getMessages();
  }

  clickResponder(correo) {
    this.correoActivo = correo;
    this.correoActivo.respuesta = !this.correoActivo.respuesta;
  }

  cierreRespuesta() {
    this.correoActivo.respuesta = !this.correoActivo.respuesta;
    this.correoActivo = undefined;
  }

  detalleCorreo(correo) {
    this.router.navigate(['/email', { correo: JSON.stringify(correo) }]);
  }

  getMessages() {
    this.subscription = (this.gmail.getMessages().subscribe((response) => {
      const messages = response.messages;
      messages.forEach(element => {
        this.getMessage(element.id);
      });
    },
      (err) => this.error(err)
    ));
  }

  getMessage(id: string) {
    this.gmail.getMessage(id).subscribe((correo) => {
      this.dataSource.data.push(correo);
      this.dataSource._updateChangeSubscription();
    },
      (error) => this.error(error)
    );
  }

  error(err) {
    this.servicioAvisos.showMessage('Se ha producido un error');
  }

  ngOnDestroy() {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

}
