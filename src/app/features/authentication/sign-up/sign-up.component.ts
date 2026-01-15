import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    username: [''],
    password: [''],
    repeatPassword: [''],
  });

  error: Error | null = null;

  constructor(private router: Router, private auth: AuthService) {}
  submitSignUp(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue();
       this.auth.register({
        name: formValue.username || '',
        email: formValue.username || '',
        password: formValue.password || ''
    }).subscribe({
        next: () => this.router.navigate(['/home-page']),
        error: err => {
          this.error = err.error?.message || 'Error al registrar'
    }
  });
    }


  }
}
