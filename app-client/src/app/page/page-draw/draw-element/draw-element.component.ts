import { PageDrawService } from './../page-draw.service';
import { BoardElement } from './../../../model/boardElement';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-draw-element',
  templateUrl: './draw-element.component.html',
  styleUrls: ['./draw-element.component.scss']
})
export class DrawElementComponent implements OnInit {

  boardElement: BoardElement;

  constructor(private pageDrawService: PageDrawService) { }

  // let styleLine = this.pageService.parseStyle(this.pageDraw.properties);
  //   this.pageService.addStyle(document.getElementById('draw'), styleLine);
  ngOnInit () {
  }

  destory () {
    console.log(this.boardElement.id);
    this.pageDrawService.destoryElement();
  }

  onDragStart (event) {
    console.log('ondragstart');
    event.dataTransfer.setData("text", 'test111');
  }

  allowDrop (event) {
    console.log(`clientX:${event.clientX},clientY:${event.clientY},layerX:${event.layerX},layerY:${event.layerY},offsetX:${event.offsetX},offsetY:${event.offsetY},pageX:${event.pageX},pageY:${event.pageY}`);
    event.preventDefault()
  }

  drop (event) {
    console.log('ondrop');
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    console.log(data);
    event.target.appendChild(document.getElementById('test1'));
  }
  dropEnd () {
    console.log('dropend');
  }
}
