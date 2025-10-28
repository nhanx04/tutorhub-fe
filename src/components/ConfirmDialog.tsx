import React from 'react'

// 1. Xóa import MainLayout không cần thiết
// import { MainLayout } from 'src/layouts'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: React.ReactNode
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null

  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-white/75'>
      <div className='w-full max-w-md rounded-lg border border-gray-400 bg-white p-8 shadow-xl'>
        <h2 className='text-2xl font-bold mb-4'>{title}</h2>
        <div className='mb-6 text-gray-700'>{children}</div>
        <div className='flex justify-end gap-4'>
          <button
            className='rounded-full border border-red-500 px-6 py-2 text-red-500 transition hover:bg-red-50 cursor-pointer'
            onClick={onClose}
          >
            No
          </button>
          <button
            className='rounded-full bg-green-500 px-6 py-2 text-white transition hover:bg-green-600 cursor-pointer'
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
