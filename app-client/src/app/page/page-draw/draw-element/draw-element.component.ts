import { PageDrawService } from './../page-draw.service';
import { BoardElement } from './../../../model/boardElement';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-element',
  templateUrl: './draw-element.component.html',
  styleUrls: ['./draw-element.component.scss']
})
export class DrawElementComponent implements OnInit {

  // 在父组件中定义
  boardElement: BoardElement;
  boardElementStyle: string;
  maskStyle: {};
  showControl: boolean = false;

  constructor(private pageDrawService: PageDrawService) { }

  ngOnInit () {
  }
  // 显示控制元素形状面板
  showControlPanel (): void {
    this.showControl = !this.showControl;
    if (this.showControl) {
      this.pageDrawService.updateCurrentBoardElement(this.boardElement);
    }
  }
  dragStart ($event: DragEvent) {
    this.pageDrawService.saveDragAxis($event);
    $event.dataTransfer.setData('Text', String(this.boardElement.id));
  }
}
