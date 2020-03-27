import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvisosService } from 'src/app/Services/avisos.service';
import { GmailService } from 'src/app/Services/gmail.service';

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

  constructor(private formBuilder: FormBuilder, private avisosService: AvisosService, private gmail: GmailService) { }

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

    const correo = this.nuevoCorreo.value;

    const texto = correo.cuerpo;
    const destinatario = correo.destinatario;
    const asunto = correo.titulo;

    this.onReset();

    this.gmail.sendMessage(texto, destinatario, asunto).subscribe(
      (response) => {
        console.log('respuesta envio', response);
        this.avisosService.showMessage('Correo enviado a ${correo.destinatario}');
      },
      (error) => {
        this.avisosService.showMessage('Fallo en el envio');
      }
    );
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
