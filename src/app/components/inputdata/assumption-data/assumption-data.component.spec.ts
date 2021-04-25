import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssumptionDataComponent } from './assumption-data.component';

describe('AssumptionDataComponent', () => {
  let component: AssumptionDataComponent;
  let fixture: ComponentFixture<AssumptionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssumptionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssumptionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
