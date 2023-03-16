import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from './package-list.component';
import { PackageListRoutingModule } from './package-list-routing.module';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    CommonModule,
    PackageListRoutingModule,
    BlockUIModule
  ],
  declarations: [PackageListComponent]
})
export class PackageListModule { }