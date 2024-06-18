import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateStudent } from '../types/student/create-student';
import { Observable } from 'rxjs';
import { Student } from '../types/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly baseUrl = "http://localhost:3000/students/";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
  
  add(newStudent: CreateStudent): Observable<any> {
    return this.httpClient.post<CreateStudent>(this.baseUrl, newStudent);
  }

  update(updatedStudent: Student): Observable<any> {
    return this.httpClient.put<Student>(this.baseUrl, updatedStudent);
  }

  delete(studentId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `${studentId}`);
  }
}
