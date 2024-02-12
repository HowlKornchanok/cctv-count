import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private languageService: LanguageService) {}

  transform(value: string): string {
    return this.languageService.translate(value);
  }
}
