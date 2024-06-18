import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordPopoverComponent } from '../password-popover/password-popover.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, PasswordPopoverComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  passwordStrength: 'weak' | 'medium' | 'strong' | '' = '';
  showPasswordPopover: boolean = false;


  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, public router: Router) { }

  register(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.authService.register(formGroup.value).subscribe(token => {
        if (token) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  checkPasswordStrength(): void {
    const password = this.registerForm.get('password')?.value;

    if (password && password.length < 8) {
      this.passwordStrength = 'weak';
    } else if (password && password.length >= 8 && password.length <= 12) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
  }
}
