import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../pages/auth/service/Language.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'vex-language-selector-component',
  templateUrl: './language-selector-component.component.html',
  styleUrls: ['./language-selector-component.component.scss'],
  // imports:[CommonModule,FormsModule],
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  standalone:true
})
export class LanguageSelectorComponentComponent {
  languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  selectedLanguage: string = 'en';

  // constructor(private translateService: TranslateService) { }

  currentLocale: string;

  constructor(private languageService: LanguageService) {
    this.currentLocale = this.languageService.getLocale();
  }

  changeLanguage(locale: string): void {
    this.selectedLanguage = locale;
    this.languageService.setLocale(this.selectedLanguage);
  }
}
