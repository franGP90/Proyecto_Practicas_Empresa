import { Book } from "./book.model";

export interface User {
  id: number;
  name: string;
  email: string | undefined;
  password: string;
  cart?: Book[];
  directions?: string[]; 
}