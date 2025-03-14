'use client'
import { useEffect, useState } from "react";
// import AddBook from "@/components/dashboard/book/AddBook";
import BookManagementPage from "@/components/dashboard/book/BookManagementPage";

export default function BookPage() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) setToken(storedToken);
  }, []);

  return <BookManagementPage token={token} onBookAdded={(newBook) => console.log(newBook)} />;
}
