import { Injectable } from '@angular/core';
import { Page } from '../model/page';
import { PAGES } from '../mock/pages';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  getPages (): Observable<Page[]> {
    return of(PAGES);
  }
  getPageById (id: number): Observable<Page> {
    return of(PAGES.find(page => page.id === id));
  }
}
