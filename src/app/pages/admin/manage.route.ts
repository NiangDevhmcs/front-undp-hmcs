import { VexRoutes } from '@vex/interfaces/vex-route.interface';
// import { ResponseGrade, ResponseLevel, ResponseSchoolYear, ResponseSubject, ResponseTeacher, ResponseUser } from '../response-type/Type';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { environment } from 'src/assets/environment';
import { inject } from '@angular/core';
// import { SubjectService } from './subject/subject.service';
import { UserService } from '../profil/user.service';
import { AuthService } from '../auth/service/auth.service';
import { AppComponent } from 'src/app/app.component';
import { ResponseUser } from '../response-type/Type';
import { EMPTY } from 'rxjs';

export const UserResolver: ResolveFn<ResponseUser> = (route: ActivatedRouteSnapshot) => {
  let page = environment.current_page;
  let perPage = environment.per_page;
  let user = inject(AuthService).getCurrentUserSync();
  let campus_id = user?.campus_id;
  if (!campus_id) {
    return EMPTY;
  }
  return inject(UserService).getUserSearchPaginator('', campus_id, page, perPage);
};

const manageRoutes: VexRoutes = [
{
        path: '',
        component: AppComponent,
        children: [
          {
            path: 'users/list',
            loadComponent: () =>import('../manage/user/user-list/user-list.component').then((m) => m.UserListComponent),
            resolve:{
              dataUser:UserResolver,
            }
          },


        ]
    },

];

export default manageRoutes;
