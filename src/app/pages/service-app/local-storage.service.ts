import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, switchMap } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { environment } from 'src/assets/environment';
import * as CryptoJS from 'crypto-js'; 

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router){}

  private apiUrl = environment.apiUrl;
  private verificationSubscription: Subscription | null = null;


  private encryptionKey = CryptoJS.enc.Utf8.parse('a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
  private iv = CryptoJS.enc.Utf8.parse('q1w2e3r4t5y6u7i8');

  setEncryptedSiteId(siteId: string): void {
    const encryptedSiteId = CryptoJS.AES.encrypt(siteId, this.encryptionKey, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    localStorage.setItem('encryptedSiteId', encryptedSiteId);
  }

  getEncryptedSiteId(): string | null {
    return localStorage.getItem('encryptedSiteId');
  }

  decryptSiteId(encryptedSiteId: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedSiteId, this.encryptionKey, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  getDecryptedSiteId(): string | null {
    const encryptedSiteId = this.getEncryptedSiteId();
    if (encryptedSiteId) {
      return this.decryptSiteId(encryptedSiteId);
    }
    return null;
  }

  startVerification() {
    if (!this.verificationSubscription) {
      this.verificationSubscription = interval(4000).pipe(
        switchMap(() => this.verifySiteId())
      ).subscribe({
        next:(response) => {
          //Verification site reussi
          // console.log(response);
        },
        error :(error)=> {
            localStorage.clear();
            this.authService.logout();
            return this.router.navigate(['/login'])
        }
      }
      );
    }
  }

  stopVerification() {
    if (this.verificationSubscription) {
      this.verificationSubscription.unsubscribe();
      this.verificationSubscription = null;
    }
  }

  private verifySiteId() {
    const headers = new HttpHeaders({
      'X-Encrypted-Site-ID': this.getEncryptedSiteId() || ''
    });
    return this.http.get(this.apiUrl+'/site/verify', { headers }); // Assurez-vous que le chemin correspond à votre configuration d'API
  }
}




