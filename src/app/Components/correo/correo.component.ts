import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correo: any;

  constructor() {
    this.correo = {
      asunto: 'Prueba correo',
      cuerpo: 'Este es una correo de prueba para la primera práctica del curso de Angular 8',
      emisor: 'jeni@prueba.es',
      receptor: 'lucia@prueba.es'
    };
  }

  ngOnInit(): void {
  }

}
