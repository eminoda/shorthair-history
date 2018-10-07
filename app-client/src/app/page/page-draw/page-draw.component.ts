import { Component, OnInit } from '@angular/core';
import { Panel } from '../../model/panel';
import { PageService } from '../page.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-page-draw',
  templateUrl: './page-draw.component.html',
  styleUrls: ['./page-draw.component.scss']
})
/**
 * 1. style 属性的生成
 *    object -> style object
 *    style object append html
 * 2. script libs
 * 3. 拖拽
 */
export class PageDrawComponent implements OnInit {

  pageDraw: Panel = new Panel()

  constructor(private pageService: PageService) { }

  ngOnInit() {
  }
  preLook() {
    let styleLine = this.pageService.parseStyle(this.pageDraw.properties);
    this.pageService.addStyle(document.getElementById('draw'), styleLine);
  }
  onDragStart(event) {
    console.log(event);
    event.dataTransfer.setData("text", 'test111');
  }

  allowDrop(event) {
    event.preventDefault()
  }

  drop(event) {
    console.log(event);
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    console.log(data);
    event.target.appendChild(document.getElementById('test1'));
  }
}
