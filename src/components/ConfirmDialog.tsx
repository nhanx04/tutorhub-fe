import React from 'react'

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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-xl'>
        <h2 className='text-2xl font-bold mb-4'>{title}</h2>
        <p className='mb-6 text-gray-700'>{children}</p>
        <div className='flex justify-end gap-4'>
          <button
            className='rounded-full border border-red-500 px-6 py-2 text-red-500 transition hover:bg-red-50'
            onClick={onClose}
          >
            No
          </button>
          <button
            className='rounded-full border border-red-500 px-6 py-2 text-red-500 transition hover:bg-red-50'
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
