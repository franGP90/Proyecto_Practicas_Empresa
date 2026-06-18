import { Book } from './book.model';
export interface Order {
  id: number;
  userId: number;
  books: Book[];
  direction: string;
  date: string;
}