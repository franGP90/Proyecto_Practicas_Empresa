import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { BookCardComponent } from "./book-card/book-card.component";
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-catalog',
  imports: [BookCardComponent, NgFor],
  templateUrl: './book-catalog.component.html',
  styleUrl: './book-catalog.component.scss'
})
export class BookCatalogComponent implements OnInit {
  protected books: Book[]=[]
  protected filteredBooks: Book[] = [];
  @Input() searchTerm: string = '';
  constructor(private bookService: BookService) {}
  ngOnInit(): void {this.bookService.getBookCatalog().subscribe(data => {
    this.books = data;
  })}

  onSearch(term: string) {
  this.filteredBooks = this.books.filter(book =>
    book.title.toLowerCase().includes(term.toLowerCase())
  );
}


  
}
