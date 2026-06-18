import { Component, signal } from '@angular/core';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgFor, NgIf, NgClass } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  imports: [NgFor, AsyncPipe, NgIf, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
 protected cartItems$: Observable<Book[]>;   // async pipe en template

  constructor(protected authService: AuthService, private router: Router) {

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

  selectedDirection: string | null = null;

buyCart(): void {
  if (!this.selectedDirection) return;
  this.authService.cart$.pipe(take(1)).subscribe(books => {
    if (!books.length) return;
    const items = books.map(book => ({
      book,
      format: book.formats.find(f => f.formatName === 'Ebook' || (f.stock ?? 0) > 0) ?? book.formats[0]
    }));
    this.authService.buyBooks(items, this.selectedDirection!, true).subscribe({
      next: () => this.router.navigate(['/order-confirmation']),
      error: (err) => console.error('Error al comprar:', err)
    });
  });
}
}

