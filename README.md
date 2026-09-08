RELAY

Start something. Pass it on.

RELAY is a frontend-only social media prototype that rethinks how people interact with social content.

Instead of making likes, comments, and reposts the center of the experience, RELAY turns content into something people can build on together.

A user starts a project. Other people can continue it, remix it, take it in another direction, or contribute their own piece.

The Idea

Traditional social media is built around:

Post → Like → Comment → Repost

RELAY experiments with:

Start → Contribute → Remix → Branch → Collaborate

The goal is not to remove everything familiar about social media. RELAY still includes the infrastructure people expect from a social app:

Home

Explore

Profiles

Following

Messages

Notifications

Search

Visual content

The difference is the core interaction.

Instead of only reacting to content, people can add to it.

Core Features

Collaborative Projects

Users can start projects in different formats:

Stories

Ideas

Visual concepts

Music

Challenges

Each project can grow through contributions from multiple people.

Build on This

The main engagement action lets a user add something to an existing project.

For example:

"The city woke up at 7:12 AM..."

Another person can continue:

"At 7:13, every clock in the city stopped."

The new piece becomes part of the project.

Branches

Projects can evolve in different directions.

A single idea can split into multiple creative paths, allowing users to explore alternative versions rather than forcing everyone into one linear thread.

Remix

Users can take an existing project and create their own interpretation.

A remix maintains a relationship with the original while becoming its own direction.

Social Layer

RELAY also includes familiar social mechanics such as:

Following creators

Profiles

Direct messages

Notifications

Explore/search

Activity indicators

This keeps the product recognizable as a social network while changing the fundamental engagement model.

Design Philosophy

RELAY uses a light, warm, editorial visual language.

The interface combines:

Warm cream backgrounds

Soft accent colors

Editorial typography

Colorful project artwork

Illustrations

Visual project cards

Subtle micro-interactions

Motion-driven feedback

The design intentionally avoids a dark, cyberpunk aesthetic.

The goal is to make RELAY feel:

Friendly · Creative · Social · Modern · Premium

Project content is allowed to have its own visual identity, so the gallery can feel varied without making the overall interface inconsistent.

Motion & Interaction

Motion is an important part of the experience.

RELAY uses animation for feedback rather than decoration alone.

Examples include:

Animated page transitions

Project-card hover states

Image parallax

Custom cursor interactions

Animated notifications

Contribution success animations

Branch creation animations

Remix transitions

Scroll reveals

Animated illustrations

Branded loading states

Interactive buttons

The intention is to make the interface feel alive while keeping the UX fast and understandable.

Frontend Architecture

This project is a frontend-only hackathon prototype.

There is:

No backend

No database

No real authentication

No production API

The application uses realistic mock data and local state to simulate the experience.

Suggested structure:

src/
├── components/
│   ├── navigation/
│   ├── project/
│   ├── feed/
│   ├── messaging/
│   ├── notifications/
│   ├── profile/
│   ├── create/
│   └── ui/
│
├── data/
│   ├── users
│   ├── projects
│   ├── contributions
│   ├── branches
│   ├── messages
│   └── notifications
│
├── pages/
│   ├── home
│   ├── explore
│   ├── create
│   ├── messages
│   ├── notifications
│   ├── profile
│   └── project
│
└── ...

Technology

The prototype is designed around a modern React frontend stack:

React

TypeScript

Tailwind CSS

Framer Motion

GSAP / GSAP ScrollTrigger where appropriate

CSS/SVG animations

No backend infrastructure is required for the demo.

User Flow

A typical interaction looks like:

Home
  ↓
Discover a project
  ↓
Open project
  ↓
Build on this
  ↓
Add a contribution
  ↓
Contribution joins the project
  ↓
Project branches/evolves
  ↓
Other collaborators respond
  ↓
Continue collaborating

A social discovery flow can also look like:

Home
  ↓
Explore
  ↓
Discover creator
  ↓
Follow
  ↓
Open project
  ↓
Remix / Contribute
  ↓
Message collaborator

Example Projects

The prototype includes fictional projects such as:

The City Without Names

The Last Signal

One Sentence Before Midnight

College in 2050

The Worst Startup Ever

A Song We Never Finished

If Gravity Disappeared

Build Something Strange

The Room That Moved

After the Last Train

Each project can have its own artwork, contributors, activity, contributions, and branches.

Why RELAY?

Most social platforms optimize for consumption and reaction.

RELAY explores a different question:

What if social content was something you could join instead of simply react to?

The product shifts social interaction from:

"I saw this."

to:

"I added something to this."

That is the core concept behind RELAY.

Hackathon Scope

This implementation is intentionally focused on demonstrating the interaction model and visual experience.

The demo prioritizes:

A recognizable social-media structure

A new contribution-based interaction

Strong visual design

Collaborative project flows

Branching and remixing

Believable mock social activity

Responsive frontend behavior

High-quality motion and micro-interactions

The prototype is intended to communicate the product concept without requiring a production backend.

Running Locally

Install dependencies:

npm install

Start the development server:

npm run dev

Then open the local development URL shown by the terminal.

Project Status

Hackathon Prototype — Frontend Only

The current implementation uses mock data and simulated interactions for demonstration purposes.

Credits

Designed and built as a concept for the:

REIMAGINE SOCIAL — Design the Next Generation of Social Interaction

challenge.

License

This project is a hackathon prototype and concept project.
