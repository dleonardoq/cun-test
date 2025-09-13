# Task Manager API

A robust Task Manager API built with Nest.js, PostgreSQL, and Docker following hexagonal architecture principles and SOLID design patterns.

## 🏗️ Architecture

This project implements **Hexagonal Architecture** (also known as Ports and Adapters) to ensure clean separation of concerns and maintainability:

```
src/
├── domain/                 # Business entities and repository interfaces
│   ├── entities/          # Domain entities (User, Task)
│   └── repositories/      # Repository interfaces
├── application/           # Business logic and use cases
│   ├── dtos/             # Data Transfer Objects with validation
│   └── services/         # Application services
└── infrastructure/        # External concerns (DB, HTTP, etc.)
    ├── controllers/      # HTTP controllers
    ├── repositories/     # Repository implementations
    ├── modules/         # Dependency injection modules
    └── filters/         # Exception filters
```

### Key Design Decisions

- **Hexagonal Architecture**: Separates business logic from external concerns
- **SOLID Principles**: Each class has a single responsibility with proper dependency injection
- **Repository Pattern**: Abstracts data access through interfaces
- **DTO Validation**: Input validation using class-validator decorators
- **Soft Delete**: Tasks are marked as deleted rather than physically removed
- **Global Exception Handling**: Consistent error responses across the API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Docker and Docker Compose

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd task-manager-api
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration if needed
```

4. **Start the application with Docker**
```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`

### Development Setup

For local development without Docker:

1. **Start PostgreSQL database**
```bash
docker-compose up postgres -d
```

2. **Run the application in development mode**
```bash
pnpm run start:dev
```

### Running Tests

```bash
# Unit tests
pnpm run test

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Users Endpoints

#### Create User
```http
POST /users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "tasks": []
}
```

#### Get All Users
```http
GET /users
```

**Response (200 OK):**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "tasks": [...]
  }
]
```

#### Get User by ID
```http
GET /users/{id}
```

#### Update User
```http
PUT /users/{id}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### Delete User
```http
DELETE /users/{id}
```

**Response (204 No Content)**

### Tasks Endpoints

#### Create Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "userId": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response (201 Created):**
```json
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "PENDING",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Get All Tasks (with optional filters)
```http
GET /tasks?status=PENDING&userId=123e4567-e89b-12d3-a456-426614174000
```

**Query Parameters:**
- `status`: Filter by task status (`PENDING`, `IN_PROGRESS`, `DONE`)
- `userId`: Filter by user ID

#### Get Tasks by User ID
```http
GET /tasks/user/{userId}?status=IN_PROGRESS
```

#### Get Task by ID
```http
GET /tasks/{id}
```

#### Update Task
```http
PUT /tasks/{id}
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "IN_PROGRESS",
  "description": "Updated description"
}
```

#### Soft Delete Task
```http
DELETE /tasks/{id}
```

**Response (204 No Content)**

#### Restore Task
```http
POST /tasks/{id}/restore
```

### Task Status Values
- `PENDING`: Task is created but not started
- `IN_PROGRESS`: Task is currently being worked on
- `DONE`: Task is completed

### Error Responses

All error responses follow this format:

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "message": ["Validation error message"]
}
```

**Common HTTP Status Codes:**
- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate email)
- `500 Internal Server Error`: Server error

## 🧪 Testing

The project includes comprehensive unit tests for:

- **UserService**: Business logic validation, error handling, CRUD operations
- **TaskController**: HTTP endpoint testing, request/response validation

### Test Structure
```
src/
├── application/services/
│   └── user.service.spec.ts
└── infrastructure/controllers/
    └── task.controller.spec.ts
```

### Running Specific Tests
```bash
# Run specific test file
pnpm test user.service.spec.ts

# Run tests with coverage
pnpm run test:cov
```

## 🐳 Docker Configuration

### Services
- **app**: Nest.js application
- **postgres**: PostgreSQL database

### Environment Variables
```env
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=taskmanager

# Application Configuration
PORT=3000
NODE_ENV=development
```

### Docker Commands Production
```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Rebuild and start
docker compose up --build

# Stop services
docker compose down

# View logs
docker compose logs app
```

### 🔧 Docker Commands Development
```bash
# Start all services
docker compose -f docker-compose.dev.yml up

# Start in background
docker compose -f docker-compose.dev.yml up -d

# Rebuild and start
docker compose -f docker-compose.dev.yml up --build

# Stop services
docker compose -f docker-compose.dev.yml down

# View logs
docker compose -f docker-compose.dev.yml logs app
```

### Project Structure
```
├── src/
│   ├── domain/           # Business entities and interfaces
│   ├── application/      # Use cases and DTOs
│   ├── infrastructure/   # External adapters
│   ├── main.ts          # Application entry point
│   └── app.module.ts    # Root module
├── docker-compose.yml   # Docker services configuration
├── Dockerfile          # Application container
└── package.json        # Dependencies and scripts
```
