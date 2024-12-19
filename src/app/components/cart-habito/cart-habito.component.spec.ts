import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHabitoComponent } from './cart-habito.component';

describe('CartHabitoComponent', () => {
  let component: CartHabitoComponent;
  let fixture: ComponentFixture<CartHabitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartHabitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartHabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
