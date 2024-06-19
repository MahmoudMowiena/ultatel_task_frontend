// import { Component, OnInit } from '@angular/core';
// import { Student } from '../../types/student/student';
// import { StudentService } from '../../services/student.service';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { StudentModalComponent } from '../student-modal/student-modal.component';
// import { CreateStudent } from '../../types/student/create-student';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-student-list',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './student-list.component.html',
//   styleUrl: './student-list.component.css'
// })
// export class StudentListComponent implements OnInit {
//   students: Student[] = [];

//   entries: number = 1;
//   totalEntries: number = 100;
//   currentPage: number = 1;
//   totalPages: number = 10
//   pages: number = 1
//   searchForm: FormGroup = new FormGroup({
//     email: new FormControl('', [Validators.required]),
//     password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
//   });

//   constructor(private studentService: StudentService, private modalService: NgbModal) { }

//   ngOnInit(): void {
//     this.fetchStudents();
//   }

//   fetchStudents(): void {
//     this.studentService.getAll().subscribe({
//       next: students => {
//         this.students = students;
//       },
//       error: err => {
//         console.error('Fetch students failed', err);
//       }
//     });
//   }

//   deleteStudent(id: number): void {
//     this.students = this.students.filter(student => student.id !== id);

//     this.studentService.delete(id).subscribe({
//       next: () => {
//         this.fetchStudents();
//       },
//       error: err => {
//         console.error('Delete failed', err);
//       }
//     });
//   }

//   editStudent(student: Student): void {
//     const modalRef = this.modalService.open(StudentModalComponent);
//     modalRef.componentInstance.student = student;
//     modalRef.componentInstance.save.subscribe((updatedStudent: Student) => {
//       updatedStudent.id = student.id;
//       this.studentService.update(updatedStudent).subscribe({
//         next: () => {
//           this.fetchStudents();
//         },
//         error: err => {
//           console.error('Update failed', err);
//         }
//       });
//     });
//   }

//   addStudent(): void {
//     const modalRef = this.modalService.open(StudentModalComponent);
//     let student: CreateStudent = {firstName:"", lastName:"", email: "", country: ""}
//     modalRef.componentInstance.student = student;
//     modalRef.componentInstance.save.subscribe((newStudent: CreateStudent) => {
//       this.studentService.add(newStudent).subscribe({
//         next: () => {
//           this.fetchStudents();
//         },
//         error: err => {
//           console.error('Adding student failed', err);
//         }
//       });
//     });
//   }

//   resetForm() {}
//   goToFirstPage() {}
//   goToLastPage() {}
//   goToPreviousPage() {}
//   goToPage(page: number) {}
//   goToNextPage() {}

  


// }



import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Student } from '../../types/student/student';
import { CreateStudent } from '../../types/student/create-student';
import { StudentService } from '../../services/student.service';
import { StudentModalComponent } from '../student-modal/student-modal.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  entries: number = 10; // default value for entries per page
  totalEntries: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];

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
    this.studentService.getAll().subscribe({
      next: students => {
        this.students = students;
        this.totalEntries = students.length;
        this.updatePagination();
      },
      error: err => {
        console.error('Fetch students failed', err);
      }
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.totalEntries / this.entries);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  deleteStudent(id: number): void {
    this.studentService.delete(id).subscribe({
      next: () => {
        this.students = this.students.filter(student => student.id !== id);
        this.totalEntries--;
        this.updatePagination();
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
    this.searchForm.reset();
    this.fetchStudents();
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.fetchStudents();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchStudents();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.fetchStudents();
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchStudents();
    }
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.fetchStudents();
  }
}

