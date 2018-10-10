
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
  boardStyle: {};
  boardElementRef: ComponentRef<DrawElementComponent>;

  constructor(private utilService: UtilService, private pageDrawService: PageDrawService) { }

  ngOnInit () {
    this.boardStyleListen();
    this.boardElementListen();
  }

  boardStyleListen () {
    this.boardObservable.subscribe((board: Board) => {
      this.boardStyle = {
        width: board.width + 'px',
        height: board.height + 'px'
      }
    })
  }

  boardElementListen () {
    this.boardElementObservable.subscribe((currentBoardElement: BoardElement) => {
      const boardElementRefList = this.pageDrawService.boardElementRefList;
      for (let boardElementRef of boardElementRefList) {
        if (boardElementRef.instance.boardElement.id === currentBoardElement.id) {

          break;
        }
      }
      this.createBoardElement(currentBoardElement);
    })
  }

  createBoardElement (boardElement: BoardElement) {
    const elementRef = this.pageDrawService.createElement<DrawElementComponent>(this.boardContainer, DrawElementComponent);
    console.log(elementRef);
    console.log(boardElement);
    elementRef.instance.boardElement = boardElement;
    this.pageDrawService.addBoardElementRef(elementRef);
  }
}
