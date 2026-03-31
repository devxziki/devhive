import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatarUrl?: string;
}

export const authService = {
  async login(data: LoginData): Promise<{ user: User }> {
    const response = await apiClient.post<{ user: User }>('/api/v1/auth/login', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/api/v1/auth/register', data);
    return response.data;
  },

  async logout(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/api/v1/auth/logout');
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/api/v1/auth/me');
    return response.data;
  },
};