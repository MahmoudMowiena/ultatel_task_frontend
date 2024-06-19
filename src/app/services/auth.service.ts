import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwtdecode from 'jwt-decode';
import { LoginUser } from '../types/user/loginUser';
import { User } from '../types/user/user';
import { RegisterUser } from '../types/user/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private readonly baseUrl = "http://localhost:3000/auth";


  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }


  login(loginUser: LoginUser): Observable<string | null> {
    return new Observable<string | null>(observer => {
      this.http.post<{ access_token: string }>(`${this.baseUrl}/login`, loginUser).subscribe({
        next: response => {
          const token = response.access_token;
          localStorage.setItem('token', token);

          const payload: { email: string, firstName: string, lastName: string } = jwtdecode.jwtDecode(token);
          const user: User = {
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            token: token
          };

          this.userSubject.next(user);
          observer.next(token);
          observer.complete();
        },
        error: error => {
          console.error('Login failed', error);
          observer.next(null);
          observer.complete();
        }
      });
    });
  }

  register(registerUser: RegisterUser): Observable<string | null> {
    return new Observable<string | null>(observer => {
      this.http.post<{ access_token: string }>(`${this.baseUrl}/register`, registerUser).subscribe({
        next: response => {
          const token = response.access_token;
          localStorage.setItem('token', token);

          const payload: { email: string, firstName: string, lastName: string } = jwtdecode.jwtDecode(token);
          const user: User = {
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            token: token
          };

          this.userSubject.next(user);
          observer.next(token);
          observer.complete();
        },
        error: error => {
          console.error('Registration failed', error);
          observer.next(null);
          observer.complete();
        }
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    //this.router.navigate(['/login']);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
