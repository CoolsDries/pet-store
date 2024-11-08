import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSelectComponent } from './store-select.component';

describe('StoreSelectComponent', () => {
  let component: StoreSelectComponent;
  let fixture: ComponentFixture<StoreSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
