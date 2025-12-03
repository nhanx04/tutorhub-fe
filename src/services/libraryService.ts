import type { Book } from 'src/types/library/book'

const API_URL = 'https://mybk.hcmut.edu.vn/api/public/thu-vien/danh-muc-sach/giao-trinh/12/1/name/v1?null'

// Helper to transform API data into our Book type
const transformApiDataToBook = (apiBook: any): Book => ({
  id: apiBook.id,
  title: apiBook.name, // Map 'name' to 'title'
  author: apiBook.author,
  description: apiBook.description,
  price: apiBook.price,
  amount: apiBook.amount,
  year: apiBook.year,
  imagesrc: apiBook.imagesrc,
  category: apiBook.category,
  tag: apiBook.tag,
  score: apiBook.score
})

export const libraryService = {
  async getBooks(): Promise<Book[]> {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      if (result.code !== '200' || !Array.isArray(result.data)) {
        throw new Error('Invalid API response format')
      }
      return result.data.map(transformApiDataToBook)
    } catch (error) {
      console.error('Failed to fetch books:', error)
      return []
    }
  },

  async getBookById(id: string): Promise<Book | null> {
    try {
      const response = await fetch(`https://mybk.hcmut.edu.vn/api/public/thu-vien/thong-tin-sach/${id}/v1?null`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      if (result.code !== '200' || !result.data) {
        throw new Error('Invalid API response format')
      }
      return transformApiDataToBook(result.data)
    } catch (error) {
      console.error(`Failed to fetch book with id ${id}:`, error)
      return null
    }
  }
}
