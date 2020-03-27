import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor(private http: HttpClient, private login: LoginService) { }

  public getMessages = function () {
    const url = 'https://www.googleapis.com/gmail/v1/users/' + this.login.userId + '/messages?';
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.login.tokenUser}` });
    return this.http.get(url, { headers });
  };

  public getMessage = function(id: string) {
    const url = 'https://www.googleapis.com/gmail/v1/users/' + this.login.userId + '/messages/' + id;
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.login.tokenUser}` });

    let params = new HttpParams();
    params = params.append('format', 'full');

    return this.http.get(url, { headers: headers, params: params });
  };

}
