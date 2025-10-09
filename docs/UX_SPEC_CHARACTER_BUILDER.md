# Core Space Character Builder - UX Specification

**Version**: 1.0
**Date**: 2025-10-08
**Status**: Draft for Review

---

## 1. Design Goals

### Primary Goals
1. **At-table usability** - Quick reference during active gameplay
2. **Clear information hierarchy** - Most important info (passives, reactions) at top
3. **Intuitive skill investment** - Obvious how to spend points
4. **Visual distinction** - Inherent vs. class skills clearly marked
5. **Mobile-friendly** - Works on phone/tablet at game table

### Secondary Goals
6. **Print-friendly** - Can print clean character sheet
7. **Persistent state** - Saves automatically, loads on return
8. **Minimal clutter** - Details revealed progressively
9. **Fast interaction** - No loading delays, instant feedback

---

## 2. Page Structure & Layout

### 2.1 Overall Page Organization

```
┌─────────────────────────────────────────────┐
│ HEADER                                      │
│ Character Name | Class Selector             │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ SKILL POINT BUDGET                          │
│ Available: 3 | Spent: 9 | Total: 12        │
│ [+Add Points] (for level-ups)              │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ PASSIVE SKILLS SUMMARY (always visible)    │
│ ● Reload as effortless action              │
│ ● Ranged Assault with pistol (effortless)  │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ REACTION SKILLS SUMMARY (always visible)   │
│ ⚡ Counter Shot: After ranged attack → ...  │
│ ⚡ Reflexes: After close assault → ...      │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ SKILL CARDS (filterable grid)              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│ │ Marksman │ │ Reflexes │ │ Walk It  │    │
│ │ FREE+2   │ │ FREE+2   │ │ Off (3)  │    │
│ │ [- 2 +]  │ │ [- 2 +]  │ │ [- 3 +]  │    │
│ └──────────┘ └──────────┘ └──────────┘    │
│ ...more skill cards...                     │
└─────────────────────────────────────────────┘
```

### 2.2 Header Section

```html
<header class="character-header">
  <div class="character-info">
    <h1>Cassie</h1>
    <p class="character-description">Former marine sniper, expert marksman</p>
    <div class="base-stats">
      <span class="stat">❤️ Health: 6</span>
      <span class="stat">⚡ Action: 2</span>
      <span class="stat">🎯 Skill: 3</span>
    </div>
  </div>

  <div class="class-selector">
    <label>Class Card:</label>
    <select id="class-select">
      <option value="marine">Marine</option>
      <option value="smuggler">Smuggler</option>
      <option value="techie">Techie</option>
    </select>
    <button class="info-btn" title="Changing class refunds all invested points">ℹ️</button>
  </div>
</header>
```

**Visual Design:**
- Character name: Large, prominent (2em)
- Base stats: Icon + number, inline
- Class selector: Dropdown + info icon
- Background: Subtle gradient matching character theme

### 2.3 Skill Point Budget Bar

```html
<div class="skill-point-budget">
  <div class="budget-display">
    <div class="budget-item available">
      <span class="budget-label">Available</span>
      <span class="budget-value">3</span>
    </div>
    <div class="budget-separator">/</div>
    <div class="budget-item total">
      <span class="budget-label">Total</span>
      <span class="budget-value">12</span>
    </div>
    <div class="budget-item spent">
      <span class="budget-label">Spent</span>
      <span class="budget-value">9</span>
    </div>
  </div>

  <div class="budget-actions">
    <button class="btn-secondary" onclick="addSkillPoints()">
      +Add Points (Level Up)
    </button>
    <button class="btn-danger" onclick="resetSkills()">
      ⟲ Reset All
    </button>
  </div>
</div>
```

