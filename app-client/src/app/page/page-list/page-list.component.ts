import { HttpService } from './../../service/http.service';
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

  constructor(private pageService: PageService,
    private httpService: HttpService) { }

  ngOnInit () {
    this.getPages();
  }
  // 综合查询
  queryPageList (): void {
    console.log(this.queryPage);
    this.httpService.testHttp().subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
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
