import { PageDrawService } from './page-draw.service';
import { BoardElement } from './../../model/boardElement';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Panel } from '../../model/panel';
import { Board } from '../../model/board';

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
  board: Board = new Board();
  boardObservable: Subject<Board> = new Subject<Board>();
  boardElement: BoardElement;
  boardElementObservable: Subject<BoardElement> = new Subject<BoardElement>();//button(href,click),image,template

  constructor(private pageDrawService: PageDrawService) { }

  ngOnInit () { }

  setBoardConfig (board) {
    // this.board = Object.assign({}, this.board);
    this.boardObservable.next(board);
  }

  createElement () {
    this.boardElement = new BoardElement();
    this.boardElementObservable.next(this.boardElement);
  }

  preLook () {
    let style = this.pageDrawService.addPxUnit(this.boardElement);
    console.log(style);
  }

  // draw-board call
  updateBoardElement (boardElement: BoardElement) {
    this.boardElement = boardElement;
  }
}
