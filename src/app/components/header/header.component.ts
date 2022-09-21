import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {}
  myPetsPage(){
    this.router.navigate(['myPets'])
  }
  mainPage(){
    this.router.navigate(['mainPage'])
  }
}
