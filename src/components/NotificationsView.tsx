import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Sparkles, 
  GitBranch, 
  UserPlus, 
  MessageSquare, 
  Flame, 
  Award, 
  Check, 
  CheckCheck,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { ActivityNotification, Collaborator } from '../types';

interface NotificationsViewProps {
  notifications: ActivityNotification[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: ActivityNotification) => void;
  onSelectCreator: (creator: Collaborator) => void;
  followingUserIds: string[];
  onToggleFollow: (userId: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications = [],
  onMarkAllAsRead,
  onNotificationClick,
  onSelectCreator,
  followingUserIds = [],
  onToggleFollow,
}) => {
  const [filter, setFilter] = useState<'all' | 'collaborations' | 'mentions'>('all');

  const safeNotifications = notifications || [];
  const filteredNotifications = safeNotifications.filter((notif) => {
    if (!notif) return false;
    if (filter === 'all') return true;
    if (filter === 'collaborations') {
      return ['continue', 'branch', 'remix', 'join', 'milestone'].includes(notif.type);
    }
    if (filter === 'mentions') {
      return ['message', 'follow'].includes(notif.type);
    }
    return true;
  });

  const unreadCount = safeNotifications.filter((n) => n && !n.read).length;

  const getIconForType = (type: ActivityNotification['type']) => {
    switch (type) {
      case 'follow':
        return <UserPlus className="w-3.5 h-3.5 text-[#635BFF]" />;
      case 'continue':
        return <Sparkles className="w-3.5 h-3.5 text-[#635BFF]" />;
      case 'branch':
        return <GitBranch className="w-3.5 h-3.5 text-emerald-600" />;
      case 'remix':
        return <Flame className="w-3.5 h-3.5 text-amber-600" />;
      case 'message':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
      case 'milestone':
        return <Award className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#171717]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Container */}
      <div className="bg-white rounded-3xl border-2 border-[#171717] shadow-sticker p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171717]/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-black text-2xl text-[#171717] tracking-tight">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FFC7B5] border border-[#171717] text-xs font-mono-tech font-bold text-[#171717]">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-xs font-sans-clean text-[#171717]/65">
              Updates from people continuing your sparks and branching off your seeds.
            </p>
          </div>

          {/* Mark All as Read Button */}
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3.5 py-1.5 rounded-xl border border-[#171717] bg-[#FAF9F6] hover:bg-[#FFE49A] text-xs font-mono-tech font-bold text-[#171717] transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="pt-4 flex items-center gap-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'collaborations', label: 'Collaborations & Remixes' },
            { id: 'mentions', label: 'Mentions & Follows' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech font-bold transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'text-[#171717]/70 hover:bg-[#FAF9F6] border border-transparent hover:border-[#171717]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-[#171717] p-12 text-center shadow-sticker">
            <Bell className="w-8 h-8 text-[#171717]/40 mx-auto mb-2" />
            <h3 className="font-display font-bold text-base text-[#171717]">
              No notifications here
            </h3>
            <p className="text-xs font-sans-clean text-[#171717]/60 mt-1">
              When other creators build on your stories or follow your seeds, you’ll see them here.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const creatorId = notif.user.id || `user-${notif.user.name.toLowerCase().replace(/\s+/g, '')}`;
            const isFollowing = followingUserIds.includes(creatorId);

            return (
              <div
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`p-4 sm:p-5 rounded-2xl border-2 border-[#171717] transition-all cursor-pointer flex items-start sm:items-center justify-between gap-4 ${
                  notif.read
                    ? 'bg-white shadow-sticker-sm hover:shadow-sticker'
                    : 'bg-[#FFE49A]/30 border-[#171717] shadow-sticker'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* User Avatar with Type Badge */}
                  <div className="relative shrink-0">
                    <img
                      src={notif.user.avatar}
                      alt={notif.user.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#171717]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-[#171717] flex items-center justify-center shadow-sm">
                      {getIconForType(notif.type)}
                    </div>
                  </div>

                  {/* Text Description */}
                  <div>
                    <p className="text-xs sm:text-sm font-sans-clean text-[#171717] leading-snug">
                      <span className="font-bold font-display">{notif.user.name} </span>
                      {notif.text.replace(notif.user.name, '').trim()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono-tech text-[#171717]/50">
                        {notif.timestamp}
                      </span>
                      {notif.projectTitle && (
                        <>
                          <span className="text-[#171717]/30">·</span>
                          <span className="text-[10px] font-mono-tech font-bold text-[#635BFF]">
                            {notif.projectTitle}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right CTA */}
                <div className="shrink-0 flex items-center gap-2">
                  {notif.type === 'follow' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFollow(creatorId);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono-tech font-bold border border-[#171717] transition-all cursor-pointer flex items-center gap-1 ${
                        isFollowing
                          ? 'bg-[#C7EBDD] text-[#171717]'
                          : 'bg-[#FAF9F6] hover:bg-[#FFE49A] text-[#171717]'
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Follow Back</span>
                        </>
                      )}
                    </button>
                  ) : notif.type === 'message' ? (
                    <span className="px-3 py-1.5 rounded-xl border border-[#171717] bg-white text-xs font-mono-tech font-bold text-[#171717] hover:bg-[#FAF9F6] flex items-center gap-1">
                      <span>Reply</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl border border-[#171717] bg-white text-xs font-mono-tech font-bold text-[#171717] hover:bg-[#FAF9F6] flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}

                  {!notif.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#635BFF] shrink-0" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
