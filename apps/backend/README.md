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
    
4. **Configure Environment Variables:**
    
    ```env
    # Server Configuration
    NODE_ENV=development
    PORT=3000
    HOST=localhost
    
    # Database
    DB_URI=mongodb://localhost:27017/test-school
    
    # JWT Secrets
    JWT_ACCESS_SECRET=your-super-secret-access-key
    JWT_REFRESH_SECRET=your-super-secret-refresh-key
    JWT_ACCESS_EXPIRES_IN=15m
    JWT_REFRESH_EXPIRES_IN=7d
    
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
    

### Development

```bash
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

## 📚 API Documentation

The API is organized into the following modules:

### 🔐 Authentication (`/api`)

- `POST /auth/register`: Register a new user and send a verification email.
- `GET /auth/verify`: Verify user’s email using a token.
- `POST /auth/login`: Authenticate user and issue JWT tokens.
- `POST /auth/refresh`: Refresh access token using refresh token.
- `POST /auth/forgot-password`: Send password reset link to user’s email.
- `POST /auth/reset-password`: Reset user’s password using a reset token.

### 🔑 OTP (`/api`)

- `POST /otp/send`: Send OTP to user’s email or SMS for verification.
- `POST /otp/verify`: Verify OTP provided by the user.

### 👤 User Management (`/api`)

- `GET /users/me`: Retrieve current user’s profile, including certification level.

### 📝 Assessment (`/api`)

- `POST /assessments/start`: Start a new assessment step based on user eligibility.
- `GET /assessments/:id/questions/:questionId`: Retrieve details of a specific question.
- `POST /assessments/:id/answer/:questionId`: Save user’s answer for a specific question.
- `POST /assessments/:id/submit`: Submit assessment answers and calculate score.
- `GET /assessments`: List user’s completed assessments.

### 📜 Certificate (`/api`)

- `GET /certificates`: Retrieve user’s certificate details.
- `POST /certificates/send`: Send certificate to user’s email (optional).

### 👨‍💼 Admin Panel (`/api`)

- `GET /admin/users`: List all users with pagination (admin only).
- `GET /admin/users/:id`: Retrieve specific user details (admin only).
- `PUT /admin/users/:id`: Update user details, e.g., role or certification level (admin only).
- `DELETE /admin/users/:id`: Delete a user (admin only).
- `GET /admin/questions`: List questions with filters and pagination (admin only).
- `POST /admin/questions`: Add a new question to the pool (admin only).
- `PUT /admin/questions/:id`: Update an existing question (admin only).
- `DELETE /admin/questions/:id`: Delete a question (admin only).
- `GET /admin/config`: Retrieve configuration settings, e.g., time limits (admin only).
- `PUT /admin/config`: Update configuration settings (admin only).

## 🏗️ Project Structure

