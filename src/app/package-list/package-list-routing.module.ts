import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageListComponent } from './package-list.component';

const routes: Routes = [
  {
    path: '',
    component: PackageListComponent,
    data: {
      title: 'List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageListRoutingModule {}
