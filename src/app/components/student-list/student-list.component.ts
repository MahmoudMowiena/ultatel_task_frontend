import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../types/student/student';
import { CreateStudent } from '../../types/student/create-student';
import { StudentService } from '../../services/student.service';
import { StudentModalComponent } from '../student-modal/student-modal.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HeaderComponent, NgbPaginationModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  entriesPerPage: number = 3; // default value for entries per page
  totalEntries: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  startingEntriesIndex: number = 0;
  endingEntriesIndex: number = 0;
  isSearchClicked: boolean = false;


  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    ageFrom: new FormControl(''),
    ageTo: new FormControl(''),
    country: new FormControl(''),
    gender: new FormControl('')
  });

  constructor(private studentService: StudentService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    const name: string = this.isSearchClicked ? this.searchForm.get('name')?.value : "";
    const ageFrom: string = this.isSearchClicked ? this.searchForm.get('ageFrom')?.value : "";
    const ageTo: string = this.isSearchClicked ? this.searchForm.get('ageTo')?.value : "";
    const country: string = this.isSearchClicked ? this.searchForm.get('country')?.value : "";
    const gender: string = this.isSearchClicked ? this.searchForm.get('gender')?.value : "";

    this.studentService.getByPage(this.currentPage, this.entriesPerPage, name, country, gender, ageFrom, ageTo).subscribe({
      next: res => {
        this.students = res.data;
        this.totalEntries = res.totalItems;
        this.totalPages = res.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.startingEntriesIndex = 1 + (this.currentPage - 1) * this.entriesPerPage;
        this.endingEntriesIndex = Math.min(this.startingEntriesIndex + this.entriesPerPage - 1, this.totalEntries);
      },
      error: err => {
        console.error('Fetch students failed', err);
      }
    });
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);

    this.studentService.delete(id).subscribe({
      next: () => {
        this.fetchStudents();
      },
      error: err => {
        console.error('Delete failed', err);
      }
    });
  }

  editStudent(student: Student): void {
    const modalRef = this.modalService.open(StudentModalComponent);
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.save.subscribe((updatedStudent: Student) => {
      updatedStudent.id = student.id;
      this.updateStudentLocally(updatedStudent);
      this.studentService.update(updatedStudent).subscribe({
        next: () => this.fetchStudents(),
        error: err => {
          console.error('Update failed', err);
        }
      });
    });
  }

  addStudent(): void {
    const modalRef = this.modalService.open(StudentModalComponent);
    const student: CreateStudent = { firstName: "", lastName: "", email: "", country: "" };
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.save.subscribe((newStudent: CreateStudent) => {
      this.studentService.add(newStudent).subscribe({
        next: () => this.fetchStudents(),
        error: err => {
          console.error('Adding student failed', err);
        }
      });
    });
  }

  resetForm(): void {
    this.searchForm.patchValue({
      name: "",
      ageFrom: "",
      ageTo: "",
      country: "",
      gender: ""
    })
    this.isSearchClicked = false;
    this.fetchStudents();
  }

  onSearch() {
    this.currentPage = 1;
    this.isSearchClicked = true;
    this.fetchStudents();
  }

  onEntriesPerPageChange() {
    this.currentPage = 1;
    this.entriesPerPage = Number.parseInt(`${this.entriesPerPage}`)
    this.fetchStudents();
  }

  calculateAge(date: Date) {
    const today = new Date();

    const birthDate: Date = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchStudents();
  }

  updateStudentLocally(updatedStudent: Student) {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);

    this.students[index] = {
      ...this.students[index],
      firstName: updatedStudent.firstName,
      lastName: updatedStudent.lastName,
      email: updatedStudent.email,
      birthDate: updatedStudent.birthDate,
      gender: updatedStudent.gender,
      country: updatedStudent.country
    }
  }
}
