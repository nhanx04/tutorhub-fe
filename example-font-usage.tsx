// Ví dụ sử dụng 3 loại font Nunito
export function FontExample() {
  return (
    <div className="p-8 space-y-4">
      {/* Nunito Regular */}
      <p className="font-normal text-lg">
        Đây là text sử dụng Nunito Regular (font-weight: 400)
      </p>
      
      {/* Nunito Bold */}
      <h1 className="font-bold text-2xl">
        Đây là heading sử dụng Nunito Bold (font-weight: 700)
      </h1>
      
      {/* Nunito Italic */}
      <p className="italic text-lg">
        Đây là text sử dụng Nunito Italic (font-style: italic)
      </p>
      
      {/* Nunito Bold + Italic */}
      <p className="font-bold italic text-lg">
        Đây là text sử dụng Nunito Bold Italic
      </p>
      
      {/* Các font-weight khác với Tailwind */}
      <div className="space-y-2">
        <p className="font-light">Nunito Light (nếu có)</p>
        <p className="font-normal">Nunito Regular</p>
        <p className="font-medium">Nunito Medium (fallback to regular)</p>
        <p className="font-semibold">Nunito Semibold (fallback to bold)</p>
        <p className="font-bold">Nunito Bold</p>
        <p className="font-extrabold">Nunito Extra Bold (fallback to bold)</p>
      </div>
    </div>
  )
}
