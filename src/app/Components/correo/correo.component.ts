import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Correo } from 'src/app/Interface/Correo';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correo: Correo;

  constructor(private route: ActivatedRoute) {
    this.correo = {
      id: '',
      emisor: '',
      receptor: '',
      asunto: '',
      cuerpo: ''
    };
  }

  ngOnInit(): void {
    const paramCorreo = this.route.snapshot.paramMap.get('correo');
    this.correo = JSON.parse(paramCorreo);
  }

}