**Visual Design:**
- Available points: Large, prominent, GREEN (#2ecc71)
- Spent points: Smaller, gray
- Total points: Reference, light gray
- Add points button: Secondary action
- Reset button: Danger color, small

**Behavior:**
- Available count updates live as player invests
- Turns RED when 0 points remaining
- Flashes briefly when investment made

### 2.4 Passive Skills Summary

```html
<div class="passive-summary">
  <h2>🔮 Passive Skills (Always Active)</h2>
  <div class="passive-list">
    <div class="passive-item">
      <strong>Weapons Expert 1:</strong> Reload as effortless action
    </div>
    <div class="passive-item">
      <strong>Weapons Expert 2:</strong> Ranged Assault with pistol as effortless action
    </div>
    <div class="passive-item">
      <strong>Combat Expert 1:</strong> Ignore 1 hit in attacks of opportunity
    </div>
  </div>
  <div class="empty-state" v-if="noPassives">
    No passive skills active yet.
  </div>
</div>
```

**Visual Design:**
- Border: Purple (#9b59b6) - distinctive color for passives
- Background: Subtle purple tint
- Large header with icon
- Each passive: Bold skill name + description
- Empty state: Italic, muted

**Behavior:**
- Auto-populates as skills are learned
- Updates immediately when skill investment changes
- Scrollable if many passives (unlikely)

### 2.5 Reaction Skills Summary

```html
<div class="reaction-summary">
  <h2>⚡ Reaction Skills (Triggered Abilities)</h2>
  <div class="reaction-list">
    <div class="reaction-item">
      <div class="reaction-trigger">
        <span class="trigger-label">TRIGGER:</span>
        After being targeted with a ranged attack
      </div>
      <div class="reaction-effect">
        <strong>Counter Shot 3:</strong> Ranged attack +1 die, then Move
      </div>
    </div>
    <div class="reaction-item">
      <div class="reaction-trigger">
        <span class="trigger-label">TRIGGER:</span>
        After targeted with close assault attack
      </div>
      <div class="reaction-effect">
        <strong>Reflexes 3:</strong> Ignore all hits + Close Assault +2 dice + Move
      </div>
    </div>
  </div>
  <div class="empty-state" v-if="noReactions">
    No reaction skills active yet.
  </div>
</div>
```

**Visual Design:**
- Border: Orange (#e67e22) - distinctive color for reactions
- Background: Subtle orange tint
- Trigger: Uppercase label, italics
- Effect: Bold skill name + description
- Visual separation between trigger and effect

**Behavior:**
- Shows highest level of each reaction skill
- Updates immediately when investment changes
- Groups by trigger condition if multiple reactions share trigger

---

## 3. Skill Card Design

### 3.1 Standard Skill Card

```html
<div class="skill-card" data-skill-id="marksman" data-invested="2">
  <div class="skill-header">
    <h3 class="skill-name">Marksman</h3>
    <span class="skill-category">Ranged Skills</span>
  </div>

  <div class="inherent-indicator" v-if="hasInherent">
    <span class="badge-free">Level 1 FREE</span>
  </div>

  <div class="investment-controls">
    <button class="btn-decrement" onclick="decrementSkill('marksman')">−</button>
    <div class="investment-display">
      <span class="investment-label">Invest:</span>
      <span class="investment-value">2</span>
      <span class="investment-max">/ 2 available</span>
    </div>
    <button class="btn-increment" onclick="incrementSkill('marksman')">+</button>
  </div>

  <div class="effective-level">
    <span class="effective-label">Total Level:</span>
    <span class="effective-value">3</span>
    <span class="effective-max">/ 3 max</span>
  </div>

  <div class="skill-levels">
    <div class="skill-level active" data-level="1">
      <span class="level-badge free">Level 1 (FREE)</span>
      <p class="level-description">Make a ranged attack.</p>
    </div>
    <div class="skill-level active" data-level="2">
      <span class="level-badge">Level 2</span>
      <p class="level-description">
        Ranged attack +1 die. Split hits between up to 2 targets
        within range and short range of each other.
      </p>
    </div>
    <div class="skill-level active" data-level="3">
      <span class="level-badge">Level 3</span>
      <p class="level-description">
        Ranged attack +2 dice. Split hits between any number of targets
        within range and short range of each other.
      </p>
    </div>
  </div>
</div>
```

**Visual States:**

1. **No Investment (Inactive)**
   - Grayscale filter
   - Opacity 0.5
   - Investment controls enabled
   - Only inherent level shown (if any)

2. **Partial Investment**
   - Full color
   - Shows levels up to invested amount
   - Can increment/decrement

3. **Max Investment**
   - Full color
   - Green glow on effective level
   - Increment button disabled
   - Shows all levels

4. **Not Available in Current Class**
   - Hidden OR shown as locked
   - Explanation: "Not available in [Class] class"

### 3.2 Reaction Skill Card

```html
<div class="skill-card reaction" data-skill-id="counterShot" data-invested="3">
  <div class="skill-header">
    <h3 class="skill-name">Counter Shot</h3>
    <span class="skill-type-badge reaction">⚡ Reaction</span>
  </div>

  <div class="investment-controls">
    <!-- Same as standard -->
  </div>

  <div class="skill-levels">
    <div class="skill-level active" data-level="1">
      <span class="level-badge">Level 1</span>
      <div class="reaction-details">
        <div class="trigger">
          <strong>Trigger:</strong> After being targeted with a ranged attack
        </div>
        <div class="effect">
          <strong>Effect:</strong> Make a ranged attack against the attacker
        </div>
        <div class="peg-cost">Cost: 1 peg</div>
      </div>
    </div>
    <!-- Levels 2 & 3 similar -->
  </div>
</div>
```

**Key Differences:**
- Orange accent color (not default)
- "⚡ Reaction" badge in header
- Trigger/Effect clearly separated
- Peg cost shown explicitly

### 3.3 Mixed Skill Card (Passive + Active)

```html
<div class="skill-card mixed" data-skill-id="weaponsExpert" data-invested="2">
  <div class="skill-header">
    <h3 class="skill-name">Weapons Expert</h3>
    <span class="skill-type-badge mixed">🔮⚡ Mixed</span>
  </div>

  <div class="skill-levels">
    <div class="skill-level-group" data-level="1">
      <span class="level-badge">Level 1</span>

      <div class="passive-ability">
        <span class="ability-type passive">🔮 Passive:</span>
        <p>Reload as effortless action</p>
      </div>

      <div class="active-ability">
        <span class="ability-type active">⚡ Active:</span>
        <p>Ranged attack +2 dice. Cannot Move in same round.</p>
        <span class="peg-cost">Cost: 1 peg</span>
      </div>
    </div>

    <div class="skill-level-group" data-level="2">
      <!-- Similar structure -->
    </div>
  </div>
</div>
```

**Key Differences:**
- Dual badge (passive + active)
- Each level has subsections for passive and active parts
- Passive parts go to passive summary
- Active parts remain in main card

---

## 4. Visual Design System

### 4.1 Color Palette

#### Skill Types
- **Passive**: Purple (#9b59b6)
- **Reaction**: Orange (#e67e22)
- **Between-Game**: Teal (#16a085)
- **Standard**: Blue (#3498db)
- **Mixed**: Gradient (purple→blue)

#### Investment States
- **Not Invested**: Grayscale, opacity 0.5
- **Partially Invested**: Full color
- **Max Investment**: Green glow (#2ecc71)
- **Inherent Level**: Gold badge (#f39c12)

#### Skill Point Budget
- **Available > 0**: Green (#2ecc71)
- **Available = 0**: Red (#e74c3c)
- **Spent**: Gray (#95a5a6)
- **Total**: Light gray (#bdc3c7)

### 4.2 Typography

```css
/* Character name */
h1 {
  font-size: 2.5em;
  font-weight: 700;
  color: #e94560;
}

/* Section headers */
h2 {
  font-size: 1.5em;
  font-weight: 600;
  color: #53a8b6;
}

/* Skill names */
h3 {
  font-size: 1.2em;
  font-weight: 600;
  color: #eee;
}

/* Body text */
p {
  font-size: 0.95em;
  line-height: 1.5;
  color: #ccc;
}

/* Small labels */
.label {
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
}
```

### 4.3 Spacing & Layout

```css
/* Card spacing */
.skill-card {
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
}

/* Grid layout */
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .skill-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 5. Interaction Patterns

### 5.1 Investing Skill Points

**Flow:**
1. Player clicks `+` button on skill card
2. Check if valid (enough points, not at max)
3. If valid:
   - Decrement available points
   - Increment invested level
   - Show next skill level details
   - Update passive/reaction summary
   - Flash green confirmation
   - Save to localStorage
4. If invalid:
   - Show error message (toast notification)
   - Button shake animation
   - Explain why (e.g., "Not enough skill points")

**Visual Feedback:**
```
[Marksman Card]
Before: Available: 3 | Invested: 1 | Total: 2
Click +
After:  Available: 2 | Invested: 2 | Total: 3
        ↑ Green flash      ↑ Green flash

[Level 3 details fade in]
```

### 5.2 Refunding Skill Points

**Flow:**
1. Player clicks `−` button on skill card
2. Check if valid (invested > 0)
3. If valid:
   - Increment available points
   - Decrement invested level
   - Hide highest skill level details
   - Update passive/reaction summary
   - Flash blue confirmation
   - Save to localStorage
4. If invalid:
   - Button disabled (grayed out)

### 5.3 Changing Class

**Flow:**
1. Player selects new class from dropdown
2. Check if any skills invested
3. If invested skills exist:
   - Show confirmation dialog:
     ```
     ⚠️ Change Class?

     You will lose the following invested skills:
     • Marksman (2 points)
     • Reflexes (2 points)
     • Combat Expert (3 points)

     You will get 7 skill points refunded.

     [Cancel] [Change Class]
     ```
4. If confirmed:
   - Refund all points
   - Change class
   - Clear all investments
   - Update available skills list
   - Update UI
   - Save to localStorage

### 5.4 Adding Skill Points (Level-Up)

**Flow:**
1. Player clicks "+Add Points (Level Up)"
2. Show modal:
   ```
   Add Skill Points

   Current total: 12 points

   How many points to add?
   [+1] [+2] [+3]

   New total: 14 points

   [Cancel] [Add Points]
   ```
3. If confirmed:
   - Update total skill points
   - Update available points
   - Save to localStorage
   - Flash green on budget display

---

## 6. Information Architecture

### 6.1 Content Priority (Top to Bottom)

1. **Character Identity** - Name, class, base stats
2. **Skill Point Budget** - Most important decision-making info
3. **Passive Skills** - Always-on abilities (high gameplay impact)
4. **Reaction Skills** - Conditional abilities (high gameplay impact)
5. **Skill Investment Cards** - Detailed skill management
6. **Footer** - Links, reset, help

### 6.2 Skill Card Grouping

**Option A: Group by Type**
- Passive Skills section
- Reaction Skills section
- Standard Skills section
- Between-Game Skills section

**Option B: Group by Category** (Current)
- Ranged Skills
- Close Assault Skills
- Endurance Skills
- Stealth Skills
- etc.

**Option C: Flat List** (Alphabetical)
- All skills in one grid, sorted A-Z

**Recommendation:** Use Option A (group by type) for gameplay usability:
- Passives at top (most important)
- Reactions next (second most important)
- Standard skills last
- Between-game skills at very bottom

### 6.3 Filtering & Search

**Phase 1 (MVP):** No filtering, just scrolling

**Phase 2 (Enhancement):**
```html
<div class="skill-filters">
  <button class="filter-btn active" data-filter="all">All Skills</button>
  <button class="filter-btn" data-filter="invested">Invested Only</button>
  <button class="filter-btn" data-filter="available">Available to Invest</button>
  <button class="filter-btn" data-filter="passive">Passives</button>
  <button class="filter-btn" data-filter="reaction">Reactions</button>
</div>

<div class="skill-search">
  <input type="text" placeholder="Search skills..." id="skill-search">
</div>
```

---

## 7. Responsive Design

### 7.1 Desktop (> 1024px)

```
┌────────────────────────────────────────────────────────┐
│ Character Header (full width)                          │
├────────────────────────────────────────────────────────┤
│ Skill Point Budget (full width)                        │
├──────────────────────┬─────────────────────────────────┤
│ Passive Summary      │  Reaction Summary               │
│ (50% width)          │  (50% width)                    │
├──────────────────────┴─────────────────────────────────┤
│ Skill Cards (3 columns)                                │
│ ┌──────┐ ┌──────┐ ┌──────┐                            │
│ │  A   │ │  B   │ │  C   │                            │
│ └──────┘ └──────┘ └──────┘                            │
└────────────────────────────────────────────────────────┘
```

### 7.2 Tablet (768px - 1024px)

```
┌──────────────────────────────────┐
│ Character Header (full)          │
├──────────────────────────────────┤
│ Skill Point Budget (full)        │
├──────────────────────────────────┤
│ Passive Summary (full)           │
├──────────────────────────────────┤
│ Reaction Summary (full)          │
├──────────────────────────────────┤
│ Skill Cards (2 columns)          │
│ ┌──────────┐ ┌──────────┐       │
│ │    A     │ │    B     │       │
│ └──────────┘ └──────────┘       │
└──────────────────────────────────┘
```

### 7.3 Mobile (< 768px)

```
┌──────────────────┐
│ Character Header │
│ (compact)        │
├──────────────────┤
│ Skill Budget     │
│ (stacked)        │
├──────────────────┤
│ Passive Summary  │
│ (collapsible)    │
├──────────────────┤
│ Reaction Summary │
│ (collapsible)    │
├──────────────────┤
│ Skill Cards      │
│ (1 column)       │
│ ┌──────────────┐ │
│ │      A       │ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │      B       │ │
│ └──────────────┘ │
└──────────────────┘
```

**Mobile Optimizations:**
- Collapsible summaries (tap to expand)
- Sticky skill point budget at top
- Larger touch targets (buttons minimum 44px)
- Simplified investment controls (larger +/− buttons)

---

## 8. Error States & Validation

### 8.1 Error Messages

**Not Enough Skill Points:**
```
❌ Not Enough Skill Points
You need 1 more skill point to invest in this skill.
Available: 0 | Cost: 1
```

**Skill at Max Level:**
```
❌ Skill at Maximum Level
This skill is already at level 3 (maximum).
```

**Class Doesn't Offer Skill:**
```
❌ Skill Not Available
The Marine class doesn't offer this skill.
Try changing your class or choose a different skill.
```

**Stacking Limit Reached:**
```
❌ Stacking Limit Reached
You have Marksman 1 (inherent) + 2 (invested) = 3 total.
Cannot invest further (max 3).
```

### 8.2 Warning Messages

**Class Change Warning:**
```
⚠️ Warning: Changing Class
Changing your class will refund all invested skill points.
You will lose access to skills not offered by the new class.

Current investments:
• Marksman: 2 points
• Reflexes: 2 points
• Combat Expert: 3 points

Refund: 7 skill points

Do you want to continue?
[Cancel] [Change Class]
```

**Reset All Warning:**
```
⚠️ Warning: Reset All Skills
This will refund all invested skill points and reset your character.
This action cannot be undone.

Are you sure?
[Cancel] [Reset All]
```

### 8.3 Success Messages

**Skill Invested:**
```
✅ Skill Point Invested
Marksman is now level 3!
```

**Skill Refunded:**
```
✅ Skill Point Refunded
1 skill point returned to your budget.
```

**Class Changed:**
```
✅ Class Changed
You are now a Smuggler!
7 skill points refunded.
```

---

## 9. Accessibility

### 9.1 Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons, select dropdown options
- **Arrow keys**: Increment/decrement skill investment (when focused)
- **Esc**: Close modals/dialogs

### 9.2 Screen Reader Support

```html
<!-- Investment control with aria labels -->
<button
  class="btn-increment"
  onclick="incrementSkill('marksman')"
  aria-label="Invest one skill point in Marksman"
>
  +
</button>

<!-- Skill level with semantic markup -->
<div
  class="skill-level active"
  data-level="2"
  role="region"
  aria-label="Marksman level 2 description"
>
  <span class="level-badge">Level 2</span>
  <p class="level-description">...</p>
</div>
```

### 9.3 Color Contrast

All text meets WCAG AA standards:
- Primary text (#eee) on dark background (#16213e): 11.5:1
- Labels (#888) on dark background: 4.8:1
- Buttons: Minimum 4.5:1 contrast ratio

---

## 10. Print Styles

### 10.1 Print Layout

When user prints (Cmd+P), apply these optimizations:

```css
@media print {
  /* Hide interactive elements */
  .skill-investment-controls,
  .class-selector,
  .btn-add-points,
  .btn-reset,
  .info-btn {
    display: none;
  }

  /* Show all invested skills */
  .skill-card {
    page-break-inside: avoid;
    opacity: 1 !important;
    filter: none !important;
  }

  /* Hide not-invested skills */
  .skill-card[data-invested="0"] {
    display: none;
  }

  /* Expand all summaries */
  .passive-summary,
  .reaction-summary {
    border: 2px solid #000;
    background: white;
    color: black;
  }

  /* Force white background, black text */
  * {
    background: white !important;
    color: black !important;
  }

  /* Show effective level prominently */
  .effective-level {
    font-size: 1.2em;
    font-weight: bold;
  }
}
```

### 10.2 Printable Character Sheet

**What Prints:**
- Character name, class, base stats
- Current skill point budget (for reference)
- ALL passive abilities (summary)
- ALL reaction abilities (summary)
- Only invested skills (full details)
- Effective level for each skill

**What Doesn't Print:**
- Class selector dropdown
- Investment +/− buttons
- Reset button
- Not-invested skills
- Interactive elements

---

## 11. Loading States

### 11.1 Initial Page Load

```html
<div class="loading-overlay">
  <div class="loading-spinner"></div>
  <p>Loading character data...</p>
</div>
```

**Timeline:**
1. Show loading overlay (0ms)
2. Fetch JSON data (< 500ms)
3. Load save data from localStorage (< 50ms)
4. Render UI (< 100ms)
5. Hide loading overlay (650ms total)

### 11.2 Class Change Loading

```html
<div class="loading-inline">
  <div class="spinner-small"></div>
  <span>Switching class...</span>
</div>
```

**Timeline:**
1. Show inline spinner (0ms)
2. Validate change (< 10ms)
3. Refund points (< 10ms)
4. Update UI (< 100ms)
5. Hide spinner (120ms total)

---

## 12. Empty States

### 12.1 No Passives

```html
<div class="passive-summary">
  <h2>🔮 Passive Skills (Always Active)</h2>
  <div class="empty-state">
    <p>No passive skills active yet.</p>
    <p class="hint">Invest in skills like <strong>Weapons Expert</strong> or <strong>Combat Expert</strong> to gain passive abilities.</p>
  </div>
</div>
```

### 12.2 No Reactions

```html
<div class="reaction-summary">
  <h2>⚡ Reaction Skills (Triggered Abilities)</h2>
  <div class="empty-state">
    <p>No reaction skills active yet.</p>
    <p class="hint">Invest in skills like <strong>Counter Shot</strong> or <strong>Reflexes</strong> to gain reaction abilities.</p>
  </div>
</div>
```

### 12.3 No Skills Available (Wrong Class?)

```html
<div class="skill-grid">
  <div class="empty-state">
    <p>No skills available for this class.</p>
    <p class="hint">Try selecting a different class from the dropdown above.</p>
  </div>
</div>
```

---

## 13. Help & Onboarding

### 13.1 First-Time User

Show a dismissible tutorial overlay on first visit:

```html
<div class="tutorial-overlay">
  <div class="tutorial-card">
    <h2>Welcome to the Character Builder!</h2>
    <ol>
      <li><strong>Choose your class</strong> from the dropdown</li>
      <li><strong>Invest skill points</strong> using the +/− buttons</li>
      <li><strong>View your abilities</strong> in the summaries at top</li>
      <li><strong>Your progress saves automatically!</strong></li>
    </ol>
    <button class="btn-primary" onclick="dismissTutorial()">
      Got It!
    </button>
  </div>
</div>
```

### 13.2 Info Tooltips

Add `ℹ️` icons with hover tooltips on:

- **Inherent Skills**: "These skills are FREE and always active"
- **Class Selector**: "Changing class refunds all invested points"
- **Skill Stacking**: "Total level = Inherent + Invested (max 3)"
- **Investment Controls**: "Each point unlocks the next skill level"

### 13.3 Help Page Link

Add link to detailed help/FAQ page:

```html
<footer>
  <a href="character-builder-help.html" class="help-link">
    ❓ Help & FAQ
  </a>
</footer>
```

---

## 14. Animation & Transitions

### 14.1 Smooth Transitions

```css
/* Skill card state changes */
.skill-card {
  transition: opacity 0.3s ease, filter 0.3s ease;
}

/* Investment value changes */
.investment-value,
.budget-value {
  transition: color 0.2s ease, transform 0.2s ease;
}

/* Skill level reveal */
.skill-level {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
```

### 14.2 Feedback Animations

**Success (investment made):**
```css
@keyframes flash-green {
  0% { background-color: transparent; }
  50% { background-color: rgba(46, 204, 113, 0.3); }
  100% { background-color: transparent; }
}

.skill-card.invested {
  animation: flash-green 0.5s ease;
}
```

**Error (invalid action):**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.btn-increment.error {
  animation: shake 0.3s ease;
}
```

**Counter increment:**
```css
@keyframes count-up {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.budget-value.changed {
  animation: count-up 0.3s ease;
}
```

---

## 15. Testing Scenarios

### 15.1 Basic Flow
1. Load page → See Cassie with Marine class
2. Invest 1 point in Marksman → See level 2 details
3. Check passive summary → No change (Marksman is active skill)
4. Invest 3 points in Combat Expert → See passive in summary
5. Check budget → Should show 3 spent, 9 remaining

### 15.2 Skill Stacking
1. Cassie has Marksman 1 inherent (FREE)
2. Select Marine class (offers Marksman 3)
3. Try to invest 3 points → Should fail, only 2 allowed
4. Invest 2 points → Total level 3
5. Check effective level display → Shows "3 / 3 max"

### 15.3 Class Swapping
1. Invest 5 points in Marine skills
2. Change to Smuggler class
3. See warning dialog with refund info
4. Confirm → All points refunded
5. Check budget → Shows 12 available, 0 spent

### 15.4 Edge Cases
1. Try to invest with 0 points → See error message
2. Try to invest in skill at max level → Button disabled
3. Try to refund skill at 0 investment → Button disabled
4. Change class with no investments → No warning dialog
5. Reset all → Confirm dialog, then all investments cleared

### 15.5 Persistence
1. Invest 5 points, close page
2. Reopen page → See saved investments
3. Change class, close page
4. Reopen page → See new class persisted
5. Reset all, close page
6. Reopen page → See fresh state

---

## 16. Success Metrics

### Usability Goals
- ✅ User can understand skill investment within 30 seconds
- ✅ User can invest first skill point within 1 minute
- ✅ No confusion about inherent vs. class skills
- ✅ Passive/reaction summaries immediately useful during gameplay
- ✅ Mobile layout usable with one hand (large buttons)

### Performance Goals
- ✅ Page loads in < 1 second
- ✅ Skill investment feels instant (< 100ms feedback)
- ✅ Class change completes in < 500ms
- ✅ No visual lag during interactions

### Aesthetic Goals
- ✅ Consistent with existing Core Space site design
- ✅ Clear visual hierarchy (important info at top)
- ✅ Professional, polished appearance
- ✅ Print-friendly output looks clean

---

**End of UX Specification v1.0**
