import { PageDrawService } from './../page-draw.service';
import { BoardElement } from './../../../model/boardElement';
import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-draw-element',
  templateUrl: './draw-element.component.html',
  styleUrls: ['./draw-element.component.scss']
})
export class DrawElementComponent implements OnInit {

  boardElement: BoardElement;
  boardElementStyle: string;
  showControl: boolean = false;

  constructor(private pageDrawService: PageDrawService) { }

  ngOnInit() {
    this.onBoardElement();
  }

  destory() {
    console.log(123);
    // this.pageDrawService.destoryElementById(this.boardElement.id);
  }

  onBoardElement() {
    this.pageDrawService.setBoardElementObservable();
    this.pageDrawService.getBoardElementObservable().subscribe((boardElement: BoardElement) => {
      this.boardElementStyle = this.pageDrawService.addPxUnit(boardElement);
      // console.log(this.boardElementStyle);
    })
  }

  @HostListener('mouseover', ['$event.target'])
  mouseover() {
    this.showControl = true;
  }
  @HostListener('mouseleave', ['$event.target'])
  mouseleave() {
    this.showControl = false;
    // console.log(this.boardElement);
  }

  // 监听元素形状变化
  startListenChange($event: Event) {
    $event.stopPropagation();
  }
  dragStart($event: DragEvent) {
    this.pageDrawService.saveDragAxis($event.offsetX, $event.offsetY);
    $event.dataTransfer.setData('Text', String(this.boardElement.id));
  }
}
