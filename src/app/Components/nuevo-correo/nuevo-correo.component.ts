import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit {

  nuevoCorreo: FormGroup;
  submitted = false;
  @Input() correo: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.nuevoCorreo = this.formBuilder.group({
      asunto: ['', [Validators.required, Validators.maxLength(20)]],
      cuerpo: ['', [Validators.required, Validators.maxLength(100)]],
      receptor: ['', [Validators.required, Validators.email]]
    });

    if(this.correo !== undefined) {
      this.nuevoCorreo.patchValue({
        asunto : 'Re: ' + this.correo.asunto,
        receptor: this.correo.emisor
      });
    }
  }

  get formulario() {
    return this.nuevoCorreo.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.nuevoCorreo.invalid) {
      return;
    }

    let correo = this.nuevoCorreo.value;
    correo.leido = false;
    correo.emisor = 'jeni@prueba.es';

    alert('El correo ha sido enviado. Eliminamos el formulario.');
    this.onReset();
  }

  onReset(): void {
    this.submitted = false;
    this.nuevoCorreo.reset();
  }

}
