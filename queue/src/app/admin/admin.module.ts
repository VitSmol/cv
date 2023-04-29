import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { DashboardPageComponent } from './view/dashboard-page/dashboard-page.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AddPageComponent } from './view/add-page/add-page.component';
import { AuthGuard } from './shared/auth.guard';
import { MenuComponent } from './view/dashboard-page/menu/menu.component';
import { ContentComponent } from './view/dashboard-page/content/content.component';
import { OnceAddComponent } from './view/once-add/once-add.component';
import { AllListComponent } from './view/all-list/all-list.component';
import { CustomDatePipe } from './shared/custom-date.pipe';
import { EditPageComponent } from './view/dialog/edit-page/edit-page.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmComponent } from './view/dialog/confirm/confirm.component';

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
    CustomDatePipe,
    EditPageComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
          { path: 'once-add', component: OnceAddComponent, canActivate: [AuthGuard] },
          { path: 'list', component: AllListComponent, canActivate: [AuthGuard] },
          { path: 'edit/:id', component: EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
  ],
  exports: [],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  entryComponents: [
    EditPageComponent,
    ConfirmComponent
  ],
})
export class AdminModule { }
