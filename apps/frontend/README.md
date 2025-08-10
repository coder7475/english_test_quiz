# 🧩 Test_School Competency Assessment Platform Frontend

A modern, scalable platform for assessing and certifying digital competencies (levels A1 to C2), built with a TypeScript monorepo architecture using Turborepo. The frontend leverages **React**, **TypeScript**, **Vite**, **Redux**, and **Tailwind CSS**, while the backend uses **Express.js** and **MongoDB**. This system supports a three-step assessment process, secure authentication, question management, and certificate generation.

---

## ✨ Features

- ⚡ **Vite** – Blazing-fast development and build tooling for the frontend.
- ⚛️ **React** with **TypeScript** – Type-safe, modern UI development.
- 🗃️ **Redux Toolkit** – Scalable state management for assessment and user data.
- 🎨 **Tailwind CSS** – Customizable, responsive styling for a seamless UI.
- 🔐 **JWT Authentication** – Secure token-based authentication with OTP support.
- 📝 **Three-Step Assessment** – Progressive evaluation with timer, scoring, and certification.
- 📚 **Question Management** – Admin-controlled question pool (132 questions, 22 competencies, 6 levels).
- 📜 **Certification** – Automatic certificate generation with optional PDF download/email delivery.
- 🛡️ **Security** – Input validation, bcrypt hashing, and optional Safe Exam Browser (SEB) integration.
- ☁️ **Cloudflare** – Ready-to-deploy setup for frontend (Cloudflare Pages) and backend (Node.js hosting).
- 🧹 **ESLint & Prettier** – Opinionated, type-aware linting and formatting for code quality.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended package manager)
- **MongoDB** >= 5.0
- **Resend** (for email OTP)
- **Safe Exam Browser** (optional, for secure exam environment)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/test-school-platform.git
cd test-school-platform
pnpm install
```

### Environment Setup

Copy environment files:

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Frontend
cp apps/frontend/.env.example apps/frontend/.env
```

### Development

Run all applications in development mode:

```bash
pnpm dev
```

Run specific app:

```bash
pnpm dev --filter=frontend
pnpm dev --filter=backend
```

Build for production:

```bash
pnpm build
```

Preview production build locally:

```bash
pnpm preview --filter=frontend
cd apps/backend && pnpm start
```

Deploy to Cloudflare Pages (frontend) or Node.js hosting (backend, e.g., Railway):

```bash
pnpm deploy --filter=frontend
```

---

## 🛠 Tech Stack

- **Frontend**:
    - React 18+
    - TypeScript
    - Vite
    - Redux Toolkit
    - Tailwind CSS
    - Axios (for API requests)
    - Redux Persist
- **Backend**:
    - Express.js
    - TypeScript
    - MongoDB (with Mongoose)
    - JWT
    - Nodemailer/Twilio (optional)
- **Tooling**:
    - Turborepo (monorepo management)
    - ESLint & Prettier
    - Cloudflare Pages (frontend deployment)
    - pnpm (package manager)

---

## 🛡️ Security Features

- **JWT Authentication**: 15-minute access tokens and 7-day refresh tokens.
- **Password Hashing**: Bcrypt with 12 salt rounds.
- **Input Validation**: Prevents injection attacks across API endpoints.
- **Role-Based Access**: Restricts admin endpoints to Admin role.
- **HTTPS**: Ensures secure communication.
- **Optional SEB**: Supports secure exam environments (not in core APIs).

---

## 🚀 Deployment

### Frontend

Deploy to Cloudflare Pages or Vercel:

```bash
cd apps/frontend
pnpm build
pnpm run deploy
```

## 📄 License

This project is licensed under the [MIT License](https://grok.com/chat/LICENSE).