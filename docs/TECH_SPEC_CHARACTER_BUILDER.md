# Core Space Character Builder - Technical Specification

**Version**: 1.0
**Date**: 2025-10-08
**Status**: Draft for Review

---

## 1. Overview

The Character Builder is a static web application that allows players to:
- Select a character (Character Card)
- Choose a class card to pair with that character
- Invest skill points into class-provided skills
- Track skill progression during campaign play
- View active passive and reaction abilities at a glance

---

## 2. Core Mechanics

### 2.1 Character + Class System

Each character sheet is composed of:

```
Character Card (fixed)      +      Class Card (player choice)
├─ Inherent Skills (FREE)          ├─ Available Skill Slots
├─ Base Stats                      ├─ Max Levels per Skill
└─ Starting Skill Points           └─ Skill Options
```

**Key Rules:**
- **Inherent skills are FREE** - They never cost skill points
- **Class skills cost points** - Players spend their budget on these
- **Skills can stack** - Inherent + Class investments can combine (max 3 total)
- **Classes are swappable** - Players can change class cards between campaigns

### 2.2 Skill Point Budget

```javascript
Total Available Points = Starting Points + Level-Up Bonuses
Spent Points = Sum of all class skill investments
Remaining Points = Total Available - Spent
```

**Example:**
- Cassie starts with 10 skill points
- Player gains 2 points from leveling up → 12 total
- Player invests: Marksman (3), Reflexes (3), Walk It Off (3) → 9 spent
- Remaining: 12 - 9 = 3 points

**Important:** Only class skill investments count against budget. Inherent skills are free.

### 2.3 Skill Stacking

When a character has an inherent skill AND a class offers the same skill:

```
Total Skill Level = Inherent Level + Class Investment
Max Total Level = 3
Max Investable = 3 - Inherent Level
```

**Example:**
- Cassie has Marksman 1 (inherent, FREE)
- Marine Class offers Marksman up to level 3
- Player can invest up to 2 more points (to reach total of 3)
- Cost: 2 skill points (not 3, because level 1 is free)

**Visual Indicator Needed:**
- Show inherent level as "FREE" or badge
- Show available investment slots (e.g., "Can add 2 more levels")
- Disable investment beyond stacking limit

### 2.4 Skill Types

All skills fall into one of four types:

| Type | Description | Display Priority | Peg Cost |
|------|-------------|------------------|----------|
| **Passive** | Always active, no action required | TOP (most important) | None |
| **Reaction** | Triggered by specific conditions | HIGH (summary at top) | Varies |
| **Between-Game** | Used between sessions with leftover pegs | MEDIUM | Varies |
| **Standard** | Activated on your turn | NORMAL | Varies |

**Reaction Skills Structure:**
```javascript
{
  "type": "reaction",
  "trigger": "After being targeted with a ranged attack",
  "effect": "Make a ranged attack against the attacker",
  "pegCost": 1
}
```

**Never split reactions into separate skills!** Trigger + effect are ONE skill.

---

## 3. Data Structure Design

### 3.1 Format: JSON

**Why JSON over CSV:**
- Nested structures (levels, skill details, effects)
- No ambiguity with special characters
- Easy parsing in JavaScript
- Supports complex data types (arrays, objects)
- Cleaner representation of skill stacking

### 3.2 Core Data Files

#### **characters.json** - Character Card Data
```json
{
  "characters": [
    {
      "id": "cassie",
      "name": "Cassie",
      "description": "Former marine sniper, expert marksman",
      "baseStats": {
        "health": 6,
        "action": 2,
        "skill": 3
      },
      "startingSkillPoints": 10,
      "inherentSkills": [
        {
          "skillId": "marksman",
          "level": 1,
          "note": "FREE - Always active"
        },
        {
          "skillId": "reflexes",
          "level": 1,
          "note": "FREE - Always active"
        }
      ]
    }
  ]
}
```

