import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from './layout/home-page-layout/home-page-layout.component';
import { DeleteAccountComponent } from './account-delete/account-delete.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageLayoutComponent,
    data: {}
  },
  {
    path: 'login',
    component: DefaultLayoutComponent,
    data: {},
    children: [
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        // canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'dashboard',
    component: DefaultLayoutComponent,
    data: {},
    children: [
      {
        path: '',
        loadChildren: () => import('./student-dashboard/student-dashboard.module').then(m => m.StudentDashboardModule),
        // canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./student-correction-details/student-correction-details.module').then(m => m.StudentCorrectionDetailsModule),
        // canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./expert-dashboard/expert-dashboard.module').then(m => m.ExpertDashboardModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
        // canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'package',
    component: DefaultLayoutComponent,
    data: {},
    children: [
      {
        path: 'list',
        loadChildren: () => import('./package-list/package-list.module').then(m => m.PackageListModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./package-details/package-details.module').then(m => m.PackageDetailsModule),
        // canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {},
    children: [
      {
        path: 'delete-account',
        loadChildren: () => import('./account-delete/account-delete.module').then(m => m.DeleteAccountModule),
        // canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
