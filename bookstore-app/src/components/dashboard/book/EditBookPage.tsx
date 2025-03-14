// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import EditBookForm from "@/components/dashboard/book/EditBookForm";
// import { toast } from "react-toastify";

// export default function EditBookClient({ params }) {
//   const router = useRouter();
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const storedToken = localStorage.getItem("access_token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const handleSuccess = () => {
//     toast.success("Book updated successfully");
//     router.push("/books");
//   };

//   const handleCancel = () => {
//     router.push("/books");
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">Edit Book</h1>

//       {token ? (
//         <EditBookForm
//           id={params.id} // Use `params.id` correctly
//           token={token}
//           onSuccess={handleSuccess}
//           onCancel={handleCancel}
//         />
//       ) : (
//         <p>Loading...</p> // Show loading while fetching token
//       )}
//     </div>
//   );
// }