#### **classes.json** - Class Card Data
```json
{
  "classes": [
    {
      "id": "marine",
      "name": "Marine",
      "description": "Combat specialist with ranged and close combat expertise",
      "availableSkills": [
        {
          "skillId": "marksman",
          "maxLevel": 3,
          "costPerLevel": [1, 1, 1]
        },
        {
          "skillId": "reflexes",
          "maxLevel": 3,
          "costPerLevel": [1, 1, 1]
        },
        {
          "skillId": "combatExpert",
          "maxLevel": 3,
          "costPerLevel": [1, 2, 2]
        }
      ]
    },
    {
      "id": "smuggler",
      "name": "Smuggler",
      "description": "Stealth and cunning specialist",
      "availableSkills": [
        {
          "skillId": "evade",
          "maxLevel": 3,
          "costPerLevel": [1, 1, 2]
        },
        {
          "skillId": "lightFingers",
          "maxLevel": 3,
          "costPerLevel": [1, 1, 1]
        }
      ]
    }
  ]
}
```

**Note:** `costPerLevel` allows for skills that cost 1-3 points per level (future-proofing).

#### **skills.json** - Master Skill Database
```json
{
  "skills": [
    {
      "id": "marksman",
      "name": "Marksman",
      "category": "Ranged Skills",
      "type": "standard",
      "levels": [
        {
          "level": 1,
          "isPassive": false,
          "isReaction": false,
          "isBetweenGame": false,
          "pegCost": 1,
          "description": "Make a ranged attack."
        },
        {
          "level": 2,
          "isPassive": false,
          "isReaction": false,
          "isBetweenGame": false,
          "pegCost": 1,
          "description": "Make a ranged attack with one extra combat die. After rolling the dice, you can split the hits scored between up to two eligible targets within range of your weapon and within short range of each other."
        },
        {
          "level": 3,
          "isPassive": false,
          "isReaction": false,
          "isBetweenGame": false,
          "pegCost": 1,
          "description": "Make a ranged attack with two extra combat dice. After rolling the dice, you can split the hits scored between any number of eligible targets within range of your weapon and within short range of each other."
        }
      ]
    },
    {
      "id": "counterShot",
      "name": "Counter Shot",
      "category": "Ranged Skills",
      "type": "reaction",
      "levels": [
        {
          "level": 1,
          "isPassive": false,
          "isReaction": true,
          "isBetweenGame": false,
          "trigger": "After being targeted with a ranged attack",
          "effect": "Make a ranged attack against the attacker",
          "pegCost": 1
        },
        {
          "level": 2,
          "isPassive": false,
          "isReaction": true,
          "isBetweenGame": false,
          "trigger": "At any time after a target enemy has taken its first action in the current round",
          "effect": "Make a ranged attack against the target",
          "pegCost": 1
        },
        {
          "level": 3,
          "isPassive": false,
          "isReaction": true,
          "isBetweenGame": false,
          "trigger": "At any time",
          "effect": "Make a ranged attack against an enemy with one extra combat die, and then make a Move action",
          "pegCost": 1
        }
      ]
    },
    {
      "id": "weaponsExpert",
      "name": "Weapons Expert",
      "category": "Ranged Skills",
      "type": "mixed",
      "levels": [
        {
          "level": 1,
          "isPassive": true,
          "isReaction": false,
          "isBetweenGame": false,
          "passiveEffect": "You may Reload as an effortless action.",
          "pegCost": 0
        },
        {
          "level": 1,
          "isPassive": false,
          "isReaction": false,
          "isBetweenGame": false,
          "description": "Make a ranged attack, rolling 2 additional dice. You cannot Move in the same round that you use this Skill.",
          "pegCost": 1
        },
        {
          "level": 2,
          "isPassive": true,
          "isReaction": false,
          "isBetweenGame": false,
          "passiveEffect": "You may make a Ranged Assault action with a pistol as an effortless action.",
          "pegCost": 0
        },
        {
          "level": 2,
          "isPassive": false,
          "isReaction": false,
          "isBetweenGame": false,
          "description": "Use when making a ranged attack. You may fire two different pistols as a single action – add their dice together and subtract one die.",
          "pegCost": 1
        },
        {
          "level": 3,
          "isPassive": false,
          "isReaction": false,
          "isBetweenGame": false,
          "description": "You can shoot a weapon from an enemy's hand. Make a ranged attack. This rolls two dice regardless of the weapon's statistics but must be within range and LoS as normal. If at least one hit is scored, no damage is done, but a weapon of your choice is removed from their dashboard and scattered. The weapon is broken but can be Repaired as normal.",
          "pegCost": 1
        }
      ]
    }
  ]
}
```

