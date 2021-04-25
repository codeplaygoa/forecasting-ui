import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizationComponent } from './actualization.component';

describe('ActualizationComponent', () => {
  let component: ActualizationComponent;
  let fixture: ComponentFixture<ActualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
