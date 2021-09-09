import { Routes } from '@angular/router';

export const FULL_LAYOUT_ROUTES: Routes = [
    {
      path: '',
      loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule),
      // loadChildren: './authentication/authentication.module#AuthenticationModule',
    },
  ];