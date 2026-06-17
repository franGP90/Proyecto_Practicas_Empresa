import { Component, signal } from '@angular/core';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgFor, NgIf, NgClass } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cart',
  imports: [NgFor, AsyncPipe, NgIf, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
 protected cartItems$: Observable<Book[]>;   // async pipe en template

  constructor(private authService: AuthService) {

      this.cartItems$ = this.authService.cart$;

  }
 removeFromCart(bookId: number): void {
  this.authService.removeFromCart(bookId).subscribe({
    next: (cart) => console.log('Libro eliminado, carrito:', cart),
    error: (err) => console.error('Error al eliminar:', err)
  });
}

  totalPrice(cartItems: Book[] | null): number {
    if(cartItems === null) return 0;
    return cartItems.reduce((total, item) => total + item.price, 0);
  }
}

