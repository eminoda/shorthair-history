import { Injectable, ElementRef } from '@angular/core';
import { Page } from '../model/page';
import { PAGES } from '../mock/pages';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  getPages(): Observable<Page[]> {
    return of(PAGES);
  }
  getPageById(id: number): Observable<Page> {
    return of(PAGES.find(page => page.id === id));
  }
  parseStyle(style) {
    let resultArr = [];

    for (let key in style) {
      resultArr.push(`${key}:${style[key]};`);
    }

    return resultArr.reduce((prev, curr) => {
      return prev + curr;
    });
  }
  addStyle(target: any, styleInline: string) {
    target.setAttribute(
      'style', styleInline
    );
  }
}
