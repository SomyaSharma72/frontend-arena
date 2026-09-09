import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile, Project, Collaborator } from '../types';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from './EmptyState';
import { 
  Sparkles, 
  GitBranch, 
  Users, 
  Layers, 
  MessageSquare, 
  UserPlus, 
  UserCheck, 
  ArrowLeft,
  Share2,
  Calendar,
  Check
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onContinueProject?: (project: Project) => void;
  viewingCreator?: Collaborator | null;
  onBackToSelf?: () => void;
  followingUserIds: string[];
  onToggleFollow: (userId: string) => void;
  onOpenDirectChat?: (creator: Collaborator) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  projects = [],
  onSelectProject,
  onContinueProject,
  viewingCreator,
  onBackToSelf,
  followingUserIds = [],
  onToggleFollow,
  onOpenDirectChat,
}) => {
  const [activeTab, setActiveTab] = useState<'created' | 'contributed' | 'remixed' | 'collaborated'>('created');
  const [copiedShare, setCopiedShare] = useState(false);

  // Target user details (either currently viewed creator, or Adam)
  const isViewingOther = !!viewingCreator && viewingCreator.username !== user.username;
  
  const targetName = isViewingOther ? viewingCreator.name : user.name;
  const targetUsername = isViewingOther 
    ? (viewingCreator.username || viewingCreator.name.toLowerCase().replace(/\s+/g, '')) 
    : user.username;
  const targetAvatar = isViewingOther ? viewingCreator.avatar : user.avatar;
  const targetBio = isViewingOther 
    ? (viewingCreator.bio || `${viewingCreator.role || 'Creator'} weaving stories and audio stems on RELAY.`)
    : user.bio;
  
  const targetCreatorId = isViewingOther 
    ? (viewingCreator.id || `user-${targetUsername}`)
    : 'user-adam';
  
  const safeFollowing = followingUserIds || [];
  const isFollowing = safeFollowing.includes(targetCreatorId);

  const targetFollowersCount = isViewingOther 
    ? (viewingCreator.followersCount || 420) + (isFollowing ? 1 : 0)
    : user.followersCount;
  const targetFollowingCount = isViewingOther 
    ? (viewingCreator.followingCount || 180)
    : user.followingCount + Math.max(0, safeFollowing.length - 1);

  const safeProjects = projects || [];
  // Filter projects by target user
  const createdProjects = safeProjects.filter(
    (p) => p?.creator?.name?.toLowerCase() === targetName.toLowerCase()
  );
  const contributedProjects = safeProjects.filter(
    (p) =>
      p?.creator?.name?.toLowerCase() !== targetName.toLowerCase() &&
      ((p?.activeContributors || []).some((c) => c?.name?.toLowerCase() === targetName.toLowerCase()) ||
        ['proj-01', 'proj-02', 'proj-03', 'proj-06', 'proj-12', 'proj-18'].includes(p.id))
  );
  const remixedProjects = safeProjects.filter(
    (p) => !!p?.remixedFromTitle || (p?.remixesCount || 0) > 5
  ).slice(0, 8);
  const collaboratedProjects = safeProjects.filter(
    (p) => (p?.contributorsCount || 0) > 10 || (p?.branchesCount || 0) > 3
  ).slice(0, 8);

  const currentList = 
    activeTab === 'created'
      ? createdProjects
      : activeTab === 'contributed'
      ? contributedProjects
      : activeTab === 'remixed'
      ? remixedProjects
      : collaboratedProjects;

  const handleCopyProfile = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="w-full py-8 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back navigation if viewing someone else */}
        {isViewingOther && (
          <button
            onClick={onBackToSelf}
            className="flex items-center gap-2 text-xs font-mono-tech font-bold text-[#171717] hover:text-[#635BFF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to your profile</span>
          </button>
        )}

        {/* Social Media Profile Header Card */}
        <div className="bg-white border-2 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-sticker relative overflow-hidden">
          
          {/* Subtle Decorative Banner Accent */}
          <div className="h-24 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-gradient-to-r from-[#BFE3FF] via-[#FFE49A] to-[#FFC7B5] border-b-2 border-[#171717] opacity-80" />

          <div className="relative -mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[#171717]/10">
            
            {/* Avatar & Main Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img
                  src={targetAvatar}
                  alt={targetName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-3 border-[#171717] shadow-sticker bg-white"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C7EBDD] rounded-full border-2 border-[#171717]" />
              </div>

              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-[#171717] tracking-tight">
                  {targetName}
                </h1>
                <p className="text-xs sm:text-sm font-mono-tech text-[#171717]/60 mt-0.5">
                  @{targetUsername}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#171717]/50 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>Joined November 2025</span>
                </div>
              </div>
            </div>

            {/* Social Action Buttons */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              {isViewingOther ? (
                <>
                  <button
                    onClick={() => onToggleFollow(targetCreatorId)}
                    className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-mono-tech font-bold border-2 border-[#171717] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isFollowing
                        ? 'bg-[#C7EBDD] text-[#171717] shadow-sm'
                        : 'bg-[#635BFF] hover:bg-[#5249ea] text-white shadow-sticker-sm hover:shadow-sticker'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenDirectChat?.(viewingCreator!)}
                    className="px-4 py-2.5 bg-white hover:bg-[#FFE49A] text-[#171717] rounded-xl border-2 border-[#171717] text-xs font-mono-tech font-bold shadow-sticker-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCopyProfile}
                  className="px-4 py-2.5 bg-white hover:bg-[#FAF9F6] text-[#171717] rounded-xl border-2 border-[#171717] text-xs font-mono-tech font-bold shadow-sticker-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Profile</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Bio & Social Stats Bar */}
          <div className="pt-6 space-y-5">
            <p className="text-sm font-sans-clean text-[#171717] max-w-2xl leading-relaxed">
              {targetBio}
            </p>

            {/* Following & Followers (Visible, but not the only identity focus) */}
            <div className="flex items-center gap-6 text-xs font-mono-tech">
              <span className="text-[#171717]/80">
                <strong className="text-[#171717] font-bold font-display text-sm mr-1">
                  {targetFollowingCount}
                </strong>
                Following
              </span>
              <span className="text-[#171717]/80">
                <strong className="text-[#171717] font-bold font-display text-sm mr-1">
                  {targetFollowersCount}
                </strong>
                Followers
              </span>
            </div>

            {/* Four Concrete Collaborative Metrics from User Prompt */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 bg-[#FAF9F6] rounded-2xl border-2 border-[#171717] text-center shadow-sticker-sm">
                <span className="font-display font-black text-xl sm:text-2xl text-[#171717] block">
                  {createdProjects.length || 12}
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-[#171717]/60 uppercase tracking-wider">
                  Projects
                </span>
              </div>

              <div className="p-3.5 bg-[#FFE49A]/40 rounded-2xl border-2 border-[#171717] text-center shadow-sticker-sm">
                <span className="font-display font-black text-xl sm:text-2xl text-[#171717] block">
                  {user.contributionsCount || 47}
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-[#171717]/60 uppercase tracking-wider">
                  Contributions
                </span>
              </div>

              <div className="p-3.5 bg-[#BFE3FF]/40 rounded-2xl border-2 border-[#171717] text-center shadow-sticker-sm">
                <span className="font-display font-black text-xl sm:text-2xl text-[#171717] block">
                  {user.remixesCount || 19}
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-[#171717]/60 uppercase tracking-wider">
                  Remixes
                </span>
              </div>

              <div className="p-3.5 bg-[#C7EBDD]/40 rounded-2xl border-2 border-[#171717] text-center shadow-sticker-sm">
                <span className="font-display font-black text-xl sm:text-2xl text-[#171717] block">
                  {user.collaborationsCount || 23}
                </span>
                <span className="text-[11px] font-mono-tech font-bold text-[#171717]/60 uppercase tracking-wider">
                  Collaborations
                </span>
              </div>
            </div>

          </div>
        </div>

        {!isViewingOther && (
          <section className="bg-white border-2 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-sticker">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#6657E8]">Creative influence</p>
                <h2 className="font-serif-editorial text-3xl font-bold mt-1">Your Trail</h2>
              </div>
              <span className="text-[10px] font-mono-tech font-bold bg-[#FFE28A] border border-[#171717] rounded-full px-3 py-1.5">OPEN CHAIN</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              {[user, { name: 'Maya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop' }, { name: 'Rahul', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop' }, { name: 'Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop' }].map((person, index, chain) => (
                <React.Fragment key={person.name}>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-[#FAF9F6] border border-[#DDD9D0]">
                    <img src={person.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-[#171717]" referrerPolicy="no-referrer" />
                    <span className="text-xs font-display font-bold">{person.name}</span>
                  </div>
                  {index < chain.length - 1 && <span className="font-mono-tech text-[#6657E8]">-&gt;</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono-tech font-bold uppercase">
              <span className="px-3 py-1.5 rounded-full bg-[#FFE28A] border border-[#e4c95d]">Built on 17x</span>
              <span className="px-3 py-1.5 rounded-full bg-[#A9E3CF] border border-[#88cdb4]">Remixed 8x</span>
              <span className="px-3 py-1.5 rounded-full bg-[#FFB49F] border border-[#e69c88]">Passed to 4 people</span>
              <span className="px-3 py-1.5 rounded-full bg-[#8FD8FF] border border-[#72bfdc]">Inspired 3 branches</span>
            </div>
          </section>
        )}

        {/* Content Shelf Tabs */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-[#171717] pb-3 overflow-x-auto">
            {[
              { id: 'created', label: 'Created Seeds', count: createdProjects.length },
              { id: 'contributed', label: 'Contributed', count: contributedProjects.length },
              { id: 'remixed', label: 'Remixes', count: remixedProjects.length },
              { id: 'collaborated', label: 'Live Rooms', count: collaboratedProjects.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all cursor-pointer flex items-center gap-2 border-2 ${
                  activeTab === tab.id
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sticker-sm'
                    : 'bg-white hover:bg-[#FAF9F6] text-[#171717] border-[#171717]/20 hover:border-[#171717]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#FAF9F6] text-[#171717]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          {currentList.length === 0 ? (
            <EmptyState
              title="No seeds here yet"
              description="Pick any active project from Relay and pass it on."
              actionLabel="Discover Active Seeds"
              onAction={() => {}}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentList.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={onSelectProject}
                  onContinueQuick={() => onContinueProject?.(project)}
                  index={idx}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
