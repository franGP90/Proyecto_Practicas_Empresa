import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPurchasePageComponent } from './book-purchase-page.component';

describe('BookPurchaseApgeComponent', () => {
  let component: BookPurchasePageComponent;
  let fixture: ComponentFixture<BookPurchasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPurchasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPurchasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
