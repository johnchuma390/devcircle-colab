# devcircle-colab
John -  homepage
Ruth  -  portfolio
kiEMA -  SERVICES
NZUKI - FAQ AND CONTACT
MAUNDU - ABOUT

# 5‑Page Website — Git & Collaboration Playbook

**Team:** 5 devs · Stack: HTML/CSS/JS (can add small build tools later) · Pages: `home`, `about`, `services`, `portfolio`, `faq-contact`

---

## 0) Who owns what

* **P1 – Home** → `feature/home`
* **P2 – About** → `feature/about`
* **P3 – Services** → `feature/services`
* **P4 – Portfolio** → `feature/portfolio`
* **P5 – FAQ & Contact** → `feature/faq-contact`

> Backup: Anyone can help anyone, but PR reviews from the page owner are required.

---

## 1) Repo & default branches

* Create GitHub repo: `devcircle-website`
* Default branches:

  * `main` → always deployable (protected)
  * `develop` → integration branch (protected)
* **Protection rules (GitHub → Settings → Branches):**

  * Require PRs into `develop` and `main`
  * Require 2 approvals
  * Require status checks (Prettier/ESLint/Build)
  * Dismiss stale reviews on new commits
  * Disallow force-pushes & direct pushes

---

## 2) Branching model (simple & safe)

```
main           ← releases only
└─ develop     ← integrates features
   ├─ feature/home
   ├─ feature/about
   ├─ feature/services
   ├─ feature/portfolio
   └─ feature/faq-contact
```

**Rules**

* One page = one long‑lived `feature/*` branch
* Small tasks inside a page → short‑lived `task/*` branches off that feature
* Merge direction: `feature/*` → `develop` (via PR) → `main` (release PR)

**Naming**

* `feature/about-hero`
* `task/about-fix-mobile-menu`
* `hotfix/form-submit-bug`

---

## 3) Folder structure (consistent for all)

# 5‑Page Website — Git & Collaboration Playbook

**Team:** 5 devs · Stack: HTML/CSS/JS (can add small build tools later) · Pages: `home`, `about`, `services`, `portfolio`, `faq-contact`

---

## 0) Who owns what

* **P1 – Home** → `feature/home`
* **P2 – About** → `feature/about`
* **P3 – Services** → `feature/services`
* **P4 – Portfolio** → `feature/portfolio`
* **P5 – FAQ & Contact** → `feature/faq-contact`

> Backup: Anyone can help anyone, but PR reviews from the page owner are required.

---

## 1) Repo & default branches

* Create GitHub repo: `devcircle-website`
* Default branches:

  * `main` → always deployable (protected)
  * `develop` → integration branch (protected)
* **Protection rules (GitHub → Settings → Branches):**

  * Require PRs into `develop` and `main`
  * Require 2 approvals
  * Require status checks (Prettier/ESLint/Build)
  * Dismiss stale reviews on new commits
  * Disallow force-pushes & direct pushes

---

## 2) Branching model (simple & safe)

```
main           ← releases only
└─ develop     ← integrates features
   ├─ feature/home
   ├─ feature/about
   ├─ feature/services
   ├─ feature/portfolio
   └─ feature/faq-contact
```

**Rules**

* One page = one long‑lived `feature/*` branch
* Small tasks inside a page → short‑lived `task/*` branches off that feature
* Merge direction: `feature/*` → `develop` (via PR) → `main` (release PR)

**Naming**

* `feature/about-hero`
* `task/about-fix-mobile-menu`
* `hotfix/form-submit-bug`

---

## 3) Folder structure (consistent for all)

DEVcircle-COLAB/
│
├─ partials/
│   ├─ header.html
│   └─ footer.html
│
├─ css/
│   ├─ base.css
│   ├─ layout.css
│   ├─ components.css
│
├─ js/
│   ├─ main.js
│   ├─ partial.js
│   ├─ navbar.js
│   ├─ data-loader.js
│   └─ carousel.js
│
├─ pages/
│   ├─ index.html          ← 🏠 Home Page
│   ├─ about.html
│   ├─ services.html
│   ├─ portfolio.html
│   ├─ faq-contact.html
│
└─ README.md


## 4) Things that must be identical on all pages

**Design system:** (edit in one place → applies everywhere)

* `src/css/tokens.css` – CSS variables:

```css
:root {
  --color-bg:#0d0d0d; --color-text:#f6f6f6; --color-accent:#8a5cff;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --radius:12px;
  --shadow:0 6px 20px rgba(0,0,0,.15);
}
```

