import { Component, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
@Component({
  selector: 'app-headder-component',
  imports: [],
  templateUrl: './headder-component.component.html',
  styleUrl: './headder-component.component.scss'
})
export class HeadderComponent {
 @Output() searchEvent = new EventEmitter<string>();

 onSearch(event: Event) {
   const inputElement = event.target as HTMLInputElement;
   this.searchEvent.emit(inputElement.value);
 }
}
