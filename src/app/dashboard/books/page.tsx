import DisplayBook from "@/components/dashboard/book/DisplayBook"
const api = process.env.NEXT_PUBLIC_BASE_URL

const books = async () => {
  const fetchSomething = async () =>{
    const response = await fetch(`${api}/books/`)
    const data = response.json()
    return data;
  }
  const bookList = await fetchSomething()
  return (
  <div>
    <DisplayBook bookList={bookList} />
  </div>
  )
}

export default books