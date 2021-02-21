import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNumberValidationComponent } from './test-number-validation.component';

describe('TestNumberValidationComponent', () => {
  let component: TestNumberValidationComponent;
  let fixture: ComponentFixture<TestNumberValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestNumberValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNumberValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
