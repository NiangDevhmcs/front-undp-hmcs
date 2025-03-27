import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../pages/auth/service/Language.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Language } from '../pages/interface/Language';
@Component({
  selector: 'vex-language-selector-component',
  templateUrl: './language-selector-component.component.html',
  styleUrls: ['./language-selector-component.component.scss'],
  imports: [
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
export class LanguageSelectorComponentComponent implements OnInit {
  languages: Language[] = [];
  selectedLanguage: Language | null = null;
  currentLocale: string;

  constructor(private languageService: LanguageService) {
    this.currentLocale = this.languageService.getLocale();
  }

  ngOnInit(): void {
    this.languageService.getAllLanguages().subscribe({
      next: (response) => {
        this.languages = response.data;
        this.selectedLanguage = this.findLanguageByCode(this.currentLocale);
      }
    });
  }

  findLanguageByCode(code: string): Language | null {
    const found = this.languages.find(lang => lang.code === code);
    return found || this.findLanguageByCode('en') || null;
  }

  changeLanguage(locale: string): void {
    this.currentLocale = locale;
    this.languageService.setLocale(this.currentLocale);
    this.selectedLanguage = this.findLanguageByCode(this.currentLocale);
  }
}
