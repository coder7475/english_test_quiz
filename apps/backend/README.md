# Test_School Competency Assessment Platform - Backend API

A robust, scalable REST API for a digital competency assessment platform built with **Express.js**, **TypeScript**, **MongoDB**, and **pnpm**. This backend serves as the core engine for managing users, assessments, questions, certificates, and administrative operations, supporting a three-step evaluation process for digital skills certification (levels A1 to C2).

## 🌟 Features

- **🔐 JWT Authentication**: Secure token-based authentication with access and refresh tokens.
- **👥 Role-based Access Control**: Support for Admin, Student, and Supervisor roles.
- **📝 Three-Step Assessment**: Progressive evaluation with automated scoring and eligibility checks.
- **⏱ Timer System**: Configurable countdown timers with auto-submission on timeout.
- **📚 Question Management**: Admin-controlled question pool (132 questions across 22 competencies).
- **📜 Certification**: Automatic generation of digital certificates with optional email delivery.
- **🛡️ Security**: CORS, input validation with Zod, and optional Safe Exam Browser integration.
- **📝 Comprehensive Logging**: Structured logging with Pino for debugging and monitoring.
- **🏗️ Modular Architecture**: Clean, maintainable codebase structure.

## 🏗️ Architecture

### Core Components

- **Authentication System**: JWT-based authentication with email verification and OTP support.
- **User Management**: Profile management for Students, Admins, and Supervisors.
- **Assessment System**: Three-step evaluation process with question delivery, answer storage, and scoring.
- **Question Management**: CRUD operations for a categorized question pool.
- **Certification System**: Generates and delivers digital certificates.
- **Configuration System**: Manages platform settings, such as assessment time limits.

### Database Models

- **Users**: Stores user profiles, roles, and certification levels.
- **RefreshTokens**: Manages refresh tokens for secure session handling.
- **Questions**: Maintains a pool of 132 questions across 22 competencies and 6 levels.
- **Assessments**: Tracks assessment progress, answers, and scores.
- **Certificates**: Records user certifications with optional PDF paths.
- **Config**: Stores platform settings, such as assessment time limits.

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **MongoDB** >= 5.0
- **Nodemailer/Twilio** (optional, for email/SMS OTP)

### Installation

1. **Navigate to backend directory:**
    
    ```bash
    cd apps/backend
    ```
    
2. **Install dependencies:**
    
    ```bash
    pnpm install
    ```
    
3. **Environment Setup:**
    
    ```bash
    cp .env.example .env
    ```

### Development

```bash
cd apps/backend
# Start development server with hot-reload
pnpm dev

# Build the application
pnpm build

# Start production server
pnpm start

# Linting and formatting
pnpm lint
pnpm format
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication with 15-minute access tokens and 7-day refresh tokens.
- **Password Hashing**: Bcrypt with 12 salt rounds for secure password storage.
- **Input Validation**: Zod schema validation for all API inputs.
- **CORS Protection**: Configurable CORS policies for secure API access.
- **Error Handling**: Comprehensive error handling with standardized responses.
- **Optional Secure Exam Environment**: Supports Safe Exam Browser (SEB) integration for secure assessments.

## 📊 Database Schema

### ER Diagram

[![er_diagram](./ER_Diagram.png)]

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📋 API Response Format

All API responses follow a consistent format:

```typescript
{
  success: boolean;
  statusCode: number;
  message: string;
  data: any | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
```

## 📄 License

MIT License - feel free to use and modify for your projects.