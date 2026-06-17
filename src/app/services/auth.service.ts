import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = '/api';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private cartSubject = new BehaviorSubject<Book[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  private restoreSession() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      const parsedUser: User = JSON.parse(user);
    this.currentUserSubject.next(parsedUser);
    this.cartSubject.next(parsedUser.cart ?? []);
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, { email, password })
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  register(data: { name: string; email: string; password: string; directions?: string[] }) {

    return this.http.post<any>(`${this.api}/register`, data)
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  updateName(newName?: string) {
    if(!newName) return;
    const currentUser = this.currentUser;
    if (!currentUser) return;

    this.http.put<any>(`${this.api}/user`, { name: newName }).subscribe({
      next: (res: any) => {
        const updatedUser = { ...currentUser, name: newName };
        this.currentUserSubject.next(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      },
      error: (err) => {
        console.error('Error al actualizar el nombre del usuario:', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  private setSession(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.currentUserSubject.next(res.user);
  }


addToCart(book: Book): Observable<Book[]> {
  return this.http.post<Book[]>(`${this.api}/cart`, { book, qty: 1 })
    .pipe(
      tap(updatedCart => {
          console.log('updatedCart del backend:', updatedCart);
        const cart = updatedCart ?? [];
        this.cartSubject.next(cart);
        // ✅ Persiste en localStorage para sobrevivir navegaciones
        const user = { ...this.currentUser!, cart };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('cart', JSON.stringify(cart));
      })
    );
}
removeFromCart(bookId: number): Observable<Book[]> {
  return this.http.delete<Book[]>(`${this.api}/cart/${bookId}`)
    .pipe(
      tap(updatedCart => {
        const cart = updatedCart ?? [];
        this.cartSubject.next(cart);
        const user = { ...this.currentUser!, cart };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('cart', JSON.stringify(cart));
      })
    );
}

loadCart(): void {
  if (!this.currentUser) return;
  this.http.get<Book[]>(`${this.api}/cart`).subscribe({
    next: books => this.cartSubject.next(books ?? []),
    error: () => this.cartSubject.next([])
  });
}

// ✅ Devuelve Observable en lugar de intentar ser síncrono
getCart(): Observable<Book[]> {
  if (!this.currentUser) return of([]);

  return this.http.get<Book[]>(`${this.api}/cart`);
}
}

