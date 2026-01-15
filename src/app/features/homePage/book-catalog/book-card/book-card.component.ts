import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input() title: string = 'Default Title';
  @Input() author: string = 'Default Author';
  @Input() coverImageUrl: string = '';

}
