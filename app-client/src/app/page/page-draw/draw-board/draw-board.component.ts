
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, Output, EventEmitter, ElementRef } from '@angular/core';
import { Board } from '../../../model/board';
import { DrawElementComponent } from '../draw-element/draw-element.component';
import { BoardElement } from '../../../model/boardElement';
import { PageDrawService } from '../page-draw.service';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.scss']
})
export class DrawBoardComponent implements OnInit {

  @ViewChild('drawElement', { read: ViewContainerRef })
  boardContainer: ViewContainerRef;

  @Input() boardObservable: Observable<Board>;
  @Input() boardElementObservable: Observable<BoardElement>;
  @Input() boardElement: BoardElement;
  @Input() board: Board;
  @Output() updateBoardElementEmit: EventEmitter<BoardElement> = new EventEmitter();

  boardStyle: {};
  boardElementRef: ComponentRef<DrawElementComponent>;
  offsetX: number = 0;
  offsetY: number = 0;

  constructor(public el: ElementRef, private pageDrawService: PageDrawService) { }

  ngOnInit () {
    console.log('DrawBoardComponent');
    this.onBoardStyle();
    this.onBoardElement();
  }
  // 监听面板样式
  onBoardStyle () {
    this.pageDrawService.saveLimitAxis(this.board.width, this.board.height);
    this.boardObservable.subscribe((board: Board) => {
      this.boardStyle = {
        width: board.width + 'px',
        height: board.height + 'px'
      }
      this.pageDrawService.saveLimitAxis(board.width, board.height);
    })
  }
  // 监听元素
  onBoardElement () {
    this.boardElementObservable.subscribe((currentBoardElement: BoardElement) => {
      // create/focus boardElement
      if (!this.pageDrawService.getCurrentBoardELementById(currentBoardElement.id)) {
        this.createBoardElement(currentBoardElement);
      }
      this.pageDrawService.currentBoardElement = currentBoardElement;
    })
  }
  // 创建元素
  private createBoardElement (boardElement: BoardElement) {
    const elementRef = this.pageDrawService.createElement<DrawElementComponent>(this.boardContainer, DrawElementComponent);
    elementRef.instance.boardElement = boardElement;
    elementRef.instance.boardElementStyle = this.pageDrawService.addPxUnit(boardElement);
    this.pageDrawService.addBoardElementRef(elementRef);
  }
  // 拖拽
  allowDrop ($event) {
    $event.preventDefault()
  }
  // 拖拽结束
  drop ($event: DragEvent) {
    this.pageDrawService.calcOffsetDragAxis($event);
    this.calcOffset(Number($event.dataTransfer.getData('Text')));
    this.updateBoardElementEmit.emit(this.boardElement);
    event.preventDefault();
  }
  // 计算元素移动量
  private calcOffset (id: number) {
    this.boardElement = this.pageDrawService.getCurrentBoardELementById(id);
    this.boardElement.top = this.pageDrawService.offsetAxis.y;
    this.boardElement.left = this.pageDrawService.offsetAxis.x;
    this.pageDrawService.getBoardElementObservable().next(this.boardElement);
    // for (let boardElementRef of this.pageDrawService.boardElementRefList) {
    //   if (boardElementRef.instance.boardElement.id === id) {
    //     boardElementRef.instance.boardElement.top = this.pageDrawService.offsetAxis.y;
    //     boardElementRef.instance.boardElement.left = this.pageDrawService.offsetAxis.x;
    //     this.pageDrawService.getBoardElementObservable().next(boardElementRef.instance.boardElement);
    //   }
    // }
  }
}