* `base.css` – reset, fonts, typography scale.
* `layout.css` – container widths, grid, header/footer placement.
* `components.css` – shared UI (buttons, cards, inputs, alerts).

**Global header & footer (single source):**

* HTML pages include `header` & `footer` placeholders.
* `src/js/components/navbar.js` injects navbar markup into all pages.
* Update once → all pages reflect.

**Shared scripts:**

* `main.js` mounts components (navbar, back-to-top, analytics).
* Avoid page‑specific logic in global files (put in page‑local script tags or `pages/**.js`).

**Assets:**

* Logos, favicons, fonts in `/public` or `/src/assets`; never duplicate per page.

---

## 5) Local setup (everyone)

```bash
# one-time
git clone https://github.com/your-org/devcircle-website.git
cd devcircle-website
npm i           # if you add tooling (optional)

# start work on your page
git checkout -b feature/about origin/develop

# daily sync
git fetch origin
git checkout feature/about
git pull --rebase origin develop  # keep up-to-date without merge noise
```

---

## 6) Commit & PR standards

**Commit format**

```
<type>(scope): short summary

body (why + what changed)
```

Types: `feat`, `fix`, `style`, `docs`, `refactor`, `perf`, `chore`.

Examples:

* `feat(about): add timeline section`
* `fix(nav): correct active link logic on hash routes`

**Pull Requests**

* Target branch: `develop`
* Use the PR template
* Link issue/task (if using Projects/Issues)
* Screenshots for UI changes
* Netlify/Vercel preview link if available

---

## 7) Code review workflow (fast & friendly)

1. Author opens PR from `feature/*` → `develop`.
2. **Reviewers:** page owner + 1 other teammate.
3. Checks must pass (CI, lint, build).
4. Approvals → **Squash merge** into `develop` (keeps history clean).

**Review checklist**

* Accessibility: semantic HTML, labels, focus states, contrast
* Responsiveness: mobile-first, test at 360px/768px/1280px
* Consistency: tokens, typography, spacing, components
* Performance: image sizes, no blocking scripts, defer where possible
* Quality: no inline styles unless justified, no dead CSS/JS

---

## 8) Conflict avoidance (habits)

* Pull with `--rebase` before you start and before pushing.
* Don’t edit shared files casually. If you must, announce on chat.
* Componentize the shared navbar/footer; don’t duplicate markup.
* One person merges a PR at a time. Others wait until CI finishes.
* Prefer **small PRs** (≤300 lines) over giant ones.

---

## 9) Conflict resolution (when it happens)

```bash
# while rebasing or merging
# open each conflicted file, keep desired lines, delete markers <<<<<<< ======= >>>>>>>

# after fixing a file
git add <file>

# continue the rebase/merge
git rebase --continue   # or: git merge --continue

# if it gets messy
git rebase --abort      # or: git merge --abort
```

**Tip:** If a shared file keeps conflicting (e.g., `navbar.js`), nominate 1 owner to refactor it into smaller parts or expose config via JSON.

---

## 10) Definition of Done (DoD) for each page

* [ ] Matches design system (tokens, components)
* [ ] SEO basics: `<title>`, meta description, social tags
* [ ] Lighthouse ≥ 90 (Performance/Accessibility/Best Practices/SEO)
* [ ] Valid HTML (no console errors), images optimized
* [ ] Keyboard navigation works; focus visible
* [ ] Mobile, tablet, desktop checked
* [ ] Content reviewed by at least 1 teammate

---

## 11) CI/CD (minimum viable)

**GitHub Actions** – `.github/workflows/ci.yml`

```yaml
name: CI
on:
  pull_request:
    branches: [develop, main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci || npm i
      - run: npx prettier -c "**/*.{html,css,js}"
      - run: npx eslint . || echo "eslint optional for now"
```

**Preview deploys** – connect to Netlify/Vercel; each PR gets a preview URL.

---

## 12) Shared configs (copy & tweak)

**.editorconfig**

