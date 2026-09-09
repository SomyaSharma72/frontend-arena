<div align="center">

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

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-FF0055?style=flat-square&logo=framer&logoColor=white)](https://framer.com/motion)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)

<br/>

[Overview](#-what-is-relay) •
[Core Concepts](#-core-concepts) •
[Design](#-design-language--motion) •
[Architecture](#️-architecture--tech-stack) •
[Getting Started](#-getting-started) •
[Mock Projects](#-mock-projects)

</div>

<br/>

## 📡 What is RELAY?

Every social platform you've used runs on the same loop:

```
Post  →  Like  →  Comment  →  Repost
```

You see content, react to it, and move on. The content stays static.

**RELAY runs on a different loop:**

```
Start  →  Build  →  Pass It On  →  Branch / Remix  →  Collaborate
```

In RELAY, content is a starting point — not a destination. Anyone can pick up where someone left off, pass the baton forward, take the idea somewhere new, or remix it into something entirely their own.

> **The shift:** from *"I saw this"* → to *"I added something to this."*

<br/>

## ⚙️ How It Works

The core innovation, in six steps:

1. **A creator starts a project.**
2. **Someone builds on it** with a new contribution.
3. **A contributor passes the work** to a specific person.
4. **The recipient continues, branches, or remixes it.**
5. **The project develops a visible social lineage.**
6. **The result:** an evolving chain of contributions.

**Example lineage:**

```
Adam  →  Maya  →  Rahul  →  Priya
```

This direct, person-to-person handoff is the reason behind the name **RELAY** — one person starts, and others carry it forward.

<br/>

## 🧩 Core Concepts

### 📌 Projects
The main content unit. A project starts with an opening contribution and grows through community additions across multiple creative formats — **Story, Idea, Visual, Music, Challenge.**

### ✍️ Build on This
The central action in RELAY. Instead of a passive *Like* button, a **Build on This** prompt invites collaborators to add the next piece. Every contribution is credited, visible, and recorded.

### 🏷️ Pass It On
A creator or contributor can pass a project or contribution **directly to another person**. The recipient gets a notification and can continue, branch, or remix the work.

Unlike a generic share or retag, *Pass It On* establishes a direct, person-to-person chain of participation.

### 🌿 Branches
Projects don't have to follow a single path. When someone wants to explore an alternate direction without overwriting the existing thread, they create a branch.

```
         Original
            │
     ┌──────┴──────┐
     ↓             ↓
  Branch A      Branch B
     │
  ┌──┴──┐
  ↓     ↓
 A-1   A-2
```

### 🔀 Remixes
A remix takes an existing project as inspiration and creates a **standalone work**. While a branch continues from a specific point in a thread, a remix breaks off into a new project while keeping attribution to the original source.

### 📜 Trail
RELAY preserves the visible lineage of a project's evolution. The Trail records:

- **Who** contributed
- **What** action was taken *(Started, Continued, Remixed, Branched, Passed)*
- **When** it occurred
- **How** the work evolved overall

```
Adam                          Rahul
Started · 3h ago               Remixed · 1h ago
     │                              │
     ▼                              ▼
   Maya                          Priya
Continued · 2h ago          Created a branch · 40m ago
```

<br/>

## 📊 Contribution Metrics

RELAY replaces passive vanity metrics with contribution-based signals:

| Instead of... | RELAY highlights...          |
|:---------------|:-------------------------------|
| 1.2K likes     | Built on 14 times            |
| 342 comments   | 31 contributors               |
| 89 reposts     | Remixed 8 times · 7 branches |
| Share count    | Passed to 5 people            |

These metrics emphasize creative influence and active participation over passive scroll behavior.

<br/>

## 🔁 The Interaction Model

```
Discover Project
       │
       ▼
  Open Project
       │
       ▼
 Build on This
       │
       ├───► Add Contribution ───► Pass It On ───► Recipient Action
       │                                                 │
       ├───► Create Branch                               │
       │                                                 │
       └───► Create Remix                                │
                                                           ▼
                                            Trail Records Evolution
```

<br/>

## 🗂️ Product Structure & Social Layer

RELAY combines conventional social navigation with contribution-driven workflows:

```
RELAY
│
├── 🏠 Home           → Social feed highlighting evolving project activity
├── 🔍 Explore        → Discover creators, trending projects, formats, and branches
├── ✨ Create         → Launch a new project with format-specific templates
├── 💬 Messages       → Direct messaging and project-linked conversations
├── 🔔 Notifications  → Activity alerts for contributions, passes, branches, and remixes
└── 👤 Profile        → Identity, created projects, contributions, and social influence graph
```

### Activity-Aware Feed

The Home feed surfaces real-time content evolution:

- *"Maya continued Adam's story."*
- *"Rahul remixed Maya's idea."*
- *"Priya created a branch on College in 2050."*
- *"Adam passed The City Without Names to Maya."*

<br/>

## 🎨 Design Language & Motion

RELAY uses a warm, editorial visual system designed to feel like a shared canvas rather than an attention-maximizing feed.

| Element          | Direction                                                    |
|:------------------|:----------------------------------------------------------------|
| **Color Palette**   | Warm cream and paper tones — warm light theme                 |
| **Typography**      | Editorial headings with clean, structural sans body copy       |
| **Visual Identity** | Distinctive, visual-first project artwork and illustrations    |
| **Feel**            | Editorial · Collaborative · Social · Modern · Premium          |

### Motion Design

Animation in RELAY provides functional feedback that clarifies project state transitions:

- **Pass It On confirmation** — visual indicator confirming handoff to recipient
- **Trail reveal** — smooth accordion transitions unfolding project history
- **Contribution success** — animated feedback when adding to a thread
- **Branch & Remix transitions** — visual splits mapping lineage connections
- **UI interactions** — subtle hover parallax, route transitions, notification overlays

<br/>

## 🏗️ Architecture & Tech Stack

### Tech Stack

| Layer                       | Technology            |
|:------------------------------|:-------------------------|
| UI Framework                | React 18               |
| Language                    | TypeScript 5            |
| Styling                     | Tailwind CSS            |
| Motion                      | Framer Motion           |
| Scroll / Canvas Animations  | GSAP + ScrollTrigger    |
| Build Tool                  | Vite                    |

### State Management

The application enforces strict separation of concerns across four layers:

| Layer | Location | Responsibility |
|:---|:---|:---|
| **Presentation / UI** | `src/components/`, `src/pages/` | Pure display components and view routing |
| **State & Domain Logic** | `src/context/`, `src/hooks/` | Manages active projects, contribution chains, mock notifications, message threads |
| **Mock Data Layer** | `src/data/` | In-memory datasets of pre-populated projects, user profiles, and contribution histories |
| **Types & Utilities** | `src/types/`, `src/utils/` | Centralized TypeScript interfaces for project formats, pass events, and trail histories |

### Project Structure

```
relay/
├── src/
│   ├── components/
│   │   ├── navigation/     # Sidebar, top navigation, search UI
│   │   ├── project/        # Cards, contribution threads, branch views, trail lineage
│   │   ├── feed/           # Feed items and activity stream cards
│   │   ├── messaging/      # Direct messages and project-linked chat
│   │   ├── notifications/  # Activity feeds and pass/branch alerts
│   │   ├── profile/        # Profile header, contribution grid, follower lists
│   │   ├── create/         # Project creation wizard and format selectors
│   │   └── ui/             # Buttons, inputs, modals, toasts, loaders
│   │
│   ├── context/            # Global state context (Projects, User, Notifications)
│   ├── data/                # In-memory mock data (projects, users, messages)
│   ├── hooks/               # Custom hooks for state mutation and UI controls
│   ├── pages/                # Route pages (Home, Explore, Create, Messages, Notifications, Profile, ProjectDetail)
│   ├── types/                # TypeScript definitions (Project, Contribution, Pass, Trail)
│   └── utils/                # Formatting helpers, date tools, mock generators
│
├── public/                   # Static assets, avatars, project artwork
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** — v18.0.0 or higher
- **npm** — v9.0.0 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/relay.git
cd relay

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Open the local URL shown in your terminal (typically `http://localhost:5173`). No `.env` configuration or database setup is required.

<br/>

## 🎭 Mock Projects

The prototype includes pre-loaded interactive projects demonstrating various formats and lineage structures:

| Project | Format | Activity |
|:---|:---|:---|
| The City Without Names | Story | 7 contributors · 3 branches · Passed 2x |
| The Last Signal | Story | 4 contributors · 1 remix |
| One Sentence Before Midnight | Story | 12 contributors |
| College in 2050 | Idea | 6 contributors · 2 branches |
| The Worst Startup Ever | Challenge | 9 contributors |
| A Song We Never Finished | Music | 3 contributors |
| If Gravity Disappeared | Idea | 4 active branches |
| Build Something Strange | Challenge | 22 contributors |
| The Room That Moved | Story | 5 contributors · 1 remix |
| After the Last Train | Story | 8 contributors |

<br/>

## 🚫 What's Not Included

This is a hackathon prototype designed to demonstrate interaction design, state mechanics, and user experience. Out of scope for this build:

- ❌ Real backend database or persistence layer
- ❌ Production authentication infrastructure
- ❌ WebSockets / real-time multi-user editing
- ❌ Push notifications *(simulated locally)*
- ❌ Content moderation pipelines

<br/>

## 🏆 Hackathon Alignment

Built for the **REIMAGINE SOCIAL — Design the Next Generation of Social Interaction** challenge.

RELAY explores how social architecture evolves when platforms move away from passive consumption loops. By preserving standard social expectations — feeds, profiles, messaging — while replacing the core reaction primitive with **Build On**, **Pass It On**, and **Trail**, RELAY demonstrates a viable model for contribution-first social media.

<br/>

<div align="center">

**Traditional social media asks:**
*"What do you think of this?"*

**RELAY asks:**
### *"What would you add?"*

<br/>

**RELAY**
*Start something. Pass it on.*

</div>
