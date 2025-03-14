export interface Book {
  id: string;
  isbn: string;
  title: string;
  authors: { name: string }[];
  categories: { name: string }[];
  pages: number;
  price: number;
  stock: number;
}
export interface Author {
  id: string | number;
  name: string;
}

export interface Category {
  id: string | number;
  name: string;
}

export interface BookFormData {
  title: string;
  isbn: string;
  description: string;
  price: string;
  pages: string;
  stock: string;
  authors: string[];
  categories: string[];
}
