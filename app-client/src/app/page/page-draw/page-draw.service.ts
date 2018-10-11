import { BoardElement } from './../../model/boardElement';
import { DrawElementComponent } from './draw-element/draw-element.component';
import { Injectable, ViewContainerRef, Type, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Axis } from '../../model/axis';
@Injectable({
  providedIn: 'root'
})
export class PageDrawService {

  boardElementRefList: Array<ComponentRef<DrawElementComponent>> = [];
  boardElementObservable: Subject<BoardElement>;

  offsetAxis: Axis;
  dragAxis: Axis;

  constructor(private resolver: ComponentFactoryResolver) { }

  createElement<T>(boardContainer: ViewContainerRef, component: Type<T>): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory<T>(component);
    const boardElementRef = boardContainer.createComponent<T>(factory);
    return boardElementRef;
  }

  addBoardElementRef(componentRef: ComponentRef<DrawElementComponent>): void {
    this.boardElementRefList.push(componentRef);
  }

  // draw-element & draw-board 通讯
  setBoardElementObservable(): void {
    this.boardElementObservable = new Subject<BoardElement>();
  }
  getBoardElementObservable(): Subject<BoardElement> {
    return this.boardElementObservable;
  }
  destoryElementById(id: number) {
    for (let boardElementRef of this.boardElementRefList) {
      if (id === boardElementRef.instance.boardElement.id) {
        boardElementRef.destroy();
      }
    }
  }
  saveDragAxis(x: number, y: number): void {
    this.dragAxis = new Axis(x, y);
    console.log('start');
    console.log(this.dragAxis);
  }

  calcOffsetDragAxis(x: number, y: number): void {
    console.log({
      currentX: x,
      currentY: y
    });
    this.offsetAxis = new Axis(x - this.dragAxis.x, y - this.dragAxis.y);
    console.log('offset');
    console.log(this.offsetAxis);
  }

  resetDragAxis(): void {
    this.dragAxis.x = 0;
    this.dragAxis.y = 0;
  }
  /**
   * 解析面板元素对象
   * @param boardElement
   * {id:1,width:2} ==> 'width:2;' 
   */
  parseStyleToStr(boardElement: BoardElement): string {

    let style = this.addPxUnit(boardElement);

    let resultArr = [];

    for (let key in style) {
      if (style[key]) {
        resultArr.push(`${key}:${style[key]};`);
      }
    }

    return resultArr.reduce((prev, curr) => {
      return prev + curr;
    });
  }
  addStyle(target: any, styleInline: string) {
    target.setAttribute(
      'style', styleInline
    );
  }
  addPxUnit(boardElement: BoardElement): any {
    let style = Object.assign({}, boardElement);
    let properties = ['height', 'width', 'font-size', 'border-width', 'border-radius', 'top', 'bottom', 'left', 'right'];
    let unit = 'px';
    let defaultUnit = '%';
    for (let key in style) {
      for (let prop of properties) {
        if (prop == key) {
          if ((key == 'width' || key == 'height') && (!style[key] || typeof style[key] == 'string')) {
            style[key] = 100 + defaultUnit;
          } else {
            style[key] = style[key] + unit;
          }
        }
      }
    }
    return style;
  }
}
