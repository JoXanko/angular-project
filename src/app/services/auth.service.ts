import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  show: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  matpopupDuration: number = 3000;
  loginMessage: string = 'Uspesno ste se prijavili';
  logoutMessage: string = 'Uspesno ste se odjavili';
  snackBarAction: string = 'Zatvori';
  greenSnackBar: string = 'green-snackbar';
  redSnackBar: string = 'red-snackbar';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState;
  }
  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['mainPage']);
    this.snackBar(this.loginMessage, this.greenSnackBar);
    this.show = false;
    return provider;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    this.snackBar(this.logoutMessage, this.redSnackBar);
    this.show = true;
  }
  snackBar(text: string, type: string) {
    this._snackBar.open(text, this.snackBarAction, {
      duration: this.matpopupDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type],
    });
  }
}
