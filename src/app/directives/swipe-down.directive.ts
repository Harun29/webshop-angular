import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSwipeDown]'
})
export class SwipeDownDirective {
  @Output() swipeDown = new EventEmitter<void>();

  private touchStartY = 0;
  private touchEndY = 0;

  constructor(private el: ElementRef) {}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.touchEndY = event.touches[0].clientY;
    const deltaY = this.touchEndY - this.touchStartY;

    if (deltaY > 0) {
      this.el.nativeElement.style.transform = `translateY(${deltaY}px)`;
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    const deltaY = this.touchEndY - this.touchStartY;
    this.touchEndY = 0;
    this.touchStartY = 0;
    console.log("delta y", deltaY);

    if (deltaY > 100) {
      this.swipeDown.emit();
      this.el.nativeElement.style.transform = 'translateY(0)';
    } else {
      this.el.nativeElement.style.transition = 'transform 0.3s ease';
      this.el.nativeElement.style.transform = 'translateY(0)';
      setTimeout(() => {
        this.el.nativeElement.style.transition = '';
      }, 300);
    }
  }
}
