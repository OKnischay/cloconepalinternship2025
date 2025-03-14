"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Edit, Loader2, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Author, Category, BookFormData } from "@/types"

interface EditBookFormProps {
  id: string | number;
  token: string;
  onSuccess?: (updatedBook: any) => void;
  onCancel?: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({
  id,
  token,
  onSuccess,
  onCancel,
}) => {
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_BASE_URL;
  
  const [book, setBook] = useState<any>(null);
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    isbn: "",
    description: "",
    price: "",
    pages: "",
    stock: "",
    authors: [],
    categories: [],
  });
  
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        const bookResponse = await fetch(`${api}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });      
        if (!bookResponse.ok) {
          throw new Error("Failed to load book data");
        }
        const bookData = await bookResponse.json();
        setBook(bookData);

        setFormData({
          title: bookData.title || "",
          isbn: bookData.isbn || "",
          description: bookData.description || "",
          price: bookData.price ? bookData.price.toString() : "",
          pages: bookData.pages ? bookData.pages.toString() : "",
          stock: bookData.stock ? bookData.stock.toString() : "",
          authors: bookData.author_ids || [],
          categories: bookData.category_ids || [],
        });

        const [authorsResponse, categoriesResponse] = await Promise.all([
          fetch(`${api}/authors`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${api}/categories`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (!authorsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to load authors or categories");
        }     
        const authorsData = await authorsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || "An error occurred while loading data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [api, id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, selectedOptions } = e.target;
    setFormData({
      ...formData,
      [name]: Array.from(selectedOptions, (option) => option.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    
    try {

      const finalData = {
        ...formData,
        author_ids: formData.authors,
        category_ids: formData.categories,
      };
 
      const response = await fetch(`${api}/books/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Failed to update book");
      }
 
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the book");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };


  if (error && !book) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Error
          </CardTitle>
          <CardDescription>Could not load book information</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCancel} className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const getAuthorNames = () => {
    if (!book || !book.author_ids || !authors.length) return "Unknown";
    
    return book.author_ids
      .map(id => {
        const author = authors.find(a => a.id.toString() === id.toString());
        return author ? author.name : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Edit className="h-5 w-5" /> Edit Book: {book?.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {["title", "isbn", "description", "price", "pages", "stock"].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              {field === "description" ? (
                <Textarea id={field} name={field} value={formData[field]} onChange={handleChange} rows={3} required />
              ) : (
                <Input id={field} name={field} type={field === "price" || field === "pages" || field === "stock" ? "number" : "text"} value={formData[field]} onChange={handleChange} required />
              )}
            </div>
          ))}

          {[{ id: "authors", options: authors }, { id: "categories", options: categories }].map(({ id, options }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</Label>
              <select id={id} name={id} multiple value={formData[id]} onChange={handleMultiSelect} className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                {options.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={isSaving}>
              {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditBookForm;