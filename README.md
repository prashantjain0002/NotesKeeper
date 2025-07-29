

# 🗒️ NotesKeeper

A full-stack notes management application with secure authentication, CRUD features, and modern UI. Built using **React (Vite)**, **TailwindCSS**, **Shadcn UI**, **Express.js**, and **MongoDB**.

![NotesKeeper Banner](https://img.shields.io/badge/Status-Active-brightgreen) ![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)

🔗 **Live Demo** - [https://notes-keeper-lime.vercel.app](https://notes-keeper-lime.vercel.app)

---

## 📌 Table of Contents

- [📦 Tech Stack](#-tech-stack)
- [🖼️ Features](#️-features)
- [📁 Project Structure](#-project-structure)
- [⚙️ Prerequisites](#️-prerequisites)
- [🔐 Environment Setup](#-environment-setup)
- [📥 Installation Guide](#-installation-guide)
- [▶️ Running the Project](#️-running-the-project)
- [🌐 API & Auth Flow](#-api--auth-flow)
- [🚀 Deployment Guide](#-deployment-guide)

---

## 📦 Tech Stack

### **Frontend**
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)

### **Backend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [SendGrid](https://sendgrid.com/) (for emails)
- [Google OAuth](https://console.cloud.google.com/)

---

## 🖼️ Features

- ✅ Login & Signup (Email OTP + Google Login)
- 🔐 Protected routes using JWT
- 📧 OTP email verification via SendGrid
- 🗂️ Create, Read, and Delete Notes
- 🌐 CORS configured for secure cross-origin communication
- 🎨 Modern and responsive UI

---

## 📁 Project Structure



```

noteskeeper/
├── backend/
│   ├── config/        # DB, SendGrid, CORS configs
│   ├── controllers/   # Route logic
│   ├── models/        # User & Note models
│   ├── routes/        # API endpoints
│   ├── utils/         # Token & middleware utils
│   ├── server.js      # Server entry point
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/      # Signup, Login, Dashboard
│   │   ├── components/ # Reusable UI
│   │   └── App.jsx
│   └── .env
└── README.md

````

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- ✅ [Node.js](https://nodejs.org/) (v18+)
- ✅ [MongoDB](https://www.mongodb.com/try/download/community) or MongoDB Atlas
- ✅ [Git](https://git-scm.com/)
- ✅ A [SendGrid](https://sendgrid.com/) account and verified sender email
- ✅ [Google OAuth Credentials](https://console.cloud.google.com/apis/credentials)

---

## 🔐 Environment Setup

Create a `.env` file in both `backend/` and `frontend/`.

### 📂 `backend/.env`
```env
PORT=5000
MONGO_URI=your_mongo_db_uri
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_sender_email
JWT_SECRET=your_jwt_secret
````

### 📂 `frontend/.env`

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 📥 Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/prashantjain0002/noteskeeper.git
cd noteskeeper
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Project

### 🔙 Start Backend Server

```bash
cd backend
npm run dev
```

Runs at: `http://localhost:5000`

### 🔜 Start Frontend App

```bash
cd frontend
npm run dev
```

Runs at: `http://localhost:5173`

---

## 🌐 API & Auth Flow

### ✉️ Email OTP

* User signs up → OTP sent via SendGrid → OTP verified → Account created

### 🔐 Google Login

* OAuth redirect from Google
* Token generated and returned
* Session stored in frontend

### 🧾 Notes API

* `GET /api/notes` → fetch notes
* `POST /api/notes` → create note
* `DELETE /api/notes/:id` → delete note

> All endpoints secured via JWT

---

## 🚀 Deployment Guide

### 🌍 Frontend

You can deploy the frontend on:

* [Vercel](https://vercel.com/)
* [Netlify](https://www.netlify.com/)
* [Render Static Site](https://render.com/)

Make sure to set:

```env
VITE_BACKEND_URL=https://your-backend-url.com
```

### 🌐 Backend

Deploy backend on:

* [Render](https://render.com/)
* [Railway](https://railway.app/)
* [Heroku](https://www.heroku.com/)

Set all `.env` variables in the dashboard

---


## 🙌 Credits

* [Shadcn UI](https://ui.shadcn.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [SendGrid](https://sendgrid.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## ⭐ Show Support

If you found this helpful, give it a ⭐ on GitHub and share it!



