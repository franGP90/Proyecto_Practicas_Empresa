import { Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected user = '';
  protected directions: string[] = [];

  protected accountForm = this.formBuilder.group({
    name: ['']
  });

  protected directionForm = this.formBuilder.group({
    newDirection: ['']
  });

  constructor(private auth: AuthService) {
    effect(() => {
      this.user = this.auth.currentUser?.name || '';
    });
  }

  ngOnInit(): void {
    this.user = this.auth.currentUser?.name || '';
    this.directions = this.auth.currentUser?.directions ?? [];
  }

  updateName(newName: string) {
    this.auth.updateName(newName);
    this.user = newName;
  }

  addDirection(): void {
    const value = this.directionForm.controls.newDirection.value?.trim();
    if (!value) return;

    this.auth.addDirection(value).subscribe({
      next: (directions) => {
        this.directions = directions;
        this.directionForm.reset();
      },
      error: (err) => console.error('Error al añadir dirección:', err)
    });
  }

  removeDirection(direction: string): void {
    this.auth.removeDirection(direction).subscribe({
      next: (directions) => this.directions = directions,
      error: (err) => console.error('Error al eliminar dirección:', err)
    });
  }
}