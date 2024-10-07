import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuItemComponent } from './store-menu-item.component';

describe('StoreMenuItemComponent', () => {
  let component: StoreMenuItemComponent;
  let fixture: ComponentFixture<StoreMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
