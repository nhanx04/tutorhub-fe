import React, { useEffect } from 'react'
import type { ModalProps } from 'src/types'

const Modal: React.FC<ModalProps> = ({
  show,
  onClick,
  title = 'Thành công!',
  message = 'Hoạt động được thực hiện thành công.',
  icon
}) => {
  //chặn cuộn & tương tác với phần nền
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden' //chặn scroll
      document.body.style.pointerEvents = 'none' //chặn click toàn trang
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.pointerEvents = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.pointerEvents = 'auto'
    }
  }, [show])

  if (!show) return null

  return (
    <div
      className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center'
      style={{ pointerEvents: 'auto' }} //khôi phục tương tác cho chính modal
    >
      <div
        className='flex flex-col items-center justify-center bg-white py-10 px-8 rounded-2xl shadow-xl text-center w-120 gap-10'
        onClick={(e) => e.stopPropagation()} //chặn click lan ra ngoài
      >
        {/* icon */}
        <div>{icon}</div>

        {/* nội dung */}
        <h2 className='text-4xl font-bold text-black'>{title}</h2>
        <p className='text-gray-500 text-2xl -mb-5'>{message}</p>

        {/* nút OK */}
        <button
          onClick={() => {
            document.body.style.pointerEvents = 'auto' //bật lại tương tác
            onClick()
          }}
          className='text-xl px-10 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-950 transition'
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default Modal
