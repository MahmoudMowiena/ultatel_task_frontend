// // import { TestBed } from '@angular/core/testing';

// // import { StudentService } from './student.service';

// // describe('StudentService', () => {
// //   let service: StudentService;

// //   beforeEach(() => {
// //     TestBed.configureTestingModule({});
// //     service = TestBed.inject(StudentService);
// //   });

// //   it('should be created', () => {
// //     expect(service).toBeTruthy();
// //   });
// // });


// import { TestBed } from '@angular/core/testing';
// import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { StudentService } from './student.service';
// import { CreateStudent } from '../types/student/create-student';
// import { Student } from '../types/student/student';
// import { environment } from '../../environments/environment';
// import { Gender } from '../types/student/gender-enum';

// describe('StudentService', () => {
//   let service: StudentService;
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
  
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [provideHttpClientTesting],
//       providers: [StudentService]
//     });
//     service = TestBed.inject(StudentService);
//     httpClient = TestBed.inject(HttpClient);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should retrieve all students', () => {
//     const testData: Student[] = [{ id: 1, firstName: 'Student', lastName: 'ABC', country: 'Country A', gender: Gender.Male, birthDate: new Date('2000-10-30'), email:"student-abc@example.com" }];
     
//     service.getAll().subscribe(students => {
//       expect(students).toEqual(testData);
//     });

//     const req = httpTestingController.expectOne(`${environment.apiUrl}/students`);
//     expect(req.request.method).toEqual('GET');
//     req.flush(testData);
//   });

//   it('should add a new student', () => {
//     const newStudent: CreateStudent = { firstName: 'New', lastName: 'Student', country: 'Country B', gender: Gender.Female, birthDate: new Date('1990-10-30'), email:"new-student@example.com" };
     
//     service.add(newStudent).subscribe(response => {
//       expect(response).toEqual(newStudent);
//     });

//     const req = httpTestingController.expectOne(`${environment.apiUrl}/students`);
//     expect(req.request.method).toEqual('POST');
//     req.flush(newStudent);
//   });

//   it('should update an existing student', () => {
//     const updatedStudent: Student = { id: 1, firstName: 'Updated', lastName: 'Student', country: 'Country C', gender: Gender.Male, birthDate: new Date('1980-10-30'), email:"updated-student@example.com" };
     
//     service.update(updatedStudent).subscribe(response => {
//       expect(response).toEqual(updatedStudent);
//     });

//     const req = httpTestingController.expectOne(`${environment.apiUrl}/students`);
//     expect(req.request.method).toEqual('PUT');
//     req.flush(updatedStudent);
//   });

//   it('should delete an existing student', () => {
//     const studentId = 1;

//     service.delete(studentId).subscribe(response => {
//       expect(response).toEqual({});
//     });

//     const req = httpTestingController.expectOne(`${environment.apiUrl}/students/${studentId}`);
//     expect(req.request.method).toEqual('DELETE');
//     req.flush({});
//   });

//   it('should retrieve students by page with parameters', () => {
//     const page = 1, limit = 10, name = 'Student', country = 'Country', gender = 'Male', ageFrom = '20', ageTo = '30';
//     const testData: Student[] = [{ id: 1, firstName: 'Student', lastName: 'XYZ', country: 'Country D', gender: Gender.Female, birthDate: new Date('1970-10-30'), email:"student-xyz@example.com"  }];
     
//     service.getByPage(page, limit, name, country, gender, ageFrom, ageTo).subscribe(students => {
//       expect(students).toEqual(testData);
//     });

//     const req = httpTestingController.expectOne(`${environment.apiUrl}/students/search?page=${page}&limit=${limit}&name=${name}&country=${country}&gender=${gender}&agefrom=${ageFrom}&ageto=${ageTo}`);
//     expect(req.request.method).toEqual('GET');
//     req.flush(testData);
//   });

// });

import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpParams, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { StudentService } from './student.service';
import { CreateStudent } from '../types/student/create-student';
import { Student } from '../types/student/student';
import { environment } from '../../environments/environment';
import { Gender } from '../types/student/gender-enum';

describe('StudentService', () => {
  let service: StudentService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [StudentService]
    });

    service = TestBed.inject(StudentService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all students', () => {
    const testData: Student[] = [{ id: 1, firstName: 'Student', lastName: 'ABC', country: 'Country A', gender: Gender.Male, birthDate: new Date('2000-10-30'), email:"student-abc@example.com" }];
     
    service.getAll().subscribe(students => {
      expect(students).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/students`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should add a new student', () => {
    const newStudent: CreateStudent = { firstName: 'New', lastName: 'Student', country: 'Country B', gender: Gender.Female, birthDate: new Date('1990-10-30'), email:"new-student@example.com" };
     
    service.add(newStudent).subscribe(response => {
      expect(response).toEqual(newStudent);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/students`);
    expect(req.request.method).toEqual('POST');
    req.flush(newStudent);
  });

  it('should update an existing student', () => {
    const updatedStudent: Student = { id: 1, firstName: 'Updated', lastName: 'Student', country: 'Country C', gender: Gender.Male, birthDate: new Date('1980-10-30'), email:"updated-student@example.com" };
     
    service.update(updatedStudent).subscribe(response => {
      expect(response).toEqual(updatedStudent);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/students`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedStudent);
  });

  it('should delete an existing student', () => {
    const studentId = 1;

    service.delete(studentId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/students/${studentId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('should retrieve students by page with parameters', () => {
    const page = 1, limit = 10, name = 'Student', country = 'Country', gender = 'Male', ageFrom = '20', ageTo = '30';
    const testData: Student[] = [{ id: 1, firstName: 'Student', lastName: 'XYZ', country: 'Country D', gender: Gender.Female, birthDate: new Date('1970-10-30'), email:"student-xyz@example.com"  }];
     
    service.getByPage(page, limit, name, country, gender, ageFrom, ageTo).subscribe(students => {
      expect(students).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/students/search?page=${page}&limit=${limit}&name=${name}&country=${country}&gender=${gender}&agefrom=${ageFrom}&ageto=${ageTo}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

});
