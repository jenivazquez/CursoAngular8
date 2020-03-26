import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvisosService } from 'src/app/Services/avisos.service';

@Component({
  selector: 'app-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit {

  nuevoCorreo: FormGroup;
  submitted = false;
  @Input() correo: any;
  @Output() eventoCierre: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private avisosService: AvisosService) { }

  ngOnInit() {

    this.nuevoCorreo = this.formBuilder.group({
      asunto: ['', [Validators.required, Validators.maxLength(50)]],
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

    this.onReset();
    this.avisosService.showMessage('El correo ha sido enviado');
  }

  onCancel(){
    this.onReset();
    this.avisosService.showMessage('Se ha cancelado la operación');
  }

  onReset(): void {
    this.submitted = false;
    this.nuevoCorreo.reset();
    this.eventoCierre.emit();
  }

}
