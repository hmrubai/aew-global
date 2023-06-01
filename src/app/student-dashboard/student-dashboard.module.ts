import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './student-dashboard.component';
import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { TruncatePipe } from '../_helpers/truncate-pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    BlockUIModule,
    SweetAlert2Module
  ],
  declarations: [StudentDashboardComponent, TruncatePipe]
})
export class StudentDashboardModule { }