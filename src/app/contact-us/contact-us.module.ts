import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { BlockUIModule } from 'ng-block-ui';
// import { TruncatePipe } from '../_helpers/truncate-pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    BlockUIModule,
    SweetAlert2Module
  ],
  declarations: [ContactUsComponent],
  // exports: [TruncatePipe],
})
export class ContactUsModule { }