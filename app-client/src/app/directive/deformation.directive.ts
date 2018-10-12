import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDeformation]'
})
export class DeformationDirective {

  constructor() { }

  @HostListener('mousedown', ['$event.target'])
  mousedown ($event) {
    console.log('enter');
    console.log($event.offsetTop);
  }
  @HostListener('mouseup', ['$event.target'])
  mouseleave ($event) {
    console.log(222);
    console.log($event);
  }
}
