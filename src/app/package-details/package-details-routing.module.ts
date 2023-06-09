import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageDetailsComponent } from './package-details.component';

const routes: Routes = [
  {
    path: '',
    component: PackageDetailsComponent,
    data: {
      title: 'Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageDetailsRoutingModule {}
