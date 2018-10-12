import { PageDrawService } from './../page-draw.service';
import { BoardElement } from './../../../model/boardElement';
import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-draw-element',
  templateUrl: './draw-element.component.html',
  styleUrls: ['./draw-element.component.scss']
})
export class DrawElementComponent implements OnInit {

  // 在父组件中定义
  boardElement: BoardElement;
  boardElementStyle: string;

  showControl: boolean = false;

  constructor(private pageDrawService: PageDrawService) { }

  ngOnInit () {
  }

  destory () {
    this.pageDrawService.destoryElementById(this.boardElement.id);
  }

  @HostListener('mouseover', ['$event.target'])
  mouseover () {
    this.showControl = true;
  }
  @HostListener('mouseleave', ['$event.target'])
  mouseleave () {
    this.showControl = false;
  }

  // 监听元素形状变化
  startListenChange ($event: Event) {
    $event.stopPropagation();
  }
  dragStart ($event: DragEvent) {
    console.log(this.boardElement.id);
    this.pageDrawService.saveDragAxis($event);
    $event.dataTransfer.setData('Text', String(this.boardElement.id));
  }
}
