'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    isbn: '',
    title: '',
    authorId: 0,
    description: '',
    pageCount: 0,
    price: 0,
    publishedDate: undefined
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      
      router.push('/dashboard/books');
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book');
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
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
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
            min="0"
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
            min="1"
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
            className="flex-1 bg-green-600 text-white hover:bg-green-700"
          >
            Add Book
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