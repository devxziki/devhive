interface ProfileHeaderProps {
  profile: {
    id: string;
    username: string;
    name?: string;
    bio?: string;
    avatarUrl?: string;
    skills?: string[];
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
    isFollowing?: boolean;
    isOwnProfile?: boolean;
  };
  isLoading?: boolean;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const isOwnProfile = profile.isOwnProfile;
  const isFollowing = profile.isFollowing;

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full p-1 bg-[#3B82F6]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0D1117]">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.username} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white">{profile.name || profile.username}</h1>
              <p className="text-gray-400">@{profile.username}</p>
            </div>

            {isOwnProfile ? (
              <button className="px-4 py-2 bg-[#1F2630] border border-[#30363D] rounded-lg text-white hover:bg-[#30363D] transition-colors duration-150">
                Edit Profile
              </button>
            ) : (
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
                  isFollowing
                    ? 'bg-transparent border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10'
                    : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          {profile.bio && <p className="mt-3 text-gray-300">{profile.bio}</p>}

          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#1F2630] border border-[#30363D] rounded-full text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex gap-1">
              <span className="font-bold text-white">{profile._count.posts}</span>
              <span className="text-gray-400">Posts</span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold text-white">{profile._count.followers}</span>
              <span className="text-gray-400">Followers</span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold text-white">{profile._count.following}</span>
              <span className="text-gray-400">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}