import { useState } from 'react';
import {
  Collaborator,
  ContributionNode,
  Project,
  ProjectActivity,
  TrailEntry,
  UserProfile,
  ActivityNotification,
} from '../types';
import { CURRENT_USER, INITIAL_PROJECTS } from '../data/mockProjects';
import { INITIAL_TREES, getTreeForProject } from '../data/mockTrees';
import { INITIAL_SOCIAL_NOTIFICATIONS } from '../data/mockSocial';

const initialTrails: Record<string, TrailEntry[]> = {
  'proj-01': [
    { id: 'trail-01-root', author: INITIAL_PROJECTS[0].creator, action: 'started', timestamp: '3d ago', preview: INITIAL_PROJECTS[0].currentPiece },
    { id: 'trail-01-aditi', author: INITIAL_PROJECTS[0].activeContributors[0], action: 'continued', timestamp: '2h ago', preview: 'The clocks began losing minutes in different neighborhoods.' },
    { id: 'trail-01-rahul', author: INITIAL_PROJECTS[0].activeContributors[1], action: 'remixed', timestamp: '1h ago', preview: 'A map is only honest when it admits what it cannot name.' },
  ],
};

const initialActivity: Record<string, ProjectActivity[]> = {
  'proj-01': [
    { id: 'activity-01-start', actor: INITIAL_PROJECTS[0].creator, text: 'started this', timestamp: '3h ago', accent: '#FFE28A' },
    { id: 'activity-01-piece', actor: INITIAL_PROJECTS[0].activeContributors[0], text: 'added a piece', timestamp: '2h ago', accent: '#A9E3CF' },
    { id: 'activity-01-remix', actor: INITIAL_PROJECTS[0].activeContributors[1], text: 'remixed it', timestamp: '1h ago', accent: '#B8A7FF' },
  ],
};

const getContributor = (user: UserProfile): Collaborator => ({
  id: 'user-adam',
  name: user.name,
  avatar: user.avatar,
  role: 'Collaborator',
  username: user.username,
});

