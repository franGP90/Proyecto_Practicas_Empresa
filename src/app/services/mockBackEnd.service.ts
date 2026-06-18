import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Order } from '../models/order.model';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { DB } from './fake-db';


function getUserId(req: any): number | null {
  const auth = req.headers.get('Authorization');
  console.log('Auth header:', auth);
  console.log('Tokens map:', DB.getTokens());
  if (!auth) return null;
  const token = auth.replace('Bearer ', '');
  return DB.getTokens().get(token) ?? null;
}


export const FakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('FakeBackend recibe:', req.method, req.url);

  if (req.url.endsWith('/api/register') && req.method === 'POST') {
    const body = req.body as { email: string; password: string; name: string; directions?: string[], books?: Book[] };
    const { email, password, name, directions, books } = body;

    if (!email || !password || !name) {
      return of(new HttpResponse({
        status: 400,
        body: { message: 'Datos incompletos' }
      }));
    }

    if (DB.getUsers().some(u => u.email === email)) {
      return of(new HttpResponse({
        status: 409,
        body: { message: 'El email ya está registrado' }
      }));
    }

    const newUser = {
      id: Math.max(...DB.getUsers().map(u => u.id)) + 1,
      email,
      password,
      name,
      directions: directions || [],
      cart: []
    };

    DB.saveUsers([...DB.getUsers(), newUser]);

    const token = 'fake-jwt-' + Math.random();
    DB.saveTokens(new Map([...DB.getTokens(), [token, newUser.id]]));

    DB.getUsers().forEach(e => console.log(e));

    return of(new HttpResponse({
      status: 201,
      body: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      }
    })).pipe(delay(700));

  }

  if (req.url.endsWith('/api/login') && req.method === 'POST') {
    const body = req.body as { email: string; password: string; };
    const { email, password } = body;

    const user = DB.getUsers().find(u => u.email === email && u.password === password);

    if (!user) {
      return of(new HttpResponse({ status: 401 }));
    }

    const token = 'fake-jwt-' + Math.random();
    DB.saveTokens(new Map([...DB.getTokens(), [token, user.id]]));

    return of(new HttpResponse({
      status: 200,
      body: {
        token,
        user: { id: user.id, name: user.name, email: user.email, directions: user.directions, cart: user.cart }
      }
    })).pipe(delay(500));
  }

  if (req.url.endsWith('/api/user') && req.method === 'PUT') {
    console.log('Update user funcionando')
    const auth = inject(AuthService);
    const userId = auth.currentUser?.id;
    if (!userId){ console.log('no autorizado'); return of(new HttpResponse({ status: 401, body: { message: 'No autorizado' } }));}

    const body = req.body as { name: string };
    const { name } = body;

    const userIndex = DB.getUsers().findIndex(u => u.id === userId);
    if (userIndex === -1) {
      console.log('usuario no encontrado')
      return of(new HttpResponse({ status: 404, body: { message: 'Usuario no encontrado' } }));
    }
    
    DB.saveUsers(DB.getUsers().map((u, i) => i === userIndex ? { ...u, name } : u));
    console.log('Usuario actualizado')
    return of(new HttpResponse({
      status: 200,
      body: { message: 'Usuario actualizado correctamente' }
    }));
  }

if (req.url.endsWith('/api/cart') && req.method === 'POST') {
  const userId = getUserId(req);
  if (!userId) return of(new HttpResponse({ status: 401 }));

  const body = req.body as { book: Book; qty: number };
  const { book } = body;
  console.log('Adding to cart:', book);

  const user = DB.getUsers().find(u => u.id === userId);
  if (!user) return of(new HttpResponse({ status: 404 }));

  if (!user.cart) user.cart = [];

  const alreadyInCart = user.cart.some(b => b.id === book.id);
  if (!alreadyInCart) {
    user.cart.push(book);
  }

const users = DB.getUsers();
const updatedUsers = users.map(u => u.id === userId ? { ...u, cart: user.cart } : u);
DB.saveUsers(updatedUsers);

  return of(new HttpResponse({ status: 200, body: [...user.cart] }));
}

if (req.url.endsWith('/api/cart') && req.method === 'GET') {
  const userId = getUserId(req);
    console.log('GET cart - userId:', userId);          // ← ¿llega token?
  console.log('GET cart - users state:', DB.getUsers()); 
  if (!userId) return of(new HttpResponse({ status: 401 }));

  const user = DB.getUsers().find(u => u.id === userId);
    console.log('Usuario encontrado:', user);
  console.log('Cart antes de añadir:', user?.cart);
  console.log('localStorage users raw:', localStorage.getItem('__fakeDb_users'))
  console.log('GET cart - user.cart:', user?.cart);   // ← ¿está vacío?

  return of(new HttpResponse({
    status: 200,
    body: user?.cart ?? []
  })).pipe(delay(300));
}

if (req.url.match(/\/api\/cart\/\d+$/) && req.method === 'DELETE') {
  const userId = getUserId(req);
  if (!userId) return of(new HttpResponse({ status: 401 }));

  const bookId = Number(req.url.split('/').pop());
  const users = DB.getUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return of(new HttpResponse({ status: 404 }));

  user.cart = (user.cart ?? []).filter(b => b.id !== bookId);
  DB.saveUsers(users.map(u => u.id === userId ? { ...u, cart: user.cart } : u));

  return of(new HttpResponse({ status: 200, body: [...user.cart] }));
}

if (req.url.endsWith('/api/orders') && req.method === 'POST') {
  const userId = getUserId(req);
  if (!userId) return of(new HttpResponse({ status: 401 }));

  const { books } = req.body as { books: Book[] };
  if (!books?.length) return of(new HttpResponse({ status: 400 }));

  const orders = DB.getOrders();
  const newOrder = {
    id: orders.length + 1,
    userId,
    books,
    date: new Date().toISOString()
  };
  DB.saveOrders([...orders, newOrder]);

  return of(new HttpResponse({ status: 201, body: newOrder })).pipe(delay(500));
}

if (req.url.endsWith('/api/orders') && req.method === 'GET') {
  const userId = getUserId(req);
  if (!userId) return of(new HttpResponse({ status: 401 }));

  return of(new HttpResponse({
    status: 200,
    body: DB.getOrders().filter(o => o.userId === userId)
  })).pipe(delay(300));
}

  if (req.url.endsWith('/api/books') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: DB.books
    })).pipe(delay(500));
  }

  if (req.url.match(/\/api\/books\/\d+$/) && req.method === 'GET') {
    const id = Number(req.url.split('/').pop());
    const book = DB.books.find(b => b.id === id);

    return of(new HttpResponse({
      status: 200,
      body: book
    })).pipe(delay(300));
  }
 console.log('Fake Backend Interceptor funcionando');
  return next(req);
};
