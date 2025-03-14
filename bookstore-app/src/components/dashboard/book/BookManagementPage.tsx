import { useState, useEffect } from "react";
import AddBookForm from "@/components/dashboard/book/AddBook"
import { fetchAuthors, fetchCategories } from "@/api/data";
import { toast } from "react-toastify";
import { Author, Category } from "@/types";

const BookManagementPage = ({ token }:any) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const [authorsData, categoriesData] = await Promise.all([
          fetchAuthors(), 
          fetchCategories()
        ]);
        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load authors or categories.");
      }
    };
    loadData();
  }, []);

  const handleAddBook = async (formData:any) => {
    setIsLoading(true);
    setError("");
    
    try {
      const api = process.env.NEXT_PUBLIC_BASE_URL;
      const finalData = {
        ...formData,
        author_ids: formData.authors,
        category_ids: formData.categories
      };
      
      const response = await fetch(`${api}/books/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Failed to add book.");
      
      return data;
    } catch (err) {
     toast.error("Failed to add book")
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    toast.success("Book Added Successfully")
  };

  return (
    <div className="container mx-auto py-8">
      <AddBookForm
        onSubmit={handleAddBook}
        onSuccess={handleSuccess}
        authors={authors}
        categories={categories}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default BookManagementPage;