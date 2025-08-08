# Test_School Competency Assessment Platform

A modern, scalable digital competency assessment platform built with a TypeScript monorepo architecture using Turborepo. This system provides comprehensive functionality for students, supervisors, and administrators to assess and certify digital skills across levels A1 to C2, similar to standardized competency frameworks.

## 🌟 Features

- **🔐 Role-based Authentication**: Secure JWT-based authentication for Students, Supervisors, and Admins.
- **📝 Three-Step Assessment**: Progressive evaluation process for levels A1 to C2 with automated scoring and certification.
- **⏱ Timer System**: Configurable countdown timers with auto-submission on timeout.
- **📚 Question Management**: Admin-controlled question pool with 132 questions across 22 competencies and 6 levels.
- **📜 Certification**: Automatic certificate generation with optional PDF download and email delivery.
- **🏗️ Scalable Architecture**: Modular monorepo structure with shared packages for backend and frontend.
- **🛡️ Security**: Input validation, bcrypt password hashing, and optional Safe Exam Browser (SEB) integration.
- **📊 Admin Dashboard**: User and question management with pagination and configuration controls.

## 🏗️ Architecture

This monorepo contains the following apps and packages:

### 📱 Applications

- **`backend`**: Express.js REST API with MongoDB integration
    - User authentication and authorization with JWT and OTP
    - Three-step assessment management with eligibility checks
    - Question pool management
    - Certificate generation and delivery
    - Admin panel APIs for user and question management
- **`frontend`**: React.js application (using Vite) for the user interface
    - Responsive design with Tailwind CSS
    - Role-based UI components (Student, Admin, Supervisor)
    - Real-time assessment progress and timer updates

### 📦 Shared Packages

- **`@repo/db`**: Database utilities and MongoDB connector with Mongoose
- **`@repo/utils`**: Common utilities including:
    - JWT token management
    - Password hashing with bcrypt
    - Email providers (Nodemailer)
    - SMS providers (Twilio)
    - OTP generation
    - Certificate PDF generation
- **`@repo/ui`**: Shared React component library for consistent UI elements
- **`@repo/assessment`**: Assessment logic utilities for scoring and eligibility checks

### ⚙️ Configuration Packages

- **`@repo/eslint-config`**: ESLint configurations for Vite, React, and Node.js
- **`@repo/prettier-config`**: Prettier formatting configurations
- **`@repo/typescript-config`**: TypeScript configurations for different project types

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) with strict type checking.

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended package manager)
- **MongoDB** >= 5.0
- **Nodemailer/Twilio** (optional, for email/SMS OTP)
- **Safe Exam Browser** (optional, for secure exam environment)

### Installation

1. **Clone the repository:**
    
    ```bash
    git clone https://github.com/your-repo/test-school-platform.git
    cd test-school-platform
    ```
    
2. **Install dependencies:**
    
    ```bash
    pnpm install
    ```
    
3. **Environment Setup:**
    
    ```bash
    # Copy environment files
    cp apps/backend/.env.example apps/backend/.env
    cp apps/frontend/.env.example apps/frontend/.env
    ```
    
4. **Configure Environment Variables:**
    
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
    ```
    
    **Frontend (.env):**
    
    ```env
    VITE_API_BASE_URL=http://localhost:3000
    VITE_PUBLIC_PATH=/
    ```
    

### Development

```bash
# Run all applications in development mode
pnpm dev

# Run only the backend
pnpm backend

# Run specific app
pnpm dev --filter=frontend
pnpm dev --filter=backend
```

### Production Build

```bash
# Build all packages and apps
pnpm build

