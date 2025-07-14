# 🧩 Jobify Microservices

A scalable, microservices-based Job Portal system where job seekers can connect with companies, apply for jobs, and chat in real-time — all backed by secure JWT authentication and isolated service databases.

---

## 🏗 Architecture

This system follows a true microservice architecture. Each service has its own codebase, database, and responsibility.

```plaintext
[Frontend (React)]
       |
    [API Gateway (optional)]
       |
---------------------------------------------------------
|        |           |            |             |        |
|  auth-service  company-service  seeker-service  chat-service
|        |           |            |             |
|  JWT login    job CRUD     seeker profiles   messaging
|        |           |            |             |
|   PostgreSQL  PostgreSQL    PostgreSQL     PostgreSQL
---------------------------------------------------------
