import { Component, Input, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-book-card',
  imports: [NgIf],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input() title: string = 'Default Title';
  @Input() author: string = 'Default Author';
  @Input() bookId: number = 0;
  @Input() coverImageUrl: string = '/assets/coverImages/noCover.jpg';
  mouseEnterCard = signal(false);
  constructor(private router: Router) {}


  openBookPurchasePageHandler() {
    this.router.navigate(['/book-purchase', this.bookId]);
  }

}
