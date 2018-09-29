import { QueryPageList } from '../../interface/queryPageList';
import { PAGES } from './../../mock/pages';
import { Page } from './../../model/page';
import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  queryPage: QueryPageList = {};
  pages: Page[];
  selectedPage: Page;

  constructor(private pageService: PageService) { }

  ngOnInit () {
    this.getPages();
  }
  // 综合查询
  queryPageList (): void {
    console.log(this.queryPage);
    // this.queryPage
  }

  getPages (): void {
    this.pageService.getPages().subscribe(data => {
      this.pages = data;
    })
  }

  pageChange (): void {
    console.log(123);
  }
}
