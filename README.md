<div align="center"> <br />
 ██████╗ ███████╗██╗      █████╗ ██╗   ██╗
 ██╔══██╗██╔════╝██║     ██╔══██╗╚██╗ ██╔╝
 ██████╔╝█████╗  ██║     ███████║ ╚████╔╝
 ██╔══██╗██╔══╝  ██║     ██╔══██║  ╚██╔╝
 ██║  ██║███████╗███████╗██║  ██║   ██║
 ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝

Start something. Pass it on.

A new kind of social — built for people who want to add to the world, not just react to it.

<br />

React TypeScript Tailwind CSS Framer Motion GSAP Hackathon

<br /> </div>
What is RELAY?

Most social platforms are built around a single, closed loop:

Post → Like → Comment → Repost

You see something. You react. You move on.

RELAY is built around a different loop:

Start → Contribute → Branch → Remix → Collaborate

You see something. You add to it. Someone else picks it up and takes it further. A story grows. An idea evolves. A project becomes something none of its contributors could have made alone.

RELAY is a social platform where content is a starting point — not a destination.

The Idea, Concretely

Someone writes:

"The city woke up at 7:12 AM..."

Someone else continues:

"At 7:13, every clock in the city stopped."

A third contributor branches it into a different direction — maybe more poetic, maybe darker, maybe stranger. The original thread keeps growing. The branch grows on its own. Both maintain a relationship to the original, and to each other.

That's a RELAY project.

Projects can be stories, musical ideas, visual concepts, design challenges, thought experiments, or anything else a format can hold. What they share is openness: every project can be built on, branched, and remixed by anyone in the network.

Core Concepts
Projects

The atomic unit of RELAY. A project has:

A format (Story · Idea · Visual · Music · Challenge)
A starting contribution from its creator
A contributor list that grows over time
Branches — forks that evolve in their own direction
Remixes — new interpretations that link back to the original

Projects are not posts. They are living documents.

Build on This

The central action in RELAY. Where other platforms offer a like button, RELAY surfaces a Build on This prompt — an invitation to add the next piece.

Contributions are sequential and visible. You can see who added what, when, and in what order. The history of a project is part of the project.

Branches

A project doesn't have to go in one direction. When a contributor wants to take the story somewhere different — without overwriting the existing thread — they create a branch.

Branches are first-class citizens in RELAY. They're discoverable, creditable, and can themselves be branched or remixed. A single starting idea can grow into a tree of creative possibilities.

Remixes

A remix takes an existing project as its inspiration and creates something new from it. Unlike a branch (which continues from a specific point in a project), a remix is its own direction — a reinterpretation that maintains a relationship to the source without being bound by it.

The Social Layer

RELAY includes everything you'd expect from a social platform:

Profiles and follower graphs
A home feed and explore surface
Direct messages
Notifications
Search

These aren't afterthoughts. They're the infrastructure that makes the contribution model work — discovery, connection, and credit are what give the system meaning.

Interaction Model
Discover project
      │
      ▼
Open project view
      │
      ├─── Read contributions in sequence
      │
      ├─── See existing branches
      │
      ▼
Choose your action
      │
      ├── Build on This ──────► Add contribution ──► Contribution joins project
      │
      ├── Create Branch ──────► Start new direction ──► Branch lives independently
      │
      └── Remix ──────────────► New project, linked to source

The discovery path looks like:

Home Feed
  └─► Project card
        └─► Open project
              └─► Build on This / Branch / Remix
                    └─► Message collaborator
                          └─► Follow creator
Design Language

RELAY uses a warm, editorial visual system. The palette is deliberate: cream backgrounds that feel like paper, not screens. Typography with editorial weight. Colorful project artwork that gives each project its own visual identity without fragmenting the interface.

The goal: Friendly · Creative · Social · Modern · Premium

What RELAY explicitly avoids: dark themes, cyberpunk aesthetics, the visual vocabulary of engagement-maximizing feeds.

Motion

Animation in RELAY is feedback, not decoration. Every motion answers a question: what just happened? where am I going? what did I just create?

Implemented micro-interactions include:

Trigger	Response
Page navigation	Animated transitions
Project card hover	Parallax + elevation shift
Contribution submitted	Success animation with contribution joining the thread
Branch created	Branching animation from the origin point
Remix initiated	Transition that visually links source to new project
Scroll	Section reveals timed to reading pace
Notifications	Animated arrival and dismissal
Loading	Branded state with RELAY motion language
Mock Projects

The prototype ships with twelve fictional projects that demonstrate the full range of formats and collaborative states:

Project	Format	State
The City Without Names	Story	Active — 7 contributors, 3 branches
The Last Signal	Story	Active — 4 contributors, 1 remix
One Sentence Before Midnight	Story	Active — 12 contributors
College in 2050	Idea	Active — 6 contributors, 2 branches
The Worst Startup Ever	Challenge	Active — 9 contributors
A Song We Never Finished	Music	Active — 3 contributors
If Gravity Disappeared	Idea	Branched — 4 active branches
Build Something Strange	Challenge	Active — 22 contributors
The Room That Moved	Story	Active — 5 contributors, 1 remix
After the Last Train	Story	Active — 8 contributors

Each project has its own artwork, contributor avatars, activity timestamps, contribution history, and branch structure.

Tech Stack

This is a frontend-only prototype. No backend, no database, no auth server. Everything runs in the browser.

Layer	Technology
UI framework	React 18
Language	TypeScript 5
Styling	Tailwind CSS 3
Animation	Framer Motion 11
Scroll / timeline animation	GSAP 3 + ScrollTrigger
Supplementary animation	CSS animations · SVG animations
State	React local state + Context
Data	Mock data (static JSON + in-memory)
Auth	Simulated (no real credentials)
Build	Vite
Project Structure
relay/
├── src/
│   ├── components/
│   │   ├── navigation/       # Sidebar, bottom nav, search bar
│   │   ├── project/          # Project cards, contribution thread, branch view
│   │   ├── feed/             # Home feed, activity stream
│   │   ├── messaging/        # DM threads, composer
│   │   ├── notifications/    # Notification list, animated alerts
│   │   ├── profile/          # Profile header, project grid, follower lists
│   │   ├── create/           # Project creation flow, format picker
│   │   └── ui/               # Buttons, inputs, modals, toasts, loaders
│   │
│   ├── data/
│   │   ├── users/            # Mock user profiles and follower graphs
│   │   ├── projects/         # Mock project data with contributions
│   │   ├── contributions/    # Contribution history and attribution
│   │   ├── branches/         # Branch structures and metadata
│   │   ├── messages/         # Mock DM threads
│   │   └── notifications/    # Mock notification events
│   │
│   ├── pages/
│   │   ├── home/             # Feed and discovery
│   │   ├── explore/          # Browse by format, trending, new
│   │   ├── create/           # Start a new project
│   │   ├── messages/         # Messaging surface
│   │   ├── notifications/    # Activity center
│   │   ├── profile/          # User profile
│   │   └── project/          # Single project view with contributions
│   │
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Formatting, date handling, mock helpers
│   └── types/                # TypeScript interfaces
│
├── public/
│   └── assets/               # Project artwork, avatars, illustrations
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
Getting Started

Prerequisites: Node.js 18+

bash
# Clone the repository
git clone https://github.com/your-username/relay.git
cd relay

# Install dependencies
npm install

# Start the development server
npm run dev

Open the local URL shown in your terminal. The default is http://localhost:5173.

The app runs entirely in the browser. No environment variables, no API keys, no setup beyond npm install.

Pages at a Glance

Home — Your personalized feed of active projects from people you follow. The feed surfaces recent contributions, new branches, and remixes — not just new posts.

Explore — Browse by format, trending projects, new contributors, and active collaborations. The entry point for discovering work outside your network.

Project View — The core experience. Reads a project's full contribution thread in sequence, shows branches and remixes, and surfaces the Build on This prompt.

Create — Start a new project. Choose a format, write or upload your opening contribution, and publish.

Profile — A creator's project history, contribution record, followers, and activity. Contribution credits show where a person has added to other people's work — not just what they've started.

Messages — Direct messages between collaborators. Linked to project activity so conversations and contributions stay connected.

Notifications — A record of contributions to your projects, branch creations, remixes, follows, and direct messages.

Why RELAY?

The dominant model of social media asks: what do you think of this?

RELAY asks instead: what would you add?

That shift — from reaction to contribution — changes the relationship between people and content. Content becomes something to build with, not just consume. Credit is distributed, not concentrated. Discovery is about finding work worth continuing, not just work worth watching.

The product is an argument: social platforms that reward contribution produce different creative behavior than platforms that reward reaction.

RELAY is that argument, made interactive.

Hackathon Context

RELAY was designed and built for the REIMAGINE SOCIAL — Design the Next Generation of Social Interaction challenge.

The implementation scope is intentionally focused on demonstrating the core concept: the contribution-based interaction model, the branching structure, and the motion-driven visual experience. This is a prototype, not a production application. It uses mock data and simulated state throughout.

What the prototype demonstrates well:

The contribution and branching interaction model
RELAY's visual and motion design language
A realistic social network structure with profiles, follows, and messaging
The full project lifecycle from creation to multi-branch collaboration
Responsive behavior across screen sizes

What the prototype doesn't include:

Real user authentication
A backend or database
Push notifications
Real-time collaboration
Content moderation
License

RELAY is a hackathon prototype and concept project. Built for demonstration and exploration purposes.

<div align="center">

RELAY — Start something. Pass it on.

</div>