**Special Case - Mixed Skills (like Weapons Expert):**
Some skills have BOTH passive effects AND active abilities at the same level. Structure:
- Each level can have multiple entries (one passive, one active)
- `type: "mixed"` indicates this
- Client must handle displaying both parts

### 3.3 Save Data Format (localStorage)

```javascript
// Key: "corespace-character-{characterId}"
{
  "characterId": "cassie",
  "classId": "marine",
  "totalSkillPoints": 12,  // Starting + level-up bonuses
  "classSkillInvestments": {
    "marksman": 2,     // Invested 2 points (has 1 inherent, so total is 3)
    "reflexes": 2,     // Invested 2 points (has 1 inherent, so total is 3)
    "combatExpert": 3, // Invested 3 points (no inherent)
    "walkItOff": 2     // Invested 2 points (no inherent)
  },
  "spentPoints": 9,
  "remainingPoints": 3,
  "lastUpdated": "2025-10-08T12:34:56Z"
}
```

**Key Points:**
- Only store class skill investments (not inherent skills)
- Track total available points (for level-up bonuses)
- Calculate spent/remaining dynamically
- Include timestamp for debugging

---

## 4. Business Logic

### 4.1 Skill Level Calculation

```javascript
function getEffectiveSkillLevel(characterId, classId, skillId) {
  const inherentLevel = getInherentSkillLevel(characterId, skillId) || 0;
  const investedLevel = getClassSkillInvestment(characterId, classId, skillId) || 0;
  return inherentLevel + investedLevel;
}

function getMaxInvestableLevel(characterId, classId, skillId) {
  const inherentLevel = getInherentSkillLevel(characterId, skillId) || 0;
  const classMaxLevel = getClassSkillMaxLevel(classId, skillId) || 0;
  const maxTotal = Math.min(3, classMaxLevel); // Skills cap at 3
  return Math.max(0, maxTotal - inherentLevel);
}
```

### 4.2 Skill Point Budget Validation

```javascript
function canInvestSkillPoint(characterId, classId, skillId, newLevel) {
  const saveData = loadSaveData(characterId);
  const currentInvestment = saveData.classSkillInvestments[skillId] || 0;
  const pointsNeeded = newLevel - currentInvestment;

  // Check if enough points remaining
  if (saveData.remainingPoints < pointsNeeded) {
    return { valid: false, reason: "Not enough skill points" };
  }

  // Check if exceeds stacking limit
  const maxInvestable = getMaxInvestableLevel(characterId, classId, skillId);
  if (newLevel > maxInvestable) {
    return { valid: false, reason: "Exceeds maximum skill level" };
  }

  // Check if class offers this skill
  const classSkill = getClassSkill(classId, skillId);
  if (!classSkill) {
    return { valid: false, reason: "This class doesn't offer this skill" };
  }

  return { valid: true };
}
```

### 4.3 Class Swapping Logic

```javascript
function changeClass(characterId, newClassId) {
  const saveData = loadSaveData(characterId);
  const oldClassId = saveData.classId;

  // Warn if losing invested skills
  const lostSkills = [];
  for (const [skillId, investment] of Object.entries(saveData.classSkillInvestments)) {
    if (!classOffersSkill(newClassId, skillId)) {
      lostSkills.push({ skillId, investment });
    }
  }

  if (lostSkills.length > 0) {
    const confirm = showWarning(
      `Changing class will lose ${lostSkills.length} invested skills. ` +
      `You will get ${calculateRefundPoints(lostSkills)} skill points back. Continue?`
    );
    if (!confirm) return false;
  }

  // Refund all old class investments
  const refundedPoints = calculateTotalInvestment(saveData.classSkillInvestments);

  // Clear old investments
  saveData.classId = newClassId;
  saveData.classSkillInvestments = {};
  saveData.spentPoints = 0;
  saveData.remainingPoints = saveData.totalSkillPoints;

  saveSaveData(characterId, saveData);
  return true;
}
```

---

## 5. File Organization

