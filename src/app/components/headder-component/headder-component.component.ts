import { Component, EventEmitter, inject } from '@angular/core';
import { Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-headder-component',
  imports: [],
  templateUrl: './headder-component.component.html',
  styleUrl: './headder-component.component.scss'
})
export class HeadderComponent {
  authService = inject(AuthService);
  cerrarSesion() {
    this.authService.logout();
  }



 @Output() searchEvent = new EventEmitter<string>();

 onSearch(event: Event) {
   const inputElement = event.target as HTMLInputElement;
   this.searchEvent.emit(inputElement.value);
 }
}
