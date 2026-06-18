import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { Book } from '../models/book.model';

const initialUsers: User[] = [
  { id: 1, email: 'ana@demo.com', password: '1234', name: 'Ana', directions: ['123 Main St'], cart: [] },
  { id: 2, email: 'luis@demo.com', password: '1234', name: 'Luis', directions: [], cart: [] }
];

const initialBooks: Book[] = [
  {
    id: 1, title: 'El señor de los anillos', author: 'Tolkien', price: 29.95,
    cover: 'assets/coverImages/lotr.jpg',
    formats: [{ formatName: 'Tapa Dura', stock: 20 }, { formatName: 'Tapa Blanda', stock: 20 }, { formatName: 'Ebook', stock: 10 }],
  },
  {
    id: 2, title: '1984', author: 'George Orwell', price: 19.95,
    cover: 'assets/coverImages/1984.jpeg',
    formats: [{ formatName: 'Tapa Blanda', stock: 20 }, { formatName: 'Ebook', stock: 10 }],
  },
  {
    id: 3, title: 'Crimen y Castigo', author: 'Dostoyevski', price: 20.00,
    formats: [{ formatName: 'Tapa Dura', stock: 20 }, { formatName: 'Ebook', stock: 10 }],
  }
];

export const DB = {
  getUsers(): User[] {
    const stored = localStorage.getItem('__fakeDb_users');
    return stored ? JSON.parse(stored) : initialUsers;
  },
  saveUsers(users: User[]): void {
    localStorage.setItem('__fakeDb_users', JSON.stringify(users));
  },

  getTokens(): Map<string, number> {
    const stored = localStorage.getItem('__fakeDb_tokens');
    return stored ? new Map(JSON.parse(stored)) : new Map();
  },
  saveTokens(tokens: Map<string, number>): void {
    localStorage.setItem('__fakeDb_tokens', JSON.stringify([...tokens]));
  },


  getOrders(): Order[] {
    const stored = localStorage.getItem('__fakeDb_orders');
    return stored ? JSON.parse(stored) : [];
  },
  saveOrders(orders: Order[]): void {
    localStorage.setItem('__fakeDb_orders', JSON.stringify(orders));
  },

  books: initialBooks
};