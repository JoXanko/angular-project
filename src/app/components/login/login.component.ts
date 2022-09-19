import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { interval, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/user/user.model';
import * as userActions from '../../store/user/user.actions'
import { AppModule } from 'src/app/app.module';
import {UserEffects} from '../../store/user/user.effects'

interface AppState{
  user:User;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // hide:boolean=true;
  show:boolean=true;
  user$:Observable<User>=new Observable<User>;
  numOfImages = 3;
  imageNum: number = Math.floor(Math.random() * this.numOfImages);

  slides = [
    '../../../assets/photos/photo1.jpg',
    '../../../assets/photos/photo2.jpg',
    '../../../assets/photos/photo3.jpg',
  ];
  constructor(private store: Store<AppState>,private userEffects:UserEffects) {}

  ngOnInit(): void {
    this.show=this.userEffects.show;
    this.user$=this.store.select('user');
    this.store.dispatch(new userActions.GetUser())
    // interval(1530)
    //   .pipe(
    //     tap(() => {
    //       this.slides[this.imageNum];
    //       let paws = document.getElementById('gif');
    //       let randX = (Math.random() * document.body.offsetHeight) | 0;
    //       let randY = (Math.random() * document.body.offsetWidth) | 0;
    //       if (paws != null) {
    //         paws.style.top = randX + 'px';
    //         paws.style.left = randY + 'px';
    //       }
    //     })
    //   )
    //   .subscribe();
  }
  googleLogin(){
    this.store.dispatch(new userActions.GoogleLogin())
  }
}
