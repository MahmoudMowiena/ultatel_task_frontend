import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../types/student/student';
import { CreateStudent } from '../../types/student/create-student';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../types/country';

@Component({
  selector: 'app-student-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbDatepickerModule],
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css'],
})
export class StudentModalComponent {
  @Input() student!: Student | CreateStudent;
  @Input() title: string = "";
  @Output() save = new EventEmitter<Student>();
  addEditForm: FormGroup;

  isDateTouched: boolean = false;
  isDateButtonClicked: boolean = false;
  isSaveBtnClicked: boolean = false;

  maxDate: NgbDateStruct;
  minDate: NgbDateStruct;

  countries: string[] = [];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private countryService: CountryService) {
    this.addEditForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      country: ['', Validators.required]
    });

    const today = new Date();
    this.maxDate = {
      year: today.getFullYear() - 18,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.minDate = {
      year: today.getFullYear() - 60,
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  ngOnInit(): void {
    if (this.student) {
      this.addEditForm.patchValue(this.student);
    }
    this.getCountries();
  }

  onSave(): void {
    this.isSaveBtnClicked = true;
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

  getCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (res: Country[]) => {
        this.countries = res.map(country => country.name.common);
        this.countries.sort((a, b) => a.localeCompare(b));
      },
      error: err => {
        console.error('Error fetching countries:', err);
      }
    });
  }
}
