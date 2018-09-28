import { PagesComponent } from './page/pages/pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageDetailComponent } from './page/page-detail/page-detail.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/pages',
  pathMatch: 'full'
}, {
  path: 'pages',
  component: PagesComponent
}, {
  path: 'page/:id',
  component: PageDetailComponent
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
