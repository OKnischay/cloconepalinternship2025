"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, BookPlus, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Author, Category, BookFormData} from "@/types"


interface AddBookFormProps {
  onSubmit: (data: BookFormData) => Promise<void>;
  onSuccess?: (data: any) => void;
  initialData?: Partial<BookFormData>;
  authors: Author[];
  categories: Category[];
  isLoading?: boolean;
  error?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  submitLabel?: string;
}

const defaultFormData: BookFormData = {
  title: "",
  isbn: "",
  description: "",
  price: "",
  pages: "",
  stock: "",
  authors: [],
  categories: [],
};

const AddBookForm: React.FC<AddBookFormProps> = ({
  onSubmit,
  onSuccess,
  initialData = {},
  authors = [],
  categories = [],
  isLoading = true,
  error = "",
  icon = <BookPlus className="h-5 w-5" />,
  title = "Add New Book",
  description = "Enter the details of the book you want to add to the inventory",
  submitLabel = "Add Book",
}) => {
  const [formData, setFormData] = useState<BookFormData>({ ...defaultFormData, ...initialData });
  const [formError, setFormError] = useState(error);

  // Update form error when prop changes
  useEffect(() => {
    setFormError(error);
  }, [error]);

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
    setFormError("");
    
    try {
      await onSubmit(formData);
      if (onSuccess) onSuccess(formData);
      // Don't reset form data here - leave it to the parent component to decide
    } catch (err: any) {
      setFormError(err.message || "An error occurred");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pages">Pages</Label>
              <Input id="pages" name="pages" type="number" value={formData.pages} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authors">Authors</Label>
            <select
              id="authors"
              name="authors"
              multiple
              value={formData.authors}
              onChange={handleMultiSelect}
              className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-primary/50 focus:border-primary"
              required
            >
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">Hold Ctrl/Cmd to select multiple authors</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <select
              id="categories"
              name="categories"
              multiple
              value={formData.categories}
              onChange={handleMultiSelect}
              className="w-full p-2 border rounded min-h-[80px] focus:ring-2 focus:ring-primary/50 focus:border-primary"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">Hold Ctrl/Cmd to select multiple categories</p>
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBookForm;