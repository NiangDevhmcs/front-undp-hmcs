import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { VexRoutes } from "@vex/interfaces/vex-route.interface";
import { AppComponent } from "src/app/app.component";
import { ResponseUser } from "../response-type/Type";


// export const TenantCampusResolver: ResolveFn<ResponseTenantWithCampuses> = (route: ActivatedRouteSnapshot) => {
//   const router = inject(Router);
// //   let page = environment.current_page;
// //   let perPage = environment.per_page;
//   const currentNavigation = router.getCurrentNavigation();
//   const tenantId = currentNavigation?.extras.state?.['tenant'].id as string;
//   return inject(CampusService).getCampusTenant(tenantId);
// };

const adminRoute: VexRoutes = [
    {
        path: '',
        component: AppComponent,
        children: [

        ]
    },
];

export default adminRoute;