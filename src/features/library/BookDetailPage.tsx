import { useLocation, useParams } from 'react-router'
import { BOOKS } from './mock-data/books'
import { getBookById } from './utils/getBookById'
import Card from './components/Card'
import BackLink from './components/BackLink'
import EmptyContent from './components/EmptyContent'
import { IconBook, IconUser } from './components/icons'
import { THEMES, type Variant } from './components/theme'

export const BookDetailPage = () => {
  const { id } = useParams()
  const location = useLocation() as any
  const book = getBookById(BOOKS, id)

  if (!book) {
    return (
      <div className='mx-auto max-w-[1200px] px-6 py-6 space-y-4'>
        <BackLink />
        <div className='rounded-xl border border-red-200 bg-red-50 p-6 text-red-700'>Không tìm thấy tài liệu.</div>
      </div>
    )
  }

  const variant = (location?.state?.color as Variant) ?? 'blue' // fallback
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
              <div className='mb-1 font-medium'>Mô tả:</div>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className='mb-4 text-base font-semibold text-gray-900'>Nội dung tài liệu</h3>
        <EmptyContent />
      </Card>
    </div>
  )
}
