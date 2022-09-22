import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
import { UserEffects } from 'src/app/store/user/user.effects';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public UserEffects: UserEffects, private router: Router) {}

  ngOnInit(): void {}
  myPetsPage() {
    this.router.navigate(['myPets']);
  }
  mainPage() {
    this.router.navigate(['mainPage']);
  }
}
