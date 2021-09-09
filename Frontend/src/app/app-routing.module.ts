import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component'
import { COMMON_LAYOUT_ROUTES } from './shared/routes/common-layout.routes';
import { FULL_LAYOUT_ROUTES } from './shared/routes/full-layout.routes';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: COMMON_LAYOUT_ROUTES,
    component: DefaultLayoutComponent,
  },
  {
    path: '',
    children: FULL_LAYOUT_ROUTES,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
