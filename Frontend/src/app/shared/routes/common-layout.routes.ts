import { Routes } from '@angular/router';

export const COMMON_LAYOUT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
  },
];