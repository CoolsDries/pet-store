import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountPerSpeciesComponent } from './amount-per-species.component';

describe('AmountPerSpeciesComponent', () => {
  let component: AmountPerSpeciesComponent;
  let fixture: ComponentFixture<AmountPerSpeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountPerSpeciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountPerSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
