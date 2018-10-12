import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { PageDrawComponent } from './page/page-draw/page-draw.component';
import { PageTemplateListComponent } from './page/page-template-list/page-template-list.component';
import { DrawElementComponent } from './page/page-draw/draw-element/draw-element.component';
import { DrawBoardComponent } from './page/page-draw/draw-board/draw-board.component';
import { StylePipe } from './pipe/style.pipe';
import { DeformationDirective } from './directive/deformation.directive';
// ng-zorro end

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    PageListComponent,
    PageDetailComponent,
    PageDrawComponent,
    PageTemplateListComponent,
    DrawElementComponent,
    DrawBoardComponent,
    StylePipe,
    DeformationDirective
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, NgZorroAntdModule
  ],
  entryComponents: [
    DrawElementComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'zh_CN' }, { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
