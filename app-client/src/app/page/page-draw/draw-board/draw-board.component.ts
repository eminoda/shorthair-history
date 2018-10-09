
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
    this.setBoardStyle();
    this.setBoardElement(this.boardElement);
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

  setBoardElement (boardElement: BoardElement) {
    this.boardElementObservable.subscribe((boardElement: BoardElement) => {
      const elementRef = this.pageDrawService.createElement<DrawElementComponent>(this.boardContainer, DrawElementComponent);
      elementRef.instance.boardElement = boardElement;
      this.pageDrawService.setHideObservable().subscribe(data => {
        elementRef.destroy();
      })
    })
  }
}
