# Core Space Quick Reference Site

Complete multi-page quick reference for Core Space board game.

## 📁 Site Structure

```
Core Space Quick Reference
├── index.html              - Main hub with overview
├── style.css              - Shared styling (sci-fi dark theme)
├── actions.html           - All 17+ actions with full rules
├── phases.html            - 5 game phases deep dive
├── combat.html            - Complete combat mechanics
├── hostility.html         - Hostility system & events
├── enemies.html           - First Born & NPCs
├── advancement.html       - Skills, equipment & campaign
└── tables.html            - Quick reference tables
```

### 🔧 Character Page Generation

- `data/corespace-data.json` – Shared character/class/skill dataset
- `templates/character-page.html` – HTML scaffold used for every respec page
- `docs/js/character-page.js` – Client-side renderer that builds the page from data
- `generate_character_pages.py` – Script that emits `docs/character-<id>.html` for each character in the dataset

Run `./generate_character_pages.py` after updating the JSON data to regenerate all character pages automatically.

## 🎯 Design Philosophy

**Hub & Spoke Architecture:**
- `index.html` = Standalone one-page overview
- Each section links to comprehensive detail page
- All pages link back to hub
- Consistent visual design throughout

**Information Density:**
- Each page is comprehensive yet focused
- Full rules, not summaries
- Tables, flowcharts, examples
- Print-friendly layouts

## 🎨 Visual Design

**Dark Sci-Fi Theme:**
- Background: Deep blue gradients
- Accents: Red (danger), Blue (player), Purple (enemies), Green (safe)
- Hover effects and animations
- Responsive (desktop/tablet/mobile)
- Print-optimized (switches to white background)

**Color Coding:**
- Red borders: Hostility, danger, warnings
- Blue: Player/trader actions
- Purple: First Born enemies
- Green: Safe/positive
- Orange: Caution

## 📄 Page Details

### 1. Index (Hub)
- Complete at-a-glance game overview
- 7 clickable navigation cards
- Quick stats summary (all 4 stat boxes are clickable!)
- Round sequence flowchart
- Essential rules highlights (all 6 boxes are clickable!)
- Links to all detail pages
- **Interactive:** Hover over any stat box or rule box to see it light up

### 2. Actions Page
**17+ actions organized by category:**
- Movement Actions
- Combat Actions (Ranged, Close, Knock Back)
- Utility Actions (Search, Mine, Persuade, Reload, Interact)
- Maintenance Actions (Clear Jam, Don/Remove Armour, Stand Up, Repair)
- Effortless Actions (5 types)
- Special Mechanics (AoO, Misfires, Ship entry/exit)

### 3. Phases Page
**Deep dive into 5 phases:**
- Hostility Phase (peg addition, event cards, resolution)
- Trader Phase (turn order, activation, actions)
- First Born Phase (arrival, targeting, AI decision tree, Knowledge Die)
- NPC Phase (activation order, behavior, joining crews)
- Assessment Phase (cleanup, end conditions)
- Mission end conditions & winning

### 4. Combat Page
**Complete combat system:**
- Attack resolution flow (7 steps)
- Combat dice mechanics
- Range bands (short/medium/long)
- Line of Sight rules
- Cover system (partial/full)
- Armour types (physical/shield/combat)
- Damage application (traders vs NPCs)
- Special situations (engaged, blast weapons)
- Misfires & jams (all weapon types)

### 5. Hostility Page
**Hostility escalation mechanics:**
- Tracker overview
- All 6 hostility levels (Relaxed → CLEANSE)
- Event card system
- Assistance cards
- Unresolvable cards
- Strategic management tips

### 6. Enemies Page
**First Born & NPCs:**
- All First Born types (Ranks 1-6)
- AI targeting priority
- AI decision tree
- Civilian dice results table
- Game Hunters behavior
- Rock Worms special rules
- True Born boss mechanics (Somnambulant/Awake states)

### 7. Advancement Page
**Skills, Equipment & Campaign:**
- 30+ skills organized by class (Tech, Ranged, Close Combat, Cunning, Stealth, Augmented, Endurance)
- Each skill: All 3 levels, triggers, effects
- Equipment types & icons (30+ icons explained)
- Weapon statistics format
- Armour types
- Campaign post-game sequence (4 phases)
- Extraction, Advancement, Trade, Maintenance
- Career progression table

### 8. Tables Page
**Quick lookup reference:**
- Actions quick reference (18 actions)
- Combat steps table
- Range bands
- Cover effects
- Armour comparison
- Dice symbols
- Misfires by weapon type
- Hostility levels table
- First Born ranks & AI
- NPC activation order
- Civilians dice results
- Rock Worms stats
- Equipment icons (30+ icons)
- Campaign sequence
- Career advancement
- Timing reference
- Edge cases & priority rules
- Key rules summary

## 🔗 Navigation

**Every page includes:**
- Header with clickable title (→ home)
- Breadcrumb navigation
- "Back to Hub" button
- Footer with links to related pages
- Links to Player Flow Guide and LLM Rules Reference

**Breadcrumb format:**
```
Home › Current Page
```

**Footer links:**
```
← Back to Hub | Related Page 1 | Related Page 2 →
```

## 📱 Features

### Responsive Design
- Desktop: Full 3-column layouts where appropriate
- Tablet: 2-column or single column
- Mobile: Stacked single column
- All sizes: Maintains readability

### Print-Friendly
- Switches to white background
- Black text
- Removes navigation elements
- Optimized page breaks
- All tables print correctly

