import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastWeeklyDataComponent } from './forecast-weekly-data.component';

describe('ForecastWeeklyDataComponent', () => {
  let component: ForecastWeeklyDataComponent;
  let fixture: ComponentFixture<ForecastWeeklyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastWeeklyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastWeeklyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
