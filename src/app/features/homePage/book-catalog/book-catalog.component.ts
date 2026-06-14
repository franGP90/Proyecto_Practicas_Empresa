import { Component, computed, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
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
  protected books: WritableSignal<Book[]> = signal([]);
  protected filteredBooks: Signal<Book[]>= computed(()=> this.books().filter(book =>
    book.title.toLowerCase().includes(this.searchTerm().toLowerCase())
    || book.author.toLowerCase().includes(this.searchTerm().toLowerCase())
  ));
  @Input() searchTerm: WritableSignal<string> = signal('');
  constructor(private bookService: BookService) {}
  ngOnInit(): void {this.bookService.getBookCatalog().subscribe(data => {
    this.books.set(data);
  })}
}
