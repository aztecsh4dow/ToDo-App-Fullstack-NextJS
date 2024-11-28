
# ToDo-App-Fullstack-NextJS

Welcome to the **ToDo-App-Fullstack-NextJS**, a lightweight and simple full-stack to-do application built using **Next.js** with both backend and frontend integrated seamlessly.

This project demonstrates the power of Next.js as a complete full-stack framework, incorporating features like authentication, dark mode, and local storage for data persistence.

---

## Table of Contents

- [🌟 Features](#-features)
- [📂 File Structure](#-file-structure)
- [📋 API Endpoints](#-api-endpoints)
- [🛠️ Getting Started](#️-getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone the Repository](#2-clone-the-repository)
  - [3. Install Dependencies](#3-install-dependencies)
  - [4. Set Up Environment Variables](#4-set-up-environment-variables)
  - [5. Run the Development Server](#5-run-the-development-server)
  - [6. Build for Production](#6-build-for-production)
- [🌐 Using the App](#-using-the-app)
- [💡 Notes](#-notes)
- [🧪 Testing](#-testing)
- [📝 License](#-license)
- [📧 Contact](#-contact)

---

## 🌟 Features

- Full authentication system (Register and Login)
- Dark and Light mode
- User-specific to-do lists with different categories
- CRUD operations for to-do items
- Responsive design
- Add, edit, delete, and complete tasks
- Persistent storage using SQLite and in-memory storage
- A clean, modern, and responsive UI
- PWA support with offline capabilities
- Basic testing for API endpoints and utility functions
- Easy-to-understand file structure and codebase

---

## 📂 File Structure

```plaintext
todo-app-fullstack-nextjs/
│
├── public/
│   ├── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── api/                 # Backend API endpoints
│   │   ├── auth/                # Authentication pages
│   │   ├── landing/             # Landing page
│   │   ├── layout.tsx           # Layout for the app
│   │   └── page.tsx             # Homepage
│   │
│   ├── components/              # Reusable components
│   ├── styles/                  # Additional styles
│   └── utils/                   # Utility functions
│
├── .env.local                   # Environment variables
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This README file
```

---

## 📋 API Endpoints

| Method | Endpoint             | Description                       |
|--------|-----------------------|-----------------------------------|
| POST   | `/api/auth/login`    | Log in with username and password |
| POST   | `/api/auth/register` | Register a new user               |
| GET    | `/api/todos`         | Fetch all todos for a user        |
| POST   | `/api/todos`         | Create a new to-do item           |
| PUT    | `/api/todos`         | Update a to-do item               |
| DELETE | `/api/todos`         | Delete a to-do item               |

---

## 🛠️ Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/aztecsh4dow/ToDo-App-NextJS-Fullstack.git
cd ToDo-App-NextJS-Fullstack
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root directory (if required).

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to access the app.

### 6. Build for Production

```bash
npm run build
npm run start
```

---

## 🌐 Using the App

1. **Landing Page**: Introduces the app with options to log in or register.
2. **Authentication**: Register a new user or log in.
3. **To-Do List Management**: Add, edit, delete, or complete tasks.

---

## 💡 Notes

- Uses local storage for user data and to-do items. For scalability, consider integrating a database like MongoDB or PostgreSQL.
- Dark mode toggle managed with React state and applied using Material-UI’s `ThemeProvider`.

---

## 🧪 Testing

Run tests using:

```bash
npm run test
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 📧 Contact

Developed by Aarush. For inquiries, contact [aarushalt1739@gmail.com](mailto:aarushalt1739@gmail.com).
