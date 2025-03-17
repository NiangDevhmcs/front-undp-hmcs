// services/route.service.ts
import { Injectable } from '@angular/core';
import { Role } from '../enum/RoleEnum';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  getRoutesByRole(role: Role) {
    const adminRoutes = [
      {
        path: '',
        loadChildren: () => import('../admin/admin.route'),
      },
    ];

    switch (role) {
      case Role.ADMIN:
        return [ ...adminRoutes];
    //   case Role.USER:
    //     return [...baseRoutes, ...userRoutes];
    //   default:
    //     return baseRoutes;
    }
  }
}