import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';
import { Correo } from '../Interface/Correo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor(private http: HttpClient, private login: LoginService) { }

  public getMessages = function () {
    const url = 'https://www.googleapis.com/gmail/v1/users/' + this.login.userId + '/messages?';
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.login.tokenUser}` });

    let params = new HttpParams();
    params = params.append('maxResults', '10');

    return this.http.get(url, { headers: headers, params: params });
  };

  public getMessage = function (id: string) {

    const url = 'https://www.googleapis.com/gmail/v1/users/' + this.login.userId + '/messages/' + id;
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.login.tokenUser}` });

    let params = new HttpParams();
    params = params.append('format', 'full');

    let respuestaObservable = this.http.get(url, { headers: headers, params: params });
    return respuestaObservable.pipe(map(this.helperGetMessage));
  };

  public sendMessage = function (text: string, to: string, subject: string) {

    const url = 'https://www.googleapis.com/gmail/v1/users/' + this.login.userId + '/messages/send';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.login.tokenUser}` });

    const emailTemplate =
      'Content-Type:  text/plain; charset=\'UTF-8\'\nContent-length: 5000\nContent-Transfer-Encoding: message/rfc2822\n' +
      `To: ${to}\n` +
      `Subject: ${subject}\n\n` +
      `${text}`;
    const base64EncodedEmail = btoa(emailTemplate).replace(/\+/g, '-').replace(/\//g, '_');

    return this.http.post(url, { 'raw': base64EncodedEmail }, { headers: headers });
  };

  private helperGetMessage = (response: any) => {

    let correo: Correo;

    if (response) {
      const emisor = response.payload.headers.find(e => e.name === 'From');
      const asunto = response.payload.headers.find(e => e.name === 'Subject');
      correo = {
        id: response.id,
        cuerpo: response.snippet,
        emisor: emisor ? emisor.value : undefined,
        receptor: '',
        asunto: asunto ? asunto.value : undefined,
      };
    }

    return correo;

  }

}
