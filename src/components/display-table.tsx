import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Book } from "@/types";
  
  async function fetchBooks(): Promise<Book[]> {
    try {
        const result = await fetch('http://localhost:5000/books');
        if (!result.ok) throw new Error(`HTTP error! Status: ${result.status}`);
        const data = await result.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

export async function DisplayTable (){
    const books:Book[] = await fetchBooks();
    console.log(books)
    return (
        <div>
            <Table>
                <TableCaption>List of Books</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>AuthorId</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>PageCount</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>PublishedDate</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book)=>(
                        <TableRow key={book.id}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.authorId}</TableCell>
                            <TableCell>{book.description}</TableCell>
                            <TableCell>{book.pageCount}</TableCell>
                            <TableCell>{book.price}</TableCell>
                            <TableCell>{book.publishedDate?.toString()}</TableCell>
                            <TableCell className="text-center">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </div>
    )
}
