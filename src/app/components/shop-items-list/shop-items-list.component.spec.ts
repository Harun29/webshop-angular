import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemsListComponent } from './shop-items-list.component';

describe('ShopItemsListComponent', () => {
  let component: ShopItemsListComponent;
  let fixture: ComponentFixture<ShopItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
