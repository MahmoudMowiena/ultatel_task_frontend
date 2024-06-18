import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordFieldType: string = 'password';
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
  });

  constructor(private authService: AuthService, public router: Router) { }

  login(formGroup: FormGroup): void {
    if (formGroup.valid) {
      this.authService.login(formGroup.value).subscribe(token => {
        if (token) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}