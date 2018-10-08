import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, Type, ComponentRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private resolver: ComponentFactoryResolver) { }

  createDynamicComponent<T> (container: ViewContainerRef, component: Type<T>): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory(component);
    return container.createComponent(factory);
  }
}
