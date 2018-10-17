
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
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

  @Input() board: Board;
  @Input() boardElement: BoardElement;
  @Input() boardObservable: Observable<Board>;
  @Input() boardElementObservable: Observable<BoardElement>;
  @Output() updateBoardElementEmit: EventEmitter<BoardElement> = new EventEmitter();

  boardStyle: {};
  boardElementRef: ComponentRef<DrawElementComponent>;
  offsetX: number = 0;
  offsetY: number = 0;

  constructor(public el: ElementRef, private pageDrawService: PageDrawService) { }

  ngOnInit () {
    this.onBoardStyle();
    this.onBoardElement();
  }
  // 监听面板样式
  onBoardStyle () {
    // 保存手机模型的尺寸，用于计算最值
    this.pageDrawService.saveLimitAxis(this.board.width, this.board.height);
    // 监听input输入
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
    // 监听input输入
    // this.boardElementObservable.subscribe((currentBoardElement: BoardElement) => {
    this.pageDrawService.getBoardElementObservable().subscribe((currentBoardElement: BoardElement) => {
      // create/focus boardElement
      let boardElementRef = this.pageDrawService.getBoardElementRefById(currentBoardElement.id);
      boardElementRef = boardElementRef ? boardElementRef : this.createBoardElement();
      this.pageDrawService.udpateBoardElementRef(boardElementRef, currentBoardElement);
    })
  }
  // 创建元素
  private createBoardElement (): ComponentRef<DrawElementComponent> {
    let boardElementRef = this.pageDrawService.createElement<DrawElementComponent>(this.boardContainer, DrawElementComponent);
    this.pageDrawService.addBoardElementRef(boardElementRef);
    return boardElementRef;
  }
  // 拖拽
  allowDrop ($event) {
    $event.preventDefault()
  }
  // 拖拽结束
  drop ($event: DragEvent) {
    // 更新当前最新元素
    let id = Number($event.dataTransfer.getData('Text'));
    let boardElement = this.pageDrawService.getCurrentBoardELementById(id);
    // 更新偏移量
    this.pageDrawService.calcOffsetDragAxis($event, boardElement);
    boardElement.top = this.pageDrawService.offsetAxis.y;
    boardElement.left = this.pageDrawService.offsetAxis.x;
    // 更新boardElement& boardElement mask
    this.pageDrawService.renderBoardELement(boardElement);
    // 通知draw-board
    this.updateBoardElementEmit.emit(boardElement);
    event.preventDefault();
  }

  // 鼠标释放，计算元素形变后尺寸
  @HostListener('pointerup', ['$event'])
  pointerup ($event: PointerEvent) {
    if (this.pageDrawService.shapSwitch && this.pageDrawService.direction) {
      // 计算形变
      let boardElement = this.pageDrawService.calcShapOffset($event, this.pageDrawService.currentBoardElement);
      this.pageDrawService.renderBoardELement(boardElement);
      // 通知draw-board
      this.updateBoardElementEmit.emit(boardElement);
    }
    $event.preventDefault();
  }
}
