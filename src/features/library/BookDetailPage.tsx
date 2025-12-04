import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { libraryService } from 'src/services/libraryService'
import type { Book } from 'src/types/library'
import Card from './components/Card'
import BackLink from './components/BackLink'
import EmptyContent from './components/EmptyContent'
import { IconBook, IconUser } from './components/icons'
import { THEMES, type Variant } from './components/theme'

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          setLoading(true)
          const bookData = await libraryService.getBookById(id)
          setBook(bookData)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch book details.')
        } finally {
          setLoading(false)
        }
      }
      fetchBook()
    }
  }, [id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://mybk.hcmut.edu.vn/bookstore/product/${id}`)
    alert('Link copied to clipboard!')
  }

  if (loading) {
    return <div className='mx-auto max-w-[1200px] px-6 py-6'>Loading...</div>
  }

  if (error || !book) {
    return (
      <div className='mx-auto max-w-[1200px] px-6 py-6 space-y-4'>
        <BackLink />
        <div className='rounded-xl border border-red-200 bg-red-50 p-6 text-red-700'>
          {error || 'Không tìm thấy tài liệu.'}
        </div>
      </div>
    )
  }

  const variant: Variant = 'blue' // Default variant
  const t = THEMES[variant]

  return (
    <div className='mx-auto max-w-[1200px] px-6 py-6 space-y-6'>
      <BackLink />

      <Card tinted variant={variant}>
        <div className='flex items-start gap-4'>
          <span className='inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white'>
            <IconBook className={t.iconText} />
          </span>
          <div className='flex-1'>
            <h2 className='mb-1 text-xl font-semibold text-gray-900'>{book.title}</h2>
            <div className='mb-3 flex items-center gap-2 text-sm text-gray-700'>
              <IconUser className='text-gray-500' />
              <span>Tác giả: {book.author}</span>
            </div>
            <div className='text-sm text-gray-800'>
              <p>
                <strong>Price:</strong> {book.price.toLocaleString()} VND
              </p>
              <p>
                <strong>Amount:</strong> {book.amount}
              </p>
              <p>
                <strong>Year:</strong> {book.year}
              </p>
              <div className='mb-1 font-medium mt-2'>Mô tả:</div>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className='mb-4 text-base font-semibold text-gray-900'>Actions</h3>
        <button
          onClick={handleCopyLink}
          className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-white ${t.button} ${t.buttonHover} transition`}
        >
          Copy Link
        </button>
      </Card>

      <Card>
        <h3 className='mb-4 text-base font-semibold text-gray-900'>Nội dung tài liệu</h3>
        <EmptyContent />
      </Card>
    </div>
  )
}
