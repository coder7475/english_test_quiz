# 🧩 Test_School Competency Assessment Platform

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
- **Nodemailer/Twilio** (optional, for email/SMS OTP)
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

Configure environment variables:

**Backend (.env):**

```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development
DB_URI=mongodb://127.0.0.1:27017/test-school

# JWT Configuration
JWT_ACCESS_SECRET=your-super-secret-access-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES=7d

# Password Hashing
PASSWORD_HASH_SALT=12

# Email/SMS Services
NODEMAILER_HOST=smtp.example.com
NODEMAILER_PORT=587
NODEMAILER_USER=your-email@example.com
NODEMAILER_PASS=your-email-password
TWILIO_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

**Frontend (.env):**

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_PUBLIC_PATH=/
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

## 📦 Folder Structure

```
test-school-platform/
├── apps/
│   ├── backend/                  # Express.js API server
│   │   ├── src/
│   │   │   ├── app.ts            # Express app configuration
│   │   │   ├── server.ts         # Server entry point
│   │   │   ├── configs/          # Environment and app configs
│   │   │   ├── middlewares/      # Authentication, validation
│   │   │   ├── models/           # Mongoose schemas
│   │   │   ├── routes/           # API routes
│   │   │   ├── services/         # Email, SMS integrations
│   │   │   ├── utils/            # JWT, bcrypt, helpers
│   │   │   ├── types/            # TypeScript definitions
│   │   └── .env.example         # Environment template
│   ├── frontend/                 # React.js application (Vite)
│   │   ├── components.json       # Component configuration
│   │   ├── eslint.config.js      # ESLint configuration
│   │   ├── index.html            # HTML entry point
│   │   ├── src/
│   │   │   ├── App.tsx           # Main app component
│   │   │   ├── main.tsx          # Entry point
│   │   │   ├── assets/           # Static assets
│   │   │   ├── components/       # Reusable components
│   │   │   │   ├── auth/         # Login, register, OTP forms
│   │   │   │   ├── assessment/   # Question display, timer
│   │   │   │   ├── admin/        # User/question management
│   │   │   │   ├── certification/ # Certificate view/download
│   │   │   ├── config/           # App configurations
│   │   │   ├── constants/        # Constants (e.g., API endpoints)
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── index.css         # Global styles
│   │   │   ├── layout/           # Layout components
│   │   │   ├── lib/              # Utility libraries
│   │   │   ├── pages/            # Page components
│   │   │   ├── providers/        # Context providers
│   │   │   ├── redux/            # Redux slices and store
│   │   │   ├── router/           # Routing configuration
│   │   │   ├── services/         # API service calls
│   │   │   └── vite-env.d.ts     # Vite environment types
│   │   ├── tsconfig.json         # TypeScript configuration
│   │   ├── vite.config.ts        # Vite configuration
│   │   └── .env.example         # Environment template
├── packages/
│   ├── db/                       # MongoDB utilities
│   ├── utils/                    # Shared utilities (JWT, bcrypt)
│   ├── ui/                       # Shared React components
│   ├── assessment/               # Assessment logic utilities
├── configs/
│   ├── eslint-config/            # ESLint configurations
│   ├── prettier-config/          # Prettier configurations
│   ├── typescript-config/        # TypeScript configurations
├── turbo.json                    # Turborepo configuration
└── README.md
```

---

## 📚 API Documentation

The backend provides the following REST API endpoints:

### 🔐 Authentication APIs

|Method|Endpoint|Description|
|---|---|---|
|POST|`/api/auth/register`|Register a new user|
|GET|`/api/auth/verify`|Verify email using a token|
|POST|`/api/auth/login`|Login and receive JWTs|
|POST|`/api/auth/refresh`|Refresh access token|
|POST|`/api/auth/forgot-password`|Send password reset link|
|POST|`/api/auth/reset-password`|Reset password using a reset token|

### 🔑 OTP APIs

|Method|Endpoint|Description|
|---|---|---|
|POST|`/api/otp/send`|Send OTP to email or SMS|
|POST|`/api/otp/verify`|Verify OTP provided by the user|

### 👤 User APIs

|Method|Endpoint|Description|
|---|---|---|
|GET|`/api/users/me`|Get current user profile|

### 📝 Assessment APIs

|Method|Endpoint|Description|
|---|---|---|
|POST|`/api/assessments/start`|Start a new assessment step|
|GET|`/api/assessments/:id/questions/:questionId`|Retrieve specific question details|
|POST|`/api/assessments/:id/answer/:questionId`|Save answer for a specific question|
|POST|`/api/assessments/:id/submit`|Submit assessment and calculate score|
|GET|`/api/assessments`|List user’s completed assessments|

### 📜 Certificate APIs

|Method|Endpoint|Description|
|---|---|---|
|GET|`/api/certificates`|Retrieve user’s certificate details|
|POST|`/api/certificates/send`|Send certificate to user’s email (optional)|

### 👨‍💼 Admin APIs

|Method|Endpoint|Description|
|---|---|---|
|GET|`/api/admin/users`|List all users with pagination|
|GET|`/api/admin/users/:id`|Get specific user details|
|PUT|`/api/admin/users/:id`|Update user details|
|DELETE|`/api/admin/users/:id`|Delete a user|
|GET|`/api/admin/questions`|List questions with filters and pagination|
|POST|`/api/admin/questions`|Add a new question|
|PUT|`/api/admin/questions/:id`|Update an existing question|
|DELETE|`/api/admin/questions/:id`|Delete a question|
|GET|`/api/admin/config`|Retrieve configuration settings|
|PUT|`/api/admin/config`|Update configuration settings|

For detailed API documentation, see [API_Design.md](https://grok.com/chat/apps/backend/API_Design.md).

---

## 📊 Database Schema

### Users

```typescript
{
  _id: ObjectId;
  email: string; // unique, required
  password: string; // hashed, required
  role: 'Admin' | 'Student' | 'Supervisor'; // required
  isVerified: boolean; // default: false
  verificationToken: string; // optional
  verificationTokenExpiresAt: Date; // optional
  resetPasswordToken: string; // optional
  resetPasswordTokenExpiresAt: Date; // optional
  certificationLevel: string; // optional, e.g., 'A1', 'C2'
  createdAt: Date;
  updatedAt: Date;
}
```

### RefreshTokens

```typescript
{
  _id: ObjectId;
  token: string; // unique, required
  userId: ObjectId; // reference to Users, required
  expiresAt: Date; // required
  createdAt: Date;
}
```

### Questions

```typescript
{
  _id: ObjectId;
  competency: string; // required, one of 22 competencies
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // required
  text: string; // required
  options: string[]; // required, array of 4 options
  correctAnswer: number; // required, 0-based index
}
```

### Assessments

```typescript
{
  _id: ObjectId;
  userId: ObjectId; // reference to Users, required
  step: number; // 1, 2, or 3, required
  questions: ObjectId[]; // 44 question references, required
  answers: (number | null)[]; // 44 elements, selected option or null, required
  startTime: Date; // required
  endTime: Date; // optional
  timeLimit: number; // minutes, required
  score: number; // percentage, optional
  status: 'in_progress' | 'completed'; // required
}
```

### Certificates

```typescript
{
  _id: ObjectId;
  userId: ObjectId; // reference to Users, unique, required
  level: string; // e.g., 'A1', 'C2', required
  issuedAt: Date; // required
  pdfPath: string; // optional
}
```

### Config

```typescript
{
  _id: ObjectId;
  timeLimitStep1: number; // default: 44
  timeLimitStep2: number; // default: 44
  timeLimitStep3: number; // default: 44
}
```

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
pnpm build --filter=frontend
pnpm deploy --filter=frontend
```

### Backend

Deploy to Railway, Heroku, or any Node.js hosting service:

```bash
pnpm build --filter=backend
cd apps/backend && pnpm start
```

---

## 🛠 Available Scripts

```bash
# Development
pnpm dev              # Run all apps
pnpm dev --filter=*   # Run specific app

# Building
pnpm build            # Build all apps
pnpm build --filter=* # Build specific app

# Code Quality
pnpm lint             # Lint all packages
pnpm format           # Format code
pnpm check-types      # Type check

# Cleaning
pnpm clean            # Clean build artifacts
```

---

## 📝 Documentation Files

- **[API_Design.md](https://grok.com/chat/apps/backend/API_Design.md)**: API endpoint details
- **[SRS.md](https://grok.com/chat/apps/backend/SRS.md)**: Software Requirements Specification
- **[Postman Collection](https://grok.com/chat/apps/backend/Test_School_API_Collection.json)**: API testing collection
- **[Assessment Flow](https://grok.com/chat/apps/backend/Assessment_Flow_Sequence_Diagram.txt)**: Assessment process diagram
- **[Database Schema](https://grok.com/chat/apps/backend/database_schema.md)**: Database schema documentation



## 📄 License

This project is licensed under the [MIT License](https://grok.com/chat/LICENSE).