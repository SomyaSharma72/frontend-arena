import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Compass, 
  Plus, 
  MessageSquare, 
  Bell, 
  User, 
  Search, 
  X, 
  Sparkles, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { ActiveTab, Collaborator, UserProfile, ActivityNotification } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  onOpenCreate: () => void;
  notifications?: ActivityNotification[];
  unreadNotificationsCount?: number;
  unreadMessagesCount?: number;
  onSelectProject?: (projectId: string) => void;
  onSelectProjectById?: (projectId: string) => void;
  onSelectCreator?: (creator: Collaborator) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  user,
  searchQuery,
  setSearchQuery,
  onOpenCreate,
  notifications = [],
  unreadNotificationsCount,
  unreadMessagesCount = 0,
  onSelectProject,
  onSelectProjectById,
  onSelectCreator,
}) => {
  const [internalSearch, setInternalSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const currentSearch = searchQuery !== undefined ? searchQuery : internalSearch;
  const handleSearchChange = (val: string) => {
    if (setSearchQuery) {
      setSearchQuery(val);
    } else {
      setInternalSearch(val);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const safeNotifications = notifications || [];
  const unreadNotifsCount =
    typeof unreadNotificationsCount === 'number'
      ? unreadNotificationsCount
      : safeNotifications.filter((n) => !n.read).length;

  // Custom tab configurations with per-tab color accents
  const navItems = [
    { 
      id: 'home' as ActiveTab, 
      label: 'Home', 
      icon: Home,
      hoverClass: 'hover:bg-[#B8A7FF]/15 hover:text-[#6657E8]',
      activeBg: 'bg-[#6657E8]',
      accentColor: '#B8A7FF'
    },
    { 
      id: 'explore' as ActiveTab, 
      label: 'Explore', 
      icon: Compass,
      hoverClass: 'hover:bg-[#8FD8FF]/20 hover:text-[#0284C7]',
      activeBg: 'bg-[#0284C7]',
      accentColor: '#8FD8FF'
    },
    { 
      id: 'create' as ActiveTab, 
      label: 'Create', 
      icon: Plus,
      hoverClass: 'hover:bg-[#FFE28A]/40 hover:text-[#D97706]',
      activeBg: 'bg-[#D97706]',
      accentColor: '#FFE28A',
      isAction: true 
    },
    { 
      id: 'messages' as ActiveTab, 
      label: 'Messages', 
      icon: MessageSquare,
      hoverClass: 'hover:bg-[#FFB49F]/20 hover:text-[#E11D48]',
      activeBg: 'bg-[#E11D48]',
      accentColor: '#FFB49F',
      badge: unreadMessagesCount 
    },
    { 
      id: 'notifications' as ActiveTab, 
      label: 'Notifications', 
      icon: Bell,
      hoverClass: 'hover:bg-[#A9E3CF]/25 hover:text-[#0D9488]',
      activeBg: 'bg-[#0D9488]',
      accentColor: '#A9E3CF',
      badge: unreadNotifsCount 
    },
    { 
      id: 'profile' as ActiveTab, 
      label: 'Profile', 
      icon: User,
      hoverClass: 'hover:bg-[#B8A7FF]/15 hover:text-[#6657E8]',
      activeBg: 'bg-[#6657E8]',
      accentColor: '#B8A7FF',
      isAvatar: true 
    },
  ];

  const searchSuggestions = [
    { label: 'Cyberpunk Anthology', type: 'Story', color: '#B8A7FF' },
    { label: 'Ambient Synthscapes', type: 'Music', color: '#8FD8FF' },
    { label: 'Kinetic Poster Series', type: 'Visual', color: '#FF8D91' },
    { label: 'Solarpunk Micro-Habitats', type: 'Idea', color: '#FFE28A' },
  ];

  return (
    <>
      {/* Desktop Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#DDD9D0] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left Brand: RELAY */}
          <button
            onClick={() => {
              setActiveTab('home');
              handleSearchChange('');
            }}
            data-cursor="action"
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            {/* 2D Brand Icon */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFE28A] to-[#FFB49F] border border-[#DDD9D0] shadow-subtle flex items-center justify-center group-hover:-rotate-3 group-hover:scale-105 transition-all">
              <span className="font-display font-black text-[#181818] text-lg">R</span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#6657E8] rounded-full border border-white flex items-center justify-center text-[8px] text-white font-bold">
                ✦
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl tracking-tight font-black text-[#181818] block leading-none">
                  RELAY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9E3CF] border border-[#A9E3CF]" />
              </div>
              <span className="text-[9px] font-sans-clean font-bold uppercase tracking-widest text-[#77736D] block mt-0.5">
                START SOMETHING. PASS IT ON.
              </span>
            </div>
          </button>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white px-1.5 py-1 rounded-full border border-[#DDD9D0] shadow-subtle relative">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => {
                    if (tab.id === 'create') {
                      onOpenCreate();
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  data-cursor="action"
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans-clean font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 z-10 ${
                    isActive
                      ? 'text-white'
                      : `text-[#181818] ${tab.hoverClass}`
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className={`absolute inset-0 rounded-full ${tab.activeBg} -z-10 shadow-sm`}
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  )}
                  <div className="relative flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${tab.id === 'create' ? 'stroke-[2.5]' : ''}`} />
                    {typeof tab.badge === 'number' && tab.badge > 0 && (
                      <span className="absolute -top-1 -right-2 px-1 min-w-3.5 h-3.5 bg-[#FF8D91] text-white text-[9px] font-sans-clean font-black rounded-full flex items-center justify-center leading-none shadow-xs">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Area: Search & Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Search Input Bar (Desktop) with soft colorful glow */}
            <div ref={searchRef} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search sparks, creators..."
                value={currentSearch}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={`bg-white border border-[#DDD9D0] rounded-full pl-8 pr-7 py-1.5 text-xs font-sans-clean text-[#181818] placeholder-[#77736D]/60 focus:outline-none focus:ring-2 focus:ring-[#B8A7FF]/50 focus:border-[#6657E8] transition-all duration-200 shadow-subtle ${
                  isSearchFocused || currentSearch ? 'w-64 border-[#6657E8]' : 'w-48 xl:w-54'
                }`}
              />
              <Search className="w-3.5 h-3.5 text-[#77736D] absolute left-2.5 pointer-events-none" />
              {currentSearch && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-2.5 text-[#77736D] hover:text-[#181818] p-0.5 rounded-full hover:bg-[#F8F6F0]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Quick Search Dropdown Preview */}
              <AnimatePresence>
                {isSearchFocused && !currentSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#DDD9D0] rounded-xl shadow-card-hover p-2.5 z-50 min-w-[260px]"
                  >
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#DDD9D0]/60">
                      <span className="text-[10px] font-sans-clean font-bold uppercase tracking-wider text-[#77736D] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#6657E8]" />
                        Trending Sparks
                      </span>
                    </div>
                    <div className="space-y-1">
                      {searchSuggestions.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            handleSearchChange(item.label);
                            setIsSearchFocused(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-sans-clean text-[#181818] hover:bg-[#F8F6F0] flex items-center justify-between group cursor-pointer transition-colors"
                        >
                          <span className="group-hover:text-[#6657E8] font-medium transition-colors">
                            {item.label}
                          </span>
                          <span 
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-current"
                            style={{ color: item.color }}
                          >
                            {item.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Action: Start Button with modern hover interaction */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              id="header-start-btn"
              onClick={onOpenCreate}
              data-cursor="action"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#6657E8] hover:bg-[#5848DF] text-white text-xs font-sans-clean font-bold rounded-xl shadow-subtle hover:shadow-card-purple transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>START</span>
            </motion.button>

            {/* Profile Avatar Quick Jump */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="header-profile-avatar"
              onClick={() => setActiveTab('profile')}
              data-cursor="action"
              className={`p-0.5 rounded-full border transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-[#6657E8] ring-2 ring-[#B8A7FF]/40 shadow-subtle'
                  : 'border-[#DDD9D0] hover:border-[#6657E8]'
              }`}
              title="Your Profile"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.button>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Familiar Social App Layout) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#DDD9D0] px-2 py-1.5 shadow-card-hover safe-bottom">
        <div className="flex items-center justify-around">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'create') {
                    onOpenCreate();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`relative p-2 rounded-xl flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                  isActive ? 'text-[#6657E8] font-bold' : 'text-[#77736D] hover:text-[#181818]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${tab.id === 'create' ? 'stroke-[2.5]' : ''}`} />
                  {typeof tab.badge === 'number' && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2 px-1 min-w-3.5 h-3.5 bg-[#FF8D91] text-white text-[8px] font-sans-clean font-bold rounded-full flex items-center justify-center shadow-xs">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-sans-clean mt-0.5">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-dot"
                    className="w-1 h-1 rounded-full bg-[#6657E8] mt-0.5"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