# Start production server
cd apps/backend && pnpm start
```

## 📚 API Documentation

The backend provides a comprehensive REST API with the following endpoints:

### 🔐 **Authentication APIs**

|Method|Endpoint|Description|
|---|---|---|
|POST|`/api/auth/register`|Register a new user|
|GET|`/api/auth/verify`|Verify user’s email using a token|
|POST|`/api/auth/login`|Login and receive JWTs|
|POST|`/api/auth/refresh`|Refresh access token|
|POST|`/api/auth/forgot-password`|Send password reset link|
|POST|`/api/auth/reset-password`|Reset password using a reset token|

### 🔑 **OTP APIs**

|Method|Endpoint|Description|
|---|---|---|
|POST|`/api/otp/send`|Send OTP to email or SMS|
|POST|`/api/otp/verify`|Verify OTP provided by the user|

### 👤 **User APIs**

|Method|Endpoint|Description|
|---|---|---|
|GET|`/api/users/me`|Get current user profile|

### 📝 **Assessment APIs**

|Method|Endpoint|Description|
|---|---|---|
|POST|`/api/assessments/start`|Start a new assessment step|
|GET|`/api/assessments/:id/questions/:questionId`|Retrieve specific question details|
|POST|`/api/assessments/:id/answer/:questionId`|Save answer for a specific question|
|POST|`/api/assessments/:id/submit`|Submit assessment and calculate score|
|GET|`/api/assessments`|List user’s completed assessments|

### 📜 **Certificate APIs**

|Method|Endpoint|Description|
|---|---|---|
|GET|`/api/certificates`|Retrieve user’s certificate details|
|POST|`/api/certificates/send`|Send certificate to user’s email (optional)|

### 👨‍💼 **Admin APIs**

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

## 🏗️ Project Structure

```
test-school-platform/
├── apps/
│   ├── backend/                  # Express.js API server
│   │   ├── src/
│   │   │   ├── modules/          # Feature modules (auth, user, assessment, etc.)
│   │   │   │   ├── auth/         # Authentication logic
│   │   │   │   ├── user/         # User profile management
│   │   │   │   ├── assessment/   # Assessment management
│   │   │   │   ├── question/     # Question pool management
│   │   │   │   ├── certificate/  # Certificate generation
│   │   │   │   └── admin/       # Admin operations
│   │   │   ├── middlewares/      # Express middlewares (auth, validation)
│   │   │   ├── models/           # Mongoose schemas
│   │   │   ├── routes/           # API routes
│   │   │   ├── services/         # External services (email, SMS)
│   │   │   ├── utils/            # Utility functions
│   │   │   ├── types/            # TypeScript type definitions
│   │   │   └── configs/          # Configuration files
│   │   └── dist/                 # Compiled JavaScript
│   └── frontend/                 # React.js application (Vite)
│       ├── src/
│       │   ├── components/       # Reusable React components
│       │   ├── pages/            # Page components
│       │   ├── redux/            # Redux state management
│       │   ├── styles/           # Tailwind CSS
│       │   ├── App.tsx           # Main app component
│       │   ├── index.tsx         # Entry point
│       ├── public/               # Static assets
│       └── dist/                 # Compiled output
├── packages/
│   ├── db/                       # Database utilities (Mongoose)
│   ├── utils/                    # Shared utilities (JWT, bcrypt, OTP)
│   ├── ui/                       # Shared React components
│   ├── assessment/               # Assessment logic utilities
├── configs/
│   ├── eslint-config/            # ESLint configurations
│   ├── prettier-config/          # Prettier configurations
│   └── typescript-config/        # TypeScript configurations
└── turbo.json                    # Turborepo configuration
```

### Utilities

This Turborepo has additional tools set up for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting
- [Tailwind CSS](https://tailwindcss.com/) for frontend styling
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

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

## 🚀 Deployment

### Backend Deployment

The backend is configured for deployment on platforms like Vercel, Railway, or any Node.js hosting service.

```bash
# Build for production
pnpm build --filter=backend

# Start production server
cd apps/backend && pnpm start
```

### Frontend Deployment

The frontend can be deployed to Vercel, Netlify, or any static hosting service.

```bash
# Build for production
pnpm build --filter=frontend

# Static export (if needed)
pnpm export --filter=frontend
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Run all apps in development
pnpm backend          # Run only backend
pnpm dev --filter=*   # Run specific app

# Building
pnpm build            # Build all packages and apps
pnpm build --filter=* # Build specific package

# Code Quality
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm check-types      # Type check all packages

# Cleaning
pnpm clean            # Clean all build artifacts
```

### Remote Caching

> [!TIP]  
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching, you will need a Vercel account. If you don't have one, [create one](https://vercel.com/signup?utm_source=turborepo-examples), then run:

```bash
# With global turbo installed
turbo login
turbo link

# Without global turbo
pnpm exec turbo login
pnpm exec turbo link
```

## 📝 API Documentation Files

- **[API_Design.md](https://grok.com/chat/apps/backend/API_Design.md)**: Complete API endpoint documentation
- **[SRS.md](https://grok.com/chat/apps/backend/SRS.md)**: Software Requirements Specification
- **[Postman Collection](https://grok.com/chat/apps/backend/Test_School_API_Collection.json)**: Postman collection for testing APIs
- **[Assessment Flow](https://grok.com/chat/apps/backend/Assessment_Flow_Sequence_Diagram.txt)**: Sequence diagram for assessment process
- **[Database Schema](https://grok.com/chat/apps/backend/database_schema.md)**: Database schema documentation

## 🖼️ Diagrams

- **Assessment Flow**: Sequence diagram illustrating the three-step assessment process ([Assessment_Flow_Sequence_Diagram.txt](https://grok.com/chat/apps/backend/Assessment_Flow_Sequence_Diagram.txt)).

## 📄 License

This project is licensed under the [MIT License](https://grok.com/chat/LICENSE).

You are free to use, modify, and distribute this software in accordance with the terms of the MIT License.