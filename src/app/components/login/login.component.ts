import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  numOfImages = 3;
  imageNum: number = Math.floor(Math.random() * this.numOfImages);
  slides = [
    '../../../assets/photos/photo1.jpg',
    '../../../assets/photos/photo2.jpg',
    '../../../assets/photos/photo3.jpg',
  ];
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
