import { DrawElementComponent } from './draw-element/draw-element.component';
import { Injectable, ViewContainerRef, Type, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PageDrawService {

  elementList: Array<ComponentRef<DrawElementComponent>> = [];

  hideObservable: Subject<boolean>;

  constructor(private resolver: ComponentFactoryResolver) { }

  createElement<T> (boardContainer: ViewContainerRef, component: Type<T>): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory<T>(component);
    const boardElementRef = boardContainer.createComponent<T>(factory);
    return boardElementRef;
  }

  addElement (componentRef: ComponentRef<DrawElementComponent>): void {
    this.elementList.push(componentRef);
  }

  setHideObservable (): Subject<boolean> {
    this.hideObservable = new Subject<boolean>();
    return this.hideObservable;
  }

  destoryElement () {
    this.hideObservable.next(true);
  }
}
