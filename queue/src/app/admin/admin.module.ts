import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddPageComponent } from './add-page/add-page.component';
import { AuthGuard } from './shared/auth.guard';
import { MenuComponent } from './dashboard-page/menu/menu.component';
import { ContentComponent } from './dashboard-page/content/content.component';
import { OnceAddComponent } from './once-add/once-add.component';
import { AllListComponent } from './all-list/all-list.component';
import { CustomDatePipe } from './shared/custom-date.pipe';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    AddPageComponent,
    MenuComponent,
    ContentComponent,
    OnceAddComponent,
    AllListComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
          { path: 'once-add', component: OnceAddComponent, canActivate: [AuthGuard] },
          { path: 'list', component: AllListComponent, canActivate: [AuthGuard] },
        ]
      }
    ]),
  ],
  exports: [],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class AdminModule { }
