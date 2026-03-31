'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRegister } from '@/hooks/useAuth';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

function getPasswordStrength(password: string): { level: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 'Weak', color: '#EF4444' };
  if (score <= 3) return { level: 'Medium', color: '#F59E0B' };
  return { level: 'Strong', color: '#10B981' };
}

export function RegisterForm() {
  const registerMutation = useRegister();
  const [password, setPassword] = useState('');
  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData, {
      onSuccess: () => {
        alert('Check your email to verify your account');
      },
      onError: () => {
        alert('Email or username already taken');
      },
    });
  };

  const strength = password ? getPasswordStrength(password) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
        <input
          type="text"
          {...fieldRegister('username')}
          className="w-full px-4 py-2 bg-[#1F2630] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-150"
          placeholder="johndoe"
        />
        {errors.username && <p className="mt-1 text-sm text-[#EF4444]">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          {...fieldRegister('email')}
          className="w-full px-4 py-2 bg-[#1F2630] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-150"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-[#EF4444]">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          type="password"
          {...fieldRegister('password')}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-[#1F2630] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-150"
          placeholder="••••••••"
        />
        {errors.password && <p className="mt-1 text-sm text-[#EF4444]">{errors.password.message}</p>}
        {strength && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-[#30363D] rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-150"
                style={{
                  width: password.length >= 8 ? '100%' : '50%',
                  backgroundColor: strength.color,
                }}
              />
            </div>
            <span className="text-xs" style={{ color: strength.color }}>
              {strength.level}
            </span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
        <input
          type="password"
          {...fieldRegister('confirmPassword')}
          className="w-full px-4 py-2 bg-[#1F2630] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-150"
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-[#EF4444]">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full py-2 px-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {registerMutation.isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating account...
          </span>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  );
}