# Deployment Guide

The site ships as a Docker image. Every push to `main` builds it with GitHub Actions and publishes it to GitHub Container Registry as:

* `ghcr.io/charlesterrenal/personal-website:latest`
* `ghcr.io/charlesterrenal/personal-website:<commit-sha>`

Inside the container, Nginx serves the built site on port **3000**. `docker-compose.yml` publishes it on host port **3001** and restarts it automatically (`restart: unless-stopped`).

---

## Test the production image locally

```bash
docker build -t portfolio .
docker run --rm -p 3000:3000 portfolio
```

Visit `http://localhost:3000`. A missing path such as `/nope` should show the 404 page.

---

## Deploy on the server

Prerequisites: Docker with the Compose plugin, and a copy of `docker-compose.yml` on the server.

```bash
cd /path/to/project

# Pull the latest image built by GitHub Actions
docker compose pull portfolio

# Recreate only the portfolio container
docker compose up -d --force-recreate portfolio

# (Optional) remove old images to free disk space
docker image prune -f
```

Naming the `portfolio` service keeps other services in the same compose file untouched.

### After deploying

Cloudflare may still serve cached copies of old responses. Purge them in the Cloudflare dashboard under **Caching → Configuration**: use **Custom Purge** for specific URLs, or **Purge Everything** for the whole zone.

---

## Exposing the site

The container only listens on host port 3001. Put something in front of it that handles the domain and HTTPS, for example:

* **Cloudflare Tunnel:** point a public hostname at `http://localhost:3001`. No open ports or certificates needed on the server.
* **Reverse proxy (Nginx, Caddy, Traefik):** proxy the domain to `http://localhost:3001` and handle TLS there.

Keep server-specific addresses, hostnames and credentials out of this repo.

---

## Build on the server instead

If you prefer not to use the published image:

```bash
cd /path/to/project
git pull
# docker-compose.yml has no build section, so build under the image name it uses
docker build -t ghcr.io/charlesterrenal/personal-website:latest .
docker compose up -d --force-recreate portfolio
```

---

## Rolling back

Set the image in `docker-compose.yml` to a previous commit's tag:

```yaml
image: ghcr.io/charlesterrenal/personal-website:<commit-sha>
```

Then run:

```bash
docker compose pull portfolio && docker compose up -d portfolio
```

Switch back to `:latest` once the fix is on `main`.

---

## Troubleshooting

```bash
docker compose ps                  # is the container running?
docker compose logs -f portfolio   # follow its logs
docker stats                       # resource usage
```

* **Port 3001 already in use:** change the host side of `ports` in `docker-compose.yml` (for example `"3002:3000"`), then update whatever points at it.
* **Site shows old content after a deploy:** confirm the new image was pulled (`docker compose images`), then purge the Cloudflare cache.
