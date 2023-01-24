import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  change() {
    environment.lang = 'en';
    console.log(environment.lang);
  }

  red() {
    const wrap = document.querySelector('.nav__wrapper');
    (wrap as HTMLDivElement).style.background = 'red';
  }
}
