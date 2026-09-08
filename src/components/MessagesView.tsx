import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Send, 
  Sparkles, 
  Music, 
  Layers, 
  Users, 
  Radio, 
  ArrowLeft, 
  CheckCheck, 
  Smile, 
  Paperclip,
  ExternalLink
} from 'lucide-react';
import { Conversation, Message, Collaborator, UserProfile } from '../types';

interface MessagesViewProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  currentUser: UserProfile;
  onSelectCreator: (creator: Collaborator) => void;
  onSelectProjectById?: (projectId: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  currentUser,
  onSelectCreator,
  onSelectProjectById,
}) => {
  const [inputText, setInputText] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'direct' | 'project'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const safeConversations = conversations || [];
  const activeConv = safeConversations.find((c) => c.id === activeConversationId) || safeConversations[0];

  // Auto scroll to bottom when active conversation or messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages?.length, activeConversationId]);

  const handleSend = () => {
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = safeConversations.filter((c) => {
    if (!c) return false;
    if (filterType === 'direct' && c.type !== 'direct') return false;
    if (filterType === 'project' && c.type !== 'project') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = (c.recipient?.name || '').toLowerCase().includes(q);
      const matchTitle = (c.title || '').toLowerCase().includes(q) || (c.projectTitle || '').toLowerCase().includes(q);
      const matchLast = (c.lastMessage || '').toLowerCase().includes(q);
      if (!matchName && !matchTitle && !matchLast) return false;
    }
    return true;
  });

  const quickPrompts = [
    "Your branch was actually better than mine.",
    "Want to finish the soundtrack?",
    "I have an idea for the ending.",
    "I just added a new layer to your seed!",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Container with modern 2D border & soft shadow */}
      <div className="bg-white rounded-3xl border-2 border-[#171717] shadow-sticker overflow-hidden h-[78vh] min-h-[580px] grid grid-cols-1 md:grid-cols-12">
        
        {/* Left: Conversation List (4 cols on md) */}
        <aside className={`md:col-span-4 border-r border-[#171717]/10 flex flex-col h-full bg-[#FAF9F6] ${
          mobileShowChat ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-[#171717]/10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-black text-xl text-[#171717] tracking-tight">
                Messages
              </h2>
              <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded-full bg-[#C7EBDD] border border-[#171717]">
                LIVE COLLAB
              </span>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#171717]/20 rounded-xl pl-8 pr-3 py-2 text-xs font-sans-clean text-[#171717] placeholder-[#171717]/40 focus:outline-none focus:border-[#635BFF]"
              />
              <Search className="w-3.5 h-3.5 text-[#171717]/40 absolute left-2.5 top-2.5" />
            </div>

            {/* Tabs: All / Direct / Projects */}
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'direct', label: 'Direct' },
                { id: 'project', label: 'Project Rooms' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-tech font-bold transition-colors cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-[#171717] text-white shadow-sm'
                      : 'text-[#171717]/70 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              const isDirect = conv.type === 'direct';

              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    setMobileShowChat(true);
                  }}
                  className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 border ${
                    isActive
                      ? 'bg-white border-[#171717] shadow-sticker-sm'
                      : 'bg-transparent hover:bg-white/70 border-transparent'
                  }`}
                >
                  {/* Avatar / Room Icon */}
                  <div className="relative shrink-0">
                    {isDirect ? (
                      <>
                        <img
                          src={conv.recipient?.avatar}
                          alt={conv.recipient?.name}
                          className="w-11 h-11 rounded-full object-cover border border-[#171717]"
                          referrerPolicy="no-referrer"
                        />
                        {conv.recipient?.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </>
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-[#FFE49A] border border-[#171717] flex items-center justify-center text-[#171717] shadow-sm">
                        <Users className="w-5 h-5 text-[#171717]" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-display font-bold text-sm text-[#171717] truncate">
                        {isDirect ? conv.recipient?.name : conv.title || conv.projectTitle}
                      </h4>
                      <span className="text-[10px] font-mono-tech text-[#171717]/50 shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-xs font-sans-clean text-[#171717]/65 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#FFC7B5] border border-[#171717] text-[10px] font-mono-tech font-bold text-[#171717] flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right: Active Chat View (8 cols on md) */}
        <main className={`md:col-span-8 flex flex-col h-full bg-white ${
          !mobileShowChat ? 'hidden md:flex' : 'flex'
        }`}>
          {activeConv ? (
            <>
              {/* Chat Top Header */}
              <div className="p-4 border-b border-[#171717]/10 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setMobileShowChat(false)}
                    className="md:hidden p-1.5 rounded-xl border border-[#171717] text-[#171717]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="relative">
                    {activeConv.type === 'direct' ? (
                      <img
                        src={activeConv.recipient?.avatar}
                        alt={activeConv.recipient?.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#171717]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-[#BFE3FF] border border-[#171717] flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#171717]" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base text-[#171717]">
                        {activeConv.type === 'direct' ? activeConv.recipient?.name : activeConv.title}
                      </h3>
                      {activeConv.type === 'direct' && (
                        <span className="text-xs font-mono-tech text-[#171717]/50">
                          @{activeConv.recipient?.username}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono-tech text-[#171717]/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {activeConv.type === 'direct'
                        ? 'Active now · Open for collaborations'
                        : `${activeConv.participantsCount || 31} contributors talking in room`}
                    </span>
                  </div>
                </div>

                {/* Header Action: View profile or view project */}
                {activeConv.type === 'direct' && activeConv.recipient ? (
                  <button
                    onClick={() => onSelectCreator(activeConv.recipient!)}
                    className="px-3 py-1.5 rounded-xl border border-[#171717] bg-[#FAF9F6] hover:bg-[#FFE49A] text-xs font-mono-tech font-bold text-[#171717] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : (
                  activeConv.projectId && (
                    <button
                      onClick={() => onSelectProjectById?.(activeConv.projectId!)}
                      className="px-3 py-1.5 rounded-xl border border-[#171717] bg-[#FAF9F6] hover:bg-[#FFE49A] text-xs font-mono-tech font-bold text-[#171717] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Open Project</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )
                )}
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF9F6]/40">
                {/* Date separator */}
                <div className="text-center my-2">
                  <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#171717]/40 bg-white px-3 py-1 rounded-full border border-[#171717]/10">
                    Collaborative Chat
                  </span>
                </div>

                {activeConv.messages.map((msg) => {
                  const isMe = msg.isCurrentUser;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <img
                          src={msg.sender.avatar}
                          alt={msg.sender.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#171717] shrink-0 mt-1"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      <div className={`max-w-[75%] sm:max-w-[65%]`}>
                        {!isMe && (
                          <div className="text-[10px] font-mono-tech font-bold text-[#171717]/60 mb-0.5 ml-1">
                            {msg.sender.name}
                          </div>
                        )}

                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm font-sans-clean leading-relaxed border-2 ${
                            isMe
                              ? 'bg-[#635BFF] text-white border-[#171717] rounded-tr-none shadow-sticker-sm'
                              : 'bg-white text-[#171717] border-[#171717] rounded-tl-none shadow-sticker-sm'
                          }`}
                        >
                          <p>{msg.text}</p>

                          {/* Interactive Audio stem preview if attached */}
                          {msg.audioAttachment && (
                            <div className={`mt-2.5 p-2 rounded-xl border flex items-center gap-2 text-xs font-mono-tech ${
                              isMe ? 'bg-white/15 border-white/30 text-white' : 'bg-[#FAF9F6] border-[#171717]/20 text-[#171717]'
                            }`}>
                              <Music className="w-4 h-4 text-[#FFC7B5]" />
                              <span>🎵 Clarinet Stem (12s, 84 BPM)</span>
                            </div>
                          )}
                        </div>

                        <div className={`text-[9px] font-mono-tech text-[#171717]/40 mt-1 flex items-center gap-1 ${
                          isMe ? 'justify-end mr-1' : 'ml-1'
                        }`}>
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3 text-[#635BFF]" />}
                        </div>
                      </div>

                      {isMe && (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#171717] shrink-0 mt-1"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-4 py-2 bg-white border-t border-[#171717]/10 flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] font-mono-tech text-[#171717]/40 uppercase tracking-wider shrink-0 mr-1">
                  Suggestions:
                </span>
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInputText(prompt)}
                    className="px-2.5 py-1 rounded-full bg-[#FAF9F6] hover:bg-[#FFE49A] border border-[#171717]/20 text-[11px] font-mono-tech text-[#171717] shrink-0 transition-colors cursor-pointer"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>

              {/* Message Composer */}
              <div className="p-3 sm:p-4 bg-white border-t border-[#171717]/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Message ${
                      activeConv.type === 'direct' ? activeConv.recipient?.name : activeConv.title
                    }...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-[#FAF9F6] border-2 border-[#171717] rounded-2xl px-4 py-3 text-xs sm:text-sm font-sans-clean text-[#171717] placeholder-[#171717]/40 focus:outline-none focus:border-[#635BFF] focus:bg-white transition-all shadow-sticker-sm"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    data-cursor="action"
                    className="p-3 bg-[#635BFF] hover:bg-[#5249ea] disabled:opacity-40 disabled:hover:bg-[#635BFF] text-white rounded-2xl border-2 border-[#171717] shadow-sticker-sm hover:shadow-sticker transition-all cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#171717]/60">
              <p className="font-display text-base">Select a conversation to start chatting</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
