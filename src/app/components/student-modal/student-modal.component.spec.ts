import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddEditModalComponent } from './student-modal.component';

describe('StudentEditModalComponent', () => {
  let component: StudentAddEditModalComponent;
  let fixture: ComponentFixture<StudentAddEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAddEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAddEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
