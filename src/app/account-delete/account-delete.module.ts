import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAccountComponent } from './account-delete.component';
import { DeleteAccountRoutingModule } from './account-delete-routing.module';
import { BlockUIModule } from 'ng-block-ui';
// import { TruncatePipe } from '../_helpers/truncate-pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DeleteAccountRoutingModule,
    BlockUIModule,
    FormsModule,
    SweetAlert2Module,
    ModalModule.forRoot()
  ],
  declarations: [DeleteAccountComponent]
})
export class DeleteAccountModule { }