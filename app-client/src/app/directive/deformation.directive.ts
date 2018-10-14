import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDeformation]'
})
export class DeformationDirective {

  top: number = 0;
  left: number = 0;

  constructor() { }

  @HostListener('pointerdown', ['$event'])
  pointerdown($event: Event) {
    let element = <HTMLElement>(event.target);
    let parentElement = this.getParentElement(element);
    this.top = parentElement.offsetTop;
    this.left = parentElement.offsetLeft;
    console.log('down');
    $event.preventDefault();
  }
  @HostListener('pointermove', ['$event'])
  pointerleave($event: PointerEvent) {
    console.log($event.layerX);
    let element = <HTMLElement>(event.target);
    let parentElement = this.getParentElement(element);
    console.log('up');
    $event.preventDefault();
  }
  private getParentElement(element: HTMLElement): HTMLElement {
    return element.parentElement;
  }
}
