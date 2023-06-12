import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertDashboardComponent } from './expert-dashboard.component';
import { ExpertDashboardRoutingModule } from './expert-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExpertDashboardRoutingModule,
    BlockUIModule,
    SweetAlert2Module,
    NgSelectModule,
    ModalModule.forRoot()
  ],
  declarations: [ExpertDashboardComponent]
})
export class ExpertDashboardModule { }