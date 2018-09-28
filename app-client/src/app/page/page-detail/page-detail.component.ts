import { PageService } from './../page.service';
import { Page } from './../../model/page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {

  page: Page;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private location: Location
  ) { }

  ngOnInit () {
    this.getPageById();
  }

  getPageById (): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageService.getPageById(id).subscribe(page => {
      this.page = page;
    })
  }

  goBack (): void {
    this.location.back();
  }
}
