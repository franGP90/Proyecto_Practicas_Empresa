import { Component, effect, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadderComponent } from "../../components/headder-component/headder-component.component";
import { NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-book-purchase-page',
  imports: [HeadderComponent, NgFor],
  templateUrl: './book-purchase-page.component.html',
  styleUrl: './book-purchase-page.component.scss'
})
export class BookPurchasePageComponent implements OnInit {
  @Input() bookId: number = 0;
  book: Book | null = null;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router, private auth: AuthService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.bookService.getBook(this.bookId).subscribe( data => {
        this.book = data;
      });
    });
    
  }
  onPurchaseClick(){
    this.router.navigate(['/purchase-steps', this.bookId]);
  }
   cart: Book[] = [];

  onAddToCart() {
  if (!this.book) return;
  
  // ✅ Suscríbete al Observable que retorna addToCart
  // getCart() ya no hace falta aquí, cart$ se actualiza solo via tap()
  this.auth.addToCart(this.book).subscribe({
    next: (cart) => console.log('Carrito actualizado:', cart),
    error: (err) => console.error('Error:', err)
  });
}
}
