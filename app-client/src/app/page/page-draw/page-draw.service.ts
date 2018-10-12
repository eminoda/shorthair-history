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

  // 偏移量
  offsetAxis: Axis = new Axis(0, 0);
  // 左边起始点
  beforeClientAxis: Axis = new Axis(0, 0);
  minLimitAxis: Axis;
  maxLimitAxis: Axis;
  // 当前元素，用于验证移动边界
  currentBoardElement: BoardElement;

  constructor(private resolver: ComponentFactoryResolver) { }

  createElement<T> (boardContainer: ViewContainerRef, component: Type<T>): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory<T>(component);
    const boardElementRef = boardContainer.createComponent<T>(factory);
    return boardElementRef;
  }

  addBoardElementRef (componentRef: ComponentRef<DrawElementComponent>): void {
    this.boardElementRefList.push(componentRef);
  }

  // draw-element & draw-board 通讯
  setBoardElementObservable (): void {
    this.boardElementObservable = new Subject<BoardElement>();
  }
  getBoardElementObservable (): Subject<BoardElement> {
    return this.boardElementObservable;
  }
  getCurrentBoardELementById (id: number): BoardElement {
    for (let boardElementRef of this.boardElementRefList) {
      if (boardElementRef.instance.boardElement.id === id) {
        return boardElementRef.instance.boardElement;
      }
    }
    return null;
  }
  getBoardElementRefById (id: number): ComponentRef<DrawElementComponent> {
    for (let boardElementRef of this.boardElementRefList) {
      if (boardElementRef.instance.boardElement.id === id) {
        return boardElementRef;
      }
    }
    return null;
  }
  destoryElementById (id: number) {
    this.beforeClientAxis.x = 0;
    this.beforeClientAxis.y = 0;
    for (let boardElementRef of this.boardElementRefList) {
      if (id === boardElementRef.instance.boardElement.id) {
        boardElementRef.destroy();
      }
    }
  }
  // 更新改变元素形状
  updateBoardElementShape (boardElement: BoardElement): void {
    let boardElementRef = this.getBoardElementRefById(boardElement.id);
    boardElementRef.instance.boardElement = boardElement
    boardElementRef.instance.boardElementStyle = this.addPxUnit(boardElement);
  }
  // 记录起始坐标
  saveDragAxis ($event: DragEvent): void {
    this.beforeClientAxis.x = $event.clientX;
    this.beforeClientAxis.y = $event.clientY;
  }
  // 计算拖动偏移量
  calcOffsetDragAxis ($event: DragEvent): void {
    // console.log(`clientX:${$event.clientX},clientY:${$event.clientY},layerX:${$event.layerX},layerY:${$event.layerY},offsetX:${$event.offsetX},offsetY:${$event.offsetY},pageX:${$event.pageX},pageY:${$event.pageY}`);
    this.offsetAxis.x = $event.clientX - this.beforeClientAxis.x + this.currentBoardElement.left;//this.offsetAxis.x;
    this.offsetAxis.y = $event.clientY - this.beforeClientAxis.y + this.currentBoardElement.top;//this.offsetAxis.y;
    this.checkDragAxis();
  }
  // 拖动界值，draw-board 中初始化
  saveLimitAxis (width: number, height: number): void {
    this.minLimitAxis = new Axis(0, 0);
    this.maxLimitAxis = new Axis(width, height);
  }
  // 验证边界
  private checkDragAxis () {
    if (this.offsetAxis.x + this.currentBoardElement.width > this.maxLimitAxis.x) {
      this.offsetAxis.x = this.maxLimitAxis.x - this.currentBoardElement.width;
    }
    if (this.offsetAxis.x < 0) {
      this.offsetAxis.x = 0;
    }
    if (this.offsetAxis.y + this.currentBoardElement.height > this.maxLimitAxis.y) {
      this.offsetAxis.y = this.maxLimitAxis.y - this.currentBoardElement.height;
    }
    if (this.offsetAxis.y < 0) {
      this.offsetAxis.y = 0;
    }
  }
  /**
   * 解析面板元素对象
   * @param boardElement
   * {id:1,width:2} ==> 'width:2;' 
   */
  parseStyleToStr (boardElement: BoardElement): string {
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
  /**
   * 指定css属性添加px
   * 如果默认为0，则初始化100%
   * @param boardElement 
   */
  addPxUnit (boardElement: BoardElement): any {
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
  addStyle (target: any, styleInline: string) {
    target.setAttribute(
      'style', styleInline
    );
  }
}
