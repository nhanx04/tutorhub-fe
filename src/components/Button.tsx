{
  /* 
  - ButtonProps:
    + icon?: Prop này là không bắt buộc (?), dùng để nhận một component icon (ví dụ từ thư viện react-icons).
    + variant?: Chọn kiểu button, 'solid' hoặc 'outline'. Mặc định là 'solid'.
    + colorScheme?: Chọn màu sắc, ví dụ 'blue', 'red'. Mặc định là 'blue'.
    + extends React.ButtonHTMLAttributes<HTMLButtonElement>: Giúp component Button của bạn có thể nhận tất cả các thuộc tính của một thẻ <button> HTML thông thường (như onClick, disabled, type...).
  - baseStyle: Chứa các class Tailwind chung cho mọi button (căn chỉnh, bo góc, font chữ...).
  - variantStyles: Đây là một object chứa các class Tailwind riêng cho từng variant và colorScheme. Logic này giúp chúng ta dễ dàng thay đổi giao diện của button.
  - {icon && React.cloneElement(icon, { className: "h-5 w-5" })}: Dòng này kiểm tra nếu có icon được truyền vào, nó sẽ render icon đó và tự động thêm class để điều chỉnh kích thước.
*/
}

import React from 'react'

// Định nghĩa các props mà component Button sẽ nhận
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: React.ReactNode // Thay đổi: Dùng React.ReactNode để linh hoạt hơn
  variant?: 'solid' | 'outline'
  colorScheme?: 'blue' | 'red' | 'green' // Có thể thêm các màu khác ở đây
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  variant = 'solid', // Giá trị mặc định là 'solid'
  colorScheme = 'blue', // Giá trị mặc định là 'blue'
  ...props // Các props khác của thẻ button như onClick, disabled, v.v.
}) => {
  // Định nghĩa style cơ bản cho tất cả các button
  const baseStyle =
    'flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  // Định nghĩa style cho từng variant
  const variantStyles = {
    solid: {
      blue: 'bg-blue-600 text-white hover:bg-blue-700',
      red: 'bg-red-600 text-white hover:bg-red-700',
      green: 'bg-green-500 text-white hover:bg-green-600'
    },
    outline: {
      blue: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
      red: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
      green: 'border-2 border-green-500 text-green-500 hover:bg-green-50'
    }
  }

  // Kết hợp các style lại với nhau
  const buttonStyle = `${baseStyle} ${variantStyles[variant][colorScheme]}`

  return (
    <button className={buttonStyle} {...props}>
      {/* SỬA LỖI: Bọc icon trong một thẻ span để style */}
      {icon && <span className='h-5 w-5'>{icon}</span>}
      {/* Render text của button */}
      <span>{children}</span>
    </button>
  )
}

export default Button
