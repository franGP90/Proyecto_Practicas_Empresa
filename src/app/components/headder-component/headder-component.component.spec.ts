import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadderComponent } from './headder-component.component';

describe('HeadderComponentComponent', () => {
  let component: HeadderComponent;
  let fixture: ComponentFixture<HeadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
