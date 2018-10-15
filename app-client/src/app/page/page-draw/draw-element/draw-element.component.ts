import { PageDrawService } from './../page-draw.service';
import { BoardElement } from './../../../model/boardElement';
import { Component, OnInit, HostListener, DoCheck } from '@angular/core';

@Component({
  selector: 'app-draw-element',
  templateUrl: './draw-element.component.html',
  styleUrls: ['./draw-element.component.scss']
})
export class DrawElementComponent implements OnInit, DoCheck {

  // 在父组件中定义
  boardElement: BoardElement;
  boardElementStyle: string;
  panelStyle: {};
  showControl: boolean = false;

  constructor(private pageDrawService: PageDrawService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.updatePanelStyle();
    // this.updateBoardElementStyle();
  }

  // 显示控制元素形状面板
  showControlPanel(): void {
    this.showControl = !this.showControl;
    // this.pageDrawService.destoryElementById(this.boardElement.id);
  }
  updateBoardElementStyle(): void {
    this.boardElementStyle = this.pageDrawService.addPxUnit(this.boardElement);
  }
  updatePanelStyle(): void {
    console.log('updatePanelStyle');
    this.panelStyle = {
      width: this.boardElement.width + 'px',
      height: this.boardElement.height + 'px',
      top: this.boardElement.top + 'px',
      left: this.boardElement.left + 'px'
    }
  }
  dragStart($event: DragEvent) {
    console.log(this.boardElement.id);
    this.pageDrawService.saveDragAxis($event);
    $event.dataTransfer.setData('Text', String(this.boardElement.id));
  }

  @HostListener('blur', ['$event'])
  blur($event: PointerEvent) {
    console.log('blur');
    $event.preventDefault();
  }
}
