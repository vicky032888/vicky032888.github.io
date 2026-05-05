# Vicky Hu — Portfolio Website
**Live URL:** https://vicky032888.github.io

## How to publish to GitHub

### Step 1 — Create the GitHub repository
1. Go to https://github.com/new
2. Repository name: **vicky032888.github.io** (must match exactly)
3. Set to **Public**
4. Click "Create repository"

### Step 2 — Upload files
Option A (easiest — drag & drop):
1. Open the new repository on GitHub
2. Click "uploading an existing file"
3. Drag the entire `portfolio-site` folder contents (index.html + css/ + js/ + images/)
4. Click "Commit changes"

Option B (command line):
```bash
cd /Users/yongweihu/工作/portfolio-site
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/vicky032888/vicky032888.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Repository → Settings → Pages
2. Source: "Deploy from a branch" → main → / (root)
3. Save → wait 2–3 minutes → site is live at https://vicky032888.github.io

---

## How to add your photos

1. Create folder: `images/gallery/`
2. Add photos named: `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg` ... (up to 20)
3. Recommended size: 1200×900px, keep files under 500KB each

## How to add your profile photo

1. Name it `profile.jpg`
2. Put it in the `images/` folder
3. Recommended: square or portrait crop, min 400×400px

## Customisation tips

- Edit colours in `css/style.css` at the top under `:root { ... }`
- Main accent colour (gold): `--accent: #c9a96e`
- All content is in `index.html`