```
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

**.prettierrc**

```json
{ "semi": false, "singleQuote": true, "printWidth": 100 }
```

**CODEOWNERS** (example)

```
# Require owner review per page
/src/pages/index.html      @P1
/src/pages/about.html      @P2
/src/pages/services.html   @P3
/src/pages/portfolio.html  @P4
/src/pages/faq-contact.html @P5
/src/js/components/*       @P1 @P2  # shared
/src/css/*                 @P1 @P2   # shared
```

**pull_request_template.md**

```
## What changed

## Why

## Screenshots / Video

## Checklist
- [ ] Uses tokens & components
- [ ] Responsive (mobile/tablet/desktop)
- [ ] No console errors
- [ ] Accessibility pass (labels/alt/focus)
```

---

## 13) Release process

1. Ensure `develop` is green.
2. Create release PR: `develop` → `main` (name it `release:v1.0.0`).
3. Tag `v1.0.0` on merge; production deploy triggers.
4. Hotfixes: branch from `main` → `hotfix/*` → PR back to `main` and `develop`.

---

## 14) Team rhythm (Africa/Nairobi time)

* **Daily (async):** Stand‑up in chat by 09:30 – What I did / Doing / Blockers
* **Twice weekly (30 min):** Review + merge party (Tue & Fri 17:30)
* **Before merging:** Ask in chat; verify no one else is merging right now.

---

## 15) First‑day checklist

* [ ] Create repo with structure above
* [ ] Add protection rules, CODEOWNERS, PR template
* [ ] Add Prettier/EditorConfig, optional ESLint
* [ ] Connect CI + Preview deploys
* [ ] Create 5 feature branches & assign owners
* [ ] Convert header/footer to shared components
* [ ] Open initial scaffold PRs per page

---

## 16) Useful commands (copy/paste)

```bash
# start a feature branch off develop
git checkout develop && git pull
git checkout -b feature/portfolio

# commit
git add .
git commit -m "feat(portfolio): scaffold gallery grid"

# sync with latest develop (rebase to avoid merge commits)
git fetch origin
git rebase origin/develop

# push & open PR
git push -u origin feature/portfolio
# then open PR in GitHub to merge into develop

# update your feature branch later
git pull --rebase origin develop

# fix conflicts then continue
git add <file>
git rebase --continue
```

---

### Final advice

* Keep shared stuff DRY and owned.
* Merge small and often.
* Automate formatting.
* Talk before touching shared files.
* Preview every PR.

> With this playbook, five people can ship a polished 5‑page site with minimal friction and a clean history.


## 4) Things that must be identical on all pages

**Design system:** (edit in one place → applies everywhere)

* `src/css/tokens.css` – CSS variables:

```css
:root {
  --color-bg:#0d0d0d; --color-text:#f6f6f6; --color-accent:#8a5cff;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --radius:12px;
  --shadow:0 6px 20px rgba(0,0,0,.15);
}
```

* `base.css` – reset, fonts, typography scale.
* `layout.css` – container widths, grid, header/footer placement.
* `components.css` – shared UI (buttons, cards, inputs, alerts).

**Global header & footer (single source):**

* HTML pages include `header` & `footer` placeholders.
* `src/js/components/navbar.js` injects navbar markup into all pages.
* Update once → all pages reflect.

**Shared scripts:**

* `main.js` mounts components (navbar, back-to-top, analytics).
* Avoid page‑specific logic in global files (put in page‑local script tags or `pages/**.js`).

**Assets:**

* Logos, favicons, fonts in `/public` or `/src/assets`; never duplicate per page.

---

## 5) Local setup (everyone)

```bash
# one-time
git clone https://github.com/your-org/devcircle-website.git
cd devcircle-website
npm i           # if you add tooling (optional)

# start work on your page
git checkout -b feature/about origin/develop

# daily sync
git fetch origin
git checkout feature/about
git pull --rebase origin develop  # keep up-to-date without merge noise
```

---

## 6) Commit & PR standards

**Commit format**

```
<type>(scope): short summary

body (why + what changed)
```

Types: `feat`, `fix`, `style`, `docs`, `refactor`, `perf`, `chore`.

Examples:

* `feat(about): add timeline section`
* `fix(nav): correct active link logic on hash routes`

**Pull Requests**

* Target branch: `develop`
* Use the PR template
* Link issue/task (if using Projects/Issues)
* Screenshots for UI changes
* Netlify/Vercel preview link if available

---

## 7) Code review workflow (fast & friendly)

1. Author opens PR from `feature/*` → `develop`.
2. **Reviewers:** page owner + 1 other teammate.
3. Checks must pass (CI, lint, build).
4. Approvals → **Squash merge** into `develop` (keeps history clean).

**Review checklist**

* Accessibility: semantic HTML, labels, focus states, contrast
* Responsiveness: mobile-first, test at 360px/768px/1280px
* Consistency: tokens, typography, spacing, components
* Performance: image sizes, no blocking scripts, defer where possible
* Quality: no inline styles unless justified, no dead CSS/JS

---

## 8) Conflict avoidance (habits)

* Pull with `--rebase` before you start and before pushing.
* Don’t edit shared files casually. If you must, announce on chat.
* Componentize the shared navbar/footer; don’t duplicate markup.
* One person merges a PR at a time. Others wait until CI finishes.
* Prefer **small PRs** (≤300 lines) over giant ones.

---

## 9) Conflict resolution (when it happens)

```bash
# while rebasing or merging
# open each conflicted file, keep desired lines, delete markers <<<<<<< ======= >>>>>>>

# after fixing a file
git add <file>

# continue the rebase/merge
git rebase --continue   # or: git merge --continue

# if it gets messy
git rebase --abort      # or: git merge --abort
```

**Tip:** If a shared file keeps conflicting (e.g., `navbar.js`), nominate 1 owner to refactor it into smaller parts or expose config via JSON.

---

## 10) Definition of Done (DoD) for each page

* [ ] Matches design system (tokens, components)
* [ ] SEO basics: `<title>`, meta description, social tags
* [ ] Lighthouse ≥ 90 (Performance/Accessibility/Best Practices/SEO)
* [ ] Valid HTML (no console errors), images optimized
* [ ] Keyboard navigation works; focus visible
* [ ] Mobile, tablet, desktop checked
* [ ] Content reviewed by at least 1 teammate

---

## 11) CI/CD (minimum viable)

**GitHub Actions** – `.github/workflows/ci.yml`

```yaml
name: CI
on:
  pull_request:
    branches: [develop, main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci || npm i
      - run: npx prettier -c "**/*.{html,css,js}"
      - run: npx eslint . || echo "eslint optional for now"
