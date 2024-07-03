import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-popover',
  standalone: true,
  imports: [NgbPopoverModule, CommonModule],
  templateUrl: './password-popover.component.html',
  styleUrl: './password-popover.component.css'
})
export class PasswordPopoverComponent implements OnChanges {
  @Input() password: string | null | undefined = '';
  @Input() showPopover: boolean = false;
  hasUpperCase: boolean = false;
  hasLowerCase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialChar: boolean = false;
  hasEightChars: boolean = false;
  isPasswordValid: boolean = false;
  passwordStrength: string = 'Very Weak';

  ngOnChanges(changes: SimpleChanges): void {
    this.checkPasswordStrength();
  }

  checkPasswordStrength(): void {
    if (this.password) {
      this.hasUpperCase = /[A-Z]/.test(this.password);
      this.hasLowerCase = /[a-z]/.test(this.password);
      this.hasNumber = /\d/.test(this.password);
      this.hasSpecialChar = /[!@#$%^&*()\[\]{}\\|;:'",<.>/?`~]/.test(this.password);
      this.hasEightChars = /^.{8,}$/.test(this.password);
      this.isPasswordValid = this.hasUpperCase && this.hasLowerCase && this.hasNumber && this.hasSpecialChar && this.hasEightChars;
    } else {
      this.hasUpperCase = false;
      this.hasLowerCase = false;
      this.hasNumber = false;
      this.hasSpecialChar = false;
      this.hasEightChars = false;
      this.isPasswordValid = false;
    }

    const score: number = this.checkPasswordScore();

    if (score === 5) this.passwordStrength = "Strong";
    else if (score > 1 && score < 5) this.passwordStrength = "Medium";
    else if (score === 1) this.passwordStrength = "Weak";
    else this.passwordStrength = "Very Weak";
  }

  checkPasswordScore(): number {
    let score = 0;
    if(this.hasNumber) ++score;
    if(this.hasUpperCase) ++score;
    if(this.hasLowerCase) ++score;
    if(this.hasSpecialChar) ++score;
    if(this.hasEightChars) ++score;
    return score;
  }
}
