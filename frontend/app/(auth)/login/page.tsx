'use client';

import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Welcome back</h1>
          <LoginForm />
          <p className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#3B82F6] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}