import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { VexRoutes } from "@vex/interfaces/vex-route.interface";
import { AppComponent } from "src/app/app.component";
import { inject } from "@angular/core";

const adminRoute: VexRoutes = [
    {
        path: '',
        component: AppComponent,
        children: [

        ]
    },
];

export default adminRoute;
