import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    username: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
    repeatPassword: ['', Validators.required],
  });

  error: Error | null = null;

  constructor(private router: Router, private auth: AuthService) {}
  submitSignUp(): void {
       if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
    return;
  }

  if (this.f.password.value !== this.f.repeatPassword.value) {
    this.error = new Error('Las contraseñas no coinciden');
    return;
  }

  this.error = null;

  const formValue = this.userForm.getRawValue();

  this.auth.register({
    name: formValue.username || '',
    email: formValue.username || '',
    password: formValue.password || ''
  }).subscribe({
    next: () => this.router.navigate(['/home-page']),
    error: err => {
      this.error = err.error?.message || 'Error al registrar';
    }
  });
    }


  get f() {
  return this.userForm.controls;
}
}
