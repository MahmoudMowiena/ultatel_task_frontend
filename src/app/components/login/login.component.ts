// import { Component } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterLink, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

//   constructor(public authService: AuthService, public router: Router) { }

//   loginForm = new FormGroup({
//     userName: new FormControl('', [Validators.required]),
//     password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
//   });

//   login(formGroup: FormGroup) {
//     if (formGroup.valid) {
//       this.authService.login(formGroup.value).subscribe({
//         next: (response) => {
//           const token = JSON.stringify(response.access_token);
//           this.authService.setCredentials(token);
//           if (this.authService.User.value != null) {
//             this.router.navigate(["/"]);
//           }
//         }
//       })
//     }
//   }
// }


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
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
  });

  login(formGroup: FormGroup): void {
    if (formGroup.valid) {
      this.authService.login(formGroup.value).subscribe(token => {
        if (token) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  constructor(private authService: AuthService, public router: Router) { }
}