# Portfolio Website

Source code for my personal website at [charlesterrenal.com](https://charlesterrenal.com): a minimalist, self-hosted portfolio covering my work in computer engineering, networking, and systems administration.

## Tech Stack

* **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion
* **UI extras:** tsParticles (background), react-zoom-pan-pinch (image viewer), Lucide icons
* **Contact form:** n8n webhook workflow, protected by Cloudflare Turnstile
* **Hosting:** Docker + Nginx, served through Cloudflare
* **CI/CD:** GitHub Actions builds and publishes the image to GitHub Container Registry
* **Environment:** runs on [AHHS (A Humble Home Server)](https://github.com/charlesterrenal/ahhs)

## Local Development

Requires Node.js 20.19+ or 22.12+ (Vite 8).

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Project Structure

* `src/`: React app. `App.jsx` holds the page; `components/` holds the lazy-loaded sections and the image viewer.
* `images/`: images served at `/images/` (copied into the container as-is, not processed by Vite).
* `public/`: files copied to the site root, including `404.html`, `robots.txt` and `sitemap.xml`.
* `Dockerfile`: builds the site with Node, then serves it with Nginx on port 3000.
* `docker-compose.yml`: runs the published image on the server.
* `.github/workflows/`: CI pipeline that builds and pushes the image on every push to `main`.

## Images

Use WebP for photos and screenshots. Keep `og-image.png` as PNG, since some social sites mishandle WebP link previews. Keep full-resolution originals out of the repo.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md).

## Contact

* **Website:** [charlesterrenal.com](https://charlesterrenal.com)
* **LinkedIn:** [linkedin.com/in/charlesterrenal](https://linkedin.com/in/charlesterrenal)
* **Email:** contact@charlesterrenal.com
