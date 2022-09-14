import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide:boolean=true;
  slides = [
    {
      image:
        'https://images.pexels.com/photos/1452717/pexels-photo-1452717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      image:
        'https://images.pexels.com/photos/1612861/pexels-photo-1612861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      image:
        'https://images.pexels.com/photos/1448055/pexels-photo-1448055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.hide=true;
  }

  hideLogin(){//nece moz ovako zeza posle loggout
    this.hide=!this.hide;
  }
}

