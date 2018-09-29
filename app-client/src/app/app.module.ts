import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PageListComponent } from './page/page-list/page-list.component';
import { PageDetailComponent } from './page/page-detail/page-detail.component';
import { AppRoutingModule } from './app-routing.module';
// ng-zorro start
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
// ng-zorro end

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    PageListComponent,
    PageDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
