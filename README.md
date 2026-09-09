<div align="center">

<br/>

```
██████╗ ███████╗██╗      █████╗ ██╗   ██╗
██╔══██╗██╔════╝██║     ██╔══██╗╚██╗ ██╔╝
██████╔╝█████╗  ██║     ███████║ ╚████╔╝
██╔══██╗██╔══╝  ██║     ██╔══██║  ╚██╔╝
██║  ██║███████╗███████╗██║  ██║   ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝
```

### Start something. Pass it on.

*A social platform built for people who want to **add** to the world — not just react to it.*

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-FF0055?style=flat-square&logo=framer&logoColor=white)](https://framer.com/motion)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com)

</div>

---

## What is RELAY?

Every social platform you've used runs on the same loop:

```
Post  →  Like  →  Comment  →  Repost
```

You see content, react to it, and move on. The content stays the same.

**RELAY runs on a different loop:**

```
Start  →  Contribute  →  Branch  →  Remix  →  Collaborate
```

In RELAY, content is a *starting point* — not a destination. Anyone can pick up where someone left off, take the idea somewhere new, or remix it into something entirely their own.

> **The shift:** from *"I saw this"* → to *"I added something to this."*

---

## How It Works — A Quick Example

Someone starts a project called **The City Without Names:**

> *"The city woke up at 7:12 AM..."*

Someone else continues:

> *"At 7:13, every clock in the city stopped."*

A third person takes it somewhere darker — and creates a **branch.**
Another person remixes the whole thing into a poem.

The original idea becomes a living chain of contributions, directions, and possibilities. That's a RELAY project.

---

## Core Concepts

### 📌 Projects

The main content unit. A project starts with an opening contribution and grows from there.

| Format | Example |
|---|---|
| **Story** | The City Without Names |
| **Idea** | College in 2050 |
| **Visual** | Build Something Strange |
| **Music** | A Song We Never Finished |
| **Challenge** | The Worst Startup Ever |

---

### ✍️ Build on This

The central action in RELAY. Instead of a Like button, there's a **Build on This** prompt — an invitation to add the next piece.

Every contribution is credited, visible, and part of the project's history.

---

### 🌿 Branches

Projects don't have to go in one direction. When someone wants to explore a different path *without overwriting the existing thread*, they create a branch.

```
          Original
             │
      ┌──────┴──────┐
      ↓             ↓
   Branch A       Branch B
      │
   ┌──┴──┐
   ↓     ↓
  A-1   A-2
```

Branches are first-class — discoverable, creditable, and branchable themselves.

---

### 🔀 Remixes

A remix takes an existing project as inspiration and creates something new. Unlike a branch (which continues from a point in the thread), a remix is its own direction — linked to the source, but free to go anywhere.

---

### 🏷️ Passing

A project or contribution can be **passed** to a specific person:

```
Adam  →  Maya  →  Rahul  →  Priya
```

The recipient can continue, branch, or remix it. This is the idea behind the name RELAY — one person starts, another carries it forward.

---

### 📊 Contribution Metrics

RELAY replaces passive engagement numbers with contribution-based signals:

| Instead of... | RELAY shows... |
|---|---|
| 1.2K likes | Built on **14** times |
| 342 comments | **31** contributors |
| 89 reposts | Remixed **8** times · **7** branches |

The goal: highlight *creative participation*, not passive consumption.

---

## Product Structure

```
RELAY
│
├── 🏠  Home           →  Feed of active projects from people you follow
├── 🔍  Explore        →  Discover creators, formats, and collaborations
├── ✨  Create         →  Start a new project
├── 💬  Messages       →  Direct conversations between collaborators
├── 🔔  Notifications  →  Contributions, branches, remixes, follows
└── 👤  Profile        →  Identity, projects, contributions, social graph
```

---

## Design Language

RELAY uses a **warm, editorial visual system** — designed to feel like a creative space, not a feed optimised for attention.

| Element | Direction |
|---|---|
| Backgrounds | Warm cream — feels like paper, not a screen |
| Typography | Expressive, editorial weight |
| Project artwork | Each project has its own visual identity |
| Motion | Feedback-driven — animations show *what just happened* |
| Overall feel | Friendly · Creative · Social · Modern · Premium |

RELAY intentionally avoids: dark themes, neon accents, and the visual vocabulary of engagement-maximising feeds.

### Motion & Micro-interactions

Animation in RELAY answers one question: *"what just happened?"*

- Page transitions on navigation
- Hover states and parallax on project cards
- Contribution success animation
- Branch creation animation (visually forks from the thread)
- Remix transition (links source to new project)
- Scroll-triggered section reveals
- Animated notifications and loading states

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS |
| Component animation | Framer Motion |
| Scroll / timeline animation | GSAP + ScrollTrigger |
| Additional motion | CSS + SVG animations |
| State management | React Context + local state |
| Data | Static mock data (in-memory) |
| Build tool | Vite |
| Auth | Simulated — no real credentials needed |

> **Frontend-only.** No backend, no database, no API keys required.

---

## Project Structure

```
relay/
├── src/
│   ├── components/
│   │   ├── navigation/     # Sidebar, bottom nav, search
│   │   ├── project/        # Project cards, contribution thread, branch view
│   │   ├── feed/           # Home feed and activity stream
│   │   ├── messaging/      # DM threads and composer
│   │   ├── notifications/  # Notification list and alerts
│   │   ├── profile/        # Profile header, project grid, followers
│   │   ├── create/         # Project creation flow, format picker
│   │   └── ui/             # Buttons, inputs, modals, toasts, loaders
│   │
│   ├── data/
│   │   ├── users/          # Mock user profiles and follower graphs
│   │   ├── projects/       # Mock projects with contributions
│   │   ├── contributions/  # Contribution history and attribution
│   │   ├── branches/       # Branch structures
│   │   ├── messages/       # Mock DM threads
│   │   └── notifications/  # Mock notification events
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── explore/
│   │   ├── create/
│   │   ├── messages/
│   │   ├── notifications/
│   │   ├── profile/
│   │   └── project/
│   │
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helpers, formatting, mock utilities
│   └── types/              # TypeScript interfaces
│
├── public/assets/          # Project artwork, avatars, illustrations
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

**Requires:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/your-username/relay.git
cd relay

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the local URL shown in your terminal (default: `http://localhost:5173`).

No `.env` file needed. No API keys. No backend setup. Just `npm install` and go.

---

## Mock Projects

The prototype ships with 10 fictional projects across all formats:

| Project | Format | Activity |
|---|---|---|
| The City Without Names | Story | 7 contributors · 3 branches |
| The Last Signal | Story | 4 contributors · 1 remix |
| One Sentence Before Midnight | Story | 12 contributors |
| College in 2050 | Idea | 6 contributors · 2 branches |
| The Worst Startup Ever | Challenge | 9 contributors |
| A Song We Never Finished | Music | 3 contributors |
| If Gravity Disappeared | Idea | 4 active branches |
| Build Something Strange | Challenge | 22 contributors |
| The Room That Moved | Story | 5 contributors · 1 remix |
| After the Last Train | Story | 8 contributors |

Each project has its own artwork, contributor avatars, activity timestamps, contribution history, and branch structure.

---

## What's Not Included (Intentionally)

This is a hackathon prototype. The following are out of scope:

- ❌ Real user authentication
- ❌ Backend / database
- ❌ Real-time collaboration
- ❌ Push notifications
- ❌ Content moderation
- ❌ Production API

Everything is simulated in the browser using mock data and local state. The prototype exists to demonstrate the **concept, interaction model, and visual experience** — not production infrastructure.

---

## Why RELAY?

Most platforms optimise for one thing: keeping you scrolling.

They reward the loudest voices, the most reactive content, and the fastest opinions.

RELAY asks a different question:

> **What if the best thing you could do with a piece of content… was add to it?**

That shift — from reaction to contribution — is what RELAY is exploring. When social credit comes from building rather than reacting, the incentives change. The content changes. The community changes.

---

## Hackathon

Built for the **REIMAGINE SOCIAL — Design the Next Generation of Social Interaction** challenge.

The prototype prioritises:
- A new, contribution-based interaction model
- Familiar social-network infrastructure (so it's immediately learnable)
- Strong visual and motion design
- Realistic collaborative project flows
- Branching and remixing as first-class features

---

<div align="center">

<br/>

**RELAY**

*Start something. Pass it on.*

<br/>

</div>
