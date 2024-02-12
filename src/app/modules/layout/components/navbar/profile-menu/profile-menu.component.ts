import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    standalone: true,
    imports: [
        ClickOutsideDirective,
        NgClass,
        RouterLink,
        CommonModule
    ],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  currentLanguage: string = 'th';
  translations = this.languageService.translations;



  constructor(public languageService: LanguageService) {

  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
 
  }

  ngOnInit(): void {
    this.languageService.getCurrentLanguage() 
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.currentLanguage = this.languageService.getCurrentLanguage()
    console.log(this.currentLanguage)
  }


}
