import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[stopScrollPropagation]'
})
export class StopScrollPropagationDirective {

  @HostListener('touchmove', ['$event'])
  stopScrollPropagation(event: Event) {
    event.stopPropagation();
  }

  constructor() { }
}
