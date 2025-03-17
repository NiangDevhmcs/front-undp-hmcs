import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandlerInterceptor } from "./error-handler.Interceptor";
import { AuthInterceptor } from "./auth-interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ErrorHandlerInterceptor,
  //   multi: true,
  // },
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: AuthExpiredInterceptor,
//     multi: true,
//   },

//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: NotificationInterceptor,
//     multi: true,
//   },
];