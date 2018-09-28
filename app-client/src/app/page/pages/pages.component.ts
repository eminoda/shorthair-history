import { PAGES } from './../../mock/pages';
import { Page } from './../../model/page';
import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  pages: Page[];
  selectPage: Page;

  constructor(private pageService: PageService) { }

  ngOnInit () {
    this.getPages();
  }

  getPages (): void {
    this.pageService.getPages().subscribe(data => {
      this.pages = data;
    })
  }

  onSelect (page: Page): void {
    this.selectPage = page;
  }
}
