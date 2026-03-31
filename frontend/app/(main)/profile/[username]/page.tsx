'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { userService } from '@/services/userService';
import { ProfileHeader } from '@/components/profile/ProfileHeader';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => userService.getProfile(username),
    enabled: !!username,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117] p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 animate-pulse">
            <div className="flex gap-6">
              <div className="w-24 h-24 rounded-full bg-[#30363D]" />
              <div className="flex-1 space-y-4">
                <div className="h-6 w-32 bg-[#30363D] rounded" />
                <div className="h-4 w-24 bg-[#30363D] rounded" />
                <div className="h-4 w-full bg-[#30363D] rounded" />
                <div className="flex gap-4">
                  <div className="h-4 w-16 bg-[#30363D] rounded" />
                  <div className="h-4 w-16 bg-[#30363D] rounded" />
                  <div className="h-4 w-16 bg-[#30363D] rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">User not found</h2>
          <p className="text-gray-400 mt-2">The profile you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <ProfileHeader profile={profile} />

        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Posts</h2>
          {profile._count.posts === 0 ? (
            <p className="text-gray-400">No posts yet.</p>
          ) : (
            <p className="text-gray-400">Posts will be displayed here.</p>
          )}
        </div>
      </div>
    </div>
  );
}