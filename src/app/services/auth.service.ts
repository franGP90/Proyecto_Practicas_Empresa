import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = '/api';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  private restoreSession() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, { email, password })
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  register(data: { name: string; email: string; password: string }) {

    return this.http.post<any>(`${this.api}/register`, data)
      .pipe(
        tap(res => this.setSession(res))
      );
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
}