```

**Preview deploys** – connect to Netlify/Vercel; each PR gets a preview URL.

---

## 12) Shared configs (copy & tweak)

**.editorconfig**

```
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

**.prettierrc**

```json
{ "semi": false, "singleQuote": true, "printWidth": 100 }
```

**CODEOWNERS** (example)

```
# Require owner review per page
/src/pages/index.html      @P1
/src/pages/about.html      @P2
/src/pages/services.html   @P3
/src/pages/portfolio.html  @P4
/src/pages/faq-contact.html @P5
/src/js/components/*       @P1 @P2  # shared
/src/css/*                 @P1 @P2   # shared
```

**pull_request_template.md**

```
## What changed

## Why

## Screenshots / Video

## Checklist
- [ ] Uses tokens & components
- [ ] Responsive (mobile/tablet/desktop)
- [ ] No console errors
- [ ] Accessibility pass (labels/alt/focus)
```

---

## 13) Release process

1. Ensure `develop` is green.
2. Create release PR: `develop` → `main` (name it `release:v1.0.0`).
3. Tag `v1.0.0` on merge; production deploy triggers.
4. Hotfixes: branch from `main` → `hotfix/*` → PR back to `main` and `develop`.

---

## 14) Team rhythm (Africa/Nairobi time)

* **Daily (async):** Stand‑up in chat by 09:30 – What I did / Doing / Blockers
* **Twice weekly (30 min):** Review + merge party (Tue & Fri 17:30)
* **Before merging:** Ask in chat; verify no one else is merging right now.

---

## 15) First‑day checklist

* [ ] Create repo with structure above
* [ ] Add protection rules, CODEOWNERS, PR template
* [ ] Add Prettier/EditorConfig, optional ESLint
* [ ] Connect CI + Preview deploys
* [ ] Create 5 feature branches & assign owners
* [ ] Convert header/footer to shared components
* [ ] Open initial scaffold PRs per page

---

## 16) Useful commands (copy/paste)

```bash
# start a feature branch off develop
git checkout develop && git pull
git checkout -b feature/portfolio

# commit
git add .
git commit -m "feat(portfolio): scaffold gallery grid"

# sync with latest develop (rebase to avoid merge commits)
git fetch origin
git rebase origin/develop

# push & open PR
git push -u origin feature/portfolio
# then open PR in GitHub to merge into develop

# update your feature branch later
git pull --rebase origin develop

# fix conflicts then continue
git add <file>
git rebase --continue
```

---

### Final advice

* Keep shared stuff DRY and owned.
* Merge small and often.
* Automate formatting.
* Talk before touching shared files.
* Preview every PR.

> With this playbook, five people can ship a polished 5‑page site with minimal friction and a clean history.
