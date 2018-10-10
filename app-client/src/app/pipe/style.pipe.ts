import { Pipe, PipeTransform } from '@angular/core';
import { BoardElement } from '../model/boardElement';
import { PageDrawService } from '../page/page-draw/page-draw.service';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'style'
})
export class StylePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer, private pageDrawService: PageDrawService) {
  }

  transform (value: BoardElement, args?: any): any {
    return this.sanitizer.bypassSecurityTrustStyle(this.pageDrawService.parseStyleToStr(value));
  }
}
