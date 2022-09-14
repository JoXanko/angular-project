import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any> /*=of([])*/;

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
    this.router.navigate(['mainPage'])
    this._snackBar.open('Uspesno ste se prijavili', 'Zatvori',{
      duration:3000
    });
    return provider;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    this._snackBar.open('Uspesno ste se odjavili', 'Zatvori',{
      duration:3000
    });
  }
}
