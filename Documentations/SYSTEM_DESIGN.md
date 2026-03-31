# DevHive System Design Document

## SECTION 1 --- HIGH LEVEL ARCHITECTURE

### 1.1 Architecture Decision: Modular Monolith First

DevHive will initially be built as a **modular monolith** using
Node.js + Express.

A modular monolith means the application runs as a single deployable
service but is internally separated into well-defined modules with
strict boundaries. Each module owns its logic, database access layer,
and services.

This approach is chosen because:

• Early-stage teams move faster with a single deployable system\
• Avoids operational complexity of microservices\
• Easier debugging and local development\
• Reduced infrastructure cost\
• Clear upgrade path to microservices later

Modules defined from day one:

Auth\
Users\
Posts\
Feed\
Reactions\
Comments\
Follows\
Rooms\
Editor\
Chat\
Threads\
Notifications\
Search\
AI\
Media\
FocusMode

When scaling reaches **\~100k users**, the following modules are
extracted:

1.  Feed Service
2.  Real-time Collaboration Service
3.  Search Service
4.  Notification Service

------------------------------------------------------------------------

### 1.2 System Architecture Diagram

    Users (Browser / Mobile)
            |
            v
       Cloudflare DNS + DDoS
            |
            v
       Vercel Edge CDN
            |
            v
     AWS Application Load Balancer
            |
            v
      API Server (Node.js / Express)
            |
            |---- Redis (Cache + PubSub)
            |
            |---- PostgreSQL (Primary DB)
            |        |
            |        ---- Read Replica
            |
            |---- MongoDB (Chat + Collab Snapshots)
            |
            |---- ElasticSearch (Search Index)
            |
            |---- BullMQ Worker Queue
            |
            |---- AWS S3 (Media Storage)
            |
            |---- OpenAI API (AI features)
            |
            |---- Resend Email Service

WebSocket server runs as a separate process communicating through Redis
Pub/Sub.

------------------------------------------------------------------------

### 1.3 Module Breakdown

Auth Module\
Handles registration, login, OAuth, JWT issuance.

Users Module\
Manages profile data and developer timeline.

Posts Module\
Responsible for code snippet posts and markdown posts.

Feed Module\
Generates personalized feed using follows and tags.

Rooms Module\
Manages collaboration room lifecycle.

Editor Module\
Handles real-time code editing operations.

Chat Module\
Handles room messaging.

Threads Module\
Manages StackOverflow-style discussions.

Notifications Module\
Push notifications and email alerts.

Search Module\
ElasticSearch integration.

AI Module\
Handles AI debugging suggestions and semantic search.

Media Module\
Handles file uploads to S3.

FocusMode Module\
Distraction-free UI mode logic.

------------------------------------------------------------------------

## SECTION 2 --- FRONTEND ARCHITECTURE

Framework: **Next.js 14 with App Router**

Reasons:

• Built-in server components • API route support • SEO-friendly pages •
Automatic code splitting • Integrated SSR/ISR

### Folder Structure

    devhive-frontend
    app/
       (auth)/
          login
          register
       (main)/
          feed
          post
          profile
       (collab)/
          room
    components/
    hooks/
    store/
    lib/
    services/
    utils/

------------------------------------------------------------------------

## SECTION 3 --- BACKEND ARCHITECTURE

Backend stack:

Node.js\
Express.js\
TypeScript\
Socket.io

### Backend Folder Structure

    devhive-backend
    src/
     modules/
       auth/
       users/
       posts/
       feed/
       rooms/
       chat/
       threads/
       search/
       ai/
     shared/
     middleware/
     config/
     utils/
     workers/

------------------------------------------------------------------------

## SECTION 4 --- DATABASE DESIGN

### Database Responsibilities

PostgreSQL

• users • posts • comments • reactions • follows • notifications

MongoDB

• chat messages • collaboration snapshots • editor operations

Redis

• caching • session store • pub/sub

ElasticSearch

• search indexes

------------------------------------------------------------------------

### Example SQL Schema

Users Table

``` sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Posts Table

``` sql
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  language VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

------------------------------------------------------------------------

## SECTION 5 --- REAL TIME SYSTEM

Socket.io used for WebSocket infrastructure.

Namespaces

    /rooms
    /chat
    /presence

### WebSocket Events

client → server

room:join\
room:leave\
editor:operation\
chat:message-send

server → client

room:user-joined\
room:user-left\
editor:operation\
chat:message-received\
presence:update

------------------------------------------------------------------------

## SECTION 6 --- AUTHENTICATION

Authentication uses **JWT Access + Refresh Tokens**.

Access Token TTL: 15 minutes\
Refresh Token TTL: 7 days

Tokens stored in **httpOnly cookies**.

Password hashing:

bcrypt with 12 salt rounds.

OAuth Providers

GitHub OAuth\
Google OAuth

------------------------------------------------------------------------

## SECTION 7 --- REST API DESIGN

Example endpoints

POST /api/v1/auth/register\
POST /api/v1/auth/login\
POST /api/v1/posts\
GET /api/v1/feed\
POST /api/v1/rooms\
GET /api/v1/search

Pagination: **cursor based pagination**.

------------------------------------------------------------------------

## SECTION 8 --- CACHING STRATEGY

Redis caching layer.

Examples

User profile cache\
Key: user:{id}\
TTL: 3600

Feed cache\
Key: feed:{userId}\
TTL: 120 seconds

Post cache\
Key: post:{postId}\
TTL: 600 seconds

------------------------------------------------------------------------

## SECTION 9 --- FILE STORAGE

Media stored in AWS S3.

Bucket structure

    devhive-media
    avatars/
    post-images/
    code-files/
    room-recordings/

Uploads use **pre-signed S3 URLs**.

------------------------------------------------------------------------

## SECTION 10 --- SEARCH ARCHITECTURE

ElasticSearch indexes

devhive_posts\
devhive_users\
devhive_tags

Search types

• keyword search\
• tag search\
• user search\
• semantic AI search

------------------------------------------------------------------------

## SECTION 11 --- BACKGROUND JOBS

Queue system: **BullMQ + Redis**

Jobs

send-verification-email\
index-post-to-search\
generate-ai-embedding\
fan-out-feed-update\
cleanup-expired-sessions

------------------------------------------------------------------------

## SECTION 12 --- DEPLOYMENT

Infrastructure on AWS.

Services used

EC2\
RDS PostgreSQL\
ElastiCache Redis\
S3\
CloudFront\
ElasticSearch\
Application Load Balancer

------------------------------------------------------------------------

## SECTION 13 --- SCALABILITY PLAN

1k Users

Single API server\
Single DB instance

10k Users

Add Redis cache\
Add background workers

100k Users

Add read replica\
Separate WebSocket servers

1M Users

Split microservices\
Feed service Search service Realtime service

------------------------------------------------------------------------

## SECTION 14 --- SECURITY

Security protections implemented

XSS Protection

• DOMPurify sanitization

CSRF Protection

• CSRF tokens with cookies

SQL Injection

• Parameterized queries

Rate Limiting

Auth endpoints: 10 requests/min\
API read endpoints: 100 requests/min

Security Headers

Strict-Transport-Security\
X-Frame-Options: DENY\
X-Content-Type-Options: nosniff
