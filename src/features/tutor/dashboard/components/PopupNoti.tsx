import React from 'react'

interface ModalProps {
  show: boolean
  onClose: () => void
  title?: string
  message?: string
  icon?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title = 'Thành công!',
  message = 'Hoạt động được thực hiện thành công.',
  icon
}) => {
  if (!show) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50'>
      <div className='flex flex-col items-center justify-center bg-white py-10 rounded-2xl shadow-xl text-center w-120 gap-10'>
        {/* Icon được truyền vào */}
        <div className=''>{icon}</div>

        {/* Nội dung */}
        <h2 className='text-4xl font-bold text-black'>{title}</h2>
        <p className='text-gray-500 text-2xl -mb-5'>{message}</p>

        {/* Nút OK */}
        <button
          onClick={onClose}
          className='text-xl px-10 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-950 transition'
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default Modal
