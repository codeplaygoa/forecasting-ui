import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualsWeeklyDataComponent } from './actuals-weekly-data.component';

describe('ActualsWeeklyDataComponent', () => {
  let component: ActualsWeeklyDataComponent;
  let fixture: ComponentFixture<ActualsWeeklyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualsWeeklyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualsWeeklyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
