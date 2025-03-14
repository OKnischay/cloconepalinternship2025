'use client';
import { Book } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, ArrowRight, BookPlus } from "lucide-react";
import Link from "next/link";
import { fetchSomething } from "@/api/data";
import { toast } from "react-toastify";
const api = process.env.NEXT_PUBLIC_BASE_URL;
// const PAGE_SIZE = 10;

type DisplayBookProps = {
  count?: number;
  results?: Book[];
}

export default function DisplayBook({ bookList }: { bookList?: DisplayBookProps }) {
  console.log(bookList)
  // const [page, setPage] = useState(1);
  // const totalPages = Math.ceil(bookList.count / PAGE_SIZE);
  // const [token, setToken] = useState()
  const router = useRouter();
  // useEffect(() => {
  //   loadBooks()
  // }, [])

  // const loadBooks = async () => {
  //   try {
  //     const data = await fetchSomething(token)
  //     console.log(data)

  //     setBooks(data.results)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchNewBooks(page);
  // }, [page]); 

  // const fetchNewBooks = async (newPage: number) => {
  //   try {
  //     const res = await fetch(`${api}/books?page=${newPage}`);
  //     const data = await res.json();
  //     setBooks(data.results);
  //     // console.log('yo')
  //   } catch (error) {
  //     console.error("Failed to fetch books:", error);
  //   }
  // };


  async function handleDelete(id: string) {
    try {
      const response = await fetch(`${api}/books/${id}/`,
        {
          method: "DELETE"
        }
      );
      if (!response.ok) throw new Error("Failed to delete book");
      router.push('/dashboard/books')
      toast.success("Deleted successfully")
    } catch (error) { 
      console.error("Error deleting book:", error);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      {/* <div className="flex items-center gap-4">
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          <ArrowLeft />
        </Button>
        <h2>Page {page} of {totalPages}</h2>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          <ArrowRight />
        </Button>
      </div> */}
      <div className="flex justify-end">
        <Link href="/dashboard/books/add">
          <Button className="bg-blue-500 hover:bg-blue-700"><BookPlus />Add</Button>
        </Link>
      </div>

      <div className="overflow-x-auto mt-4">
        <Table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              {/* <TableHead>ID</TableHead> */}
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
            {bookList?.results?.map((book) => (
              <TableRow key={book.id}>
                {/* <TableCell>{book.id}</TableCell> */}
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.authors.map((a) => a.name).join(", ")}</TableCell>
                <TableCell>{book.categories.map((c) => c.name).join(", ")}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.pages}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell>{book.stock}</TableCell>
                <TableCell className="flex gap-2">
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
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Link href="./books/[id]/" as={`./books/${book.id}/`}>
                  <Button>Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>


        </Table>
      </div>
      <h3 className="flex items-center justify-center p-4 font-bold">
        Total Books: {bookList?.count}
      </h3>
    </div>
  );
}