### Interactive Elements
- Hover effects on all cards and tables
- Clickable section headers
- **Clickable stat boxes** - All 4 "At-a-Glance Overview" boxes link to relevant pages
- **Clickable rule boxes** - All 6 "Essential Rules" boxes link to detail pages
- Animated hostility levels
- Color-coded phases
- Visual flowcharts
- Smooth transitions and hover animations throughout

### Accessibility
- High contrast
- Semantic HTML
- Readable fonts
- Clear hierarchy
- Descriptive links

## 📊 Statistics

**Total Pages:** 8 (1 hub + 7 detail pages)
**Total Size:** ~120KB HTML + 9KB CSS
**Lines of HTML:** ~1,400 total

### Individual Page Sizes:
- index.html: 10KB (overview)
- actions.html: 17KB (comprehensive)
- phases.html: 12KB (detailed)
- combat.html: 13KB (complete)
- hostility.html: 4KB (focused)
- enemies.html: 7KB (all types)
- advancement.html: 25KB (largest - all skills)
- tables.html: 23KB (comprehensive reference)
- style.css: 9KB (shared styling)

## 🚀 Usage

### Opening
```bash
open markdown-output/index.html
```
Or double-click `index.html` in Finder.

### Browsing
1. Start at index.html (hub)
2. Click any section to drill down
3. Use breadcrumbs or "Back to Hub" to navigate
4. Use footer links for related pages

### Printing
- Press Ctrl+P or Cmd+P
- Each page prints cleanly
- Tables stay together
- White background auto-applied

### At the Table
- Keep index.html open in one tab (quick overview)
- Open detail pages in additional tabs as needed
- Or print specific pages for reference

## 🎮 Companion Documents

This site complements:
- **Player_Flow_Guide.md** - Step-by-step learning guide (27KB, 967 lines)
- **LLM_Rules_Reference.md** - Complete rules database (64KB, 2,527 lines)

**Together, the three provide:**
- 📘 Learn (Player Flow Guide)
- 📕 Master (LLM Rules Reference)
- ⚡ Play (Quick Reference Site)

## 🔄 Site Map

```
index.html (Hub - Overview)
│
├─→ actions.html (All Actions)
│   ├─ Movement Actions
│   ├─ Combat Actions
│   ├─ Utility Actions
│   ├─ Maintenance Actions
│   └─ Effortless Actions
│
├─→ phases.html (5 Game Phases)
│   ├─ Hostility Phase
│   ├─ Trader Phase
│   ├─ First Born Phase
│   ├─ NPC Phase
│   └─ Assessment Phase
│
├─→ combat.html (Combat Mechanics)
│   ├─ Attack Resolution
│   ├─ Range & LoS
│   ├─ Cover
│   ├─ Armour
│   └─ Special Combat
│
├─→ hostility.html (Hostility System)
│   ├─ Hostility Tracker
│   ├─ 6 Levels
│   └─ Event Cards
│
├─→ enemies.html (First Born & NPCs)
│   ├─ First Born Types (Ranks 1-6)
│   ├─ AI Behavior
│   ├─ NPCs (Civilians, Hunters, Worms)
│   └─ True Born Boss
│
├─→ advancement.html (Skills & Campaign)
│   ├─ 30+ Skills (8 Classes)
│   ├─ Equipment & Icons
│   └─ Campaign System
│
└─→ tables.html (Quick Tables)
    ├─ Actions Table
    ├─ Combat Tables
    ├─ Hostility Tables
    ├─ Enemy Tables
    ├─ Equipment Icons
    └─ Edge Cases
```

## 🎨 Color Reference

### Phases
- Hostility: Red (#e94560)
- Trader: Blue (#5390d9)
- First Born: Purple (#9b59b6)
- NPC: Green (#2ecc71)
- Assessment: Gray (#95a5a6)

### Hostility Levels
- Relaxed: Green (#2ecc71)
- Patrol: Yellow (#f39c12)
- Inspection: Orange (#e67e22)
- Wake: Red (#e74c3c)
- Threat: Dark Red (#c0392b)
- CLEANSE: Blood Red (#8b0000) - Animated pulse!

### UI Elements
- Primary Accent: Cyan (#53a8b6)
- Background: Dark Blue (#16213e → #0f3460 gradient)
- Text: Light Gray (#eee)
- Headers: Red (#e94560)

## 📝 Technical Details

**Built with:**
- Pure HTML5 & CSS3
- No JavaScript dependencies
- No external libraries
- Single shared CSS file
- Semantic markup
- Mobile-first responsive design

**Browser Support:**
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

**Performance:**
- Fast load times (all local files)
- No external resources
- Minimal CSS (9KB)
- Optimized HTML

## 🎯 Next Steps

**To customize:**
1. Edit `style.css` to change colors/fonts
2. Modify individual HTML files for content
3. Add your own pages using same structure

**To extend:**
- Add expansion rules pages
- Create scenario-specific references
- Build character/crew builders
- Add interactive calculators

## 📄 File Locations

All files in: `/Users/robgruhl/Projects/corespace/markdown-output/`

**Main site files:**
```
index.html
style.css
actions.html
phases.html
combat.html
hostility.html
enemies.html
advancement.html
tables.html
```

**Supporting documents:**
```
SITEMAP.md              - Site planning document
Player_Flow_Guide.md    - Learning guide
LLM_Rules_Reference.md  - Complete rules
```

**Archives:**
```
Quick_Reference_Infographic_OLD.html  - Original single-page version
```

---

**Created:** 2025-10-05
**Version:** 2.0 (Multi-page site)
**Based on:** Core Space First Born Rulebook + v2.1 FAQ

**Enjoy your Core Space games!** 🚀
