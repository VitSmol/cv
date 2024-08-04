import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Oz } from '../../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent {

  @Output() selectOz = new EventEmitter<string>();

  @Input() ozArray: Oz[] = [];
  @Input() selectedOrg?: string | null;

public showPatientsByOrg(oz: Oz | null) {
    if (this.selectedOrg === oz?.orgname) return;
      this.selectedOrg = oz?.orgname
      this.selectOz.emit(this.selectedOrg);
  }
}
