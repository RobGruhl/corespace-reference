# CLAUDE.md - AI Assistant Guide for Core Space Reference

## Project Overview

**Core Space Reference** is a quick-reference website for the Core Space First Born board game, hosted on GitHub Pages. It provides instant lookup for game rules, mechanics, character progression tracking, and item inventory during gameplay.

**Live Site**: Hosted via GitHub Pages from the `/docs` folder
**Primary Purpose**: At-table reference during game sessions
**Tech Stack**: Pure HTML5/CSS3 with minimal JavaScript (no frameworks)

---

## Repository Structure

```
corespace-reference/
├── CLAUDE.md                 # This file - AI assistant guide
├── .gitignore                 # Git ignore patterns
├── core-space-skills.csv      # Skills data in CSV format
│
├── .github/
│   └── workflows/
│       ├── claude.yml         # Claude Code GitHub Action (issue/PR triggers)
│       └── claude-code-review.yml  # Automatic PR code review
│
└── docs/                      # GitHub Pages site root
    ├── index.html             # Main hub page
    ├── style.css              # Shared global stylesheet (~9KB)
    ├── character-page.css     # Character tracker specific styles
    │
    ├── # Rule Reference Pages
    ├── actions.html           # All 17+ actions with full rules
    ├── phases.html            # 5 game phases deep dive
    ├── combat.html            # Complete combat mechanics
    ├── hostility.html         # Hostility tracker & events
    ├── enemies.html           # First Born & NPCs
    ├── skills.html            # All 45 skills reference
    ├── skill-detail.html      # Individual skill details
    ├── advancement.html       # Campaign progression system
    ├── tables.html            # Quick reference tables
    ├── inventory.html         # Item inventory with search/filters
    ├── symbols.html           # Item card symbol reference
    │
    ├── # Character Progression Trackers (12 characters)
    ├── character-cassie.html
    ├── character-wade.html
    ├── character-hopper.html
    ├── character-balcor.html
    ├── character-daric.html
    ├── character-qiog.html
    ├── character-yeti.html
    ├── character-lohbac.html
    ├── character-xl.html
    ├── character-laurinda.html
    ├── character-bulworth.html
    │
    ├── js/
    │   ├── character-page.js  # Character tracker client-side logic
    │   ├── inventory.js       # Inventory page functionality
    │   └── inventory-data.js  # Item token data
    │
    ├── data/
    │   ├── corespace-data.json        # Master data: characters, classes, skills
    │   ├── corespace-data-sample.json # Sample/template data
    │   ├── character-class-skills-template.csv
    │   └── CSV_TEMPLATE_GUIDE.md
    │
    ├── images/
    │   ├── skills/            # Skill icon images (45+ PNGs)
    │   └── tokens/            # Item token images organized by expansion
    │       └── first-born/    # First Born expansion tokens
    │
    ├── # Documentation (Markdown Sources)
    ├── README.md              # Site documentation
    ├── SITEMAP.md             # Site structure plan
    ├── CLAUDE.md              # Website-specific guide (subset of this file)
    ├── Core_Space_First_Born.md  # Full rulebook in markdown
    ├── Core_Space_Summary.md     # Rules summary
    ├── CoreSpace_v2.1.md         # FAQ source v2.1
    ├── CSFB_FAQ_v1.1.md          # FAQ markdown
    ├── Hopper_Skills.md          # Hopper character skills reference
    ├── Player_Flow_Guide.md      # Learning guide for new players
    ├── TECH_SPEC_CHARACTER_BUILDER.md  # Technical specification
    └── UX_SPEC_CHARACTER_BUILDER.md    # UX specification
```

---

## Architecture

### Hub & Spoke Design
- **Hub**: `index.html` - Central navigation to all sections
- **Spokes**: Individual detail pages for each game system
- Every page links back to the hub and to related pages

### Data-Driven Components
- Character tracker pages read from `data/corespace-data.json`
- Inventory page uses `js/inventory-data.js` for item tokens
- Character pages use `js/character-page.js` for interactivity

### Persistence
- Character progression saved to **localStorage**
- No server-side storage - all client-side

---

## Development Workflow

### Local Testing
```bash
# Open directly in browser
open docs/index.html

# Or use a local server (recommended for JS-heavy pages)
cd docs && python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Deployment
Changes to the `main` branch automatically deploy via GitHub Pages.
```bash
git add docs/
git commit -m "Update: description of changes"
git push origin main
# Live in 1-2 minutes
```

### Adding New Content

#### New Rule Page
1. Create `docs/new-page.html`
2. Copy structure from existing page (e.g., `actions.html`)
3. Link stylesheet: `<link rel="stylesheet" href="style.css">`
4. Add breadcrumb navigation
5. Add footer links to related pages
6. Update `index.html` navigation grid
7. Update `SITEMAP.md`

#### Updating Character Data
1. Edit `docs/data/corespace-data.json`
2. Test character tracker pages locally
3. Verify localStorage persistence works

#### Adding Skill Icons
1. Add PNG to `docs/images/skills/`
2. Use kebab-case naming (e.g., `brutal-assault.png`)
3. Reference in skills.html or character pages

---

## Code Conventions

### HTML
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`)
- All pages include viewport meta tag for mobile responsiveness
- Breadcrumb format: `Home > Current Page`
- Footer with related page links

