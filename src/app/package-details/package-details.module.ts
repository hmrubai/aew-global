import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageDetailsComponent } from './package-details.component';
import { PackageDetailsRoutingModule } from './package-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PackageDetailsRoutingModule
  ],
  declarations: [PackageDetailsComponent]
})
export class PackageDetailsModule { }