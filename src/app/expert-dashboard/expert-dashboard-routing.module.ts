import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpertDashboardComponent } from './expert-dashboard.component';

const routes: Routes = [
  {
    path: 'expert',
    component: ExpertDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertDashboardRoutingModule {}
