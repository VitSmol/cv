import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../shared/services/patient.service';
import { Oz, Patient, Types } from '../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {
  ozArray: Oz[] = [];
  typesArr: Types[] = [];

  constructor(
    private service: PatientService
  ) { }

  ngOnInit(): void {
    this.loadOz();
    this.loadTypes()
  }

  loadOz() {
    this.service.getOz().subscribe(response => {
      this.ozArray = response
    })
  }
  loadTypes() {
    this.service.getTypes().subscribe(types => {
      this.typesArr = types
      console.log(this.typesArr);
    })
  }

  showPatientsByOrg(org: string) {
    this.service.getPatientsByOrgRX(org);
  }

  // getPatientsByType(type: string) {
  //   this.service.getPatientsByTypeRX(type);
  // }
}
