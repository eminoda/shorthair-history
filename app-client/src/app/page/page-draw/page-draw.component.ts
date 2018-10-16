import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BoardElement } from './../../model/boardElement';
import { PageDrawService } from './page-draw.service';
import { UtilService } from '../../service/util.service';
import { Panel } from '../../model/panel';
import { Board } from '../../model/board';
import { Prompt } from '../../util/prompt';
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
export class PageDrawComponent implements OnInit, AfterViewInit {

  pageDraw: Panel = new Panel()
  board: Board = new Board();
  boardObservable: Subject<Board> = new Subject<Board>();
  boardElement: BoardElement;
  boardElementObservable: Subject<BoardElement> = new Subject<BoardElement>();//button(href,click),image,template
  prompt = Prompt

  constructor(private pageDrawService: PageDrawService,
    private utilService: UtilService) { }

  ngOnInit () {
    console.log(this.prompt);
  }
  ngAfterViewInit () {
    let self = this;
    setTimeout(function () {
      // todo，首次渲染加载
      // self.createElement();
    }, 500)
  }
  // 设置board
  updateBoardConfig (board) {
    // this.board = Object.assign({}, this.board);
    this.boardObservable.next(board);
  }
  // 设置boardElement
  updateBoardElementConfig (boardElement: BoardElement) {
    this.boardElementObservable.next(boardElement);
  }

  create () {
    this.boardElement = new BoardElement();
    this.updateBoardElementConfig(this.boardElement);
  }

  // 预览
  preLook () {
    let currentBoardElement = this.pageDrawService.currentBoardElement;
    if (currentBoardElement) {
      this.boardElement = currentBoardElement;
      console.log('prelook:' + this.boardElement.id);
      let style = this.pageDrawService.addPxUnit(this.boardElement);
    } else {
      this.utilService.openErrorModal(this.prompt.ERROR_BOARDELEMENT_NOCREATE)
    }
  }

  delete () {
    if (this.boardElement) {
      this.pageDrawService.destoryElementById(this.boardElement.id);
    } else {
      this.utilService.openErrorModal(this.prompt.ERROR_BOARDELEMENT_NOCREATE)
    }
  }
  // draw-board call，虽然有array作为引用，但还是为了逻辑性。去掉此方法也是可以的
  updateBoardElement (boardElement: BoardElement) {
    console.log('board call me change');
    this.boardElement = boardElement;
  }
}
