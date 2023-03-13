import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  auth: any
  constructor(
    private router: Router,
    private dataService: ApiService
  ){}

  ngOnInit(): void {
    this.auth = localStorage.getItem('token')
    if (!this.auth) {
      this.router.navigate(['login'])
    }
    // throw new Error('Method not implemented.');
  }
  showAll() {

  }
}
