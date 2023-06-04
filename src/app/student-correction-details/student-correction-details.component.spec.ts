import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCorrectionDetailsComponent } from './student-correction-details.component';

describe('StudentCorrectionDetailsComponent', () => {
  let component: StudentCorrectionDetailsComponent;
  let fixture: ComponentFixture<StudentCorrectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCorrectionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCorrectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
