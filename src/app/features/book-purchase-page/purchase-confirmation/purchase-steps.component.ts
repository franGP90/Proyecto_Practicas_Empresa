import { Component } from '@angular/core';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-purchase-confirmation',
  imports: [NgFor, AsyncPipe, DatePipe],
  templateUrl: './purchase-confirmation.component.html',
  styleUrl: './purchase-confirmation.component.scss'
})
export class PurchaseConfirmationComponent {
  orders$: Observable<any[]>;

  constructor(private auth: AuthService) {
    this.orders$ = this.auth.getOrders();
  }
}
