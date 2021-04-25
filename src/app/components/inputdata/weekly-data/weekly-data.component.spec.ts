import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDataComponent } from './weekly-data.component';

describe('WeeklyDataComponent', () => {
  let component: WeeklyDataComponent;
  let fixture: ComponentFixture<WeeklyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
