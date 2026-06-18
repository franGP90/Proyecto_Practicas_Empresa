import { Book } from './book.model';
export interface Order {
  id: number;
  userId: number;
  books: Book[];
  date: string;
}