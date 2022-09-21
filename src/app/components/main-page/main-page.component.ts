import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  showLost: boolean = false;
  showFind: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  showLostForm() {
    this.showLost = !this.showLost;
    this.showFind ? (this.showFind = !this.showFind) : '';
  }
  showFindForm() {
    this.showFind = !this.showFind;
    this.showLost ? (this.showLost = !this.showLost) : '';
  }
}
