import { PageDrawService } from './../page/page-draw/page-draw.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'app-deformation'
})
export class DeformationDirective {

  // 方向
  @Input() direction: string;

  constructor(private pageDrawService: PageDrawService) {
  }

  // 更新形变的
  // 考虑触控板，不用mouse
  @HostListener('pointerdown', ['$event'])
  pointerdown($event: PointerEvent) {
    console.log('pointerdown in deformation');
    this.pageDrawService.direction = this.direction;
    this.pageDrawService.shapSwitch = true;
    this.pageDrawService.saveShapParams($event.clientX, $event.clientY, this.direction);
    $event.preventDefault();
  }
}
