import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseLanguage } from '../../interface/Language';
import { environment } from 'src/assets/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private localeKey = 'locale';
  private base_url = environment.apiUrl;

  constructor(private http:HttpClient) {
    this.initLocale();
  }

  private initLocale(): void {
    if (!localStorage.getItem(this.localeKey)) {
      localStorage.setItem(this.localeKey, 'en'); // Par défaut, on stocke 'en'
    }
  }

  getLocale(): string {
    return localStorage.getItem(this.localeKey) ?? 'en';
  }

  setLocale(locale: string): void {
    localStorage.setItem(this.localeKey, locale);
    window.location.reload(); // Recharge la page pour appliquer les traductions
  }

  getAllLanguages() {
    return this.http.get<ResponseLanguage>(`${this.base_url}/languages`);
  }
}
