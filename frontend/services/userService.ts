import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface UserProfile {
  id: string;
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  website?: string;
  skills?: string[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
  isFollowing?: boolean;
  isOwnProfile?: boolean;
}

export const userService = {
  async getProfile(username: string): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>(`/api/v1/users/${username}`);
    return response.data;
  },

  async follow(username: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`/api/v1/users/${username}/follow`);
    return response.data;
  },

  async unfollow(username: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/api/v1/users/${username}/follow`);
    return response.data;
  },
};