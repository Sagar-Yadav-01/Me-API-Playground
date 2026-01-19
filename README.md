# Personal Profile Playground

A production-ready personal profile playground built with Next.js (App Router), MongoDB, and Better Auth.

## Overview

This project serves as a showcase of a "Candidate Profile" (Experience, Skills, Projects) via a REST API and a Next.js frontend. It ensures production-grade practices including:
- **Architecture**: Next.js App Router with Server-Side Rendering (SSR) and Client Components.
- **Database**: MongoDB with Mongoose for schema validation.
- **Security**: **Better Auth** for securing write operations (POST/PUT).
- **Deployment**: Optimized for Vercel.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES6+)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Better Auth (handling API Routes & Middleware)
- **Styling**: Tailwind CSS

## Architecture

```ascii
+-----------------------+       +-------------------+       +-----------------+
|   Next.js Frontend    | <---> | Next.js API Routes| <---> | MongoDB Database|
| (React Server Comps.) |       | (REST Handlers)   |       | (Mongoose ODM)  |
+-----------------------+       +----------+--------+       +-----------------+
                                           |
                                           v
                                    +--------------+
                                    | Better Auth  |
                                    | (Middleware) |
                                    +--------------+
```

## MongoDB Schema

### Profile Model
The system manages a single "Profile" document containing:
- **name**: String
- **email**: String (Unique)
- **education**: Array of Objects `{ institution, degree, year }`
- **skills**: Array of Strings (Indexed)
- **projects**: Array of Objects `{ title, description, links, skills }` (Skills indexed)
- **work**: Array of Objects `{ company, role, duration, description }`
- **links**: Object `{ github, linkedin, portfolio }`

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Instance (Local or Atlas)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   BETTER_AUTH_SECRET=your_secret_key_here
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. **Seed Database**
   Populate the database with initial data:
   ```bash
   node scripts/seed.mjs
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to view the profile.

## API Documentation

### Health Check
- **Endpoint**: `GET /api/health`
- **Response**: `{ "status": "ok" }`

### Profile
- **GET /api/profile**
  - Fetches the candidate profile.
  - **Auth**: Public
  
- **POST/PUT /api/profile**
  - Creates or updates the profile.
  - **Auth**: Required (Bearer Token)
  - **Header**: `Authorization: Bearer <TOKEN>`

### Projects
- **GET /api/projects**
  - List all projects.
  - **Query Params**: `?skill=react` (Filter by skill)

### Skills
- **GET /api/skills/top**
  - Returns list of top-level skills.

### Search
- **GET /api/search?q=query**
  - Search projects by title, description, or skill.

### Sample API Usage (cURL)

**Get Profile:**
```bash
curl http://localhost:3000/api/profile
```

**Filter Projects by Skill:**
```bash
curl "http://localhost:3000/api/projects?skill=Next.js"
```

**Search:**
```bash
curl "http://localhost:3000/api/search?q=dashboard"
```

**Update Profile (Protected):**
```bash
curl -X PUT http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_SESSION_TOKEN>" \
  -d '{"name": "Updated Name"}'
```

## Known Limitations
- The "Sign In" UI is not fully implemented in the frontend as the focus is on the Public View and API playground.
- Authentication relies on Better Auth's session tokens which should be obtained via their client SDK or API flow. For testing, you can inspect the session cookie or use the API to login.

## Authentication Flow
This project uses **Better Auth**.
- **Write Operations** are protected by `lib/auth-guard.js` which verifies the session.
- **Read Operations** are public.

## Deployment
1. Push to GitHub/GitLab.
2. Import project into Vercel.
3. Set Environment Variables (`MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`) in Vercel Dashboard.
4. Deploy.

---
**Resume Link**: [Download Resume](#) (Placeholder)
