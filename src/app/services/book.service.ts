import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
    private api = '/api/books';
    constructor(private http: HttpClient) {}

    getBookCatalog(): Observable<Book[]> {
        return this.http.get<Book[]>(this.api);
    }

    getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.api}/${id}`);
    }


}