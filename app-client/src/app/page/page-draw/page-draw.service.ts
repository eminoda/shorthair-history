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
  boardElementObservable: Subject<BoardElement> = new Subject<BoardElement>();

  // 偏移量
  offsetAxis: Axis = new Axis(0, 0);
  // 左边起始点
  beforeClientAxis: Axis = new Axis(0, 0);
  // 改变形状
  shapClientAxis: Axis = new Axis(0, 0);
  // 方向
  direction: string;
  // 改变形状开关，focus
  shapSwitch = false;
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
  createBoardElementObservable (): void {
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
    for (let i = 0; i < this.boardElementRefList.length; i++) {
      let boardElementRef = this.boardElementRefList[i];
      if (id === boardElementRef.instance.boardElement.id) {
        boardElementRef.destroy();
        this.boardElementRefList.splice(Number(i), 1)
        this.updateCurrentBoardElement(null);
      }
    }
  }
  // 更新boardELement引用
  udpateBoardElementRef (boardElementRef: ComponentRef<DrawElementComponent>, boardElement: BoardElement): void {
    // 刷新当前元素
    this.updateCurrentBoardElement(boardElement);
    boardElementRef.instance.boardElement = boardElement;
    boardElementRef.instance.boardElementStyle = this.addPxUnit(boardElement);
    boardElementRef.instance.maskStyle = {
      width: boardElement.width + 'px',
      height: boardElement.height + 'px',
      top: boardElement.top + 'px',
      left: boardElement.left + 'px'
    }
  }
  // 更新currentBoardELement，用于不同组件间的boardElement更改
  updateCurrentBoardElement (boardELement: BoardElement) {
    this.currentBoardElement = boardELement;
  }
  // 重新渲染
  renderBoardELement (boardElement: BoardElement): void {
    let boardElementRef = this.getBoardElementRefById(boardElement.id);
    boardElementRef && this.udpateBoardElementRef(boardElementRef, boardElement);
  }
  // 记录起始坐标
  saveDragAxis ($event: DragEvent): void {
    this.beforeClientAxis.x = $event.clientX;
    this.beforeClientAxis.y = $event.clientY;
  }
  // 记录更改形状起始坐标
  saveShapParams (x: number, y: number, direction: string): void {
    this.shapClientAxis.x = x;
    this.shapClientAxis.y = y;
    this.direction = direction;
  }
  // 计算拖动偏移量
  calcOffsetDragAxis ($event: DragEvent, boardElement: BoardElement): void {
    // 不同boardElement切换，需要重新计算当前元素参数
    this.updateCurrentBoardElement(boardElement);
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
  calcShapOffset ($event: PointerEvent, boardElement: BoardElement): BoardElement {
    let offsetX = $event.clientX - this.shapClientAxis.x;
    let offsetY = $event.clientY - this.shapClientAxis.y;

    // ↖ 左上
    if (this.direction == 'nw') {
      if (offsetX > boardElement.width) {
        offsetX = boardElement.width - 10;
      }
      if (offsetY > boardElement.height) {
        offsetY = boardElement.height - 10;
      }
      boardElement.top = boardElement.top + offsetY;
      boardElement.left = boardElement.left + offsetX;
      boardElement.width = boardElement.width - offsetX;
      boardElement.height = boardElement.height - offsetY;
    } else if (this.direction == 'ne') {
      // ↗
      if (offsetX < 0 && Math.abs(offsetX) > boardElement.width) {
        offsetX = -(boardElement.width - 10);
      }
      if (offsetY > boardElement.height) {
        offsetY = boardElement.height - 10;
      }
      boardElement.top = boardElement.top + offsetY;
      boardElement.left = boardElement.left;
      boardElement.width = boardElement.width + offsetX;
      boardElement.height = boardElement.height - offsetY;
    } else if (this.direction == 'sw') {
      // ↙
      if (offsetX > boardElement.width) {
        offsetX = boardElement.width - 10;
      }
      if (offsetY < 0 && Math.abs(offsetY) > boardElement.height) {
        offsetY = -(boardElement.height - 10);
      }
      boardElement.top = boardElement.top;
      boardElement.left = boardElement.left + offsetX;
      boardElement.width = boardElement.width - offsetX;
      boardElement.height = boardElement.height + offsetY;
    } else if (this.direction == 'se') {
      // ↘
      if (offsetX < 0 && Math.abs(offsetX) > boardElement.width) {
        offsetX = -(boardElement.width - 10);
      }
      if (offsetY < 0 && Math.abs(offsetY) > boardElement.height) {
        offsetY = -(boardElement.height - 10);
      }
      boardElement.top = boardElement.top;
      boardElement.left = boardElement.left;
      boardElement.width = boardElement.width + offsetX;
      boardElement.height = boardElement.height + offsetY;
    }
    // 重新点击后生效
    this.shapSwitch = false;
    return this.checkShapeOffset(boardElement);
  }
  // 计算形变边界
  private checkShapeOffset (boardElement: BoardElement): BoardElement {
    // 校验边界
    if (boardElement.top < 0) {
      boardElement.top = 0;
    }
    if (boardElement.left < 0) {
      boardElement.left = 0;
    }
    if (boardElement.top + boardElement.height > this.maxLimitAxis.y) {
      boardElement.height = this.maxLimitAxis.y - boardElement.top;
    }
    if (boardElement.left + boardElement.width > this.maxLimitAxis.x) {
      boardElement.width = this.maxLimitAxis.x - boardElement.left;
    }
    return boardElement;
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
