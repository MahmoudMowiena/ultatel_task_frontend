import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, NgbAlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordFieldType: string = 'password';
  isAlertOpen: boolean = false;
  isLoginClicked: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, public router: Router) {}
  

  login(formGroup: FormGroup): void {
    this.isLoginClicked = true;

    if (formGroup.valid) {
      this.authService.login(formGroup.value).subscribe({
        next: token => {
          if (token) {
            this.router.navigate(['/']);
          }
        },
        error: error => {
          this.isAlertOpen = true;
          console.error('Login failed', error);
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  closeAlert() {
    this.isAlertOpen = false;
  }
}