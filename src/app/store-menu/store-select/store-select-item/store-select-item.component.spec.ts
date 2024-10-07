import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSelectItemComponent } from './store-select-item.component';

describe('StoreSelectItemComponent', () => {
  let component: StoreSelectItemComponent;
  let fixture: ComponentFixture<StoreSelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSelectItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
