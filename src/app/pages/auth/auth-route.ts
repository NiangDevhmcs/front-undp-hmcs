import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { VexRoutes } from "@vex/interfaces/vex-route.interface";
import { AppComponent } from "src/app/app.component";
import { ResponseAppSetting } from "../response-type/Type";
import { inject } from "@angular/core";
import { SettingService } from "./service/setting.service";
import { AfterLoginGuard } from "../guard/after-login.guard";

export const AppSettingResolver: ResolveFn<ResponseAppSetting> = (route: ActivatedRouteSnapshot) => {
    return inject(SettingService).getDataApplicationSetting();
};

const authRoute: VexRoutes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
                resolve: { dataSchool: AppSettingResolver },
            },
            {
              path: 'email/verify/:id/:hash',
              loadComponent: () => import('./email-verify/email-verify.component').then((m) => m.EmailVerifyComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
            },

            {
                path: 'reset-password',
                loadComponent: () => import('./reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
            },

            {
                path: 'forgot-password',
                loadComponent: () => import('./forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
            },
        ]
    },
];

export default authRoute;