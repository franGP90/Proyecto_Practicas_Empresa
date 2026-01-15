import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Order } from '../models/order.model';

/* ============================
   🗄️ Fake database en memoria
   ============================ */

const users = [
  { id: 1, email: 'ana@demo.com', password: '1234', name: 'Ana' },
  { id: 2, email: 'luis@demo.com', password: '1234', name: 'Luis' }
];

const carts: Record<number, CartItem[]> = {
  1: [],
  2: []
};

const orders: Order[] = [];

const tokens = new Map<string, number>(); // token → userId

const books = [
  {
    id: 1,
    title: 'El señor de los anillos',
    author: 'Tolkien',
    price: 29.95,
    stock: 12,
    cover: 'lotr.jpg'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    price: 19.95,
    stock: 7,
    cover: '1984.jpg'
  }
];

/* ============================
   🔐 Helpers
   ============================ */

function getUserId(req: any): number | null {
  const auth = req.headers.get('Authorization');
  if (!auth) return null;

  const token = auth.replace('Bearer ', '');
  return tokens.get(token) ?? null;
}

/* ============================
   🚀 Interceptor
   ============================ */

export const FakeBackendInterceptor: HttpInterceptorFn = (req, next) => {

  /* ---------- REGISTER ---------- */
  if (req.url.endsWith('/api/register') && req.method === 'POST') {
    const body = req.body as { email: string; password: string; name: string };
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return of(new HttpResponse({
        status: 400,
        body: { message: 'Datos incompletos' }
      }));
    }

    if (users.some(u => u.email === email)) {
      return of(new HttpResponse({
        status: 409,
        body: { message: 'El email ya está registrado' }
      }));
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      email,
      password,
      name
    };

    users.push(newUser);
    carts[newUser.id] = [];

    const token = 'fake-jwt-' + Math.random();
    tokens.set(token, newUser.id);

    users.forEach(e => console.log(e));

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

  /* ---------- LOGIN ---------- */
  if (req.url.endsWith('/api/login') && req.method === 'POST') {
    const body = req.body as { email: string; password: string; };
    const { email, password } = body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return of(new HttpResponse({ status: 401 }));
    }

    const token = 'fake-jwt-' + Math.random();
    tokens.set(token, user.id);

    return of(new HttpResponse({
      status: 200,
      body: {
        token,
        user: { id: user.id, name: user.name, email: user.email }
      }
    })).pipe(delay(500));
  }

  /* ---------- GET CART ---------- */
  if (req.url.endsWith('/api/cart') && req.method === 'GET') {
    const userId = getUserId(req);
    if (!userId) return of(new HttpResponse({ status: 401 }));

    return of(new HttpResponse({
      status: 200,
      body: carts[userId]
    })).pipe(delay(300));
  }

  /* ---------- ADD TO CART ---------- */
  if (req.url.endsWith('/api/cart') && req.method === 'POST') {
    const userId = getUserId(req);
    if (!userId) return of(new HttpResponse({ status: 401 }));
    const body = req.body as { bookId: number; qty: number };
    const { bookId, qty } = body;

    const cart = carts[userId];
    const existing = cart.find(i => i.bookId === bookId);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ bookId, qty });
    }

    return of(new HttpResponse({ status: 200 }));
  }

  /* ---------- CHECKOUT ---------- */
  if (req.url.endsWith('/api/checkout') && req.method === 'POST') {
    const userId = getUserId(req);
    if (!userId) return of(new HttpResponse({ status: 401 }));

    const cart = carts[userId];

    const total = cart.reduce((sum, item) => {
      const book = books.find(b => b.id === item.bookId)!;
      return sum + book.price * item.qty;
    }, 0);

    orders.push({
      id: orders.length + 1,
      userId,
      items: [...cart],
      total,
      date: new Date().toISOString()
    });

    carts[userId] = [];

    return of(new HttpResponse({ status: 200 }));
  }

  /* ---------- GET ORDERS ---------- */
  if (req.url.endsWith('/api/orders') && req.method === 'GET') {
    const userId = getUserId(req);
    if (!userId) return of(new HttpResponse({ status: 401 }));

    return of(new HttpResponse({
      status: 200,
      body: orders.filter(o => o.userId === userId)
    }));
  }

  /* ---------- BOOKS ---------- */
  if (req.url.endsWith('/api/books') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: books
    })).pipe(delay(500));
  }

  if (req.url.match(/\/api\/books\/\d+$/) && req.method === 'GET') {
    const id = Number(req.url.split('/').pop());
    const book = books.find(b => b.id === id);

    return of(new HttpResponse({
      status: 200,
      body: book
    })).pipe(delay(300));
  }
 console.log('Fake Backend Interceptor funcionando');
  return next(req);
};
