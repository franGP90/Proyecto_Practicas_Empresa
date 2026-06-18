import { Component, effect, Input, OnInit, NgModule } from '@angular/core';
import { Book, Format } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadderComponent } from "../../components/headder-component/headder-component.component";
import { NgFor, NgIf, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-purchase-page',
  imports: [HeadderComponent, NgFor, NgIf, NgClass , FormsModule],
  templateUrl: './book-purchase-page.component.html',
  styleUrl: './book-purchase-page.component.scss'
})
export class BookPurchasePageComponent implements OnInit {
  @Input() bookId: number = 0;
  book: Book | null = null;
    selectedFormat: Format | null = null;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router, protected auth: AuthService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.bookService.getBook(this.bookId).subscribe( data => {
        this.book = data;
        this.selectedFormat = null;
      });
    });
    
  }
 isFormatAvailable(format: Format): boolean {
    if (format.formatName === 'Ebook') return true;
    return (format.stock ?? 0) > 0;
  }

  selectFormat(format: Format): void {
    if (!this.isFormatAvailable(format)) return;
    this.selectedFormat = format;
  }

   cart: Book[] = [];
  showCartConfirmation = false;

  onAddToCart() {
  if (!this.book || !this.selectedFormat) return;
  
  this.auth.addToCart(this.book).subscribe({
    next: (cart) => { console.log('Carrito actualizado:', cart);
       this.showCartConfirmation = true;
      setTimeout(() => this.showCartConfirmation = false, 3000);},
    error: (err) => console.error('Error:', err)
  });
}

selectedDirection: string | null = null;

onPurchaseClick(): void {
  if (!this.book || !this.selectedFormat || !this.selectedDirection) return;
  this.auth.buyBooks([{ book: this.book, format: this.selectedFormat }], this.selectedDirection).subscribe({
    next: () => this.router.navigate(['/purchase-steps']),
    error: (err) => console.error('Error al comprar:', err)
  });
}
}
