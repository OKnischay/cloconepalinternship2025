"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import EditBookForm from "@/components/dashboard/book/EditBookForm";
import { toast } from "react-toastify";

export default function EditBookClient() {
  const router = useRouter();
  const params = useParams(); 
  const [token, setToken] = useState<string | null>(null);
  const [bookId, setBookId] = useState<string | null>(null);

  // Ensure token and params are set properly
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }

    if (params.id) {
      setBookId(params.id);
    }
  }, [params]);

  const handleSuccess = () => {
    toast.success("Book updated successfully");
    router.push("/books");
  };

  const handleCancel = () => {
    router.push("/dashboard/books");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>

      {token && bookId ? (
        <EditBookForm
          id={bookId} 
          token={token}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <p>Loading...</p> // Prevents rendering with undefined values
      )}
    </div>
  );
}
