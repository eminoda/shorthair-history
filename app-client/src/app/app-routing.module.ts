import { PageListComponent } from './page/page-list/page-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageDetailComponent } from './page/page-detail/page-detail.component';
import { PageDrawComponent } from './page/page-draw/page-draw.component';
import { PageTemplateListComponent } from './page/page-template-list/page-template-list.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/page/pages',
  pathMatch: 'full'
}, {
  path: 'page',
  data: {
    breadcrumb: '页面管理'
  },
  children: [{
    path: 'pages',
    component: PageListComponent,
    data: {
      breadcrumb: '页面列表'
    }
  }, {
    path: 'detail/:id',
    component: PageDetailComponent,
    data: {
      breadcrumb: '页面详情'
    }
  }, {
    path: 'draw',
    component: PageDrawComponent,
    data: {
      breadcrumb: '绘制'
    }
  }, {
    path: 'templates',
    component: PageTemplateListComponent,
    data: {
      breadcrumb: '页面模板'
    }
  }]
}]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
