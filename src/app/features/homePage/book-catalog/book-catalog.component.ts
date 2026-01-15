import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from "./book-card/book-card.component";
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-catalog',
  imports: [BookCardComponent],
  templateUrl: './book-catalog.component.html',
  styleUrl: './book-catalog.component.scss'
})
export class BookCatalogComponent implements OnInit {
  constructor(private bookService: BookService) {}
  ngOnInit(): void {this.Books();}
  protected books: Book[]=[]
  Books(): void {
    this.books = this.bookService.getBookCatalog();
  }
  
  
}
