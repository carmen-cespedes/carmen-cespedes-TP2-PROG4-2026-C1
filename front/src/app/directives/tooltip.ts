import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input() appTooltip = '';
  private tooltipEl: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.tooltipEl = this.renderer.createElement('span');
    this.renderer.appendChild(this.tooltipEl, this.renderer.createText(this.appTooltip));
    this.renderer.setStyle(this.tooltipEl, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipEl, 'background', '#333');
    this.renderer.setStyle(this.tooltipEl, 'color', 'white');
    this.renderer.setStyle(this.tooltipEl, 'padding', '4px 8px');
    this.renderer.setStyle(this.tooltipEl, 'border-radius', '4px');
    this.renderer.setStyle(this.tooltipEl, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipEl, 'z-index', '9999');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipEl);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipEl) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipEl);
    }
  }
}