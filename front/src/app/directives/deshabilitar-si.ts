import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDeshabilitarSi]',
  standalone: true,
})
export class DeshabilitarSiDirective implements OnChanges {
  @Input() appDeshabilitarSi = false;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.disabled = this.appDeshabilitarSi;
    this.el.nativeElement.style.opacity = this.appDeshabilitarSi ? '0.5' : '1';
    this.el.nativeElement.style.cursor = this.appDeshabilitarSi ? 'not-allowed' : 'pointer';
  }
}