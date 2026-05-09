# Ridwan Akinfenwa — Portfolio Website

A professional portfolio website for Ridwan Akinfenwa — Software Engineer, Blockchain Security Researcher, and CEO of Darrell Technologies.

**Live URL:** https://dar-sub.github.io/portfolio

---

## 🏗 Project Structure

```
ridwan-portfolio/
├── index.html               # Homepage (Hero + Services + Projects preview)
├── pages/
│   ├── about.html           # About me + Timeline
│   ├── projects.html        # Full project grid with filters
│   ├── skills.html          # Skill bars + Tech stack
│   └── contact.html         # Contact form + Info
├── css/
│   └── main.css             # Global stylesheet (dark theme, animations)
├── js/
│   └── main.js              # Canvas particles, cursor, reveal animations
├── scripts/
│   └── build.js             # Build pipeline script
├── .github/
│   └── workflows/
│       ├── deploy.yml       # Main CI/CD pipeline (lint → build → deploy)
│       └── preview.yml      # PR preview deployments
├── package.json
└── README.md
```

---

## 🚀 CI/CD Pipeline

This project uses **GitHub Actions** for automated CI/CD. The pipeline has 5 stages:

```
Push to main
    │
    ▼
┌─────────────────────────────────────────────┐
│  JOB 1: Lint & Validate                     │
│  - HTML validation                          │
│  - CSS linting (stylelint)                  │
│  - JS linting (eslint)                      │
│  - Performance budget check                 │
└─────────────────┬───────────────────────────┘
                  │ on success
          ┌───────┴───────┐
          │               │
          ▼               ▼
┌──────────────┐  ┌────────────────────┐
│  JOB 2:      │  │  JOB 3:            │
│  Build &     │  │  Security Scan     │
│  Optimize    │  │  - npm audit       │
│  - Minify    │  │  - Secret scan     │
│  - Copy dist │  └────────────────────┘
└──────┬───────┘
       │ both pass
       ▼
┌─────────────────────────────────────────────┐
│  JOB 4: Deploy to GitHub Pages              │
│  - Uploads /dist artifact                   │
│  - Activates GitHub Pages environment       │
│  - Outputs live URL                         │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  JOB 5: Post-Deploy Smoke Test              │
│  - Lighthouse audit (performance, a11y)     │
│  - Uploads report as artifact               │
└─────────────────────────────────────────────┘
```

### Pull Request Previews

Every PR gets an automatic preview deployment via the `preview.yml` workflow:
- Builds a preview copy of the site
- Deploys to a unique Netlify preview URL
- Posts the URL as a comment on the PR

---

## 🛠 Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/Dar-Sub/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local dev server
npm start
# → Opens at http://localhost:3000
```

### Build

```bash
# Development build
npm run build

# Production build (with optimizations)
npm run build:prod

# Preview production build
npm run preview
# → Opens at http://localhost:3001
```

---

## ☁️ Deployment

### GitHub Pages (Primary — Free)

1. Push code to the `main` branch
2. GitHub Actions automatically triggers the pipeline
3. Site is deployed to `https://<username>.github.io/<repo>`

**Setup Steps:**
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` — the workflow handles the rest

### Alternative: Azure Static Web Apps

```yaml
# Add to deploy.yml for Azure deployment
- name: Deploy to Azure
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_TOKEN }}
    repo_token: ${{ secrets.GITHUB_TOKEN }}
    action: "upload"
    app_location: "/dist"
    skip_app_build: true
```

### Alternative: AWS S3 + CloudFront

```yaml
# Add to deploy.yml for AWS deployment
- name: Deploy to S3
  run: aws s3 sync ./dist s3://${{ secrets.AWS_S3_BUCKET }} --delete
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_DEFAULT_REGION: us-east-1

- name: Invalidate CloudFront cache
  run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
```

---

## 🔒 Required Secrets

| Secret | Description | Required for |
|--------|-------------|--------------|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | PR previews |
| `NETLIFY_SITE_ID` | Netlify site ID | PR previews |
| `AZURE_STATIC_WEB_APPS_TOKEN` | Azure deployment token | Azure deploy |
| `AWS_ACCESS_KEY_ID` | AWS credentials | AWS deploy |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials | AWS deploy |

---

## 📊 Performance

The portfolio is built for performance:
- Pure HTML/CSS/JS — no frameworks, no runtime overhead  
- Particle canvas animation with requestAnimationFrame
- Intersection Observer for lazy scroll reveals  
- CSS variables for consistent theming
- Minified assets in production build

Target Lighthouse scores:
- Performance: **95+**
- Accessibility: **95+**
- Best Practices: **100**
- SEO: **95+**

---

## 👤 Author

**Ridwan Akinfenwa**  
CEO, Darrell Technologies  
Lagos, Nigeria  

- GitHub: [@Dar-Sub](https://github.com/Dar-Sub)  
- LinkedIn: [ridwan-akinfenwa](https://www.linkedin.com/in/ridwan-akinfenwa/)  
- Website: [darrelltechs.com](https://www.darrelltechs.com/)

---

*© 2025 Ridwan Akinfenwa. All rights reserved.*
