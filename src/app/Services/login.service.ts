import { Injectable, NgZone } from '@angular/core';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public static readonly SESSION_STORAGE_KEY: string = 'usuarioGoogle';

  profile: any = undefined;
  tokenUser: string;
  userId: string;

  constructor(private ngZone: NgZone, private googleAuth: GoogleAuthService) {
    if(this.isLogged()){
      this.setUser(this.getSessionUser());
    }
  }

  public getSessionUser(): GoogleUser {
    const user: string = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
    if (!user) {
      throw new Error('no token set , authentication required');
    }
    return JSON.parse(user);
  }

  public signIn(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      auth.signIn().then(
        res => this.signInSuccessHandler(res),
        err => this.signInErrorHandler(err)
      );
    });
  }

  public signOut(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      try {
        auth.signOut();
        this.profile = undefined;
        this.tokenUser = undefined;
        this.userId = undefined;
        sessionStorage.removeItem(LoginService.SESSION_STORAGE_KEY);
      } catch (error) {
        console.error(error);
      }
    });
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.ngZone.run(() => {
      this.setUser(res);
      sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(res));
    });
  }

  private signInErrorHandler(err) {
    console.warn(err);
  }

  private setUser(user: any) {
    console.dir(user);
    this.profile = user.Rt;
    this.tokenUser = user.uc.access_token;
    this.userId = this.profile.eV;
  }

  public isLogged(): boolean {
    if (sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY) === null) {
      return false;
    }
    return true;
  }

}
