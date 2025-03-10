export type Book = {
    id: number;
    isbn: string; // unique book identifier
    title: string;
    authorId: number;
    description: string;
    pageCount: number;
    price: number;
    publishedDate?: Date;
  };