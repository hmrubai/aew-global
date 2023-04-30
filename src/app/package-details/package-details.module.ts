import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { PackageDetailsComponent } from './package-details.component';
import { PackageDetailsRoutingModule } from './package-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PackageDetailsRoutingModule,
    BlockUIModule
  ],
  declarations: [PackageDetailsComponent]
})
export class PackageDetailsModule { }