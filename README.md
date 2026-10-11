# FolioForge — Portfolio Builder Prototype

A static, browser-only portfolio builder prototype designed to deploy on Vercel from GitHub.

## Deploy using GitHub → Vercel

1. Create a new GitHub repository named `folioforge-portfolio-builder`.
2. Upload `index.html`, `README.md`, and `vercel.json` to the repository root (not inside another folder).
3. Open https://vercel.com/new and import that GitHub repository.
4. For this static HTML project, leave the framework preset as `Other`; no build command is needed.
5. Keep the root directory as `./` and click Deploy.
6. Vercel will provide a live `*.vercel.app` URL. Later pushes to the connected production branch will trigger redeployment.

## Local preview

Open `index.html` directly in a browser, or use VS Code with Live Server.

## Current prototype scope

- Three templates: Clean, Midnight, and Warm
- Editable profile, skills, projects, contact details, and about text
- Profile image preview
- Desktop/mobile preview
- Browser-local autosave and standalone HTML export

## Important limitations

This is a static frontend prototype. Its data is stored in the current browser only. The Publish button does not publish each visitor's portfolio to its own public URL. User accounts, server/database storage, image hosting, automated portfolio publishing, domain verification/DNS, and a true free-subdomain allocation system require a backend and deployment integration. The Vercel deployment publishes this builder app itself, not every portfolio created inside it.
