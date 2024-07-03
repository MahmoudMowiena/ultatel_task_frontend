import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordPopoverComponent } from '../password-popover/password-popover.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, PasswordPopoverComponent, NgbAlertModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  showPasswordPopover: boolean = false;
  alertMessage: string = "User registration failed. Please check your information and try again later.";
  isAlertOpen: boolean = false;
  isRegisterBtnClicked: boolean = false;


  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });
  

  constructor(private authService: AuthService, public router: Router) { }


  register(formGroup: FormGroup) {
    this.isRegisterBtnClicked = true;

    if (formGroup.valid) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        this.alertMessage = "Passwords do not match. Please ensure that both passwords are identical.";
        this.isAlertOpen = true;
        console.error('Passwords do not match');
        return;
      }

      this.authService.register(formGroup.value).subscribe({
        next: token => {
          if (token) {
            this.router.navigate(['/']);
          }
        },
        error: error => {
          const errorMessage: string = error.error.message;

          if (errorMessage === 'passwords do not match') {
            this.alertMessage = "Passwords do not match. Please ensure that both passwords are identical.";
          } else if (errorMessage === 'email already registered') {
            this.alertMessage = "The email address you entered is already registered. Please use a different email address or try logging in."
          } else {
            this.alertMessage = "User registration failed. Please check your information and try again later.";
          }

          this.isAlertOpen = true;
          console.error('Registration failed', error);
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

  closeAlert() {
    this.isAlertOpen = false;
  }

  isConfirmPasswordInvalid(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword');
    return !!((confirmPassword?.value !== password && confirmPassword?.touched) || 
           (confirmPassword?.invalid && (confirmPassword?.touched || this.isRegisterBtnClicked)));
}

isConfirmPasswordValid(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword');
    return !!(confirmPassword?.valid && confirmPassword?.value === password && confirmPassword?.touched);
}
}
