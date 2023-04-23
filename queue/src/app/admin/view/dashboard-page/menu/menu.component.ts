import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { Oz, Patient, Types } from '../../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {

  @Input() ozArray: Oz[] = [];
  @Output() selectOz = new EventEmitter<string>();

  selectedOrg!: string
  typesArr: Types[] = [];

  constructor(
    private service: PatientService
  ) { }

  ngOnInit(): void {

  }

  loadTypes() {

  }

  showPatientsByOrg(oz: Oz) {
    if (this.selectedOrg === oz.orgname) return;
    this.selectedOrg = oz.orgname
    this.selectOz.emit(this.selectedOrg);
  }
}
