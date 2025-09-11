-- Initialize database schema
-- This file is executed when the PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The tables will be created automatically by TypeORM synchronization
-- This file is mainly for any initial data or additional configurations

-- You can add initial data here if needed
-- INSERT INTO users (id, email, name, "createdAt") VALUES 
-- (uuid_generate_v4(), 'admin@example.com', 'Admin User', NOW());
