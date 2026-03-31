'use client';

import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Join DevHive</h1>
          <RegisterForm />
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#3B82F6] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}