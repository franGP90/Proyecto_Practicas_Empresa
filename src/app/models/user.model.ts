export interface User {
  id: number;
  name: string;
  email: string | undefined;
  password: string;
  books: string[];
}