```
docs/
├── data/
│   ├── characters.json         # Character card data (4 characters)
│   ├── classes.json            # Class card data (6-8 classes)
│   └── skills.json             # Master skill database (~50 skills)
│
├── character-builder.html      # New: Character selection & class builder
├── character-cassie.html       # Updated: Cassie-specific sheet
├── character-wade.html         # Updated: Wade-specific sheet
├── character-balcor.html       # Updated: Balcor-specific sheet
├── character-hopper.html       # Updated: Hopper-specific sheet
│
├── js/
│   ├── character-builder.js    # Core business logic
│   ├── data-loader.js          # JSON loading utilities
│   └── ui-controller.js        # UI update functions
│
└── css/
    └── character-builder.css   # Character builder specific styles
```

**Alternative (keep it simple for now):**
```
docs/
├── data/
│   └── corespace-data.json     # Single file with all data
│
└── character-cassie.html       # Inline JS for simplicity
```

**Recommendation:** Start with single file approach, split later if needed.

---

## 6. Data Loading Strategy

### Option A: Inline Data (Simplest)
```html
<script>
const GAME_DATA = {
  characters: { /* ... */ },
  classes: { /* ... */ },
  skills: { /* ... */ }
};
</script>
```

**Pros:**
- No AJAX/fetch required
- Works offline
- Single file deployment
- No CORS issues

**Cons:**
- Large HTML file
- Harder to update data
- Duplicate data across character pages

### Option B: External JSON with Fetch
```javascript
async function loadGameData() {
  const response = await fetch('data/corespace-data.json');
  return await response.json();
}
```

**Pros:**
- Centralized data
- Easier to update
- Smaller HTML files

