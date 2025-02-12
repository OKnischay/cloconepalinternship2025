'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Book {
  id: number;
  isbn: string;
  title: string;
  authorId: number;
  description: string;
  pageCount: number;
  price: number;
  publishedDate?: Date;
}

export default function DisplayBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:5000/books");
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data: Book[] = await response.json();
      setBooks(data);
      setTotalBooks(data.length);
    } catch (error) {
      console.error("Error fetching books:", error);

    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      const response = await fetch(`http://localhost:5000/books/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      setBooks(prev => prev.filter(book => book.id !== deleteId));
      setTotalBooks(prev => prev - 1);
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="p-6">
      <h1 className="flex justify-center font-bold text-4xl mb-6">
        Total Books: {totalBooks}
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Author ID</TableHead>
            <TableHead>Page Count</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.authorId}</TableCell>
              <TableCell>{book.pageCount}</TableCell>
              <TableCell className="text-right">
                ${book.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push(`/dashboard/books/${book.id}`)}
                >
                  Edit
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-700"
                      onClick={() => setDeleteId(book.id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this book? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-700"
                        onClick={handleDelete}
                      >
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Showing {books.length} of {totalBooks} books
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex justify-center mt-6">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/dashboard/books/add")}
        >
          Add Book
        </Button>
      </div>
    </div>
  );
}