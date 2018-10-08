
import { UtilService } from './../../../service/util.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Board } from '../../../model/board';
import { DrawElementComponent } from '../draw-element/draw-element.component';
import { BoardElement } from '../../../model/boardElement';

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

  boardStyle: {};

  constructor(private utilService: UtilService) { }

  ngOnInit () {
    this.setBoardStyle();
    this.createElement();
  }

  setBoardStyle () {
    this.boardObservable.subscribe((board: Board) => {
      this.boardStyle = {
        width: board.width + 'px',
        height: board.height + 'px'
      }
    })
  }
  // ngOnChanges () {
  //   console.log(this.board);
  // }

  createElement () {
    this.boardElementObservable.subscribe((boardElement: BoardElement) => {
      console.log(boardElement);
      if (boardElement.type == 'button') {
        // this.boardContainer.clear();
        const boardRef = this.utilService.createDynamicComponent(this.boardContainer, DrawElementComponent);
        console.log(boardRef.instance);
        // boardRef.instance.type = 'button';
      }
    })
  }
}
