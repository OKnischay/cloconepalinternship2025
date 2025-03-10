'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Book {
  id: number;
  isbn: string;
  title: string;
  authors: { name: string }[];
  categories: { name: string }[];
  pages: number;
  price: number;
  stock: number;
}

const api = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function DisplayBook({ bookList }: { bookList: { count: number; results: Book[] } }) {
  const [books, setBooks] = useState(bookList.results);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(bookList.count / PAGE_SIZE);
  const router = useRouter();

  useEffect(() => {
    fetchNewBooks(page);
  }, [page]); // Fetch books when page changes

  const fetchNewBooks = async (newPage: number) => {
    try {
      const res = await fetch(`${api}/books?page=${newPage}`);
      const data = await res.json();
      setBooks(data.results);
      console.log('yo')
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`${api}/books/${id}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete book");
      fetchNewBooks(page); // Refresh books
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <h1 className="flex justify-center font-bold text-4xl mb-6">
        Total Books: {bookList.count}
      </h1>

      <div className="flex items-center gap-4">
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          <ArrowLeft />
        </Button>
        <h2>Page {page} of {totalPages}</h2>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          <ArrowRight />
          
        </Button>
      </div>

      <div className="overflow-x-auto mt-4">
        <Table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Authors</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.authors.map((a) => a.name).join(", ")}</TableCell>
                <TableCell>{book.categories.map((c) => c.name).join(", ")}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.pages}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell>{book.stock}</TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" className="bg-red-500 hover:bg-red-700">Delete</Button>
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
                        <AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={() => handleDelete(book.id)}>
                          Confirm Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
