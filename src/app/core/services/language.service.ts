import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string = 'th';
  languageChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  getCurrentLanguage(): string {
    return this.currentLanguage;
    
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'th' ? 'en' : 'th';
    console.log('Current Language:', this.currentLanguage);
    this.languageChanged.emit(this.currentLanguage); // Emit event when language changes
  }
}
