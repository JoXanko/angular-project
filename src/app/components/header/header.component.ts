import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/user/user.model';
import { LoginComponent } from '../login/login.component';
import * as userActions from '../../store/user/user.actions';

interface AppState {
  user: User;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();
  constructor(
    private router: Router,
    private login: LoginComponent,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select('user');
    this.store.dispatch(new userActions.GetUser());
  }

  logout() {
    this.store.dispatch(new userActions.Logout());
  }
}
