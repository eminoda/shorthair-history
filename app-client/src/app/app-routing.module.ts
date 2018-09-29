import { PageListComponent } from './page/page-list/page-list.component';
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
  component: PageListComponent
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
