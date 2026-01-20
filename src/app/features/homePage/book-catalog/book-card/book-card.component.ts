import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input() title: string = 'Default Title';
  @Input() author: string = 'Default Author';
  @Input() bookId: number = 0;
  @Input() coverImageUrl: string | undefined = 'assets/coverImages/defaultCover.jpg';
  constructor(private router: Router) {}


  openBookPurchasePageHandler() {
    this.router.navigate(['/book-purchase', this.bookId]);
  }
}
