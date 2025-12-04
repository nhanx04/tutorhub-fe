/**
 * Date and Time Formatter Utilities
 * Ensures proper formatting for API requests
 */

/**
 * Format time string to ISO 8601 HH:MM:SS format
 * Handles various input formats:
 * - "7:00:00" -> "07:00:00"
 * - "7:00" -> "07:00:00"
 * - "07:00:00" -> "07:00:00"
 * - "7" -> "07:00:00"
 *
 * @param time - Time string in various formats
 * @returns Formatted time string in HH:MM:SS format
 */
export const formatTimeForAPI = (time: string): string => {
  if (!time) {
    return '00:00:00'
  }

  const parts = time.trim().split(':')

  let hours = '00'
  let minutes = '00'
  let seconds = '00'

  if (parts.length >= 1) {
    hours = parts[0].padStart(2, '0')
  }
  if (parts.length >= 2) {
    minutes = parts[1].padStart(2, '0')
  }
  if (parts.length >= 3) {
    seconds = parts[2].padStart(2, '0')
  }

  // Validate ranges
  const h = parseInt(hours, 10)
  const m = parseInt(minutes, 10)
  const s = parseInt(seconds, 10)

  if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
    console.warn(`Invalid time format: ${time}. Using 00:00:00`)
    return '00:00:00'
  }

  return `${hours}:${minutes}:${seconds}`
}

/**
 * Format date string to ISO 8601 YYYY-MM-DD format
 * Handles various input formats:
 * - "2025-12-10" -> "2025-12-10"
 * - "12/10/2025" -> "2025-12-10"
 * - "10-12-2025" -> "2025-12-10"
 *
 * @param date - Date string in various formats
 * @returns Formatted date string in YYYY-MM-DD format
 */
export const formatDateForAPI = (date: string): string => {
  if (!date) {
    return new Date().toISOString().split('T')[0]
  }

  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date
  }

  try {
    const parsedDate = new Date(date)

    if (isNaN(parsedDate.getTime())) {
      console.warn(`Invalid date format: ${date}. Using today's date`)
      return new Date().toISOString().split('T')[0]
    }

    // Return in YYYY-MM-DD format
    return parsedDate.toISOString().split('T')[0]
  } catch (error) {
    console.warn(`Error parsing date: ${date}. Using today's date`)
    return new Date().toISOString().split('T')[0]
  }
}

/**
 * Format consultation data for API request
 * Ensures all date/time fields are in correct format
 *
 * @param data - Consultation form data
 * @returns Formatted data ready for API
 */
export const formatConsultationDataForAPI = (data: {
  consultationDate?: string
  consultationTime?: string
  [key: string]: any
}) => {
  return {
    ...data,
    ...(data.consultationDate && { consultationDate: formatDateForAPI(data.consultationDate) }),
    ...(data.consultationTime && { consultationTime: formatTimeForAPI(data.consultationTime) })
  }
}

/**
 * Parse API response date/time strings to readable format
 *
 * @param date - Date string from API
 * @param time - Time string from API
 * @returns Formatted readable string
 */
export const formatDateTimeForDisplay = (date: string, time: string): string => {
  try {
    const dateObj = new Date(`${date}T${time}`)
    return dateObj.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch (error) {
    return `${date} ${time}`
  }
}

