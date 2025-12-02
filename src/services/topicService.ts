import { authService, ApiError } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class TopicService {
  async getAllTopics() {
    const token = authService.getToken();
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 });
    }

    try {
      const response = await fetch(`${API_BASE_URL}/topics`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError({
          message: errorData.message || 'Failed to fetch topics',
          status: response.status,
        });
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 });
    }
  }
}

export const topicService = new TopicService();

