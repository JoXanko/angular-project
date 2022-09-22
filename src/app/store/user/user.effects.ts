import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { User } from './user.model';
import { Auth, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as firebase from 'firebase';
import * as userActions from './user.actions';
import { from, observable, Observable, switchMap, tap } from 'rxjs';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UsersQuery } from './user.reducer';
import { Store } from '@ngrx/store';
export type Action = userActions.All;
interface AppState {
  user: User;
}
@Injectable()
export class UserEffects {
  user$: Observable<any> = this.afAuth.authState;
  show: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  matpopupDuration: number = 3000;

  constructor(
    private store: Store<AppState>,
    private action: Actions,
    private afAuth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  public getUser = createEffect(() => {
    return this.action.pipe(
      ofType(userActions.GET_USER),
      map((action: userActions.GetUser) => action.payload),
      switchMap((payload) => this.afAuth.authState),
      map((authData) => {
        if (authData && authData.displayName) {
          const user = new User(authData.uid, authData.displayName);
          return new userActions.Authenticated(user);
        } else {
          return new userActions.NotAuthenticated();
        }
      }),
      catchError((err) => of(new userActions.AuthError()))
    );
  });
  public Login = createEffect(() => {
    return this.action.pipe(
      ofType(userActions.GOOGLE_LOGIN),
      map((action: userActions.GoogleLogin) => action.payload),
      switchMap((payload) => {
        return from(this.googleLogin());
      }),
      tap(() => {
        this.router.navigate(['mainPage']);
        this._snackBar.open('Uspesno ste se prijavili', 'Zatvori', {
          duration: this.matpopupDuration,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar'],
        });
      }),
      map((credential) => {
        return new userActions.GetUser();
      }),
      catchError((err) => {
        return of(new userActions.AuthError({ error: err.message }));
      })
    );
  });

  public Logout = createEffect(() => {
    return this.action.pipe(
      ofType(userActions.LOGOUT),
      map((action: userActions.Logout) => action.payload),
      switchMap((payload) => {
        return of(this.afAuth.signOut());
      }),
      tap(() => {
        this.router.navigate(['/']);
        this._snackBar.open('Uspesno ste se odjavili', 'Zatvori', {
          duration: this.matpopupDuration,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['red-snackbar'],
        });

        this.show = true;
      }),
      map((authData) => {
        return new userActions.NotAuthenticated();
      }),
      catchError((err) => {
        return of(new userActions.AuthError({ error: err.message }));
      })
    );
  });
  login(): Observable<User> {
    this.show = false;
    this.store.dispatch(new userActions.GoogleLogin());
    // console.log(this.user$)
    return this.user$;
  }

  /**
   *
   */
  logout(): Observable<User> {
    this.show = true;
    this.store.dispatch(new userActions.Logout());
    return this.user$;
  }
  protected googleLogin(): Promise<any> {
    // this.show = false;
    const provider = new GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }
  // .catch(err=>Observable.of(new userActions.Authenticated()));
}