export function useRelayDomain() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [trees, setTrees] = useState<Record<string, ContributionNode[]>>(INITIAL_TREES);
  const [trails, setTrails] = useState<Record<string, TrailEntry[]>>(initialTrails);
  const [projectActivity, setProjectActivity] = useState<Record<string, ProjectActivity[]>>(initialActivity);
  const [notifications, setNotifications] = useState<ActivityNotification[]>(INITIAL_SOCIAL_NOTIFICATIONS);
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

  const ensureTree = (project: Project) => {
    const existing = trees[project.id];
    if (existing) return existing;
    const generated = getTreeForProject(project.id, project.title, project.currentPiece);
    setTrees((previous) => ({ ...previous, [project.id]: generated }));
    return generated;
  };

  const createProject = (newProject: Project) => {
    const rootNode: ContributionNode = {
      id: `node-${newProject.id}-root`, projectId: newProject.id, parentId: null,
      author: newProject.creator, content: newProject.currentPiece, type: 'root',
      branchName: 'Initial Seed', timestamp: 'Just now', depth: 0, childrenIds: [],
    };
    setProjects((previous) => [newProject, ...previous]);
    setTrees((previous) => ({ ...previous, [newProject.id]: [rootNode] }));
    setTrails((previous) => ({
      ...previous,
      [newProject.id]: [{ id: `trail-${newProject.id}`, author: newProject.creator, action: 'started', timestamp: 'Just now', preview: newProject.currentPiece }],
    }));
    setProjectActivity((previous) => ({
      ...previous,
      [newProject.id]: [{ id: `activity-${newProject.id}`, actor: newProject.creator, text: 'started this', timestamp: 'Just now', accent: '#FFE28A' }],
    }));
    setUser((previous) => ({ ...previous, projectsCount: (previous.projectsCount || 0) + 1, creationsCount: previous.creationsCount + 1 }));
  };

  const addContribution = (projectId: string, targetNode: ContributionNode | null, type: 'continue' | 'branch' | 'remix', content: string, branchLabel: string) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project) return null;
    const projectTree = ensureTree(project);
    const parentNode = targetNode || projectTree[projectTree.length - 1];
    const contributor = getContributor(user);
    const newNode: ContributionNode = {
      id: `node-${Date.now()}`, projectId, parentId: parentNode?.id || null, author: contributor,
      content, type, branchName: branchLabel || (type === 'branch' ? 'New Branch' : type === 'remix' ? 'Remix Layer' : 'Continuation'),
      timestamp: 'Just now', depth: (parentNode?.depth || 0) + 1, childrenIds: [],
    };
    const updatedProject: Project = {
      ...project,
      currentPiece: content,
      contributionsCount: project.contributionsCount + 1,
      contributorsCount: project.activeContributors.some((item) => item.name === contributor.name) ? project.contributorsCount : project.contributorsCount + 1,
      branchesCount: type === 'branch' ? project.branchesCount + 1 : project.branchesCount,
      remixesCount: type === 'remix' ? project.remixesCount + 1 : project.remixesCount,
      recentActivity: `${user.name} ${type === 'branch' ? 'created a branch' : type === 'remix' ? 'remixed this' : 'added a piece'} just now`,
      liveNow: true,
      activeContributors: [contributor, ...project.activeContributors.filter((item) => item.name !== contributor.name)],
      currentTurn: project.mode === 'relay' ? undefined : project.currentTurn,
    };
    const trailAction: TrailEntry['action'] = type === 'branch' ? 'branched' : type === 'remix' ? 'remixed' : 'continued';
    setTrees((previous) => ({ ...previous, [projectId]: [...projectTree, newNode] }));
    setProjects((previous) => previous.map((item) => item.id === projectId ? updatedProject : item));
    setTrails((previous) => ({ ...previous, [projectId]: [...(previous[projectId] || []), { id: `trail-${newNode.id}`, author: contributor, action: trailAction, timestamp: 'Just now', preview: content, source: parentNode?.author }] }));
    setProjectActivity((previous) => ({ ...previous, [projectId]: [{ id: `activity-${newNode.id}`, actor: contributor, text: type === 'branch' ? 'created a branch' : type === 'remix' ? 'remixed this project' : 'continued this project', timestamp: 'Just now', accent: type === 'branch' ? '#8FD8FF' : type === 'remix' ? '#A9E3CF' : '#FFE28A' }, ...(previous[projectId] || [])] }));
    setUser((previous) => ({ ...previous, contributionsCount: previous.contributionsCount + 1, collaborationsCount: previous.collaborationsCount + 1, remixesCount: type === 'remix' ? previous.remixesCount + 1 : previous.remixesCount }));
    return updatedProject;
  };

  const passProject = (projectId: string, recipient: Collaborator) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project) return null;
    const sender = getContributor(user);
    const passedProject: Project = { ...project, mode: 'relay', currentTurn: recipient, passedBy: sender, passedTo: recipient, passedAt: 'Just now', passedCount: (project.passedCount || 0) + 1, recentActivity: `${user.name} passed this to ${recipient.name} just now` };
    const passId = `pass-${Date.now()}`;
    setProjects((previous) => previous.map((item) => item.id === projectId ? passedProject : item));
    setTrails((previous) => ({ ...previous, [projectId]: [...(previous[projectId] || []), { id: `trail-${passId}`, author: sender, action: 'passed', timestamp: 'Just now', preview: `Passed to ${recipient.name} to take the next turn.`, target: recipient }] }));
    setProjectActivity((previous) => ({ ...previous, [projectId]: [{ id: `activity-${passId}`, actor: sender, text: `passed this to ${recipient.name}`, timestamp: 'Just now', accent: '#FFB49F' }, ...(previous[projectId] || [])] }));
    setNotifications((previous) => [{ id: `notification-${passId}`, type: 'passed', user: sender, text: `${sender.name} passed ${project.title} to you.`, projectTitle: project.title, projectId, timestamp: 'Just now', read: false, category: 'collaborations' }, ...previous]);
    return passedProject;
  };

  return { projects, trees, trails, projectActivity, notifications, setNotifications, user, setUser, createProject, addContribution, passProject, ensureTree };
}