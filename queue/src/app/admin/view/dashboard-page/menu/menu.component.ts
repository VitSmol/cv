import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Oz, Types } from '../../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {

  @Input() ozArray: Oz[] = [];
  @Output() selectOz = new EventEmitter<string>();

  selectedOrg: string | undefined = undefined;
  typesArr: Types[] = [];

  ngOnInit(): void {
  }

  public showPatientsByOrg(oz: Oz | null) {
    if (this.selectedOrg === oz?.orgname) return;
      this.selectedOrg = oz?.orgname
      this.selectOz.emit(this.selectedOrg);
  }
}
