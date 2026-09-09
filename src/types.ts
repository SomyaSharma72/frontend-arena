export type ProjectCategory = 
  | 'story' 
  | 'idea' 
  | 'visual' 
  | 'music' 
  | 'challenge';

export interface Collaborator {
  id?: string;
  name: string;
  username?: string;
  avatar: string;
  bio?: string;
  role?: string;
  followersCount?: number;
  followingCount?: number;
  projectsCount?: number;
  contributionsCount?: number;
  isOnline?: boolean;
}

export interface ProjectCardStyle {
  bg: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  sticker?: string;
  tapeColor?: 'butter' | 'lavender' | 'mint' | 'peach';
  layout?: 'standard' | 'split' | 'quote' | 'art-bleed' | 'minimal-type';
  border?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  currentPiece: string;
  image: string;
  cardStyle: ProjectCardStyle;
  contributorsCount: number;
  contributionsCount: number;
  branchesCount: number;
  remixesCount: number;
  recentActivity: string;
  liveNow?: boolean;
  activeContributors: Collaborator[];
  creator: Collaborator;
  createdAt: string;
  lastActive: string;
  tags: string[];
  treeRootNodeId: string;
  treeRootId?: string;
  remixedFromTitle?: string;
  mediaType?: 'image' | 'audio' | 'video';
  audioSnippet?: {
    tempo?: string;
    key?: string;
    layersCount?: number;
    duration?: string;
  };
  passedTo?: Collaborator;
  passedBy?: Collaborator;
  passedAt?: string;
  passedCount?: number;
}

export interface ContributionNode {
  id: string;
  projectId: string;
  parentId: string | null;
  author: Collaborator;
  content: string;
  type: 'root' | 'continue' | 'branch' | 'remix';
  branchName?: string;
  timestamp: string;
  depth: number;
  remixedFrom?: string;
  childrenIds?: string[];
}

export interface ActivityNotification {
  id: string;
  type: 'follow' | 'continue' | 'branch' | 'remix' | 'join' | 'milestone' | 'message' | 'passed';
  user: Collaborator;
  text: string;
  projectTitle?: string;
  projectId?: string;
  timestamp: string;
  read: boolean;
  category?: 'all' | 'mentions' | 'collaborations';
}

export interface TrailEntry {
  id: string;
  author: Collaborator;
  action: 'started' | 'continued' | 'passed' | 'branched' | 'remixed' | 'added';
  timestamp: string;
  preview?: string;
}

export interface ProjectActivity {
  id: string;
  actor: Collaborator;
  text: string;
  timestamp: string;
  accent?: string;
}

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followingCount: number;
  followersCount: number;
  creationsCount: number;
  contributionsCount: number;
  remixesCount: number;
  collaborationsCount: number;
  badges: string[];
  skills?: string[];
  joinedDate: string;
}

export interface Message {
  id: string;
  senderId?: string;
  sender: Collaborator;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
  audioAttachment?: boolean;
  projectRef?: {
    id: string;
    title: string;
  };
}

export interface Conversation {
  id: string;
  type: 'direct' | 'project';
  title?: string;
  recipient?: Collaborator;
  projectTitle?: string;
  projectId?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
  participantsCount?: number;
  messages: Message[];
}

export interface SocialFeedItem {
  id: string;
  type: 'project' | 'contribution' | 'remix' | 'short_update';
  author: Collaborator;
  timestamp: string;
  project: Project;
  headline?: string;
  excerpt: string;
  actionType: 'build' | 'layer' | 'remix' | 'continue';
  actionLabel: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio' | 'video';
  audioLayers?: string[];
  remixNote?: string;
  originalProject?: {
    id: string;
    title: string;
    creator: string;
  };
  commentsCount?: number;
  contributorsCount: number;
  piecesCount: number;
  branchesCount: number;
  remixesCount?: number;
}

export type ActiveTab = 'home' | 'explore' | 'create' | 'messages' | 'notifications' | 'profile';
