import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  // constructor(private translate: TranslateService) {
  //   // Langue par défaut
  //   translate.setDefaultLang('en');

  //   // Utiliser la langue du navigateur si disponible
  //   // const browserLang = translate.getBrowserLang();
  //   // translate.use(browserLang?.match(/fr|en/) ? browserLang : 'fr');
  // }

  // // Méthode pour changer de langue
  // switchLanguage(lang: string) {
  //   this.translate.use(lang);
  // }

}
