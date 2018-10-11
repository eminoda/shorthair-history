
import { UtilService } from './../../../service/util.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
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
  boardStyle: {};
  boardElementRef: ComponentRef<DrawElementComponent>;
  offsetX: number = 0;
  offsetY: number = 0;
  constructor(private utilService: UtilService, private pageDrawService: PageDrawService) { }

  ngOnInit () {
    this.boardStyleListen();
    this.boardElementListen();
  }

  boardStyleListen () {
    this.pageDrawService.saveLimitAxis(this.board.width, this.board.height);
    this.boardObservable.subscribe((board: Board) => {
      this.boardStyle = {
        width: board.width + 'px',
        height: board.height + 'px'
      }
      this.pageDrawService.saveLimitAxis(board.width, board.height);
    })
  }

  boardElementListen () {
    this.boardElementObservable.subscribe((currentBoardElement: BoardElement) => {
      const boardElementRefList = this.pageDrawService.boardElementRefList;
      // for (let boardElementRef of boardElementRefList) {
      //   if (boardElementRef.instance.boardElement.id === currentBoardElement.id) {

      //     break;
      //   }
      // }
      let boardElement = this.pageDrawService.getCurrentBoardELementById(currentBoardElement.id) || currentBoardElement;
      this.pageDrawService.currentBoardElement = boardElement;
      this.createBoardElement(boardElement);
    })
  }

  createBoardElement (boardElement: BoardElement) {
    const elementRef = this.pageDrawService.createElement<DrawElementComponent>(this.boardContainer, DrawElementComponent);
    elementRef.instance.boardElement = boardElement;
    elementRef.instance.boardElementStyle = this.pageDrawService.addPxUnit(boardElement);
    console.log(elementRef.instance.boardElementStyle);
    this.pageDrawService.addBoardElementRef(elementRef);
  }

  allowDrop ($event) {
    // console.log(`clientX:${$event.clientX},clientY:${$event.clientY},layerX:${$event.layerX},layerY:${$event.layerY},offsetX:${$event.offsetX},offsetY:${$event.offsetY},pageX:${$event.pageX},pageY:${$event.pageY}`);
    $event.preventDefault()
  }
  drop ($event: DragEvent) {
    this.pageDrawService.calcOffsetDragAxis($event);
    this.calcOffset(Number($event.dataTransfer.getData('Text')));
    event.preventDefault();
  }

  calcOffset (id: number) {
    const boardElementRefList = this.pageDrawService.boardElementRefList;
    for (let boardElementRef of boardElementRefList) {
      if (boardElementRef.instance.boardElement.id === id) {
        boardElementRef.instance.boardElement.top = this.pageDrawService.offsetAxis.y;
        boardElementRef.instance.boardElement.left = this.pageDrawService.offsetAxis.x;
        console.log(boardElementRef.instance.boardElement);
        this.pageDrawService.getBoardElementObservable().next(boardElementRef.instance.boardElement);
      }
    }
  }
}
