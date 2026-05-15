# HireHub - Job Portal

HireHub is a full-stack MERN job portal application where employers can post and manage jobs, and candidates can search and apply for jobs.

## Features

### Candidate
- Register and login
- Upload resume
- Browse and search jobs
- Apply for jobs
- Track application status

### Employer
- Register and login
- Create, edit, close, and reopen jobs
- View applicants
- View uploaded resumes
- Update application status

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Bootstrap
- JWT Authentication

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create a `.env` file inside backend folder.

Example:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

## Author

Adarsh C