import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from './package-list.component';
import { PackageListRoutingModule } from './package-list-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { TruncatePipe } from '../_helpers/truncate-pipe';

@NgModule({
  imports: [
    CommonModule,
    PackageListRoutingModule,
    BlockUIModule
  ],
  declarations: [PackageListComponent, TruncatePipe]
})
export class PackageListModule { }