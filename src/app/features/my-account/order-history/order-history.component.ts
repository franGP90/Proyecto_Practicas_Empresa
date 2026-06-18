import { Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  imports: [NgFor, AsyncPipe, DatePipe, NgIf],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
   orders$: Observable<any[]>;

  constructor(private auth: AuthService, private router: Router) {
    this.orders$ = this.auth.getOrders();
  }

  totalPrice(books: any[]): number {
  return books.reduce((sum, b) => sum + b.price, 0);
}
}
