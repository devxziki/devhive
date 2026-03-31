'use client';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    login.mutate(data, {
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          if (status === 401) {
            alert('Invalid credentials');
          } else if (status === 403) {
            alert('Please verify your email');
          }
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 bg-[#1F2630] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-150"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-[#EF4444]">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          type="password"
          {...register('password')}
          className="w-full px-4 py-2 bg-[#1F2630] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-150"
          placeholder="••••••••"
        />
        {errors.password && <p className="mt-1 text-sm text-[#EF4444]">{errors.password.message}</p>}
      </div>

      {login.isError && (
        <p className="text-sm text-[#EF4444]">
          {login.error instanceof Error ? login.error.message : 'Login failed'}
        </p>
      )}

      <button
        type="submit"
        disabled={login.isPending}
        className="w-full py-2 px-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {login.isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </span>
        ) : (
          'Sign in'
        )}
      </button>

      <button
        type="button"
        onClick={() => { window.location.href = 'http://localhost:5000/api/v1/auth/github'; }}
        className="w-full py-2 px-4 bg-[#24292F] hover:bg-[#1B1F23] text-white font-medium rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        Continue with GitHub
      </button>
    </form>
  );
}