import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment';
import { ResponseAppSetting } from '../../response-type/Type';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private base_url = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) {}

  getDataApplicationSetting():Observable<ResponseAppSetting>{
    return this.http.get<ResponseAppSetting>(this.base_url + '/app-setting');
  }
}
