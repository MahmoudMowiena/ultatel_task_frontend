import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateStudent } from '../types/student/create-student';
import { Observable } from 'rxjs';
import { Student } from '../types/student/student';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly baseUrl = `${environment.apiUrl}/students`;


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
    return this.httpClient.delete(this.baseUrl + `/${studentId}`);
  }

  getByPage(page: number, limit: number, name: string, country: string, gender: string, ageFrom: string, ageTo: string)
    : Observable<any> {
    const params = new HttpParams()
      .set('page', page?.toString())
      .set('limit', limit?.toString())
      .set('name', name?.toString())
      .set('country', country?.toString())
      .set('gender', gender?.toString())
      .set('agefrom', ageFrom?.toString())
      .set('ageto', ageTo?.toString());

    return this.httpClient.get(`${this.baseUrl}/search`, { params });
  }
}



  // getByPage(page: number, limit: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('limit', limit.toString());

  //   return this.httpClient.get(`${this.baseUrl}search`, { params });
  // }

