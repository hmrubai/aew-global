import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { PackageDetailsComponent } from './package-details.component';
import { PackageDetailsRoutingModule } from './package-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    PackageDetailsRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    NgSelectModule,
    SweetAlert2Module
  ],
  declarations: [PackageDetailsComponent]
})
export class PackageDetailsModule { }