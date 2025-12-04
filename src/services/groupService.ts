import { authService, ApiError } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

class GroupService {
  async getMyGroups() {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups/my-groups`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to fetch groups',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async getMyCreatedGroups() {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups/my-created-groups`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to fetch created groups',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async getGroupById(groupId: string) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups/${groupId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || `Failed to fetch group with id ${groupId}`,
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async createGroup(groupData: any) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to create group',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async updateGroup(groupId: string, groupData: any) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups/${groupId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to update group',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async deleteGroup(groupId: string) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to delete group',
          status: response.status
        })
      }

      // DELETE requests might not return a body, so we just check the status
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async getAllGroups() {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to fetch all groups',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async joinGroups(groupIds: number[]) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/groups/join`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ groupIds })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to join groups',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }
}

export const groupService = new GroupService()
