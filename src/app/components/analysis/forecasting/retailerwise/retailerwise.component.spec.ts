import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerwiseComponent } from './retailerwise.component';

describe('RetailerwiseComponent', () => {
  let component: RetailerwiseComponent;
  let fixture: ComponentFixture<RetailerwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
