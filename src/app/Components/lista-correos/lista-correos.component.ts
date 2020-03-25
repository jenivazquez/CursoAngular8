import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss']
})
export class ListaCorreosComponent implements OnInit {

  listaCorreos: any[];

  constructor() { 

    const correo1 = {
      asunto: "Prueba primer correo",
      cuerpo: "Este es un correo de prueba para la segunda práctica del curso de Angular que consiste en mostrar un listado de correos",
      emisor: "jeni@prueba.es",
      receptor: "lucia@prueba.es",
      leido: true
    }

    const correo2 = {
      asunto: "Prueba segundo correo",
      cuerpo: "Este es el segundo correo de prueba para la práctica de angular",
      emisor: "jeni@prueba.es",
      receptor: "josua@prueba.es",
      leido: false
    }

    this.listaCorreos = [];
    this.listaCorreos.push(correo1);
    this.listaCorreos.push(correo2);

  }

  ngOnInit(): void {
  }

}
