import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // hide:boolean=true;

  numOfImages = 3;
  imageNum: number = Math.floor(Math.random() * this.numOfImages);

  slides = [
    '../../../assets/photos/photo1.jpg',
    '../../../assets/photos/photo2.jpg',
    '../../../assets/photos/photo3.jpg',
  ];
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    interval(1530)
      .pipe(
        tap(() => {
          this.slides[this.imageNum];
          let paws = document.getElementById('gif');
          let randX = (Math.random() * document.body.offsetHeight) | 0;
          let randY = (Math.random() * document.body.offsetWidth) | 0;
          if (paws != null) {
            paws.style.top = randX + 'px';
            paws.style.left = randY + 'px';
          }
        })
      )
      .subscribe();
  }
}
