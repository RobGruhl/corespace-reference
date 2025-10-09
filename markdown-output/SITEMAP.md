# Core Space Quick Reference - Sitemap

## Site Structure

```
index.html (Main Quick Reference - Hub)
├── actions.html (All Actions in Detail)
├── phases.html (5 Game Phases Deep Dive)
├── combat.html (Complete Combat Mechanics)
├── hostility.html (Hostility System & Events)
├── enemies.html (First Born + NPCs)
├── advancement.html (Skills, Equipment, Campaign)
└── tables.html (Quick Reference Tables)
```

---

## Page Specifications

### 1. **index.html** - Main Hub (Already Created, Will Enhance)
- Quick overview of entire game
- Links to all detail pages
- "At a glance" reference
- Visual round flow
- **Enhancements:** Make all section headers clickable links

---

### 2. **actions.html** - Actions Detail Page

**Content:**
- All 17+ actions with full rules
- Each action shows:
  - Cost (action points or effortless)
  - Requirements
  - Step-by-step procedure
  - Restrictions
  - Edge cases
  - Examples
- Organized by category:
  - Movement Actions
  - Combat Actions
  - Utility Actions
  - Effortless Actions
- Special sections:
  - Attacks of Opportunity
  - Misfires
  - Prone/Defeated restrictions
- Visual flow charts for complex actions

---

### 3. **phases.html** - Game Phases Deep Dive

**Content:**
- Each of 5 phases gets detailed section:
  - **Hostility Phase**
    - Adding pegs (multiplayer rules)
    - Event card resolution
    - Assistance cards
    - Unresolvable cards
  - **Trader Phase**
    - Turn order
    - Activation sequence
    - Action selection
    - First player rules
  - **First Born Phase**
    - Arrival mechanics
    - Entry point determination
    - Activation order (by rank)
    - AI decision tree
    - Knowledge Die
  - **NPC Phase**
    - NPC types and order
    - Target priorities
    - Special behaviors
  - **Assessment Phase**
    - Cleanup steps
    - End-of-round effects
    - Turn counter rotation
- Visual timeline
- Phase interaction rules

---

### 4. **combat.html** - Complete Combat Mechanics

**Content:**
- **Attack Resolution Flow**
  - Dice rolling
  - Hit calculation
  - Modifier application order
  - Damage dealing
- **Line of Sight**
  - Drawing LoS rules
  - Character height
  - Terrain blocking
  - Friendly assistance
- **Cover System**
  - Measuring obscuration
  - Partial vs full cover
  - Cover from multiple sources
- **Range Bands**
  - Short/Medium/Long
  - Measuring range
  - First Born unlimited range
- **Armour**
  - Physical armour mechanics
  - Shield armour mechanics
  - Multiple armour sources
  - Combat armour
- **Dice Mechanics**
  - Combat dice (blue + red)
  - Symbols and effects
  - Re-rolls
- **Special Combat**
  - Blast weapons
  - Engaged character shooting
  - Attacks of opportunity
  - Misfires
- Visual diagrams for LoS and cover

---

### 5. **hostility.html** - Hostility System

**Content:**
- **Hostility Tracker Mechanics**
  - How it increases
  - How it (rarely) decreases
  - Peg placement rules
  - Multiplayer scaling
- **Hostility Levels**
  - All 6 levels in detail
  - What happens at each level
  - First Born arrival charts
  - Event card intensity
- **Event Cards**
  - How to resolve
  - Assistance cards
  - Unresolvable cards
  - Deck reshuffling
- **Strategic Considerations**
  - Managing hostility
  - First shot each round
  - When to escape
- **CLEANSE Mechanics**
  - Charged First Born stats
  - Endless waves
  - Survival strategies
- Visual hostility timeline

---

### 6. **enemies.html** - First Born & NPCs

**Content:**
- **First Born Section**
  - All First Born types (Rank 1-6)
  - Statistics for each
  - Special abilities
  - AI behavior patterns
  - Targeting priorities
  - Knowledge Die effects
  - Drones (arrival, activation)
  - True Born (complete rules)
- **NPC Section**
  - Civilians
  - Game Hunters
  - Gangers
  - Security
  - Galactic Corps
  - Rock Worms
- **For Each Enemy Type:**
  - Stats
  - Activation rules
  - Target priorities
  - Special mechanics
  - Joining crews (if applicable)
- **AI Charts**
  - First Born AI flowchart
  - NPC behavior tables
- Visual enemy gallery with quick stats

---

### 7. **advancement.html** - Skills, Equipment & Campaign

**Content:**
- **Skills Section**
  - All skills alphabetically
  - Passive vs Active vs Reaction
  - Using skills
  - Skill peg management
  - Complete skill descriptions
- **Equipment Section**
  - Weapons (ranged, close)
  - Armour types
  - Special items
  - Equipment icons glossary
  - Item management
  - Rotating tokens
  - Exclusive items
- **Campaign Section**
  - Post-game sequence
  - Extraction phase
  - Advancement phase
  - Trade phase
  - Maintenance phase
  - Career progression
  - Ship management
  - Hiring crew
- Tables for:
  - Weapon stats
  - Armour values
  - Skill costs
  - Trading posts

---

### 8. **tables.html** - Quick Reference Tables

**Content:**
- **Action Cost Table** (all actions, costs, restrictions)
- **Range Bands Table**
- **Cover Effects Table**
- **Dice Symbols Table**
- **Hostility Levels Table**
- **First Born Ranks Table**
- **NPC Target Priorities**
- **Terrain Types**
- **Common Modifiers**
- **Edge Cases & Clarifications**
- **FAQ Integration**
- **Timing Reference** (immediate, after, before, etc.)
- **Icon Glossary** (all symbols explained)
- Searchable/filterable if possible
- Print-optimized layout

---

## Navigation Structure

**Every page includes:**
- Header with site title
- Breadcrumb navigation (Home > Current Page)
- Main content area
- Sidebar with quick links to other pages
- Footer with links to markdown guides
- "Back to Home" button (prominent)

**Visual Design:**
- Consistent color scheme (dark sci-fi)
- Same CSS styling across all pages
- Responsive layout
- Print-friendly
- Interactive elements where helpful

---

## Implementation Plan

1. ✅ Create sitemap specification (this file)
2. Update index.html with navigation links
3. Create shared CSS file for consistency
4. Build each detail page with full content
5. Add navigation between pages
6. Test all links
7. Verify information completeness

---

**Total Pages:** 8 (1 hub + 7 detail pages)

**Target:** Each detail page should be densely packed with information but still fit on one screen/printable page when possible, or naturally scroll if content requires.
