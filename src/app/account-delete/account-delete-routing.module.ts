import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteAccountComponent } from './account-delete.component';

const routes: Routes = [
  {
    path: '',
    component: DeleteAccountComponent,
    data: {
      title: 'List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteAccountRoutingModule {}
