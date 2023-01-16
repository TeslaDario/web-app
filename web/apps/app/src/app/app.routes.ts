import { RouterModule } from '@angular/router';
import { AuthGuard, LoginComponent } from '@app/core/auth';

export const AppRoutes = RouterModule.forRoot([
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () => import('@app/home').then((m) => m.HomeModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
]);
