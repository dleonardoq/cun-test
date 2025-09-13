# Task Manager API

A robust Task Manager API built with Nest.js, PostgreSQL, and Docker following hexagonal architecture principles and SOLID design patterns.

## 🏗️ Architecture

This project implements **Hexagonal Architecture** (also known as Ports and Adapters) to ensure clean separation of concerns and maintainability:

```
src/
├── domain/                    # Business entities and ports
│   ├── entities/             # Domain entities (User, Task)
│   └── ports/               # Repository interfaces (ports)
├── application/              # Business logic and use cases
│   └── use-cases/           # Application use cases
├── infrastructure/           # External concerns (DB, HTTP, etc.)
│   └── adapters/            # External adapters
│       ├── web/             # HTTP controllers
│       └── persistence/     # Repository implementations & modules
├── shared/                   # Shared components
│   ├── dtos/               # Data Transfer Objects with validation
│   └── enums/              # Enumerations (TaskStatus)
├── app.module.ts            # Root application module
└── main.ts                  # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm
- Docker and Docker Compose

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd test-cun
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


4. **Start the application with Docker in development mode**
```bash
docker compose -f docker-compose.dev.yml up --build
```

The API will be available at `http://localhost:3001`

5. **Start the application with Docker**
```bash
docker compose up --build
```

The API will be available at `http://localhost:3001`


## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

### Users Endpoints

#### Create User
```http
POST /users
Content-Type: application/json

{
  "identifyNumber": 12345678,
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "identifyNumber": 12345678,
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
    "identifyNumber": 12345678,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "tasks": [...]
  }
]
```

#### Get User by Identify Number
```http
GET /users/{identifyNumber}
```

#### Update User
```http
PUT /users/{identifyNumber}
Content-Type: application/json

{
  "identifyNumber": 12345678,
  "name": "Leonardo Quevedo",
  "email": "leo.quevedo@gmail.com"
}
```

#### Delete User
```http
DELETE /users/{identifyNumber}
```

**Response (204 No Content)**

### Tasks Endpoints

#### Create Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the Task Manager API"
}
```

**Response (201 Created):**
```json
{
  "id": "456e7890-e89b-12d3-a456-426614174001",
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "UNNASSIGNED",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "userId": 12345678,
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "identifyNumber": null,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Get All Tasks (with optional filters)
```http
GET /tasks?filter=PENDING
```

**Query Parameters:**
- `filter`: Filter by task status (`PENDING`, `IN_PROGRESS`, `DONE`, `UNNASSIGNED`)

#### Get Tasks by User Identify Number
```http
GET /tasks/user/{identifyNumber}
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
  "status": "PENDING",
  "userId": 1234567
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
- `UNNASSIGNED`: Task is not assigned to any user

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
└── infrastructure/adapters/web/controllers/
    └── task.controller.spec.ts
```

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Run e2e tests
pnpm test:e2e
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
│   ├── domain/              # Business entities and ports
│   │   ├── entities/        # Domain entities (User, Task)
│   │   └── ports/          # Repository interfaces
│   ├── application/         # Use cases and business logic
│   │   └── use-cases/      # Application use cases
│   ├── infrastructure/      # External adapters
│   │   └── adapters/       # Infrastructure adapters
│   │       ├── web/        # HTTP controllers
│   │       └── persistence/ # Database repositories & modules
│   ├── shared/             # Shared components
│   │   ├── dtos/          # Data Transfer Objects
│   │   └── enums/         # Enumerations
│   ├── main.ts            # Application entry point
│   └── app.module.ts      # Root module
├── test/                   # E2E tests
├── utils/                  # Utility files (SQL, HTTP requests)
├── docker-compose.yml      # Docker services configuration
├── docker-compose.dev.yml  # Development Docker configuration
├── Dockerfile             # Application container
├── Dockerfile.dev         # Development container
└── package.json           # Dependencies and scripts
```
