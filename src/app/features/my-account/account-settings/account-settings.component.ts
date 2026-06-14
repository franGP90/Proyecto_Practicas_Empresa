import { Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected user = '';

  protected accountForm = this.formBuilder.group({
    name: ['']
  });
  constructor(private auth: AuthService) {
    effect(() => {
    this.user = this.auth.currentUser?.name || ''
  });
  }


  ngOnInit(): void {
    this.user = this.auth.currentUser?.name || '';
  }
  
  updateName(newName: string) {
    this.auth.updateName(newName);
    this.user = newName;
  }
}
