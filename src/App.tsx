import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Project, 
  ActiveTab, 
  ContributionNode, 
  Collaborator, 
  ActivityNotification,
  Conversation,
  Message,
  UserProfile
} from './types';
import { INITIAL_PROJECTS, CURRENT_USER } from './data/mockProjects';
import { INITIAL_TREES, getTreeForProject } from './data/mockTrees';
import { 
  INITIAL_CONVERSATIONS, 
  INITIAL_SOCIAL_NOTIFICATIONS, 
  SOCIAL_USERS 
} from './data/mockSocial';

import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { SocialFeed } from './components/SocialFeed';
import { ExploreView } from './components/ExploreView';
import { MessagesView } from './components/MessagesView';
import { NotificationsView } from './components/NotificationsView';
import { CreateProjectView } from './components/CreateProjectView';
import { ProfileView } from './components/ProfileView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContributionModal } from './components/ContributionModal';
import { BackgroundIllustrations } from './components/BackgroundIllustrations';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [trees, setTrees] = useState<Record<string, ContributionNode[]>>(INITIAL_TREES);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Current user (Adam)
  const [user, setUser] = useState<UserProfile>({
    ...CURRENT_USER,
    name: 'Adam',
    username: 'adam',
    bio: 'Starting open seeds and passing the baton. Open for branches, audio stems, and unexpected collaborative spin-offs.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop',
    followersCount: 629,
    followingCount: 184,
    projectsCount: 12,
    contributionsCount: 47,
    remixesCount: 19,
    collaborationsCount: 23,
  });

  // Social states
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-maya');
  const [notifications, setNotifications] = useState<ActivityNotification[]>(INITIAL_SOCIAL_NOTIFICATIONS);
  const [followingUserIds, setFollowingUserIds] = useState<string[]>([
    'user-maya',
    'user-rahul',
    'user-aditi',
  ]);
  const [viewingCreator, setViewingCreator] = useState<Collaborator | null>(null);

  // Contribution modal state
  const [isContributionModalOpen, setIsContributionModalOpen] = useState<boolean>(false);
  const [contributionTargetNode, setContributionTargetNode] = useState<ContributionNode | null>(null);
  const [contributionMode, setContributionMode] = useState<'continue' | 'branch' | 'remix'>('continue');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Follow / Unfollow toggle
  const handleToggleFollow = (userId: string) => {
    setFollowingUserIds((prev) => {
      const isAlreadyFollowing = prev.includes(userId);
      if (isAlreadyFollowing) {
        showToast('Unfollowed creator');
        return prev.filter((id) => id !== userId);
      } else {
        showToast('Now following creator! You will see their branches in your feed.');
        return [...prev, userId];
      }
    });
  };

  // Open project detail
  const handleSelectProject = (project: Project) => {
    if (!trees[project.id]) {
      const generatedTree = getTreeForProject(project.id, project.title, project.currentPiece);
      setTrees((prev) => ({ ...prev, [project.id]: generatedTree }));
    }
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open by project ID (e.g. from notification or message link)
  const handleSelectProjectById = (projectId: string) => {
    const found = projects.find((p) => p.id === projectId);
    if (found) {
      handleSelectProject(found);
    }
  };

  // Direct quick continue / build on this from card or feed
  const handleContinueProject = (project: Project) => {
    handleSelectProject(project);
    const projectTree = trees[project.id] || getTreeForProject(project.id, project.title, project.currentPiece);
    const lastNode = projectTree[projectTree.length - 1];
    handleOpenContribution(lastNode, 'continue');
  };

  // Quick remix from card
  const handleRemixProject = (project: Project) => {
    handleSelectProject(project);
    const projectTree = trees[project.id] || getTreeForProject(project.id, project.title, project.currentPiece);
    const lastNode = projectTree[projectTree.length - 1];
    handleOpenContribution(lastNode, 'remix');
  };

  // Handle new project creation from "Start something."
  const handleCreateProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);

    // Initialize root node in tree
    const rootNode: ContributionNode = {
      id: `node-${newProject.id}-root`,
      projectId: newProject.id,
      parentId: null,
      author: newProject.creator,
      content: newProject.currentPiece,
      type: 'root',
      branchName: 'Initial Seed',
      timestamp: 'Just now',
      depth: 0,
      childrenIds: []
    };

    setTrees((prev) => ({
      ...prev,
      [newProject.id]: [rootNode]
    }));

    // Increment user creations count
    setUser((prev) => ({
      ...prev,
      projectsCount: prev.projectsCount + 1,
      creationsCount: prev.creationsCount + 1,
    }));

    setActiveTab('home');
    showToast(`🌱 SEED "${newProject.title}" IS LIVE ON RELAY!`);
  };

  // Open contribution modal
  const handleOpenContribution = (
    node?: ContributionNode,
    mode: 'continue' | 'branch' | 'remix' = 'continue'
  ) => {
    setContributionTargetNode(node || null);
    setContributionMode(mode);
    setIsContributionModalOpen(true);
  };

  // Handle submission of a new contribution node
  const handleSubmitContribution = (
    content: string,
    type: 'continue' | 'branch' | 'remix',
    branchLabel: string
  ) => {
    if (!selectedProject) return;

    const projectId = selectedProject.id;
    const projectTree = trees[projectId] || getTreeForProject(projectId, selectedProject.title, selectedProject.currentPiece);
    const parentNode = contributionTargetNode || projectTree[projectTree.length - 1];

    const newNodeId = `node-${Date.now()}`;
    const newNode: ContributionNode = {
      id: newNodeId,
      projectId,
      parentId: parentNode ? parentNode.id : null,
      author: {
        name: user.name,
        avatar: user.avatar,
        role: 'Collaborator',
        username: user.username,
      },
      content,
      type,
      branchName: branchLabel || (type === 'branch' ? 'New Branch' : type === 'remix' ? 'Remix Layer' : 'Continuation'),
      timestamp: 'Just now',
      depth: parentNode ? (parentNode.depth || 0) + 1 : 1,
      childrenIds: []
    };

    // Update tree
    const updatedTree = [...projectTree, newNode];
    setTrees((prev) => ({
      ...prev,
      [projectId]: updatedTree
    }));

    // Update project stats
    const updatedProject: Project = {
      ...selectedProject,
      currentPiece: content,
      contributionsCount: selectedProject.contributionsCount + 1,
      branchesCount: type === 'branch' ? selectedProject.branchesCount + 1 : selectedProject.branchesCount,
      remixesCount: type === 'remix' ? selectedProject.remixesCount + 1 : selectedProject.remixesCount,
      recentActivity: `${user.name} added a piece just now`,
      liveNow: true,
      activeContributors: [
        { name: user.name, avatar: user.avatar, username: user.username },
        ...(selectedProject.activeContributors || []).filter((c) => c.name !== user.name)
      ]
    };

    setSelectedProject(updatedProject);
    setProjects((prev) => prev.map((p) => (p.id === projectId ? updatedProject : p)));

    // Increment user metrics
    setUser((prev) => ({
      ...prev,
      contributionsCount: prev.contributionsCount + 1,
      collaborationsCount: prev.collaborationsCount + 1,
      remixesCount: type === 'remix' ? prev.remixesCount + 1 : prev.remixesCount,
    }));

    showToast(`✨ YOUR PIECE WAS WOVEN INTO "${selectedProject.title}"!`);
  };

  // View creator profile
  const handleSelectCreator = (creator: Collaborator) => {
    setViewingCreator(creator);
    setActiveTab('profile');
    if (selectedProject) setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to own profile
  const handleBackToSelf = () => {
    setViewingCreator(null);
  };

  // Send message in Messages tab
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user-adam',
      sender: {
        id: 'user-adam',
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
      text,
      timestamp: 'Just now',
      isCurrentUser: true,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );

    // Simulated conversational partner response after a slight delay
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId && conv.type === 'direct' && conv.recipient) {
            const partnerResponses: Record<string, string[]> = {
              'maya_lin': [
                "That works so well! I'm bouncing the clarinet stem now.",
                "Love how you connected that. Want me to layer the chorus?",
              ],
              'rahulsen': [
                "Brilliant angle. Let me branch off that right away.",
                "Yes! Exactly what the worldbuilding needed.",
              ],
              'aditi_rao': [
                "Reading this gave me chills. The ending has to reflect that.",
                "Passing the next chapter to you tonight!",
              ],
            };
            const possible = partnerResponses[conv.recipient.username || ''] || [
              "Awesome addition! Let's keep passing it on.",
            ];
            const replyText = possible[Math.floor(Math.random() * possible.length)];

            return {
              ...conv,
              lastMessage: replyText,
              lastMessageTime: 'Just now',
              messages: [
                ...conv.messages,
                {
                  id: `msg-${Date.now() + 1}`,
                  senderId: conv.recipient.id || `user-${conv.recipient.username}`,
                  sender: conv.recipient,
                  text: replyText,
                  timestamp: 'Just now',
                  isCurrentUser: false,
                },
              ],
            };
          }
          return conv;
        })
      );
    }, 1800);
  };

  // Open direct chat with creator
  const handleOpenDirectChat = (creator: Collaborator) => {
    const existing = conversations.find(
      (c) => c.type === 'direct' && c.recipient?.username === creator.username
    );

    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConvId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: newConvId,
        type: 'direct',
        recipient: creator,
        lastMessage: 'Started a collaboration chat.',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: creator.id || `user-${creator.username}`,
            sender: creator,
            text: `Hey Adam! Excited to collaborate on RELAY.`,
            timestamp: 'Just now',
            isCurrentUser: false,
          },
        ],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConvId);
    }

    setActiveTab('messages');
    if (selectedProject) setSelectedProject(null);
  };

  // Open project room chat
  const handleOpenProjectChat = (project: Project) => {
    const existing = conversations.find(
      (c) => c.type === 'project' && c.projectId === project.id
    );

    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConvId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: newConvId,
        type: 'project',
        title: project.title,
        projectId: project.id,
        projectTitle: project.title,
        participantsCount: project.contributorsCount,
        lastMessage: `${user.name} joined the project room.`,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: project.creator.id || `user-${project.creator.username}`,
            sender: project.creator,
            text: `Welcome to the collaboration room for "${project.title}"! Drop stems or branch ideas here.`,
            timestamp: 'Earlier today',
            isCurrentUser: false,
          },
        ],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConvId);
    }

    setActiveTab('messages');
    if (selectedProject) setSelectedProject(null);
  };

  // Handle clicking a notification
  const handleNotificationClick = (notification: ActivityNotification) => {
    // Mark clicked as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );

    if (notification.type === 'message') {
      setActiveTab('messages');
      if (notification.user.username) {
        const conv = conversations.find((c) => c.recipient?.username === notification.user.username);
        if (conv) setActiveConversationId(conv.id);
      }
    } else if (notification.type === 'follow') {
      handleSelectCreator(notification.user);
    } else if (notification.projectId) {
      handleSelectProjectById(notification.projectId);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] font-sans-clean relative selection:bg-[#FFE49A] selection:text-[#171717]">
      {/* Art-Directed Custom Cursor */}
      <CustomCursor />

      {/* Modern Social Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'profile') setViewingCreator(null);
          if (selectedProject) setSelectedProject(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        notifications={notifications}
        unreadNotificationsCount={(notifications || []).filter((n) => !n.read).length}
        unreadMessagesCount={(conversations || []).reduce((acc, c) => acc + (c.unreadCount || 0), 0)}
        onOpenCreate={() => {
          setActiveTab('create');
          if (selectedProject) setSelectedProject(null);
        }}
        onSelectProjectById={handleSelectProjectById}
        onSelectCreator={handleSelectCreator}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#FFE49A] border-2 border-[#171717] text-[#171717] px-5 py-2.5 rounded-full shadow-sticker-lg flex items-center gap-2.5 text-xs font-mono-tech font-bold uppercase tracking-wider"
          >
            <Check className="w-4 h-4 text-[#171717]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Social Views */}
      <main className="relative z-10 pb-20 md:pb-12">
        <BackgroundIllustrations variant="ambient" />
        {activeTab === 'home' && (
          <SocialFeed
            projects={projects}
            currentUser={user}
            followingUserIds={followingUserIds}
            onToggleFollow={handleToggleFollow}
            onSelectProject={handleSelectProject}
            onContinueProject={handleContinueProject}
            onRemixProject={handleRemixProject}
            onOpenProjectChat={handleOpenProjectChat}
            onSelectCreator={handleSelectCreator}
            onOpenCreate={() => setActiveTab('create')}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreView
            projects={projects}
            onSelectProject={handleSelectProject}
            onContinueProject={handleContinueProject}
            onSelectCreator={handleSelectCreator}
            followingUserIds={followingUserIds}
            onToggleFollow={handleToggleFollow}
            onOpenCreate={() => setActiveTab('create')}
          />
        )}

        {activeTab === 'messages' && (
          <MessagesView
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => {
              setActiveConversationId(id);
              // Mark unread as 0
              setConversations((prev) =>
                prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
              );
            }}
            onSendMessage={handleSendMessage}
            currentUser={user}
            onSelectCreator={handleSelectCreator}
            onSelectProjectById={handleSelectProjectById}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkAllAsRead={() => {
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
              showToast('All notifications marked as read');
            }}
            onNotificationClick={handleNotificationClick}
            onSelectCreator={handleSelectCreator}
            followingUserIds={followingUserIds}
            onToggleFollow={handleToggleFollow}
          />
        )}

        {activeTab === 'create' && (
          <CreateProjectView
            currentUser={{
              name: user.name,
              avatar: user.avatar,
              role: 'Initiator',
              username: user.username,
            }}
            onCreateProject={handleCreateProject}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            projects={projects}
            onSelectProject={handleSelectProject}
            onContinueProject={handleContinueProject}
            viewingCreator={viewingCreator}
            onBackToSelf={handleBackToSelf}
            followingUserIds={followingUserIds}
            onToggleFollow={handleToggleFollow}
            onOpenDirectChat={handleOpenDirectChat}
          />
        )}
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            treeNodes={
              trees[selectedProject.id] ||
              getTreeForProject(selectedProject.id, selectedProject.title, selectedProject.currentPiece)
            }
            onClose={() => setSelectedProject(null)}
            currentUser={{
              name: user.name,
              avatar: user.avatar,
              role: 'Collaborator',
              username: user.username,
            }}
            onOpenContribution={handleOpenContribution}
            onOpenProjectChat={handleOpenProjectChat}
            onSelectCreator={handleSelectCreator}
          />
        )}
      </AnimatePresence>

      {/* Contribution Ingestion Modal ("Build on this" / Branch / Remix) */}
      {selectedProject && (
        <ContributionModal
          isOpen={isContributionModalOpen}
          onClose={() => setIsContributionModalOpen(false)}
          project={selectedProject}
          targetNode={contributionTargetNode}
          mode={contributionMode}
          currentUser={{
            name: user.name,
            avatar: user.avatar,
            role: 'Collaborator',
            username: user.username,
          }}
          onSubmitContribution={handleSubmitContribution}
        />
      )}

      {/* Social Footer */}
      <footer className="border-t-2 border-[#171717] bg-white py-10 text-[#171717] text-xs font-mono-tech mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#171717]/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-display font-black text-xl text-[#171717]">RELAY</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFE49A] border border-[#171717] font-bold">
                  START SOMETHING. PASS IT ON.
                </span>
              </div>
              <p className="max-w-md text-xs font-sans-clean text-[#171717]/65 leading-relaxed">
                A modern social platform where creators drop seeds, fork ideas, and build stories together.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-mono-tech">
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#FFE49A] border border-[#171717] transition-colors cursor-pointer"
              >
                Feed
              </button>
              <button
                onClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#FFE49A] border border-[#171717] transition-colors cursor-pointer"
              >
                Explore
              </button>
              <button
                onClick={() => {
                  setActiveTab('messages');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#FFE49A] border border-[#171717] transition-colors cursor-pointer"
              >
                Messages
              </button>
              <button
                onClick={() => {
                  setActiveTab('create');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl bg-[#635BFF] hover:bg-[#5249ea] text-white border border-[#171717] transition-colors cursor-pointer"
              >
                Start something.
              </button>
              <button
                onClick={() => {
                  setViewingCreator(null);
                  setActiveTab('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#FFE49A] border border-[#171717] transition-colors cursor-pointer"
              >
                Profile (@adam)
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#171717]/50">
            <span>START → BUILD ON THIS → BRANCH → REMIX → PASS IT ON</span>
            <span>RELAY © 2026 · ALL CREATIONS OPEN FOR COLLABORATION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
