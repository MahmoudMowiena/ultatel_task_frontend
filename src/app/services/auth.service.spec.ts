import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginUser } from '../types/user/loginUser';
import { RegisterUser } from '../types/user/registerUser';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  }));

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully', () => {
    const loginData: LoginUser = { email: 'test@example.com', password: 'password' };
    const mocked_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const mockResponse = { access_token: mocked_token };

    service.login(loginData).subscribe(token => {
      expect(token).toEqual(mocked_token);
      expect(service.isLoggedIn).toBeTrue();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should handle login failure', () => {
    const loginData: LoginUser = { email: 'test@example.com', password: 'wrong_password' };

    service.login(loginData).subscribe(token => {
      expect(token).toBeNull();
      expect(service.isLoggedIn).toBeFalse();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toEqual('POST');

    expect(service.getUser()).toBeNull();
  });

  it('should register successfully', () => {
    const registerData: RegisterUser = { email: 'newuser@example.com', password: 'password', confirmPassword: 'password', firstName: 'New', lastName: 'User' };
    const mocked_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const mockResponse = { access_token: mocked_token };

    service.register(registerData).subscribe(token => {
      expect(token).toEqual(mocked_token);
      expect(service.isLoggedIn).toBeTrue();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/register`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should handle registration failure', () => {
    const registerData: RegisterUser = { email: 'existing@example.com', password: 'password', confirmPassword: 'password', firstName: 'Existing', lastName: 'User' };

    service.register(registerData).subscribe(token => {
      expect(token).toBeNull();
      expect(service.isLoggedIn).toBeFalse();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/register`);
    expect(req.request.method).toEqual('POST');

    expect(service.getUser()).toBeNull();
  });

  it('should log out successfully', () => {
    localStorage.setItem('token', 'mocked_token');
    service.logout();

    expect(service.isLoggedIn).toBeFalse();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
