import { Component, OnInit } from '@angular/core';
import { GmailService } from 'src/app/Services/gmail.service';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AvisosService } from 'src/app/Services/avisos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Correo } from 'src/app/Interface/Correo';


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
    this.router.navigate(['/email', {correo: JSON.stringify(correo)}]);
  }

  getMessages() {
    this.gmail.getMessages().subscribe((response) => {
      const messages = response.messages;
      messages.forEach(element => {
        this.getMessage(element.id);
      });
    },
      (err) => this.error(err)
    );
  }

  getMessage(id: string) {
    this.gmail.getMessage(id).subscribe((response) => {
      const emisor = response.payload.headers.find(e => e.name === 'From');
      const asunto = response.payload.headers.find(e => e.name === 'Subject');
      const message = {
        id: response.id,
        cuerpo: response.snippet,
        emisor: emisor ? emisor.value : undefined,
        receptor: '',
        asunto: asunto ? asunto.value : undefined,
      };
      this.dataSource.data.push(message);
      this.dataSource._updateChangeSubscription();
    },
      (error) => this.error(error)
    );
  }

  error(err) {
    this.servicioAvisos.showMessage('Se ha producido un error');
  }

}