**Cons:**
- Requires web server (won't work with file://)
- Async loading complexity
- GitHub Pages works fine, but local testing needs server

**Recommendation:** Use Option B (external JSON) since GitHub Pages is the deployment target.

---

## 7. API / Function Interface

### Core Functions

```javascript
// Data Access
function getCharacter(characterId);
function getClass(classId);
function getSkill(skillId);
function getSkillLevel(skillId, level);

// Character State
function loadCharacterSave(characterId);
function saveCharacterSave(characterId, saveData);
function resetCharacterSave(characterId);

// Skill Calculations
function getInherentSkillLevel(characterId, skillId);
function getClassSkillMaxLevel(classId, skillId);
function getEffectiveSkillLevel(characterId, classId, skillId);
function getMaxInvestableLevel(characterId, classId, skillId);

// Skill Investment
function investSkillPoint(characterId, skillId, newLevel);
function refundSkillPoint(characterId, skillId);
function canInvestSkillPoint(characterId, classId, skillId, newLevel);

// Class Management
function changeClass(characterId, newClassId);
function getAvailableClasses();

// UI Updates
function updateSkillPointDisplay();
function updateSkillCardDisplay(skillId);
function updatePassiveSummary();
function updateReactionSummary();
function renderClassSelector();
```

---

## 8. Edge Cases & Validation

### Edge Case 1: Skill Stacking Limit
**Scenario:** Character has Marksman 2 inherent, class offers Marksman 3 max.
**Solution:** Only allow 1 point investment (to reach max of 3 total).

### Edge Case 2: Class Swap with Overlapping Skills
**Scenario:** Player has Marine (Marksman 3), switches to Smuggler (no Marksman).
**Solution:**
- Warn player they'll lose Marksman
- Refund all 3 invested points (inherent level 1 remains free)
- Update remaining points

### Edge Case 3: Level-Up Bonus Points
**Scenario:** Player gains 2 skill points from leveling up.
**Solution:**
- Provide UI control to add points to `totalSkillPoints`
- Recalculate `remainingPoints`
- Save updated total

### Edge Case 4: Mixed Skills (Passive + Active)
**Scenario:** Weapons Expert level 1 has passive + active.
**Solution:**
- Display both in skill card
- Show passive in passive summary
- Show active in main skills section

### Edge Case 5: Reaction with Variable Triggers
**Scenario:** Counter Shot level 1 vs level 2 have different triggers.
**Solution:**
- Display current level's trigger in reaction summary
- Update trigger text when level changes

---

## 9. Migration from Current Implementation

### Current Data: character-cassie.html
```html
<div class="action-card" data-skill="marksman">
  <select class="skill-select" onchange="updateSkill('marksman', this.value)">
    <option value="0">Not Learned</option>
    <option value="1">Level 1</option>
    <option value="2">Level 2</option>
    <option value="3">Level 3</option>
  </select>
  ...
</div>
```

### New Implementation
```html
<div class="skill-card" data-skill-id="marksman">
  <div class="skill-header">
    <h3>Marksman</h3>
    <span class="inherent-badge" v-if="hasInherent">Level 1 FREE</span>
  </div>

  <div class="skill-investment">
    <label>Invest Points:</label>
    <div class="investment-controls">
      <button @click="decrementSkill('marksman')">-</button>
      <span class="investment-level">{{ getInvestment('marksman') }}</span>
      <button @click="incrementSkill('marksman')">+</button>
    </div>
    <div class="investment-info">
      Total Level: {{ getEffectiveLevel('marksman') }} / 3
    </div>
  </div>

  <div class="skill-levels">
    <!-- Show all levels up to effective level -->
  </div>
</div>
```

### Migration Steps
1. Extract skill data from HTML into JSON
2. Identify Cassie's inherent skills (from character-skills.md)
3. Identify class card options (from game knowledge)
4. Rewrite UI to use data-driven approach
5. Test class swapping
6. Test skill point budget
7. Test skill stacking

---

## 10. Testing Checklist

- [ ] Character loads correctly from JSON
- [ ] Inherent skills show as "FREE"
- [ ] Class selector loads available classes
- [ ] Class swap refunds points correctly
- [ ] Skill investment updates budget
- [ ] Skill investment respects max level (3)
- [ ] Skill stacking respects inherent + invested limit
- [ ] Passive summary shows correct skills
- [ ] Reaction summary shows correct triggers
- [ ] Save data persists to localStorage
- [ ] Save data loads on page refresh
- [ ] Reset clears all investments
- [ ] Can't overspend skill points
- [ ] Can't invest in skills class doesn't offer
- [ ] Level-up bonus points can be added
- [ ] Mixed skills (passive + active) display correctly
- [ ] Print layout hides class selector
- [ ] Mobile responsive layout works

---

## 11. Performance Considerations

### Data Size Estimates
- **characters.json**: ~2-3 KB (4 characters)
- **classes.json**: ~5-8 KB (6-8 classes)
- **skills.json**: ~30-50 KB (~50 skills x 3 levels with descriptions)
- **Total**: ~40-60 KB uncompressed

**Load time on GitHub Pages:** < 1 second

### Rendering Performance
- Static site, no framework overhead
- Vanilla JS + DOM manipulation
- Expected load time: < 500ms on modern browsers
- No perceived lag

### localStorage Limits
- Typical limit: 5-10 MB per origin
- Our save data: ~1 KB per character
- Total for 4 characters: ~4 KB
- **Safe**: Well within limits

---

## 12. Future Enhancements

### Phase 2 Features (Not in Initial Scope)
- [ ] Skill peg usage tracking during gameplay
- [ ] Campaign progression tracking (missions completed)
- [ ] Equipment/item tracking
- [ ] Multiple save slots
- [ ] Export/import character builds (JSON download/upload)
- [ ] Share character builds via URL (base64 encoded)
- [ ] Skill search/filter
- [ ] Skill recommendations based on playstyle

### Phase 3 Features (Long-term)
- [ ] Multi-character campaign management
- [ ] Character comparison tool
- [ ] Optimal build calculator
- [ ] Print-friendly character sheet export (PDF)
- [ ] Offline PWA support
- [ ] Sync across devices (cloud storage)

---

## 13. Open Questions

1. **Q:** Should class swapping be allowed mid-campaign, or only between campaigns?
   **A:** [USER TO DECIDE] - Assumption: Between campaigns only (less complex UI)

2. **Q:** How many classes should be available initially?
   **A:** [USER TO DECIDE] - Start with 2-3 per character?

3. **Q:** Should we track level-up bonuses separately or just as total points?
   **A:** [USER TO DECIDE] - Recommendation: Just track total, simpler

4. **Q:** Do skills have variable costs per level (1/2/3 points)?
   **A:** [USER TO DECIDE] - Data structure supports it, but is it needed?

5. **Q:** Should we validate that class skills are appropriate for character?
   **A:** [USER TO DECIDE] - Or allow any class with any character (more flexibility)?

---

**End of Technical Specification v1.0**