```
src/
├── app.ts                    # Express app configuration
├── server.ts                 # Server entry point
├── configs/                  # Configuration files
│   ├── envConfig.ts          # Environment variables
│   ├── AppError.ts           # Custom error classes
├── middlewares/              # Express middlewares
│   ├── authMiddleware.ts     # Authentication middleware
│   ├── validateRequest.ts    # Request validation with Zod
│   ├── globalErrorHandler.ts # Error handling
│   ├── notFoundRoute.ts      # 404 handler
├── modules/                  # Feature modules
│   ├── auth/                 # Authentication module
│   ├── user/                 # User management
│   ├── assessment/           # Assessment operations
│   ├── question/             # Question management
│   ├── certificate/          # Certificate generation
│   ├── admin/                # Admin operations
├── models/                   # Mongoose schemas
│   ├── User.ts               # User schema
│   ├── RefreshToken.ts       # Refresh token schema
│   ├── Question.ts           # Question schema
│   ├── Assessment.ts         # Assessment schema
│   ├── Certificate.ts        # Certificate schema
│   ├── Config.ts             # Configuration schema
├── routes/                   # API routes
│   ├── authRoutes.ts         # Authentication routes
│   ├── userRoutes.ts         # User routes
│   ├── assessmentRoutes.ts   # Assessment routes
│   ├── certificateRoutes.ts  # Certificate routes
│   ├── adminRoutes.ts        # Admin routes
├── services/                 # External service integrations
│   ├── emailService.ts       # Nodemailer for email
│   ├── smsService.ts         # Twilio for SMS
├── utils/                    # Utility functions
│   ├── asyncHandler.ts       # Async error handling
│   ├── sendResponse.ts       # Standardized responses
│   ├── logger.ts             # Logging with Pino
│   ├── jwtHelpers.ts         # JWT utilities
│   ├── passwordHandlers.ts   # Password hashing with bcrypt
├── types/                    # TypeScript definitions
│   ├── types.ts              # Common types
│   ├── express/              # Express extensions
│   ├── mongoose/             # MongoDB schemas
│   ├── zod/                  # Validation schemas
└── routes/
    └── index.ts              # Route aggregation
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication with 15-minute access tokens and 7-day refresh tokens.
- **Password Hashing**: Bcrypt with 12 salt rounds for secure password storage.
- **Input Validation**: Zod schema validation for all API inputs.
- **CORS Protection**: Configurable CORS policies for secure API access.
- **Error Handling**: Comprehensive error handling with standardized responses.
- **Optional Secure Exam Environment**: Supports Safe Exam Browser (SEB) integration for secure assessments.

## 📊 Database Schema

### User Model

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

### RefreshToken Model

```typescript
{
  _id: ObjectId;
  token: string; // unique, required
  userId: ObjectId; // reference to Users, required
  expiresAt: Date; // required
  createdAt: Date;
}
```

### Question Model

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

### Assessment Model

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

### Certificate Model

```typescript
{
  _id: ObjectId;
  userId: ObjectId; // reference to Users, unique, required
  level: string; // e.g., 'A1', 'C2', required
  issuedAt: Date; // required
  pdfPath: string; // optional
}
```

### Config Model

```typescript
{
  _id: ObjectId;
  timeLimitStep1: number; // default: 44
  timeLimitStep2: number; // default: 44
  timeLimitStep3: number; // default: 44
}
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DB_URI=mongodb://your-production-db-uri
JWT_ACCESS_SECRET=your-super-secret-access-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES=7d
PASSWORD_HASH_SALT=12
NODEMAILER_HOST=smtp.example.com
NODEMAILER_PORT=587
NODEMAILER_USER=your-email@example.com
NODEMAILER_PASS=your-email-password
TWILIO_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
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

## 🔧 Configuration

### Environment Variables

| Variable                 | Description                      | Default       |
| ------------------------ | -------------------------------- | ------------- |
| `NODE_ENV`               | Environment mode                 | `development` |
| `PORT`                   | Server port                      | `3000`        |
| `HOST`                   | Server host                      | `localhost`   |
| `DB_URI`                 | MongoDB connection string        | Required      |
| `JWT_ACCESS_SECRET`      | JWT access token secret          | Required      |
| `JWT_REFRESH_SECRET`     | JWT refresh token secret         | Required      |
| `JWT_ACCESS_EXPIRES_IN`  | Access token expiry              | `15m`         |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry             | `7d`          |
| `PASSWORD_HASH_SALT`     | Cost rounds for password hashing | `12`          |
| `NODEMAILER_HOST`        | Email server host                | Optional      |
| `NODEMAILER_PORT`        | Email server port                | Optional      |
| `NODEMAILER_USER`        | Email server username            | Optional      |
| `NODEMAILER_PASS`        | Email server password            | Optional      |




## 📝 API Documentation Files

- **[API_Design.md](https://grok.com/chat/API_Design.md)**: Complete API endpoint documentation.
- **[SRS.md](https://grok.com/chat/SRS.md)**: Software Requirements Specification.
- **[Postman Collection: Test_School_API_Collection.json](https://grok.com/chat/Test_School_API_Collection.json)**: Postman collection for testing APIs.
- **[Assessment Flow: Assessment_Flow_Sequence_Diagram.txt](https://grok.com/chat/Assessment_Flow_Sequence_Diagram.txt)**: Sequence diagram for assessment process.

## 🖼️ Diagrams

- **Assessment Flow**: Sequence diagram illustrating the three-step assessment process ([Assessment_Flow_Sequence_Diagram.txt](https://grok.com/chat/Assessment_Flow_Sequence_Diagram.txt)).
- **Database Schema**: Database schema documentation ([database_schema.md](https://grok.com/chat/database_schema.md)).


## 📄 License

MIT License - feel free to use and modify for your projects.