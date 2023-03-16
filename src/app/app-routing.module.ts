import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from './layout/home-page-layout/home-page-layout.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageLayoutComponent,
    data: {}
  },
  {
    path: 'package',
    component: DefaultLayoutComponent,
    data: {},
    children: [
      {
        path: 'details',
        loadChildren: () => import('./package-details/package-details.module').then(m => m.PackageDetailsModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'list',
        loadChildren: () => import('./package-list/package-list.module').then(m => m.PackageListModule),
        // canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
