'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

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

export default function EditBook() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [formData, setFormData] = useState<Book>({
    id: 0,
    isbn: '',
    title: '',
    authorId: 0,
    description: '',
    pageCount: 0,
    price: 0,
    publishedDate: undefined
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/books/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data: Book = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError('Failed to load book details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      router.push('/dashboard/books');
    } catch (error) {
      console.error('Error updating book:', error);
      setError('Failed to update book');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'pageCount' || name === 'authorId' 
        ? Number(value)
        : value
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.push('/dashboard/books')}>Back to Books</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="isbn" className="block mb-2 font-medium">
            ISBN:
          </label>
          <input
            id="isbn"
            name="isbn"
            type="text"
            value={formData.isbn}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="authorId" className="block mb-2 font-medium">
            Author ID:
          </label>
          <input
            id="authorId"
            name="authorId"
            type="number"
            value={formData.authorId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-2 font-medium">
            Price:
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="pageCount" className="block mb-2 font-medium">
            Page Count:
          </label>
          <input
            id="pageCount"
            name="pageCount"
            type="number"
            value={formData.pageCount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description:
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            Update Book
          </Button>
          <Button
            type="button"
            onClick={() => router.push('/dashboard/books')}
            className="flex-1 bg-gray-600 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}