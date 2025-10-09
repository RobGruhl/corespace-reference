# CSV Template Guide - Character Builder Data Entry

**File**: `character-class-skills-template.csv`
**Purpose**: Map which classes offer which skills for each character
**Tool**: Open in Excel, Google Sheets, or Numbers

---

## How to Use This Template

### Column Structure

| Column | Description | Values |
|--------|-------------|--------|
| **Character** | Character name | Cassie, Wade, Balcor, Hopper |
| **Skill Name** | Name of skill | Marksman, Reflexes, etc. |
| **Inherent Level** | FREE skill level from Character Card | 0, 1, 2, or 3 |
| **Marine** | Max skill level available in Marine class | 0, 1, 2, or 3 (0 = not available) |
| **Smuggler** | Max skill level available in Smuggler class | 0, 1, 2, or 3 (0 = not available) |
| **Techie** | Max skill level available in Techie class | 0, 1, 2, or 3 (0 = not available) |
| **Scout** | Max skill level available in Scout class | 0, 1, 2, or 3 (0 = not available) |
| **Medic** | Max skill level available in Medic class | 0, 1, 2, or 3 (0 = not available) |
| **Engineer** | Max skill level available in Engineer class | 0, 1, 2, or 3 (0 = not available) |

**Add more class columns as needed** (one column per class card)

---

## Understanding the Values

### Example Row:
```
Cassie,Marksman,1,3,0,0,2,0,0
```

**Translation:**
- Character: **Cassie**
- Skill: **Marksman**
- **Inherent Level: 1** → Cassie has Marksman 1 on her Character Card (FREE)
- **Marine: 3** → Marine class offers Marksman up to level 3
- **Smuggler: 0** → Smuggler class does NOT offer Marksman
- **Scout: 2** → Scout class offers Marksman up to level 2

**Investment Logic:**
- Cassie has Marksman 1 inherent (FREE)
- If she takes Marine class, she can invest up to **2 more points** (to reach total of 3)
- If she takes Scout class, she can invest up to **1 more point** (to reach total of 2)
- If she takes Smuggler class, she **cannot invest** in Marksman (not offered)

---

## How to Fill Out

### Step 1: List All Characters
Create rows for each character × skill combination.

### Step 2: Fill Inherent Levels
Look at each Character Card. Mark skills that are **already on the card** with their level (1-3).

**Cassie Example** (from character-skills.md):
- Marksman: Inherent Level = 1
- Reflexes: Inherent Level = 1
- All other skills: Inherent Level = 0

### Step 3: Fill Class Availability
For each class column, enter the **maximum level** that class offers for that skill.

**Marine Class Example** (hypothetical):
- Marksman: 3 (offers up to level 3)
- Counter Shot: 3 (offers up to level 3)
- Weapons Expert: 3 (offers up to level 3)
- Evade: 0 (does NOT offer)

### Step 4: Validation
Check for these common mistakes:

❌ **Wrong**: Inherent level > class max level
```
Cassie,Marksman,2,1,0,0,0,0,0
```
Problem: Inherent is 2, but Marine only offers 1? Contradictory.

✅ **Correct**: Inherent level ≤ class max level (or class doesn't offer = 0)
```
Cassie,Marksman,1,3,0,0,0,0,0
```

❌ **Wrong**: All classes = 0 but inherent > 0
```
Cassie,Marksman,1,0,0,0,0,0,0
```
Problem: If Cassie has inherent Marksman, at least one class should offer it.

---

## Special Cases

### Case 1: Skill Not Available for Character
If a character cannot have a skill at all, **omit that row** or set everything to 0.

**Example**: Cassie probably can't have "Reroute" (machine-only skill)
```
Cassie,Reroute,0,0,0,0,0,0,0
```
Or just don't include this row for Cassie.

### Case 2: Universal Skills
Some skills might be available across many classes.

**Example**: "Walk It Off" might be available to Marine, Scout, Medic
```
Cassie,Walk It Off,0,3,0,0,2,3,0
```

### Case 3: Skill Stacking Math

**Example**:
```
Cassie,Marksman,1,3,0,0,0,0,0
```

**Result**:
- Inherent: 1 (FREE)
- Marine max: 3
- **Investable points**: 3 - 1 = **2 points**
- **Total max level**: 3

**Another Example**:
```
Wade,Evade,0,0,3,0,0,0,0
```

**Result**:
- Inherent: 0 (none)
- Smuggler max: 3
- **Investable points**: 3 - 0 = **3 points**
- **Total max level**: 3

---

## Adding New Classes

To add a new class (e.g., "Pilot"):

1. Add new column: `Pilot`
2. For each character-skill row, fill in max level (0-3)
3. Save CSV
4. Re-generate JSON (see conversion script below)

---

## Converting CSV to JSON

Once you've filled out the CSV, use a script to convert it to JSON format:

```bash
python3 convert_csv_to_json.py character-class-skills-template.csv
```

This will generate `corespace-data.json` for use in the character builder.

---

## Example: Cassie Marine Build

**From CSV:**
```csv
Character,Skill Name,Inherent Level,Marine,Smuggler
Cassie,Marksman,1,3,0
Cassie,Reflexes,1,3,0
Cassie,Combat Expert,0,3,0
```

**Translation**:
- Cassie starts with **10 skill points**
- She has **Marksman 1** and **Reflexes 1** inherent (FREE)
- She chooses **Marine** class
- Marine offers: Marksman (3), Reflexes (3), Combat Expert (3)

**Investment Options**:
- Marksman: Can invest **2 more points** (to reach 3 total)
- Reflexes: Can invest **2 more points** (to reach 3 total)
- Combat Expert: Can invest **3 points** (no inherent)

**Spending 10 points**:
- Marksman: Invest 2 → Total level 3 (cost: 2 points)
- Reflexes: Invest 2 → Total level 3 (cost: 2 points)
- Combat Expert: Invest 3 → Total level 3 (cost: 3 points)
- Remaining: 10 - 7 = **3 points**

---

## Data Sources

### Character Inherent Skills
Source: `character-skills.md`

**Current data** (verified):
```
Cassie: Marksman 1, Reflexes 1 (others are 0)
Wade: [TBD - fill from character-skills.md]
Balcor: [TBD - fill from character-skills.md]
Hopper: [TBD - fill from character-skills.md]
```

### Class Skill Availability
Source: **Game knowledge / Class Cards**

**TODO**: Fill in accurate class-skill mappings based on actual class cards.

**Current template** includes placeholder values - **MUST BE VERIFIED** against actual game cards!

---

## Tips for Excel

### Color Coding (Optional)
- **Yellow**: Inherent skills (> 0)
- **Green**: Classes that offer skill (> 0)
- **Gray**: Not available (0)

### Filters
- Filter by Character to work on one at a time
- Filter by Class to see all skills offered by that class

### Validation
Use Data Validation to restrict values to 0-3:
1. Select class columns
2. Data → Data Validation
3. Allow: Whole number
4. Data: between 0 and 3

---

## Quick Reference

**0** = Not available / No inherent skill
**1** = Level 1 available / inherent
**2** = Level 2 available / inherent
**3** = Level 3 available / inherent (max)

**Inherent Level** = FREE (from Character Card)
**Class Max Level** = Can invest points up to this level
**Investable Points** = Class Max - Inherent Level

---

## Next Steps

1. Fill out CSV with accurate data
2. Verify against game cards/rules
3. Convert to JSON using script
4. Test in character builder
5. Adjust as needed

**Questions?** See TECH_SPEC_CHARACTER_BUILDER.md for detailed system design.
