/**
 * Zaminat Backend API Client
 * 
 * This client provides a type-safe interface to communicate with the Zaminat backend API.
 * All requests are authenticated using JWT tokens stored in localStorage.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken');
    }
  }

  private setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  private clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle token refresh on 401
      if (response.status === 401 && this.token) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry original request
          headers['Authorization'] = `Bearer ${this.token}`;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });
          if (!retryResponse.ok) {
            throw new Error(`API Error: ${retryResponse.statusText}`);
          }
          return retryResponse.json();
        }
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `API Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refreshToken') 
      : null;

    if (!refreshToken) {
      this.clearToken();
      return false;
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setToken(data.accessToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    this.clearToken();
    return false;
  }

  // Authentication
  async register(data: {
    email?: string;
    phone?: string;
    password?: string;
    firstName: string;
    lastName: string;
    district?: string;
    school?: string;
    mahalla?: string;
  }) {
    const response = await this.request<ApiResponse<any>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.data?.accessToken) {
      this.setToken(response.data.accessToken);
      if (response.data.refreshToken && typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }

    return response;
  }

  async login(data: { email?: string; phone?: string; password?: string; otp?: string }) {
    const response = await this.request<ApiResponse<any>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.data?.accessToken) {
      this.setToken(response.data.accessToken);
      if (response.data.refreshToken && typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }

    return response;
  }

  async verifyOtp(phone: string, otp: string) {
    const response = await this.request<ApiResponse<any>>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    });

    if (response.data?.accessToken) {
      this.setToken(response.data.accessToken);
      if (response.data.refreshToken && typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  logout() {
    this.clearToken();
  }

  // Projects
  async getProjects(status?: string) {
    const query = status ? `?status=${status}` : '';
    return this.request<any[]>(`/projects${query}`);
  }

  async getProject(id: string) {
    return this.request<any>(`/projects/${id}`);
  }

  async voteForProject(projectId: string) {
    return this.request<any>(`/projects/${projectId}/vote`, {
      method: 'POST',
    });
  }

  async donateToProject(projectId: string, amount: number, currency: string) {
    return this.request<any>(`/projects/${projectId}/donate`, {
      method: 'POST',
      body: JSON.stringify({ amount, currency }),
    });
  }

  // Users
  async getUserProfile() {
    return this.request<any>('/users/me');
  }

  async updateUserProfile(data: any) {
    return this.request<any>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Events
  async getEvents(status?: string) {
    const query = status ? `?status=${status}` : '';
    return this.request<any[]>(`/events${query}`);
  }

  async getEvent(id: string) {
    return this.request<any>(`/events/${id}`);
  }

  async joinEvent(eventId: string) {
    return this.request<any>(`/events/${eventId}/join`, {
      method: 'POST',
    });
  }

  // Locations
  async getLocations(filters?: { type?: string; eventType?: string; district?: string }) {
    const query = new URLSearchParams(filters as any).toString();
    return this.request<any[]>(`/locations${query ? `?${query}` : ''}`);
  }

  async getLocation(id: string) {
    return this.request<any>(`/locations/${id}`);
  }

  async getNearbyLocations(lat: number, lng: number, radius?: number) {
    const query = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      ...(radius && { radius: radius.toString() }),
    }).toString();
    return this.request<any[]>(`/locations/nearby?${query}`);
  }

  // Shop
  async getProducts(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request<any[]>(`/shop/products${query}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/shop/products/${id}`);
  }

  // Stories
  async getStories(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request<any[]>(`/stories${query}`);
  }

  async getStory(id: string) {
    return this.request<any>(`/stories/${id}`);
  }

  // Leaderboard
  async getLeaderboard(period?: string, limit?: number) {
    const query = new URLSearchParams({
      ...(period && { period }),
      ...(limit && { limit: limit.toString() }),
    }).toString();
    return this.request<any[]>(`/leaderboard${query ? `?${query}` : ''}`);
  }

  // Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/upload/image`;
    const headers: HeadersInit = {};

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types
export type { ApiResponse };

