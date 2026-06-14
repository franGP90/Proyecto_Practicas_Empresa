import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor(private router: Router, private auth: AuthService) {}
  private formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    username: [''],
    password: [''],

  });

  error: Error | null = null;

  submitLogin(): void {
    if(this.userForm.valid){
     const formValue = this.userForm.getRawValue();
       this.auth.login(
        formValue.username || '',
        formValue.password || ''
    ).subscribe({
        next: () => this.router.navigate(['/home-page']),
        error: err => {
          this.error = err.error?.message || 'Error al registrar'
    }
  });
    }   
  }
}
