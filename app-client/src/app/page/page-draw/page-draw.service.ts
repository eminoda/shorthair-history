import { BoardElement } from './../../model/boardElement';
import { DrawElementComponent } from './draw-element/draw-element.component';
import { Injectable, ViewContainerRef, Type, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { BoardElementStyle } from '../../model/boardElementStyle';
@Injectable({
  providedIn: 'root'
})
export class PageDrawService {

  boardElementRefList: Array<ComponentRef<DrawElementComponent>> = [];

  hideObservable: Subject<boolean>;

  constructor(private resolver: ComponentFactoryResolver) { }

  createElement<T> (boardContainer: ViewContainerRef, component: Type<T>): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory<T>(component);
    const boardElementRef = boardContainer.createComponent<T>(factory);
    return boardElementRef;
  }

  addBoardElementRef (componentRef: ComponentRef<DrawElementComponent>): void {
    this.boardElementRefList.push(componentRef);
  }

  setHideObservable (): Subject<boolean> {
    this.hideObservable = new Subject<boolean>();
    return this.hideObservable;
  }

  destoryElementById (id: number) {
    for (let boardElementRef of this.boardElementRefList) {
      if (id === boardElementRef.instance.boardElement.id) {
        boardElementRef.destroy();
      }
    }
  }
  /**
   * 解析面板元素对象
   * @param boardElement
   * {id:1,width:2} ==> 'width:2;' 
   */
  parseStyleToStr (boardElement: BoardElement): string {
    function _addPxUnit (boardElement: BoardElement) {
      let properties = ['height', 'width', 'font-size', 'border-width', 'border-radius'];
      let unit = 'px';
      let defaultUnit = '%';
      for (let key in boardElement) {
        for (let prop of properties) {
          if (prop == key) {
            if ((key == 'width' || key == 'height') && !boardElement[key]) {
              boardElement[key] = 100;
              unit = defaultUnit;
            }
            boardElement[key] = boardElement[key] + unit;
          }
        }
      }
      return boardElement;
    }
    let style = _addPxUnit(boardElement);

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
  addStyle (target: any, styleInline: string) {
    target.setAttribute(
      'style', styleInline
    );
  }
}
