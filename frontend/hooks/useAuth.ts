import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService, type LoginData, type RegisterData, type User } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['user', data.user.id], data.user);
      router.push('/feed');
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
  });
}

export function useLogout() {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      router.push('/login');
    },
  });
}