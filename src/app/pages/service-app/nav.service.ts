import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private router:Router, private authService:AuthService) {
   
  }


  // private defaultLinks: { name: string, link: string, icon: string }[] = [
  //   { name: 'Entreprise', link: '/api/company/list', icon: 'ri-government-line' }
  // ];


  // private links: { name: string, link: string, icon: string }[];

  // getLinks() {
  //   return this.links;
  // }




  private linksVisible = new BehaviorSubject<boolean>(false);
  linksVisible$ = this.linksVisible.asObservable();

  showLinks() {
    this.linksVisible.next(true);
  }

  hideLinks() {
    this.linksVisible.next(false);
  }
}
