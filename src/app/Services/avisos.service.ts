import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  constructor(private snackBar: MatSnackBar) {}

  showMessage(mensaje: string, tipo?: string) {
    let accion = '';
    if (tipo) {
      accion = tipo;
    }
    this.snackBar.open(mensaje, accion, {
      duration: 2000,
    });
  }

}
