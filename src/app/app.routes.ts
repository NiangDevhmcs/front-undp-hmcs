import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { AuthGuard } from './pages/guard/auth.guard';
import { OtpGuard } from './pages/guard/otp.guard';
import { AdminGuard } from './pages/guard/admin.guard';
import { AfterLoginGuard } from './pages/guard/after-login.guard';
import { OwnerGuard } from './pages/guard/owner.guard';

export const appRoutes: VexRoutes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth-route'),
    canActivate:[AfterLoginGuard],
  },
  {
    path: 'otp',
    loadComponent: () => import('../app/pages/auth/otp/otp.component').then((m) => m.OtpComponent),
    canActivate: [OtpGuard]
  },
  {
    path: 'index',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'profil',
      //   loadChildren: () => import('./pages/profil/profil.routes'),
      // },
      {
        path: 'personnel-information',
        loadChildren: () => import('./pages/profil/profil.routes'),
      },
      {
        path: 'tenant',
        loadChildren: () => import('./pages/admin/admin.route'),
        canActivate:[AdminGuard]
      },
      {
        path: 'owner',
        loadChildren: () => import('./pages/admin/owner.route'),
        canActivate:[OwnerGuard]
      },
      {
        path: 'manager',
        loadChildren: () => import('./pages/admin/manage.route'),
        // canActivate:[OwnerGuard]
      }
    ]
  }
];