### CSS (`style.css`)
- Dark sci-fi theme with gradient backgrounds
- Color-coded by game system:
  - **Hostility**: Red (#e94560)
  - **Trader/Player**: Blue (#5390d9)
  - **First Born**: Purple (#9b59b6)
  - **NPC**: Green (#2ecc71)
  - **Assessment**: Gray (#95a5a6)
- Hostility levels have distinct colors (Green -> Yellow -> Orange -> Red -> Dark Red -> Blood Red)
- Mobile-first responsive design
- Print-friendly `@media print` styles

### JavaScript
- Minimal JS - only for interactive features
- No external frameworks/libraries
- Character pages use localStorage for persistence
- Inventory uses client-side filtering/search

### File Naming
- HTML pages: `kebab-case.html`
- Character pages: `character-{name}.html`
- Images: `kebab-case.png`
- Skill IDs in JSON: `camelCase`

---

## Data Sources

### Official Rules
- **Source of Truth**: Official Core Space First Born rulebook
- **FAQ**: v2.1 FAQ (in `CoreSpace_v2.1.md`)
- If rules are unclear, mark as `[NEEDS VERIFICATION]`

### Master Data File
`docs/data/corespace-data.json` contains:
- **Characters**: 12 playable characters with stats, inherent skills, class boards
- **Classes**: 14 class types with available skills
- **Skills**: 45+ skills with all levels, triggers, effects, peg costs

### Skill Data Structure
```json
{
  "id": "skillId",
  "name": "Skill Name",
  "category": "Category Name",
  "type": "standard|reaction|between-game|mixed",
  "levels": [
    {
      "level": 1,
      "variant": "active|passive|reaction|between-game",
      "isPassive": false,
      "isReaction": false,
      "isBetweenGame": false,
      "description": "What the skill does",
      "trigger": "For reactions - when it triggers",
      "effect": "For reactions - the effect",
      "pegCost": 1
    }
  ],
  "summary": "One-line skill summary"
}
```

---

## Common Tasks

### Fix a Rule Error
1. Verify correct rule in `Core_Space_First_Born.md` or FAQ
2. Update the relevant HTML page
3. Check if `tables.html` needs updates
4. Test locally before committing

### Add a New Skill
1. Add skill data to `docs/data/corespace-data.json`
2. Add skill icon to `docs/images/skills/` (kebab-case.png)
3. Update `skills.html` if needed
4. Update relevant character class boards

### Update Character Stats
1. Edit character in `docs/data/corespace-data.json`
2. Test character tracker page locally
3. Verify skill calculations are correct

### Add Item Tokens
1. Add token image to `docs/images/tokens/{expansion}/`
2. Add item data to `docs/js/inventory-data.js`
3. Test inventory page search/filters

---

## Quality Standards

### Content Accuracy
- Cross-reference with official rulebook
- Check v2.1 FAQ for clarifications
- Never guess - verify or mark as needs verification

### Accessibility
- High contrast color combinations
- Semantic HTML structure
- Alt text for informational images
- Keyboard navigation support

### Performance
- No external dependencies (all local resources)
- Minimal JavaScript
- Optimized images
- Single shared CSS file

### Mobile Responsiveness
- Test at various viewport sizes
- Use browser dev tools to verify
- Tables should scroll horizontally on small screens

---

## GitHub Actions

### claude.yml
Triggers on:
- Issue comments containing `@claude`
- PR review comments containing `@claude`
- New issues with `@claude` in title/body

### claude-code-review.yml
Triggers on:
- Pull request opened or updated
- Provides automatic code review feedback

---

## Troubleshooting

### Links Not Working
- Check file paths (all relative, lowercase)
- GitHub Pages is case-sensitive
- Use `href="page.html"` not `href="/page.html"`

### Styles Not Applied
- Verify `<link rel="stylesheet" href="style.css">`
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check for CSS syntax errors

### Character Tracker Not Saving
- localStorage must be enabled
- Won't work in private/incognito mode
- Check browser console for errors

### Mobile Layout Issues
- Verify viewport meta tag present
- Check CSS breakpoints
- Add `overflow-x: auto` to wide tables

---

## Key Principles

### Design Philosophy
- **Hub & Spoke**: One central page links to focused detail pages
- **Comprehensive**: Full rules, not bullet points
- **At-table First**: Designed for actual gameplay use
- **Print-Friendly**: Each page is useful when printed

### Content Philosophy
- **Accuracy over Speed**: Verify rules before publishing
- **Completeness over Brevity**: Include all edge cases
- **Clarity over Cleverness**: Plain language with examples

### Development Philosophy
- **Test Locally First**: Never push untested changes
- **Commit Often**: Small, logical changes with clear messages
- **Minimal Dependencies**: Pure HTML/CSS/JS, no frameworks
- **Cross-Reference**: Check impact on related pages

---

## Recent Changes

Based on git history:
- Added item card symbols reference page
- Added Barter level 2 description
- Fixed crystal cost label
- Fixed Caaligorn Hunt Rifle stats
- Added token images to inventory system

---

## For AI Assistants

When working on this codebase:

1. **Read before editing**: Always read relevant files before making changes
2. **Check data sources**: Verify game rules in markdown documentation
3. **Test locally**: Provide instructions for local testing
4. **Update related files**: Changes often affect multiple pages
5. **Follow naming conventions**: kebab-case for files, camelCase for JS
6. **Preserve design system**: Use existing color palette and patterns
7. **Keep it simple**: Avoid over-engineering - this is a static site
8. **Document changes**: Clear commit messages describing what and why

### Files to Read First
- `docs/data/corespace-data.json` - Master data
- `docs/style.css` - Design system
- `docs/SITEMAP.md` - Site structure
- Relevant markdown docs for rule verification
