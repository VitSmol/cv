import { Component, OnInit } from '@angular/core';

type Obj = {
  ru: {
    hi: string,
    name: string,
    description: string,
  },
  en: {
    hi: string,
    name: string,
    description: string,
  }
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  arr = new Array(20).fill(0);
  lang = 'ru'
  hi: string = ``
  name: string = ``
  description:string = ``

  greeting: Obj = {
    ru: {
      hi: "Привет!",
      name: 'Меня зовут Виталий Смолицкий!',
      description: 'И эта страница - мое CV!'
    },
    en: {
      hi: "Hello!",
      name: 'My name is Vitaliy Smolitskiy!',
      description: 'And this page is my CV!'
    }
  }
    constructor() { }

    ngOnInit(): void {
      this.hi = this.greeting[this.lang as keyof Obj].hi;
      this.name = this.greeting[this.lang as keyof Obj].name;
      this.description = this.greeting[this.lang as keyof Obj].description;
    }

}
