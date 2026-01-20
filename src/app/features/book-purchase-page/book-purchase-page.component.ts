import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { HeadderComponent } from "../../components/headder-component/headder-component.component";

@Component({
  selector: 'app-book-purchase-page',
  imports: [HeadderComponent],
  templateUrl: './book-purchase-page.component.html',
  styleUrl: './book-purchase-page.component.scss'
})
export class BookPurchasePageComponent implements OnInit {
  @Input() bookId: number = 0;
  book: Book | null = null;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.bookService.getBook(this.bookId).subscribe( data => {
        this.book = data;
      });
    });
  }
}
