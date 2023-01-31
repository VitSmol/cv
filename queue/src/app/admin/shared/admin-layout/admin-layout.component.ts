import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass']
})
export class AdminLayoutComponent {

  constructor(
    public auth: AuthService,
    public router: Router
    ) {}
  logout(e: Event) {
    e.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
