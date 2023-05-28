import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { TruncatePipe } from '../_helpers/truncate-pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    BlockUIModule,
    SweetAlert2Module
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }