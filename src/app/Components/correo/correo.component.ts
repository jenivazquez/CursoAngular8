import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correo: any;

  constructor(private route: ActivatedRoute) {
    this.correo = {
      asunto: '',
      cuerpo: '',
      emisor: '',
      receptor: ''
    };
  }

  ngOnInit(): void {
    const paramCorreo = this.route.snapshot.paramMap.get('correo');
    this.correo = JSON.parse(paramCorreo);
  }

}
