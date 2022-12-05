import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../../../libs/core/auth/src';

export const AppRoutes = RouterModule.forRoot([
  {
    path: '',
    component: LoginComponent,
  },
]);
