import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
    private api = '/api';
    constructor(private http: HttpClient) {}

    getBookCatalog(): Book[] {
        const books =  this.http.get<Book[]>(`${this.api}/books`, { observe: 'body' });
        return books as unknown as Book[];
    }
}