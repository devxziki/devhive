
# DevHive — Engineering Operating Manual

## Overview
DevHive is a developer-first social platform combining social feeds, code sharing, real-time collaboration, and AI-powered tools.

---

## SECTION 1 — FOLDER STRUCTURE

### Frontend (Next.js 14)

- App Router structure
- Feature-based components
- Zustand stores
- TanStack Query services

### Backend (Node.js + Express)

- Modular monolith architecture
- Feature modules (auth, posts, feed, rooms, etc.)
- Prisma + PostgreSQL
- Redis + MongoDB

---

## SECTION 2 — MVP PLAN

### Core Features
- GitHub OAuth Authentication
- User Profiles
- Post Creation (Code + Markdown)
- Feed (Chronological)
- Reactions & Comments
- Real-time Rooms (5 users max)
- Notifications (in-app)
- Search (PostgreSQL FTS)

### Success Metrics
- 1,000 users in 8 weeks
- 25% D7 retention
- 3 posts/user/week

---

## SECTION 3 — TIMELINE (16 Weeks)

Weeks 1–8: MVP Build  
Weeks 9–12: Launch + iteration  
Weeks 13–16: Scaling + AI  

---

## SECTION 4 — TEAM STRUCTURE

- Solo: Focus on core features only
- 2 Devs: FE + BE split
- 5 Devs: Dedicated modules

---

## SECTION 5 — SCALING

0–1K users:
- Single API instance
- Small RDS + Redis

10K users:
- Read replicas
- API scaling

100K users:
- Redis cluster
- WebSocket scaling
- ElasticSearch

1M users:
- DB sharding
- Kafka
- Precomputed feeds

---

## SECTION 6 — LAUNCH

Soft Launch:
- 100–300 users

Public Launch:
- Product Hunt
- Hacker News
- Twitter/X

---

## SECTION 7 — TECH DEBT

- Chronological feed → ranking later
- PG FTS → ElasticSearch later
- Single WebSocket → scale later

---

## SECTION 8 — ENV SETUP

```bash
git clone devhive-frontend
git clone devhive-backend

npm install
npm run dev
```

Requirements:
- Node.js 18+
- Docker
- PostgreSQL
- Redis

---

## END
