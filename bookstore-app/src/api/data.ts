
const api = process.env.NEXT_PUBLIC_BASE_URL

export const fetchSomething = async (token?: string) => {

  const response = await fetch(`${api}/books/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data;
}

// export const fetchSomething = async () => {
//   const token = localStorage.getItem("access_token"); 

//   if (!token) {
//     throw new Error("Unauthorized: No access token found");
//   }
// Verify token storage
//   const response = await fetch(`${api}/books/`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, 
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch books: ${response.statusText}`);
//   }

//   return response.json(); 
// };


export const fetchAuthors = async () => {
  const response = await fetch(`${api}/authors/`)
  const data = response.json()
  return data;
}

export const fetchCategories = async () => {
  const response = await fetch(`${api}/categories/`)
  const data = response.json()
  return data;
}

