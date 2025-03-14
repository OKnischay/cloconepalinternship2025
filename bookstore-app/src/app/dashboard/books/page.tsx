'use client'
import DisplayBook from "@/components/dashboard/book/DisplayBook"
import { fetchSomething } from "@/api/data"
import { useEffect, useState } from "react"
const books = () => {
  const [bookList, setBookList] = useState()

  const [token, setToken] = useState(localStorage.getItem('access_token') || '')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const books = await fetchSomething(token)
      setBookList(books)
      console.log(books)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <DisplayBook bookList={bookList} />
    </div>
  )
}

export default books