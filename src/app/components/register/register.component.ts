import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  register(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.authService.register(formGroup.value).subscribe(token => {
        if (token) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  constructor(private authService: AuthService, public router: Router) { }
}
