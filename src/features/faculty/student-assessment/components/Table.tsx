import React from 'react'

// Định nghĩa kiểu dữ liệu cho mỗi cột
export interface Column<T> {
  header: string // Tên cột hiển thị
  accessor?: keyof T // Key để truy cập dữ liệu trong mỗi hàng
  width?: string // Độ rộng của cột (ví dụ: '20%')
  // Hàm render tùy chỉnh cho ô, nhận vào toàn bộ object của hàng đó
  render?: (row: T) => React.ReactNode
  textAlign?: 'left' | 'center' | 'right'
}

// Định nghĩa props cho component Table
export interface TableProps<T> {
  columns: Column<T>[] // Mảng các cột
  data: T[] // Mảng dữ liệu cho các hàng
}

const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr className='bg-gray-100 border-b'>
            {columns.map((col, index) => (
              <th key={index} className='text-center py-3 px-4 font-semibold text-sm' style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='border-b hover:bg-gray-50'>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className='py-3 px-4 text-sm'>
                  {col.render
                    ? col.render(row)
                    : col.accessor
                    ? (row[col.accessor] as React.ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
