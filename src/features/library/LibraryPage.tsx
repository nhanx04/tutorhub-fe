import SearchInput from './components/SearchInput'
import BookGrid from './components/BookGrid'
import { useEffect, useState } from 'react'
import { libraryService } from 'src/services/libraryService'
import { useBooks } from 'src/hooks/library/useBooks' // <-- hook dùng chung
import type { Book } from 'src/types/library'
import { useNavigate } from 'react-router'
import { MainLayout } from 'src/layouts'

export const LibraryPage = () => {
  const [books, setBooks] = useState<Book[]>([])
  const { query, setQuery, filtered } = useBooks(books)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await libraryService.getBooks()
      setBooks(booksData)
    }
    fetchBooks()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleView = (book: any) => {
    navigate(`/library/${book.id}`, { state: { color: book.color } })
  }

  return (
    <MainLayout>
      <div className='mx-auto max-w-[1200px] px-6 py-6'>
        <div className='mb-4'>
          <h1 className='text-xl font-semibold text-gray-900'>Library</h1>
        </div>

        <SearchInput value={query} onChange={handleChange} aria-label='Search books' />

        <BookGrid books={filtered} onView={handleView} />
      </div>
    </MainLayout>
  )
}
