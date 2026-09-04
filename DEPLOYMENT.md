# Docker Deployment Guide

## Local Development & Testing

### Build and run locally:
```bash
# Option 1: Docker Compose (Recommended)
docker-compose up --build

# Option 2: Manual Docker commands
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

Visit `http://localhost:3000`

---

## Deployment to Production (AHHS on Proxmox)

### Prerequisites on your server:
- Docker installed
- Docker Compose installed
- Git installed (if pulling from repository)

### Step 1: Get the code on your server
```bash
# Option A: Clone from git
git clone <your-repo-url> /path/to/project
cd /path/to/project

# Option B: Upload manually
scp -r . user@your-server:/path/to/project
```

### Step 2: Deploy with Docker Compose
```bash
cd /path/to/project

# Build and start the container
docker compose up -d

# Check logs
docker compose logs -f

# Stop the container
docker compose down
```

### Step 3: Set up Nginx as reverse proxy (recommended)

Create `/etc/nginx/sites-available/portfolio`:
```nginx
server {
    listen 80;
    server_name charlesterrenal.com;  # Or your domain

    # Redirect HTTP to HTTPS (if using SSL)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Optional - Set up auto-restart
Add to crontab to restart container daily:
```bash
crontab -e
# Add line:
0 3 * * * cd /home/user/portfolio && docker-compose restart
```

---

## Continuous Deployment Workflow

### Method 1: GitHub Actions CI/CD (Recommended)

When code is pushed to `main`, GitHub Actions automatically builds and publishes the production image to GitHub Container Registry (`ghcr.io`).

On your server, pull the pre-built image and recreate the container:

```bash
# Navigate to the project directory where docker-compose.yml resides
cd /path/to/project

# Pull the latest image built by GitHub Actions
docker compose pull

# Recreate and start the container with the updated image
docker compose up -d --force-recreate

# (Optional) Clean up dangling images to free disk space
docker image prune -f
```

---

### Method 2: Local Server Rebuild

If you prefer building the Docker image directly on your host:

```bash
# On your server
cd /path/to/project
git pull
docker compose up -d --build
docker compose logs -f
```

Or use the provided deploy script:
```bash
chmod +x deploy.sh
./deploy.sh restart
```

---

## SSL/HTTPS Setup (Recommended)

Install Certbot and Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d charlesterrenal.com
```

Update Nginx config to:
```nginx
server {
    listen 80;
    server_name charlesterrenal.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name charlesterrenal.com;

    ssl_certificate /etc/letsencrypt/live/charlesterrenal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/charlesterrenal.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        # ... rest of proxy config
    }
}
```

---

## Troubleshooting

### Container won't start:
```bash
docker-compose logs
docker-compose down
docker-compose up --build
```

### Port 3000 already in use:
```bash
# Change port in docker-compose.yml
# Or kill the process:
lsof -i :3000
kill -9 <PID>
```

### Nginx not reaching container:
```bash
# Ensure Docker network is accessible
docker network ls
docker inspect portfolio-network
```

---

## Monitoring

```bash
# View logs
docker-compose logs -f

# Check container status
docker ps -a

# Check resource usage
docker stats

# Restart if needed
docker-compose restart
```
