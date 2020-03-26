import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  mensaje: string;
  visible: boolean;

  constructor() {
    this.mensaje = '';
    this.visible = false;
  }

  showMessage(mensaje: string){
    this.mensaje = mensaje;
    this.visible = true;
    this.hideMessage();
  }

  hideMessage(){
    setTimeout(() => {
      this.mensaje = '';
      this.visible = false;
    }, 3000);
  }
}
