import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  show: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  showForm() {
    //nece moz ovako zeza posle loggout
    this.show = !this.show;
  }
}
