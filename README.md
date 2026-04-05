# Real-Time Collaborative Notes Application

## Live Application Links
Frontend (Vercel): https://real-time-notes-app-git-main-shaikhahmed29s-projects.vercel.app/register 
Backend (Render): https://realtimenotesapp-jrke.onrender.com  

---

## Project Overview
This is a full-stack Real-Time Collaborative Notes Application that allows multiple users to create, edit, delete, and collaborate on notes in real time. The application supports authentication, role-based access, activity tracking, search functionality, and public read-only sharing.

---

## Tech Stack
Frontend:
- React
- Axios
- Socket.io Client

Backend:
- Node.js
- Express.js
- Socket.io
- JWT Authentication
- SQLite Database

Deployment:
- Frontend deployed on Vercel
- Backend deployed on Render
- Database: SQLite

---

## Features Implemented

### Authentication & Authorization
- User Registration
- User Login
- JWT-based Authentication
- Role-based access (Admin, Editor, Viewer)
- API access restrictions

### Notes Management
- Create Notes
- Edit Notes
- Delete Notes
- Note ownership
- Last modified timestamp
- Collaborator support

### Real-Time Collaboration
- Multiple users can edit notes
- Live updates using Socket.io
- Real-time synchronization

### Activity Log
- Tracks Create, Update, Delete actions
- Stores user, note, and timestamp

### Search
- Search notes by title
- Search notes by content
- Respects user access permissions

### Public Share
- Public read-only links
- No login required for viewing shared notes

---

## API Endpoints

### Authentication
POST /auth/register  
POST /auth/login  

### Notes
GET /notes  
POST /notes  
PUT /notes/:id  
DELETE /notes/:id  

### Activity Logs
GET /logs  

---

## Database Schema

### Users Table
| Column | Type |
|-------|------|
| Id | INTEGER |
| Name | TEXT |
| Email | TEXT |
| Password | TEXT |
| Role | TEXT |

### Notes Table
| Column | Type |
|-------|------|
| Id | INTEGER |
| Title | TEXT |
| Content | TEXT |
| OwnerId | INTEGER |
| LastModified | DATETIME |
| PublicToken | TEXT |

### ActivityLogs Table
| Column | Type |
|-------|------|
| Id | INTEGER |
| UserId | INTEGER |
| NoteId | INTEGER |
| Action | TEXT |
| Timestamp | DATETIME |

---

## Project Architecture
The React frontend communicates with the Node.js Express backend through REST APIs.  
The backend handles authentication, notes management, activity logging, and real-time communication via Socket.io.  
SQLite database stores users, notes, and activity logs.  
Frontend is deployed on Vercel and backend is deployed on Render.

Architecture Flow:
React Frontend → Node.js Backend → SQLite Database  
Real-time updates handled via Socket.io WebSockets.

---

## Local Setup Instructions

### Backend Setup
```bash
cd backend
npm install
node server.js
