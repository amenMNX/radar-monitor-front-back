# Radar Monitoring System - Docker Setup

Run the entire application with Docker Compose.

## Prerequisites

- **Docker** - [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose** - Included with Docker Desktop

Verify installation:
```powershell
docker --version
docker-compose --version
```

## Quick Start

### 1. Build and Start All Services

From the project root directory:

```powershell
docker-compose up --build
```

This will:
- ✅ Build the Spring Boot backend (port 8081)
- ✅ Build the React frontend (port 80)
- ✅ Start both services automatically
- ✅ Connect them via an internal network

### 2. Access the Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8081/api
- **H2 Database Console**: http://localhost:8081/h2-console

### 3. Stop Services

```powershell
docker-compose down
```

---

## Docker Architecture

```
┌─────────────────────────────────────────┐
│          Docker Network                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    frontend (React + Nginx)     │   │
│  │    Port: 80                     │   │
│  │    - Serves React app           │   │
│  │    - Proxies /api to backend    │   │
│  └─────────────────────────────────┘   │
│              ↕                          │
│  ┌─────────────────────────────────┐   │
│  │  backend (Spring Boot)          │   │
│  │  Port: 8081                     │   │
│  │  - REST API                     │   │
│  │  - H2 In-memory Database        │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## Advanced Commands

### View logs
```powershell
docker-compose logs -f
```

### View specific service logs
```powershell
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild without cache
```powershell
docker-compose up --build --no-cache
```

### Run in background
```powershell
docker-compose up -d
```

### Restart services
```powershell
docker-compose restart
```

### Remove all containers and volumes
```powershell
docker-compose down -v
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 80/8081 already in use | Stop other services or change ports in `docker-compose.yml` |
| `docker-compose` command not found | Reinstall Docker Desktop (includes Compose) |
| Backend not healthy | Check logs: `docker-compose logs backend` |
| Frontend showing 404 | Wait for backend to be ready (check healthcheck) |
| Cannot connect to API | Ensure backend service is healthy in Docker dashboard |

---

## File Structure

```
project spring/
├── docker-compose.yml          ← Main configuration
├── backend/
│   ├── Dockerfile              ← Backend image
│   ├── .dockerignore
│   ├── pom.xml
│   ├── src/
│   └── README.md
└── Radar-System-monitoring-main/
    ├── Dockerfile              ← Frontend image
    ├── nginx.conf              ← Nginx configuration
    ├── .dockerignore
    ├── package.json
    ├── src/
    └── README.md
```

---

## Notes

- **Backend**: Multi-stage build for optimized image size
- **Frontend**: Compiled to static assets, served by Nginx with API proxy
- **Networking**: Services communicate via Docker internal network
- **Health checks**: Both services have health checks configured
- **API URL**: Frontend proxies `/api` requests to backend at `http://backend:8081/api`

For more info: https://docs.docker.com/compose/
