# DevHive — FULL TECH STACK DOCUMENTATION

---

## 1. FRONTEND STACK

### Core Framework
- Next.js (App Router)
- React 18
- TypeScript

### State Management
- Zustand (global UI state)
- React Query (server state)

### Styling
- Tailwind CSS
- ShadCN UI

### Editor & UI
- Monaco Editor (code editor)
- TipTap (Markdown editor)

### Networking
- Axios / Fetch API

---

## 2. BACKEND STACK

### Core
- Node.js
- Express.js
- TypeScript

### Authentication
- JWT (Access + Refresh)
- OAuth (Google, GitHub)

### Validation
- Zod

### Architecture
- REST APIs (modular structure)
- Service layer + Controller layer

---

## 3. DATABASE

### Primary DB
- PostgreSQL

### ORM
- Prisma

### Vector DB
- pgvector (for AI search)

---

## 4. CACHE & REALTIME

### Cache
- Redis

### Use Cases
- Session storage
- Feed caching
- Rate limiting

### Realtime
- Socket.io

---

## 5. SEARCH SYSTEM

### Engine
- Elasticsearch

### Features
- Full-text search
- Filters & ranking

---

## 6. AI STACK

### Models
- OpenAI GPT models

### Use Cases
- Code suggestions
- Debugging assistant
- Semantic search

---

## 7. FILE STORAGE

### Cloud Storage
- AWS S3

### CDN
- Cloudflare / AWS CloudFront

---

## 8. JOB QUEUE

### Queue System
- BullMQ

### Use Cases
- Email sending
- Notifications batching
- Background processing

---

## 9. NOTIFICATIONS SYSTEM

### Channels
- WebSocket (real-time)
- Email (async)

---

## 10. DEVOPS & INFRASTRUCTURE

### Containerization
- Docker

### Deployment
- Vercel (frontend)
- AWS EC2 / Railway / Render (backend)

### CI/CD
- GitHub Actions

---

## 11. SECURITY

- HTTPS everywhere
- Rate limiting (Redis)
- Input sanitization
- Helmet.js
- CORS policies

---

## 12. MONITORING & LOGGING

- Winston (logging)
- Sentry (error tracking)
- Prometheus + Grafana (metrics)

---

## 13. TESTING

- Jest (unit testing)
- Supertest (API testing)
- Playwright (E2E)

---

## 14. PROJECT STRUCTURE

backend/
- controllers/
- services/
- routes/
- middleware/

frontend/
- app/
- components/
- store/
- utils/

---

## 15. ENVIRONMENT VARIABLES

- DATABASE_URL
- REDIS_URL
- JWT_SECRET
- OPENAI_API_KEY
- AWS_ACCESS_KEY
- AWS_SECRET_KEY

---

## CONCLUSION

This stack is designed for:
- Scalability
- Real-time collaboration
- AI-powered development tools
- High performance and developer experience

---

END OF DOCUMENT
