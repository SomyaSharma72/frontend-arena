RELAY

<div align="center">

Start something. Pass it on.

A new kind of social — built for people who want to add to the world, not just react to it.

React · TypeScript · Tailwind CSS · Framer Motion · GSAP

</div>

What is RELAY?

Most social platforms follow a familiar loop:

Post → Like → Comment → Repost

You see something, react to it, and move on.

RELAY explores a different loop:

Start → Contribute → Branch → Remix → Collaborate

In RELAY, content is a starting point, not a destination.

A creator can start a story, idea, visual, music concept, or challenge. Other people can continue it, build on it, branch it into another direction, or remix it into something new.

The result is content that evolves through the people who participate in it.

The Core Idea

Imagine Adam starts:

"The city woke up at 7:12 AM..."

Someone else continues:

"At 7:13, every clock in the city stopped."

Another contributor takes the story somewhere darker and creates a branch.

Someone else remixes that version.

The original idea becomes a living chain of contributions and possibilities.

That's a RELAY project.

Why is it different?

RELAY is still a social network. It includes the infrastructure users expect:

Home feed

Explore

Search

Profiles

Following

Direct messages

Notifications

Visual content

The difference is the interaction layer.

Instead of making these the primary actions:

Like · Comment · Repost

RELAY focuses on:

Build on this · Continue · Remix · Take another direction

The experiment is simple:

What if social content was something you could join instead of only react to?

Core Features

Projects

Projects are the main content objects in RELAY.

A project can be:

Story

Idea

Visual

Music

Challenge

Each project starts with an opening contribution and can evolve over time.

Build on This

The central interaction.

Users can add the next piece to an existing project.

Examples:

Continue the next scene of a story

Add a layer to a music project

Extend an idea

Add to a visual concept

Add the next rule to a challenge

Branches

Projects can evolve in multiple directions.

                 Original
                    |
             ┌──────┴──────┐
             ↓             ↓
          Branch A       Branch B
             |
          ┌──┴──┐
          ↓     ↓
         A1     A2

A branch preserves the existing direction while allowing contributors to explore something different.

Remixes

A remix creates a new interpretation of an existing project while maintaining a visible connection to the source.

Passing

A project or contribution can be passed to another person.

Adam → Maya → Rahul → Priya

The recipient can continue, branch, or remix it.

This is the idea behind the name RELAY:

One person starts. Another carries it forward.

Social Recognition

RELAY replaces passive engagement metrics with contribution-based signals such as:

Built on 14 times

Remixed 8 times

31 contributors

7 branches

Passed to 4 people

The goal is to highlight creative influence and participation.

Product Structure

RELAY
│
├── Home
│   └── Feed + active projects
│
├── Explore
│   └── Discover creators + projects
│
├── Create
│   └── Start a new project
│
├── Messages
│   └── Direct + project conversations
│
├── Notifications
│   └── Social + project activity
│
└── Profile
    └── Identity + creations + contributions

Example User Journey

Open RELAY
    ↓
Discover a project in the feed
    ↓
Open the project
    ↓
Build on this
    ↓
Add a contribution
    ↓
Contribution becomes part of the project
    ↓
Pass it to another person
    ↓
They continue, branch, or remix it
    ↓
The project evolves

Visual Design

RELAY uses a warm, light, editorial visual system.

The interface combines:

Warm cream backgrounds

Soft accent colors

Expressive typography

Colorful project artwork

Illustrations

Visual-first cards

Subtle shadows and borders

Smooth transitions

Micro-interactions

The global interface stays restrained while individual projects can have their own visual identity.

The intended feel is:

Friendly · Creative · Social · Modern · Premium

Motion & Interaction

Motion is used primarily as feedback.

Examples:

Project-card hover effects

Page transitions

Custom cursor states

Button micro-interactions

Contribution animations

Branch creation animations

Remix transitions

Scroll reveals

Animated illustrations

Branded loading states

Notification and message transitions

The goal is to make the product feel alive without overwhelming the interface.

Mock Content

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

Mock users, contributions, branches, messages, notifications, timestamps, and activity are used to make the frontend feel populated.

Technology

Layer

Technology

UI

React

Language

TypeScript

Styling

Tailwind CSS

Component animation

Framer Motion

Timeline / scroll animation

GSAP + ScrollTrigger

Additional motion

CSS + SVG animations

State

React local state / Context

Data

Static mock data / in-memory state

Build

Vite

Frontend-Only Scope

RELAY is a hackathon prototype.

There is currently:

No backend

No database

No real authentication

No production API

No real-time collaboration

No push notification infrastructure

The experience is simulated entirely in the browser using mock data and local state.

This keeps the prototype focused on the product concept, interaction model, visual design, and user experience.

Project Structure

relay/
├── src/
├── public/
├── package.json
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json

The application is organized around reusable React components, mock social data, page-level views, and shared UI utilities.

Running Locally

Prerequisites

Node.js 18+

Install

npm install

Start the development server

npm run dev

Open the local URL shown in the terminal.

The prototype runs entirely in the browser and does not require a backend or API keys.

Pages at a Glance

Home

A personalized feed of active projects and social activity from people you follow.

Explore

Discover projects, creators, formats, and active collaborations outside your network.

Project

The core experience: view a project's contributions, branches, remixes, collaborators, and build on it.

Create

Start a new project by choosing a format and adding the first contribution.

Messages

Direct conversations between users and collaborators.

Notifications

Updates for contributions, branches, remixes, follows, and messages.

Profile

A creator's identity, projects, contributions, collaborations, and social graph.

Why RELAY?

The dominant model of social media asks:

What do you think of this?

RELAY asks instead:

What would you add?

That shift — from reaction to contribution — is the idea being explored by the project.

Hackathon Context

Built for:

REIMAGINE SOCIAL — Design the Next Generation of Social Interaction

The prototype focuses on demonstrating:

A different social interaction model

Familiar social-media infrastructure

Contribution-based engagement

Branching and remixing

Direct collaboration

Strong visual identity

Motion and micro-interactions

Responsive frontend behavior

RELAY is a concept prototype, not a production-ready social network.

<div align="center">

RELAY

Start something. Pass it on.

</div>
