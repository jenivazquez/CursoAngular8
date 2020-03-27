import { Component, OnInit } from '@angular/core';
import { GmailService } from 'src/app/Services/gmail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss']
})
export class ListaCorreosComponent implements OnInit {

  listaCorreos: any[];
  respuesta: boolean;

  constructor(private gmail: GmailService, private router: Router) {
    this.listaCorreos = [];
  }

  ngOnInit(): void {
    this.getMessages();
  }

  clickResponder(correo) {
    correo.respuesta = !correo.respuesta;
  }

  cierreRespuesta(correo) {
    correo.respuesta = !correo.respuesta;
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
      (err) => this.error(err),
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
        asunto: asunto ? asunto.value : undefined,
      };
      this.listaCorreos.push(message);
    },
      (error) => this.error(error)
    );
  }

  error(err) {
    console.warn(err);
  }

}
