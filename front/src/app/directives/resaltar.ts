import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
  standalone: true,
})
export class ResaltarDirective {
  @Input() appResaltar = '#f0e6ff';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appResaltar;
    this.el.nativeElement.style.transition = 'background-color 0.3s';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}