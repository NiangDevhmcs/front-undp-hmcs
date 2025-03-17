import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { AppComponent } from 'src/app/app.component';
// import { ProfilUserComponent } from './profil-user/profil-user.component';


const routes: VexRoutes = [
  {
    path: '',
    component: AppComponent,
    data: {
      toolbarShadowEnabled: true
    },
    children: [
      // {
      //   path: 'test',
      //   // pathMatch: 'full', // Ajouter ceci
      //   loadComponent: () =>import('./profil-user/profil-user.component').then((m) => m.ProfilUserComponent),
      // }
      // ,
      // {
      //   path: 'update-profile',
      //   loadComponent: () =>import('./profil-user-password/profil-user-password.component').then((m) => m.ProfilUserPasswordComponent),
      // },
      {
        path: '',
        loadComponent: () =>import('../personel-information/personel-information.component').then((m) => m.PersonelInformationComponent),
      },
    ]
  }
];

export default routes;


// export const SiteResolver: ResolveFn<ResponseSite> = (route: ActivatedRouteSnapshot) => {
//   let page = environment.current_page;
//   let perPage = environment.per_page;
//   const router = inject(Router);
//   const currentNavigation = router.getCurrentNavigation();
//   const id = currentNavigation?.extras.state?.['school'].id as number;
//   return inject(SiteService).getSiteById(id, page, perPage);
// };

// export const DataUserConnectedResolver: ResolveFn<ResponsecheckStatus> = (route: ActivatedRouteSnapshot) => {
//   return inject(AuthService).checkLoginStatus();
// };
// const userRoutes: VexRoutes = [
//   // {    
//   //   path: 'list',
//   //   loadComponent: () =>import('./profil-user/profil-user.component').then((m) => m.ProfilUserComponent),
//   //   // resolve:{
//   //   //   dataSite:SiteResolver,
//   //   // }  
//   // },
//   { 
//     path: 'user', 
//     loadComponent: () =>import('./profil-user-menu/profil-user-menu.component').then((m) => m.ProfilUserMenuComponent),
//     resolve:{
//       dataAccountUser:DataUserConnectedResolver
//     }
//   },
//   { 
//     path: 'user/change-password', 
//     loadComponent: () =>import('./profil-user-password/profil-user-password.component').then((m) => m.ProfilUserPasswordComponent),
//     resolve:{
//       dataAccountUser:DataUserConnectedResolver
//     }
//   },
// ];

// export default userRoutes;
