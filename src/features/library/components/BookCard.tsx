import React from 'react'
import { THEMES, type Variant } from './theme'

export type BookCardProps = {
  id: string | number
  title: string
  author: string
  description: string
  onView?: () => void
  variant?: Variant
}

export default function BookCard({ title, author, description, onView, variant = 'blue' }: BookCardProps) {
  const t = THEMES[variant]

  return (
    <div className={`flex flex-col rounded-xl border ${t.cardBorder} ${t.cardBg} p-6 shadow-sm`}>
      <div className='flex-grow'>
        <span className='inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-4 w-4 ${t.iconText}`}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 6.75C3 5.784 3.784 5 4.75 5h9.5C15.216 5 16 5.784 16 6.75v11.5A1.75 1.75 0 0 1 14.25 20h-9.5A1.75 1.75 0 0 1 3 18.25V6.75Z'
            />
          </svg>
        </span>

        <h3 className='mt-3 text-base font-semibold text-gray-900'>{title}</h3>

        <div className='mt-1 flex items-center gap-2 text-sm text-gray-700'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 text-gray-500'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0'
            />
          </svg>
          <span>{author}</span>
        </div>

        <p className='mt-3 line-clamp-3 text-sm leading-6 text-gray-800'>{description}</p>
      </div>

      <button
        onClick={onView}
        className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium text-white ${t.button} ${t.buttonHover} transition`}
      >
        Xem chi tiết
      </button>
    </div>
  )
}
