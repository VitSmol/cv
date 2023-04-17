import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../shared/patient.service';
import { Oz } from '../../shared/phpInterface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {
  ozArray: Oz[] = [];

  constructor(
    private ozService: PatientService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.ozService.getOz().subscribe(response => {
      this.ozArray = response
      console.log(this.ozArray);
    })
  }

}
