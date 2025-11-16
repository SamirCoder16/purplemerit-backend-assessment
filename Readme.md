# UserAuthRBAC

A small, production-ready example showing user authentication and role-based access control (RBAC) using Node.js, Express, MongoDB, Redis, and RabbitMQ. The repository contains a Backend API, a Notification microservice, and (placeholder) Frontend wiring and Docker Compose configuration to run everything together.

## Contents

- `Backend/` — Express API for authentication, RBAC, and user management (MongoDB).
- `NotificationService/` — Background service to send emails (RabbitMQ consumers).
- `docker-compose.yml` — Compose file to start services for local development.

## Highlights

- JWT-based authentication and roles (RBAC).
- MongoDB for persistent user storage.
- Redis for caching / session helpers.
- RabbitMQ for event-driven email notifications.
- Docker + Docker Compose for easy local startup.

## Quick architecture overview

- Client (Frontend) -> Backend API (Express) for auth and protected endpoints.
- Backend publishes events (user registered, forgot password) to RabbitMQ.
- NotificationService consumes those events and sends emails via SMTP.

For code and routes, see:

- `Backend/src/routes/auth.routes.js`
- `Backend/src/controllers/auth.controller.js`
- `NotificationService/src/rabbitmq/*.js`

## Prerequisites

- Docker & Docker Compose (modern versions) installed and running.
- Node.js (v16+ recommended) and npm if you run services locally without Docker.

If you use Windows PowerShell (pwsh) the examples below are ready for your shell.

## Environment variables

Store service-specific variables in `Backend/.env` and `NotificationService/.env`. Below are typical variables used by the services — update values for your environment.

Backend (example `.env`):

```
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/userauth
REDIS_HOST=redis
REDIS_PORT=6379
RABBITMQ_URL=amqp://rabbitmq
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
EMAIL_FROM="My App <no-reply@example.com>"
FRONTEND_URL=http://localhost:3000
```

NotificationService (example `.env`):

```
PORT=3001
RABBITMQ_URL=amqp://rabbitmq
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
EMAIL_FROM="My App <no-reply@example.com>"
```

NOTE: The compose file in this repo names services `mongodb`, `redis`, and `rabbitmq` — the examples above use those hostnames when running with Docker Compose.

## Run everything with Docker Compose (recommended)

From the repository root (PowerShell):

```pwsh
# Build and start all services (attached)
docker-compose up --build

# or start in detached/background mode
docker-compose up --build -d

# To stop and remove containers
docker-compose down
```

If your Docker uses the v2 Compose CLI, you can also run `docker compose up --build`.

## Run services locally (without Docker)

Backend:

```pwsh
cd Backend
npm install
# If package.json exposes a start/dev script, use it. Otherwise run the server directly:
npm run start   # or `npm run dev` if available
# fallback
node src/server.js
```

NotificationService:

```pwsh
cd NotificationService
npm install
npm run start   # or node src/server.js
```

When running locally without Docker, set environment variables in a `.env` file or export them in PowerShell before starting the service (e.g. `$env:JWT_SECRET='...'`).

## API: common endpoints

The backend exposes auth endpoints (see `Backend/src/routes/auth.routes.js`) under a base path such as `/api/auth`. Typical endpoints you will find and can test:

- `POST /api/auth/register` — register a new user (body: name, email, password, role)
- `POST /api/auth/login` — login (returns JWT)
- `POST /api/auth/forgot-password` — send reset link via email (triggers NotificationService)
- `POST /api/auth/reset-password` — reset password using token

Example curl (registration):

```bash
curl -X POST http://localhost:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name":"Test","email":"test@example.com","password":"Pass123"}'
```

Use the JWT returned from login in the `Authorization` header for protected routes:

```
Authorization: Bearer <token>
```

For exact route names and request/response shapes, inspect the route and controller files under `Backend/src/`.

## Logs & debugging

- Docker Compose logs: `docker-compose logs -f` (or `docker-compose logs -f backend` for a single service).
- If you run services locally, logs are emitted to the console by the Node processes.

## Troubleshooting

- MongoDB connection failure: ensure the Mongo container is up or your `MONGODB_URI` is reachable.
- RabbitMQ errors: ensure `RABBITMQ_URL` is correct and the service is up in Docker Compose.
- SMTP/email fails: verify SMTP credentials and that NotificationService has access to SMTP host.
- Port conflicts: change `PORT` env vars or stop the processes using those ports.

## Security & production notes

- Keep `JWT_SECRET` and SMTP credentials out of source control — use environment or secrets manager.
- Use HTTPS and set secure cookie flags in production.
- Consider rate-limiting and brute-force protections on auth endpoints.

## Testing

- Add Postman or HTTP collection for systematic API testing. Postman collection is not included by default.

## Contribution

If you'd like to contribute:

1. Fork the repo and create a branch for your feature/fix.
2. Run the relevant service(s) locally and add tests where appropriate.
3. Open a PR with a clear description of your changes.

## Next steps (suggested)

- Add a `docker-compose.override.yml` for local development conveniences.
- Provide a Postman collection or OpenAPI/Swagger spec.
- Add unit/integration tests and a CI pipeline.

## License

This project does not include a license file. Add `LICENSE` with the license you prefer (MIT is common for examples).

---

If you want, I can also:

- generate a Postman collection for the auth endpoints,
- create a sample `.env.example` files in `Backend/` and `NotificationService/`, or
- add a minimal `README` for the `Backend/` folder with exact env names copied from the code.

Tell me which follow-up you prefer and I'll do it next.

