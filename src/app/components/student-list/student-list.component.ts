import { Component, OnInit } from '@angular/core';
import { Student } from '../../types/student/student';
import { StudentService } from '../../services/student.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentModalComponent } from '../student-modal/student-modal.component';
import { CreateStudent } from '../../types/student/create-student';
import { Gender } from '../../types/student/gender-enum';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getAll().subscribe({
      next: students => {
        this.students = students;
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
      this.studentService.update(updatedStudent).subscribe({
        next: () => {
          this.fetchStudents();
        },
        error: err => {
          console.error('Update failed', err);
        }
      });
    });
  }

  addStudent(): void {
    const modalRef = this.modalService.open(StudentModalComponent);
    let student: CreateStudent = {firstName:"", lastName:"", age:20, email: "", country: ""}
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.save.subscribe((newStudent: CreateStudent) => {
      this.studentService.add(newStudent).subscribe({
        next: () => {
          this.fetchStudents();
        },
        error: err => {
          console.error('Adding student failed', err);
        }
      });
    });
  }

}
