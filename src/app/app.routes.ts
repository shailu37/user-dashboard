import { Routes } from '@angular/router';
import { UserDashboardPageComponent } from './pages/user/user-dashboard-page/user-dashboard-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'user-dashboard',
    component: UserDashboardPageComponent,
  },
  {
    path: '**',
    redirectTo: 'user-dashboard',
  },
];
