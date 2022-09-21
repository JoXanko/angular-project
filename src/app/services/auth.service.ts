import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

import { Observable, of } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any> /*=of([])*/;
  show: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  matpopupDuration: number = 3000;

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
    this.snackBar('Uspesno ste se prijavili','green-snackbar')
    // this._snackBar.open('Uspesno ste se prijavili', 'Zatvori', {
    //   duration: this.matpopupDuration,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    //   panelClass: ['green-snackbar'],
    // });
    this.show = false;
    return provider;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    this.snackBar('Uspesno ste se odjavili','red-snackbar')
    // this._snackBar.open('Uspesno ste se odjavili', 'Zatvori', {
    //   duration: 3000,
    // });
    // console.log(this.show);
    this.show = true;
  }
  snackBar(text:string,type:string){
    this._snackBar.open(text, 'Zatvori', {
      duration: this.matpopupDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type],
    });
  }
}
