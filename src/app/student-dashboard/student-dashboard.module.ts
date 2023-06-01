import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './student-dashboard.component';
import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentDashboardRoutingModule,
    BlockUIModule,
    SweetAlert2Module,
    NgSelectModule,
    ModalModule.forRoot()
  ],
  declarations: [StudentDashboardComponent]
})
export class StudentDashboardModule { }