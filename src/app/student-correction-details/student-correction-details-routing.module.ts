import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCorrectionDetailsComponent } from './student-correction-details.component';

const routes: Routes = [
  {
    path: 'correction-details/:correction_id',
    component: StudentCorrectionDetailsComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentCorrectionDetailsRoutingModule {}
