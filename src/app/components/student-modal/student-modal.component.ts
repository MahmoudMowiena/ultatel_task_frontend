import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../types/student/student';
import { CreateStudent } from '../../types/student/create-student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbDatepickerModule],
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css'],
})
export class StudentModalComponent {
  @Input() student!: Student | CreateStudent;
  @Output() save = new EventEmitter<Student>();
  addEditForm: FormGroup;

  allFieldsFilled: boolean = false;
  isDateTouched: boolean = false;
  isDateButtonClicked: boolean = false;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.addEditForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.addEditForm.valueChanges.subscribe(() => {
      this.allFieldsFilled = this.addEditForm.valid;
    });
  }

  ngOnInit(): void {
    if (this.student) {
      this.addEditForm.patchValue(this.student);
    }
  }

  onSave(): void {
    if (this.addEditForm.valid) {
      this.activeModal.close();
      this.save.emit(this.addEditForm.value);
    }
  }

  onDateSelect(event: NgbDateStruct) {
    this.addEditForm.patchValue({
      birthDate: `${event.year}-${event.month}-${event.day}`
    });
  }

  onDateTouch() {
    this.isDateTouched = true;
  }

  onDateButtonClick() {
    this.isDateButtonClicked = true;
  }
}
