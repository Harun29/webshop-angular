import { SwipeDownDirective } from './swipe-down.directive';
import {ElementRef} from '@angular/core';

describe('SwipeDownDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const directive = new SwipeDownDirective(mockElementRef as ElementRef);
    expect(directive).toBeTruthy();
  });
});
