import { Injectable } from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, catchError, distinctUntilChanged, filter, map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { User } from 'src/app/pages/interface/User';

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);


  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  user$ = this.authService.getCurrentUser();

  constructor(
    private readonly layoutService: VexLayoutService,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().pipe(
      filter((user): user is User => !!user),
      map(user => user.role.name),
      distinctUntilChanged(),
      tap(roleName => {
        switch(roleName) {
          case 'Sysmanager':
            this.loadSysmanagerNavigation();
            break;
          case 'Admin':
            this.loadAdminNavigation();
            break;
          case 'Viewer':
            this.loadViewerNavigation();
            break;
          case 'Editor':
            this.loadEditorNavigation();
            break;
          case 'Support':
            this.loadSupportNavigation();
            break;
        }
      })
    ).subscribe();
  }

  loadViewerNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Viewer',
        children: [
          {
            type: 'link',
            label: 'Accueil',
            route: '/',
            icon: 'mat:home',
            routerLinkActiveOptions: { exact: true }
          }

        ]
      },
    ]);
  }

  loadAdminNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Administrateur',
        children: [
          {
            type: 'link',
            label: 'Accueil',
            route: '/',
            icon: 'mat:insights',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
    ]);
  }

  loadEditorNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Editor',
        children: [
          {
            type: 'link',
            label: 'Accueil',
            route: '/',
            icon: 'mat:home',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Ventes journalières',
            route: 'owner/user-manager',
            icon: 'mat:today',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Utilisateurs',
            route: 'manager/users/list',
            icon: 'mat:people',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
    ]);
  }

  loadSupportNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Support',
        children: [
          {
            type: 'link',
            label: 'Accueil',
            route: '/',
            icon: 'mat:home',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Ventes journalières',
            route: 'owner/user-manager',
            icon: 'mat:today',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Utilisateurs',
            route: 'manager/users/list',
            icon: 'mat:people',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
    ]);
  }

  loadSysmanagerNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Sysmanager',
        children: [
          {
            type: 'link',
            label: 'Accueil',
            route: '/',
            icon: 'mat:home',
            routerLinkActiveOptions: { exact: true }
          },
        ]
      },
    ]);
  }
}
