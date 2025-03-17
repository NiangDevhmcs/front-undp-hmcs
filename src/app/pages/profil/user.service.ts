import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment';
import { ResponseMessage, ResponseSite, ResponseUser } from '../response-type/Type';
import { ChangePassword } from '../interface/ChangePassword';
import { AuthService } from '../auth/service/auth.service';
import { RoleResponse } from '../interface/Role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  private base_url = environment.apiUrl;
  tenant_id = this.authService.getTenantId();
  campus_id = this.authService.getCampusId();

  getUserSearchPaginator(searchTerm: string, campus_id: string | null,  page: number, perPage: number) : Observable<ResponseUser>  {
    const params = { params: { page: `${page}`, perPage: `${perPage}` } };
    let url = `${this.base_url}/users/all/${campus_id}`;
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }
    return this.http.get<ResponseUser>(url, params);
  }

  addUser(user:FormData):Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(`${this.base_url}/users/add`, user);
  }

  deleteUser(id:number):Observable<ResponseMessage>{
    return this.http.delete<ResponseMessage>(`${this.base_url}/users/destroy/`+id);
  }

  updateUser(id: number, data: FormData): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.base_url}/users/update/${id}`, data);
  }

  toggleStatus(id: number): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(`${this.base_url}/users/toggleStatus/${id}`);
  }
  
  changePassword(id: number, data: ChangePassword): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.base_url}/change-password/${id}`, data);
  }

  //----------------------------------------------
  getUsersByTenant(searchTerm: string,searchByCampus: number|undefined|null,  page: number, perPage: number) : Observable<ResponseUser>  {
    const params = { params: { page: `${page}`, perPage: `${perPage}` } };
    let url = `${this.base_url}/users/users-by-tenant`;
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }
    if (searchByCampus) {
      url += `?searchByCampus=${searchByCampus}`;
    }
    return this.http.get<ResponseUser>(url, params);
  }
  
  getRole(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.base_url}/roles`);
  }


  //----------------------------------------------





  getSiteById(id:number, page: number, perPage: number=environment.per_page):Observable<ResponseSite>{
    const params = { page: `${page}`, perPage: `${perPage}` };
    return this.http.get<ResponseSite>(`${this.base_url}/site/list/${id}`, { params });
  }

  getSiteSearchPaginator(id:number, searchTerm: string,  page: number, perPage: number) : Observable<ResponseSite>  {
    const params = { params: { page: `${page}`, perPage: `${perPage}` } };
    let url = `${this.base_url}/site/list/${id}`;
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }
    return this.http.get<ResponseSite>(url, params);
  }

  // addSite(site:Site):Observable<ResponseMessage>{
  //   return this.http.post<ResponseMessage>(`${this.base_url}/site/add`, site);
  // }

  deleteCompany(id:number):Observable<ResponseMessage>{
    return this.http.delete<ResponseMessage>(`${this.base_url}/school/destroy/`+id);
  }

  // updateSite(id:number, data : Site) : Observable<ResponseMessage> {
  //   return this.http.put<ResponseMessage>(`${this.base_url}/site/update/${id}`, data);
  // }

  // getProductProcurements(id:number):Observable<ProductProcurement>{
  //   return this.http.get<ProductProcurement>(`${this.base_url}/product/show/${id}`);
  // }

  // addProcurement(procurement:Procurement):Observable<ResponseMessage>{
  //   return this.http.post<ResponseMessage>(`${this.base_url}/procurement/add`, procurement);
  // }
}
