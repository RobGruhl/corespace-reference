# Core Space: LLM Rules Reference
*Complete Rules Database for Search and Context*

**Version:** 1.0
**Last Updated:** 2025-10-05
**Sources:** Core Space First Born Rulebook, v2.1 FAQ, Player Summary
**Purpose:** Comprehensive, searchable rules reference for LLM analysis and quick lookup

---

## Document Organization

This reference organizes ALL Core Space rules alphabetically and categorically for maximum searchability. Each section contains complete rule text with exact mechanics, no flavor text.

**Sections:**
- [A. Game Structure](#a-game-structure)
- [B. Actions (Complete List)](#b-actions-complete-list)
- [C. Combat Mechanics](#c-combat-mechanics)
- [D. Characters & NPCs](#d-characters--npcs)
- [E. Skills](#e-skills)
- [F. Equipment](#f-equipment)
- [G. Terrain & Environment](#g-terrain--environment)
- [H. Campaign Rules](#h-campaign-rules)
- [I. Special Mechanics](#i-special-mechanics)
- [J. Appendices](#j-appendices)

---

## A. Game Structure

### A1. Round Sequence

Each round consists of 5 phases in this order:

1. **Hostility Phase**
2. **Trader Phase**
3. **First Born Phase** (or Purge Phase)
4. **NPC Phase**
5. **Assessment Phase**

Then repeat until mission ends.

### A2. Hostility Phase

**Steps:**

1. Add hostility peg(s)
   - Solo/2-3 crews: +1 black peg
   - 4-6 crews: +2 black pegs (1 per 3 crews, rounded up)

2. Draw event card
   - First player draws from event deck
   - Resolve effects for current hostility level only
   - If assistance card (👍): Keep secret, don't show other players
   - If unresolvable:
     - Resolve what you can
     - If completely unresolvable + has NPC icon at paragraph end: Place NPC instead
     - Shuffle card back, draw another

3. Discard card
   - Place faceup in discard pile
   - If deck empty: Shuffle discards to make new deck

**Hostility Levels:**

| Pegs | Level | First Born Behavior |
|------|-------|---------------------|
| 0-4 | Relaxed | None arrive |
| 5-9 | Patrol | Small forces |
| 10-14 | Inspection | Increased forces |
| 15-19 | Wake Protocols | Heavy forces |
| 20-24 | Threat Defence | Maximum forces |
| 25+ | CLEANSE | Use "Charged" side of boards, endless waves |

### A3. Trader Phase

**Activation Order:**
- First player starts
- Proceed clockwise
- Each player activates ONE trader per turn
- Repeat until all traders activated

**Activation Steps:**

1. Choose unactivated trader (no activation counter)
2. Take actions (number = ACTION stat on board)
3. Place activation counter on dashboard
4. Pass to next player clockwise

**Restrictions:**
- Prone characters: Can only Stand Up, then act normally
- Defeated characters: Cannot act at all

### A4. First Born Phase

**Part 1: Arrival**

1. Check current hostility level
2. For each icon in that level (top to bottom):
   - **Number shown:** That many arrive
   - **Die icon:** Roll indicated die
     - Black purge die: Number showing = how many arrive
     - Chance die with 💀: Live One appears
   - When level = CLEANSE: Use "Charged" side of First Born board
3. Place miniatures:
   - Roll chance die for entry point
   - Place in contact with entry point (or as close as possible)

**Arrival Restrictions:**
- Rank 4+ First Born (Live One, Gatherer, Annihilator, True Born): Once per game only
- If using purge reinforcement cards: 2nd copy appears after CLEANSE reached
- If none of type available: Use next lowest rank
- If no Harvesters left: None arrive until some defeated

**Part 2: Activation**

Activate all First Born, highest rank first.

**Targeting (Before activation):**

First Born choose ONE target for entire activation:

1. Default: Closest non-First Born character in LoS, not in cover
2. If all visible in cover: Closest visible
3. If none visible: Closest character (measure around terrain/doors)
4. **Exception - Assassins:** Always target Captain if visible, even if not closest
5. Never target: Defeated traders
6. Target locks for entire turn unless defeated

**Actions (AI Chart):**

For each action available:

```
IF target engaged with me:
  → CLOSE ASSAULT target
ELSE IF target not in LoS:
  → MOVE toward target (shortest route)
ELSE IF no shooting stat:
  → MOVE toward target
ELSE IF can reach and attack this turn:
  → MOVE toward target
ELSE IF already moved this turn:
  → RANGED ASSAULT target
ELSE IF shooting stat > close assault stat:
  → RANGED ASSAULT target
ELSE:
  → MOVE toward target
```

**First Born Special Rules:**
- Move as far as possible (stop if reach target)
- Ranged assault: UNLIMITED range
- Unaffected by 💥 results (unless stated otherwise)
- Knocked prone: Must use first action to Stand Up

### A5. NPC Phase

**Activation Order:**
1. Galactic Corps
2. Security
3. Gangers
4. Civilians

Within each type: Highest rank first.

**Part 1: Arrival**

1. Check hostility tracker for NPC icons
2. Roll chance die for entry point
3. Place in contact with entry point
4. Activate all of current type before placing next type
5. If multiple ranks arriving simultaneously: Place lowest rank available

**Part 2: Activation**

Each NPC type has specific rules. General:

- NPCs knocked prone: Use first action to Stand Up (or if die-based activation, Stand Up replaces die roll)
- Move actions: Move as far as possible (stop if reach target)
- Cannot use items (but can carry them)
- Fire at up to medium range
- Follow normal rules for engaged characters
- Unaffected by 💥 unless stated otherwise

**NPC Targeting:**

Each type has priority list. Follow these steps:

1. If engaged with enemies: Target highest priority engaged enemy they can damage. If can't damage any: Attack highest priority with no effect
2. If enemies in LoS: Target highest priority visible
   - Multiple same priority: Closest not in cover
   - All in cover: Closest
3. If need to shoot but can't damage chosen target: Switch to next highest priority in LoS. If none: Attack original with no effect
4. If no enemies in LoS: Target closest highest priority (measure around terrain)
5. Never target: Defeated traders

**Movement Restrictions:**
- Must move past enemies without entering base contact if possible
- If impossible: Enter base contact with blocking enemy and stop
- Won't enter harmful areas (within 2 squares of exhaust vent, rock worm) unless no other route

### A6. Assessment Phase

**Steps:**

1. Remove all activation counters
2. Resolve "end of round" effects
3. Pass turn counter clockwise to next player

---

## B. Actions (Complete List)

### B1. Move

**Cost:** 1 action
**Requirements:** None
**Range:** Up to 4" per action (squares if using gridded movement: up to 4 squares)

**Rules:**

- Measure from edge of base
- Can move any direction
- Can move through friendly characters
- Cannot move through enemies without permission (NPCs never give permission)
- Cannot move through/over terrain unless have Scramble ability
- **Maximum per round:** 11" total (across all Move actions and abilities)
- Leaving base contact with 1+ standing enemies: They make free Close Assault (attack of opportunity)

**Base Contact:**
- Orthogonally adjacent = in base contact (engaged if enemy)
- Diagonally adjacent = NOT in base contact

**Entering/Leaving Ship:**
- First action of game: Must be Move to enter board from airlock
- Return to ship: Move to airlock door (need 1" remaining movement to enter)
- Once left board: Out of game, cannot return
- Enemy traders/NPCs cannot enter your ship without permission

**Grid Movement (if using):**
- Diagonal movement allowed if both adjacent squares empty
- Squares partially filled by terrain at floor level: Impassable
- Characters on large bases (Talos): Take up 4 squares, follow same rules

### B2. Assault - Ranged

**Cost:** 1 action
**Requirements:** Target in LoS and range, not engaged with target, have ammo

**Steps:**

1. Choose ranged weapon
2. Measure range to target (see Range section)
3. Roll dice based on range:
   - Short (0-5"): First number on weapon
   - Medium (5-13"): Second number
   - Long (13"+): Third number
4. Count ⚔️ symbols = base hits
5. Apply modifiers in order:
   - Cover: -1 hit if partial cover
   - Armour: Reduce by armour value
6. Remaining hits = damage
7. Remove 1 ammo peg from dashboard
8. **First ranged assault each round:** Place ammo peg in hostility tracker (not discard pile)

**Engaged While Shooting:**
- If engaged with DIFFERENT enemy: Can shoot, but engaged enemy makes free Close Assault first
- Cannot shoot target you're engaged with

**Shooting at Engaged Targets:**
- Short range: Pick target freely
- Med/long range: After rolling hits, roll chance die to determine who you hit. Apply modifiers for actual target hit.

**First Born Ranged Assault:**
- Unlimited range (ignore range restrictions)

**Other NPCs Ranged Assault:**
- Max range: Medium (13")

**Special:** See Misfires (section B15)

### B3. Assault - Close

**Cost:** 1 action
**Requirements:** Target in base contact (engaged)

**Steps:**

1. Choose weapon or fight unarmed
2. If weapon: Choose standard hit or heavy hit
3. Roll dice shown:
   - Unarmed: Number shown on board (if any)
   - Weapon standard hit: First number
   - Weapon heavy hit: Second number
4. Count ⚔️ symbols = base hits
5. Apply modifiers:
   - Cover: Does NOT apply
   - Armour: Applies normally
6. Remaining hits = damage

**Standard vs Heavy Hit:**
- Standard: Ignore 💥 results (no jam/break risk)
- Heavy: 💥 results apply (weapon may break if 2+)

**Combat Armour:**
- Some armour has unarmed combat icon
- Can be used as weapon
- Icons don't stack (use one or the other)

**Special:** See Misfires (section B15)

### B4. Search

**Cost:** 1 action
**Requirements:** See types below
**Types:** Search Terrain or General Search

**Search Terrain:**

Requirements:
- In base contact with searchable terrain (Ark, Stasis Pod, Cargo Crate)
- Not engaged with enemy

Steps:
1. Open terrain piece
2. Remove contents (keep secret)
3. Add any/all items to dashboard
4. Return unwanted items to terrain
5. Large items that don't fit: Place on floor adjacent

Notes:
- Terrain can be searched multiple times per game
- **First Born Stasis Pods:** If searched during Patrol level, Liege dies. Mark with Search Counter, won't spawn later.

**General Search:**

Requirements:
- In a room (area surrounded by walls/board edges, ignore doors/windows)
- Not engaged with enemy
- No enemies in room
- Room not searched before

Steps:
1. Place Search Counter in room
2. Draw 1 random standard square item from token pouch
3. Add to dashboard or discard adjacent

Notes:
- Each room searchable once only
- Very large rooms/long corridors: Players may agree to split into multiple searchable areas

### B5. Mine

**Cost:** 1 action
**Requirements:** Have mining tool, in base contact with solid wall, not engaged

**Steps:**

1. Place Mine Counter in room
2. Draw 1 random SMALL token from supply
3. Add to dashboard or discard adjacent

Notes:
- Each room mineable once (separate from search)
- Minerals have no in-game use but can be sold in Trade Phase
- **Risk:** May draw Rock Worm Larva (suffer hits shown, ignore physical armour)

### B6. Knock Back

**Cost:** 1 action
**Requirements:** Target in base contact

**Steps:**

1. Roll dice = unarmed combat value (or 1 die if none)
2. For each hit: Push target 1" directly away
3. If 3+ hits: Target knocked prone
4. Can follow up to stay adjacent (doesn't count as Move, no attacks of opportunity)

**Special Rules:**

- Armour: No effect
- Massive characters (🏔️ icon): Reduce hits by number shown, add that many auto-hits to their Knock Back attempts
- If roll 💥: Stumble, no effect, target makes free Knock Back against you
- If space behind target blocked: Push in closest possible direction
- If no space available: No movement

### B7. Persuade

**Cost:** 1 action
**Requirements:** In base contact with NPC, not engaged with enemy, NPC has Persuade value (🗣️)

**Options (choose before rolling):**

1. **Trade item:**
   - If NPC carrying item: Swap for one of yours (small only)
   - If not carrying: Draw random from pouch, swap that (or refuse and NPC keeps it)

2. **Join crew:**
   - NPC becomes part of crew for mission
   - See Joining Crews (D8)

3. **Mission-specific action:**
   - As defined in mission briefing

**Resolution:**

1. Roll dice = your SKILL stat (from board, not current pegs)
2. NPC's Persuade value reduces hits (like armour)
3. If still score hit: Success

### B8. Reload

**Cost:** 1 action
**Requirements:** Holding ammo token, not engaged with enemy

**Steps:**

1. Add ammo pegs shown on token to dashboard (up to maximum)
2. Flip token (🔄) or discard to supply (🗑️) as indicated on token

### B9. Interact

**Cost:** 1 action (usually)
**Requirements:** As specified by mission/terrain

**General:**
- Must be in contact with object
- Must not be engaged
- Follow mission-specific or terrain-specific rules

### B10. Clear Jam

**Cost:** 1 action
**Requirements:** Have jammed weapon, not engaged

**Effect:**
- Rotate jammed weapon token 180°
- Weapon functions normally

### B11. Don/Remove Armour

**Cost:** 1 action
**Requirements:** Not engaged

**Effect:**
- Move armour token between item tray and armour slot
- Only armour in armour slot provides protection

### B12. Stand Up

**Cost:** 1 action
**Requirements:** Character is prone

**Effect:**
- Stand figure upright
- Acts normally from then on

### B13. Repair

**Cost:** 1 action
**Requirements:** Machine character OR Tech Class, in contact with target, not engaged

**Repair Point Costs:**

- Equipment tokens: 1 RP
- Consoles: 3 RP
- Defeated Machine characters: 5 RP (revive with 1 Health)
- Damaged Machine characters: 1 RP per Health point

**Steps:**

1. Roll 1 combat die
2. Each ⚔️ = 1 Repair Point
3. Apply RPs toward total needed
4. If not fully repaired: Place Reminder Counter to track progress
5. Additional Repair actions add more RPs

**Restrictions:**
- Machines cannot Repair themselves (unless stated otherwise)
- For items: Must be holding or adjacent to holder

### B14. Effortless Actions

**Cost:** Free (don't count toward action limit)
**Limit:** ONE free effortless action per turn

**Available Effortless Actions:**

1. **Proximity Move:** Move up to 1" (still counts toward 11" max)
2. **Use ✓ Item:** Use item with effortless icon
3. **Throw Item:** Throw item with throw icon (see Throwing)
4. **Pick Up Item:** From adjacent square
5. **Drop Item:** Into adjacent square
6. **Give/Take/Swap Item:** With character in base contact (if owner allows)

**Getting Additional Effortless Actions:**

- Spend 1 skill peg for 2nd effortless action
- This counts as your skill use for the round
- Some skills grant specific effortless actions (e.g., "Reload as effortless action")

**Timing:**
- Usually taken before or after regular actions (not during)
- Some skills specify different timing

### B15. Misfires

**Trigger:** 2+ 💥 results on combat dice

**Effects:**

**Ranged Weapons:**
- Jammed: Rotate token 180°
- No damage dealt
- Requires Clear Jam action (costs 1 action)

**Close Assault Weapons (Heavy Hit only):**
- Broken: Flip token facedown
- No damage dealt
- Cannot use rest of mission
- Auto-repairs between missions (campaign)
- Can repair during mission with Repair action

**Exceptions:**
- Unarmed combat: 💥 has no effect
- Weapons with Reliable icon (🔧): Ignore 💥
- First Born weaponry: Ignore all 💥 effects

**Accelerant Ammo:**
- Single 💥: Jams weapon
- Three 💥: Breaks weapon (must be repaired)
- With Fire/Poison weapons: Single 💥 breaks weapon AND deals 1 damage to user

### B16. Throwing Items

**Requirements:** Item has throw icon (🎯), LoS to target

**Range:**
- Default: Short (0-5")
- M next to icon: Medium (5-13")
- L next to icon: Long (13"+)

**Resolution:**

1. Choose target point or character in range and LoS
2. Roll dice shown inside throw icon
3. Apply cover and armour as normal ranged attack
4. Remove thrown weapon from dashboard
5. Place token on floor adjacent to target
6. Can be picked up like any item

**If Blast Weapon:** See Blast Weapons (C6)

### B17. Attacks of Opportunity

**Trigger:** Character leaves base contact with 1+ standing enemies

**Effect:**
- ALL engaged standing enemies make free Close Assault
- Resolved immediately (interrupts movement)
- Doesn't use attacker's actions
- Can be done even if attacker already activated this round

**Exceptions:**
- Prone enemies: Cannot make attacks of opportunity
- Defeated enemies: Cannot make attacks of opportunity
- Somnambulant True Born: Never makes attacks of opportunity
- Some skills prevent attacks of opportunity
- Knock Back movements: No attacks of opportunity

---

## C. Combat Mechanics

### C1. Attack Resolution

**General Steps (all attacks):**

1. Roll combat dice for weapon (or unarmed stat)
   - 1 blue die (always)
   - Additional red dice as shown
2. Count ⚔️ symbols = hits
3. Apply modifiers in order:
   - Cover (ranged only): -1 hit if partial cover
   - Armour: Reduce by armour value
   - Other modifiers: As specified
4. Remaining hits = damage
5. Check misfires: 2+ 💥 = weapon jams/breaks

**Damage Application:**

**Traders:**
- Lose 1 Health peg per hit
- If Health reaches 0: Defeated (lay on side, place assistance counter)
- Remain until moved or revived

**NPCs:**
- Unless stated otherwise: Instantly defeated and removed if take any damage
- Items they carried: Dropped on floor where fell

**Exceptions:**
- True Born: Has health inserts, not instantly defeated
- Some NPCs may have health track

### C2. Armour

**Types:** Physical (🛡️) and Shield (⚡)

**Physical Armour:**
- Permanent effect while worn
- Reduces hits by value shown
- Applies to EVERY attack
- Never depletes

**Shield Armour:**
- Energy-based, can overload
- If hits ≤ shield value: Blocks all, shield stays active
- If hits > shield value: Blocks (value) hits, remaining damage through, shield OVERLOADS
- Overloaded: Flip facedown, inactive rest of mission
- Recharges between missions (campaign)

**Multiple Armour:**
- If have both physical and shield: Use highest value
- If values equal: Shield takes priority

**Combat Armour:**
- Some armour has unarmed combat icon
- Can be used as Close Assault weapon
- Icons don't stack

**Armour vs Effects:**
- Physical armour: Blocks damage but not secondary effects
- Knock Back: Armour has NO effect
- Persuade: NPC's Persuade value works like armour

### C3. Line of Sight (LoS)

**Drawing LoS:**

- Draw straight line from center of your base to ANY PART of target
- Can draw if:
  - Not completely blocked by wall
  - Not completely blocked by terrain as tall as target
  - Not completely blocked by another character

**Character Height:**
- All characters considered same height
- Entire area above base blocks LoS (regardless of pose)
- **Exception:** Massive (🏔️) characters can be seen past smaller characters

**Friendly LoS Assistance:**
- Can ignore terrain shorter than self if in base contact
- Applies to friendly crew in base contact too

### C4. Cover

**Determining Cover:**

Terrain/walls partially obstruct target:

- **< 25% obscured:** No cover
- **25-90% obscured:** Partial cover
- **> 90% obscured:** Full cover (cannot draw LoS)

**Partial Cover Effect:**
- Reduces ranged attack hits by 1
- Applied BEFORE armour
- Does NOT apply to close assault
- Does NOT apply to attacks without origin (card effects, etc.)

**Cover Timing:**
- Resolved before all other modifiers

### C5. Range

**Measurement:** From edge of shooter's base to edge of target's base

**Range Bands:**

| Range | Distance | Weapon Dice |
|-------|----------|-------------|
| Short | 0-5" | First number |
| Medium | 5-13" | Second number |
| Long | 13"+ | Third number |

**Special:**
- First Born ranged attacks: Unlimited range
- Other NPCs: Maximum medium range
- Engaged characters at short range: Can pick target when shooting into melee

### C6. Blast Weapons

**Targeting:** Can target character or point on floor (doesn't require character)

**Steps:**

1. Choose target point/character in range and LoS
2. Roll blue combat die (only blue):
   - ⚔️ hit(s): On target
   - Blank: Miss, blast origin 1" away in direction of your choice
   - 💥: Serious miss, blast origin up to 2" away in direction of TARGET player's choice (or first player if NPC)
3. If intervening terrain between shooter and target: -1 hit
4. Determine who's hit:
   - At blast origin: Target
   - Partially within 1" of origin: Hit
   - Partially within 2" of origin: Hit
5. Roll combat dice for each character hit:
   - Target: Large number
   - Within 1": Top right number
   - 1-2" away: Bottom right number
6. Apply armour and cover to each character

**Special Rules:**
- Blast cannot pass through walls
- Does pass through windows and across terrain
- Characters on far side of terrain hit: Benefit from cover

### C7. Combat Dice

**Dice Used:**

- **Blue die:** Always rolled (1 minimum)
- **Red dice:** Additional dice as shown on weapon

**Faces:**

- **⚔️ (Hit):** Counts as 1 hit
- **Blank:** No effect
- **💥 (Misfire):** Potential malfunction

**Misfire Threshold:** 2+ 💥 = jam or break (see Misfires B15)

**Modifiers:**

Some effects add/remove dice:
- Skills (e.g., "Add 2 dice to attack")
- Burst fire
- Accelerant ammo
- Cover (reduces HITS, not dice)
- Armour (reduces HITS, not dice)

### C8. Defeated Characters

**Becoming Defeated:**

- Trader's Health reaches 0
- Lay miniature on side
- Place assistance counter nearby
- Cannot be targeted by enemies
- Cannot act

**Reviving:**

Requirements:
- Trader in base contact
- Use healing item (from either trader's inventory)
- Target not engaged with enemy

Steps:
1. Use healing item (may cost action or be effortless)
2. Restore Health shown on item
3. Remove assistance counter
4. Character left prone (must Stand Up)
5. Can activate normally this round (if haven't already)

**Grab a Leg (No Healing):**

Requirements:
- Trader in base contact
- Defeated character not engaged

Effect:
- 1 trader: Spend 1 action, move 2" with defeated character
- 2 traders: Spend 1 action each, move 4" with defeated character, both traders get -1 action next turn (place reminder counter)

**Rob Them Blind:**

- Enemy traders can Search defeated trader like cargo crate
- Take items from item tray
- Discarded items left on floor

**In Campaign:**

- Defeated traders left on board must be extracted
- Roll chance die: 💀 = permanently dead
- Or attempt rescue mission
- Or use emergency teleport (see Campaign H3)

---

## D. Characters & NPCs

### D1. Trader Statistics

**Found on:** Trader boards in dashboard

**Stats:**

**ACTIONS:** Number of actions per turn (usually 2-4)

**HEALTH:** Hit points
- Filled with green pegs
- Lose 1 per damage
- At 0: Defeated

**SKILL:** Mental/social ability
- Filled with purple pegs
- Used for Persuade rolls
- Spent to use skills
- Once spent: Gone for entire game

**AMMO:** Ammunition for ranged weapons
- Filled with yellow pegs
- Lose 1 per ranged attack
- Reload with ammo tokens

**CAREER:** Advancement track (campaign)
- Fill spaces to level up
- Each level grants +1 Health, +1 Skill
- Level 3: Also +1 Action

**CLOSE ASSAULT:** Unarmed combat dice (if any)

**RANGED ASSAULT:** Unarmed ranged dice (if any)

**ARMOUR:** Natural armour value (if any)

### D2. NPC Statistics

**Found on:** NPC boards

**Stats:**

**ACTIONS:** Number shown (or die-based)

**CLOSE ASSAULT:** Dice for melee (🗡️)

**RANGED ASSAULT:** Dice for shooting (🔫)

**ARMOUR:** Physical armour value (🛡️)

**PERSUADE:** Difficulty to persuade (🗣️)

**RANK:** Power level (affects activation order)

**Special Icons:**
- Linked actions (⛓️): All actions must be same type
- Cannot use ranged weapons (🚫🔫)
- Cannot use close assault weapons (🚫🗡️)
- Cannot use equipment (🚫📦)

### D3. First Born Types

**Drones (Rank 1):**
- Scout units
- Arrive at patrol points (not entry points)
- Low threat but alert others

**Harvesters (Rank 1):**
- Basic First Born
- Numerous
- Use standard AI

**Devastators (Rank 2):**
- Heavy weapons
- Dangerous at range

**Assassins (Rank 3):**
- Elite killers
- ALWAYS target Captains if visible
- Will leave other targets to reach Captain

**Lieges (Rank 4):**
- Commanders
- Arrive from stasis pods
- Attempt to wake True Born
- Once per game

**Iconoclasts (Rank 5):**
- Advanced warriors
- Warp shift ability
- Once per game

**Live One (Rank 4):**
- Dangerous beast
- Appears on chance die 💀 at appropriate hostility
- Once per game
- Defeating grants kill point counter

**Gatherer (Rank 4):**
- Resource collector
- Once per game

**Annihilator (Rank 5):**
- Devastating firepower
- Once per game

**True Born (Rank 6):**
- Boss enemy
- Two states: Somnambulant and Awake
- Has 4 health inserts (not instantly defeated)
- See True Born (I3) for complete rules

### D4. NPC Types

**Civilians:**
- Roll chance die each activation
- Results: Move, Attack, Hide, Join, Trade, Live One transformation
- Flee from First Born (won't move within 4")
- Target priority: First Born > Gangers/Traders (closest)
- Moving away from civilians: No attack of opportunity

**Game Hunters:**
- Hunt beasts and Rock Worms
- Collect trophy tokens from defeated beasts
- Leave once all trophies collected
- Target priority: Beasts > First Born > Others

**Gangers:**
- Hostile NPCs
- Use AI action chart
- Can be persuaded to join

**Security:**
- Station guards
- Can be commandeered by Galactic Corps

**Galactic Corps:**
- Military force
- Use AI action chart

### D5. First Born AI Chart

See A4 for complete flow chart.

**Priority:**
1. Close assault if engaged
2. Move if can't see target
3. Move if no ranged weapon
4. Move if can reach target this turn
5. Ranged assault if already moved AND shooting > close stat
6. Move otherwise

### D6. NPC Target Priority

Each NPC type has priority list (highest priority first):

**Examples:**

Civilians: First Born > Gangers/Traders (whichever closest)

Game Hunters: Beasts > First Born > Others

**Priority Tiebreakers:**
1. Closest not in cover
2. If all in cover: Closest

### D7. Rank System

**Ranks:** 1 (lowest) to 6 (highest)

**Effects:**
- Higher ranks activate before lower ranks
- Within same rank: First player chooses order
- Used for target priority in some cases

**Rank 4+ Special:**
- Appear once per game only
- Won't respawn if defeated
- Exception: With purge reinforcement cards, 2nd copy appears after CLEANSE

### D8. Joining Crews

**How NPCs Join:**

- Persuaded successfully
- Or specific mission/event effect

**When Joined:**

- Part of crew for all purposes
- Activated in Trader Phase by player
- Use actions shown on board
- Cannot use items (but can carry small items)
- Retain NPC statistics (don't flip board)
- If defeated: Removed, cannot revive

**Item Carrying:**

- NPC has item slot (small tokens only)
- If wasn't carrying: Draw random from supply
- Other traders can swap items with NPC
- NPC cannot use items themselves
- If NPC defeated: Items drop on floor
- If NPC leaves crew: Items stay with NPC

**Civilians Special:**

- Must still roll chance die in NPC Phase each round
- If roll JOIN: Leaves crew, reverts to civilian
- If roll LIVE ONE: Transforms if hostility high enough
- Other results: Ignored

**Campaign Permanent Hires:**

- If NPC still in crew at mission end AND reached ship: Can permanently hire
- See Campaign rules (H4)
- Galactic Corps and Security: Cannot hire permanently

---

## E. Skills

### E1. Using Skills

**Cost:** Skill pegs = level chosen (1-3)

**Limit:** ONE skill use per round
- OR spend 1 peg for 2nd effortless action (counts as skill use)

**Steps:**

1. Select skill and level
2. Remove skill pegs = level (stay removed entire game)
3. Execute skill effect

**Timing:**
- Active skills: Usually during your turn
- Reaction skills: When triggered (can be after your activation)
- Passive skills: Always on (no peg cost)

**Skill Conflicts:**
- If skill contradicts core rules: Skill takes precedence

**Duplicate Skills:**
- If have same skill multiple times: Add levels together
- Armour with skills may reduce available level if don't wear it

### E2. Passive Skills

**Characteristics:**
- Always active if you have the level
- Don't require spending pegs
- Work even if skill pegs depleted

**Examples:**
- Weapons Expert level 1: Reload as effortless action
- Combat Expert level 1: Ignore 1 hit in attacks of opportunity
- Hard to Hit: Cannot be damaged while in cover

### E3. Reaction Skills

**Characteristics:**
- Trigger outside your turn
- Each has specific trigger condition
- Can use even after you've activated
- Must resolve trigger first, then apply skill

**Examples:**
- Reflexes: After being targeted with close assault
- Counter Shot: After being targeted with ranged attack
- Evade: When enemy moves into base contact

**Timing:**
- Trigger must fully resolve first
- Then skill applies immediately
- Regular play resumes after skill

### E4. Active Skills

**Characteristics:**
- Used during your turn
- Spend pegs to activate
- Provide actions or effects

**Examples:**
- Sure Shot: Make ranged attack with auto-hit
- Onslaught: Add dice to close assault
- Assist: Coordinate team actions

### E5. Skill List (Alphabetical)

**Note:** Full skill descriptions in Core Space First Born Rulebook p.93-100. Summary here.

**Accelerate (Tech):**
- Level 1: Make Move action
- Level 2: Make 2 extra Move/Assault actions
- Level 3: Make 3 extra Move/Assault actions

**Ambush (Stealth):**
- Reaction: When enemy ends move within 4" and you in cover
- Level 1: Ranged assault + proximity move
- Level 2: Move + assault + proximity move
- Level 3: Move + assault + move + proximity move

**Assist (Tech):**
- Level 1: Target can't be harmed by ranged attacks this round
- Level 2: Target restores 2 health
- Level 3: 3 characters each make 1 action

**Blast (Augmented):**
- Level 1: Ranged attack 3-2-0
- Level 2: 2 Move actions ignoring cover/characters
- Level 3: All within short range suffer 3 dice attack, pushed away

**Camouflage (Cunning):**
- Level 1: In base contact with wall, can't be targeted
- Level 2: Ranged assault + in base contact with terrain, can't be targeted
- Level 3: While not engaged, can't be targeted

**Combat Expert (Ranged):**
- Passive level 1: Ignore 1 hit in attacks of opportunity
- Level 1: Sweep enemy prone
- Passive level 2: Close assault as effortless action
- Level 2: Use pistol/rifle in close assault (+2 dice)
- Level 3: Push all engaged 2" away (2 dice attack each), then move

**Counter Shot (Ranged):**
- Reaction: After being targeted with ranged attack
- Level 1: Make ranged attack against attacker
- Level 2: At any time after enemy's first action, make ranged attack
- Level 3: At any time, ranged attack (+1 die) + move

**Disarm (Ranged):**
- Reaction: After enemy close assault where you took no damage
- Level 1: Remove/scatter their weapon
- Level 2: Steal their weapon
- Level 3: As level 2 + close assault + move (no attacks of opportunity)

**Disrupt (Tech):**
- Level 1: Target tech trader can't use tech skills OR 2 rank 1-3 First Born miss next turn
- Level 2: All tech traders in medium range can't use tech skills OR all rank 1-3 First Born in medium range miss next turn
- Level 3: Multiple options: Permanent disable, all First Born miss 2 turns, etc.

**Distraction (Cunning):**
- Level 1: Ranged assault, target loses 1 action
- Level 2: Ranged assault, enemy in short range of target misses turn + move
- Level 3: Ranged assault, move target, target misses turn + you move

**Energise (Augmented):**
- Level 1: Move or ranged assault OR restore 1 health
- Level 2: Look at top 2 event cards + move
- Level 3: Move + (close assault 6 dice OR ranged assault 4 dice, lose 1 health)

**Evade (Cunning):**
- Reaction: When enemy moves into base contact
- Level 1: Move (no attacks of opportunity)
- Level 2: Move + assault
- Level 3: 2 moves + assault, attacker can't do anything else

**Fade to Black (Close Combat):**
- Reaction: After close assault targeted where took no damage
- Level 1: Make move
- Level 2: Move + close assault (+1 die)
- Level 3: Ignore all hits + move + assault (+2 dice) + move (no attacks of opportunity)

**Hack (Tech):**
- Level 1: Shut down rank 1-2 First Born in medium range OR lock/unlock adjacent door
- Level 2: Shut down 2 rank 1-2 First Born
- Level 3: As level 2 OR take control rank 1-3 First Born OR lock/unlock any door

**Hard to Hit (Stealth):**
- Level 1: While in cover, can't be damaged by ranged until end of round
- Level 2: In cover OR > short range, can't be damaged by ranged
- Level 3: Ranged assault + move, can't be damaged by ranged

**Impervious (Close Combat):**
- Reaction level 1: Ignore effect that would lose actions/miss turn
- Level 2: Physical armour +2 until end of round
- Level 3: Restore 1 health (can exceed max), can't take damage/be knocked back/lose actions until end of NEXT round

**Kata (Close Combat):**
- Reaction: After scoring hits with attack
- Level 1: After close assault hit, make another close assault
- Level 2: After any attack hits, move + close assault
- Level 3: During move, ignore attacks of opportunity, close assault each enemy contacted

**Light Fingers (Cunning):**
- Reaction: After enemy close assault where took no damage
- Level 1: Steal item from their tray
- Level 2: As level 1, can use ✓ items immediately
- Level 3: As level 2 + move or assault (no attacks of opportunity)

**Manipulate (Augmented):**
- Level 1: Enemy in LoS misses next turn
- Level 2: Break enemy's item in LoS
- Level 3: Move small terrain short range OR hurl medium terrain (4 dice if hits character)

**Marksman (Ranged):**
- Level 1: Ranged attack
- Level 2: Ranged attack +1 die, split hits between 2 targets in short range of each other
- Level 3: Ranged attack +2 dice, split hits between any number of targets in short range of each other

**Onslaught (Close Combat):**
- Level 1: Close assault +2 dice
- Level 2: Close assault +3 dice
- Level 3: Close assault +4 dice, split hits between any engaged enemies

**Persuasion (Cunning):**
- Level 1: Persuade enemy trader (skill vs skill), miss next turn if succeed
- Level 2: Persuade non-First Born enemy +1 die, can persuade to miss turn
- Level 3: Persuade non-First Born enemy +2 dice, can persuade traders to join (not captains), roll chance die each round (💀 = returns)

**Reflexes (Close Combat):**
- Reaction: After targeted with close assault
- Level 1: Ignore all hits
- Level 2: Ignore all hits + close assault (+1 die)
- Level 3: Ignore all hits + close assault (+2 dice) + move (no attacks of opportunity)

**Regulate (Tech):**
- Level 1: Remove peg from hostility OR 1 repair point to item/machine
- Level 2: Turn over entry point, First Born won't use until next level
- Level 3: Choose point, all First Born (except Live Ones) in medium range move to that point, don't act further

**Sure Shot (Ranged):**
- Level 1: Ranged assault short range, 1 auto-hit (ignore cover, armour applies), can't move same round
- Level 2: Ranged assault medium range even after moving, 1 auto-hit (ignore cover, armour applies)
- Level 3: Ranged assault medium range even after moving, 1 auto-hit (ignore cover AND armour)

**Walk it Off (Endurance):**
- Level 1: Restore 1 health
- Reaction level 2: After being targeted, reduce damage by 2
- Reaction level 3: After being defeated, restore 1 health, stand up, may move

**Weapons Expert (Ranged):**
- Passive level 1: Reload as effortless action
- Level 1: Ranged attack +2 dice, can't move same round
- Passive level 2: Ranged assault with pistol as effortless action
- Level 2: Fire 2 pistols as single action (add dice -1)
- Level 3: Shoot weapon from enemy's hand (2 dice, no damage, scatter weapon)

---

## F. Equipment

### F1. Equipment Types

**Weapons (Blue tokens):**
- Held in item tray
- Used for Assault actions
- Ranged or Close Assault

**Armour (Yellow tokens):**
- Held in item tray
- Only provide protection when in armour slot
- Physical or Shield type

**Special Items (Orange tokens):**
- Any other equipment with in-game effects

**Non-Combat (Purple tokens):**
- Money, ship parts
- No in-game use
- Used in Trade/Maintenance phases

**Objectives (Green tokens):**
- Mission-specific
- Usually must be carried off board
- Can be sold in Trade Phase if have UA value

### F2. Item Attributes (Icons)

**Movement (🏃):**
- Add inches shown to Move action
- Still limited to 11" max per round

**Throw (🎯):**
- Can be thrown at range shown
- Default: Short
- M = Medium, L = Long
- See Throwing (B16)

**Effortless (✓):**
- Can be used as effortless action
- See Effortless Actions (B14)

**Rare (💎):**
- Cannot be bought
- Found via Search only

**Burst Fire +1 (📦):**
- Add 1 combat die
- Remove 1 extra ammo peg

**Burst Fire +2 (📦📦):**
- Add up to 2 combat dice
- Remove same number extra ammo pegs

**Full Charge Shot (⚡):**
- Empty all ammo in one shot
- 4-5 pegs: +2 dice
- 6-7 pegs: +3 dice

**Infinite Ammo (∞):**
- Don't remove ammo pegs
- Still add 1 peg to hostility tracker

**Reliable (🔧):**
- Ignore 💥 results

**Target Lock (🎯):**
- Ignore partial cover
- Fire at engaged characters without randomizing

**Silent (🤫):**
- Don't add peg to hostility tracker

**Dangerous (☠️):**
- After firing, suffer attack with dice = number shown

**Sustained Fire (🔄):**
- If hit, immediately make another ranged attack as effortless
- Must target same enemy or enemy within short range

**Flip Token (🔄):**
- After use, flip facedown
- Often has alternate effect on back

**Discard Token (🗑️):**
- After use, return to token bag/supply

**Fast Reload (⚡):**
- Can reload as effortless action

**No Reload (🚫):**
- Cannot reload during game
- Only reloads between missions

**Cannot Use This Mission (⏳):**
- Turn facedown as reminder
- Can use in future missions

**Freeze (❄️):**
- Target misses next turn (no roll needed)
- Roll dice for characters within 1" and 2"
- Hits freeze them too (ignore armour/cover)

**Disarm Field (📡):**
- All within short range (ignore LoS/armour/cover) can't make ranged assaults this round
- No roll needed

**Scatter (🌀):**
- Scatters target (no attacks of opportunity)
- Can go through walls but not end on them
- Roll dice for characters within 1" and 2"
- Can use on friendly characters

### F3. Weapon Statistics

**Ranged Weapons:**

Format: [Short] [Medium] [Long]

Example: Machine Pistol 3-2-0
- Short range: 3 dice
- Medium range: 2 dice
- Long range: 0 (cannot fire)

**Close Assault Weapons:**

Format: [Standard] / [Heavy]

Example: Combat Knife 1/2
- Standard hit: 1 die (ignore 💥)
- Heavy hit: 2 dice (💥 may break)

**Unarmed:**

Single number = dice for both close and ranged (if applicable)

### F4. Armour Statistics

**Format:** [Physical] [Shield] [Combat]

Example: Combat Vest shows:
- Physical: 1
- Shield: -
- Combat: -

Example: Shield Belt shows:
- Physical: -
- Shield: 1
- Combat: -

Example: some armor shows all three:
- Physical: 1
- Shield: 1
- Combat: 2

**Combat Value:**
- If shown, can use as unarmed close assault weapon
- Roll dice = value shown

### F5. Special Items

**Ammo Tokens:**

Show: Number of pegs to add + 🔄 or 🗑️

Process: Add pegs (up to max), then flip or discard

**Accelerant Ammo:**

- Load like normal ammo (use orange pegs)
- Or discard at start to start with standard ammo loaded
- When firing: +1 die per peg spent
- Single 💥 jams weapon (vs normal 2+)
- Three 💥 breaks weapon
- Reliable icon requires 🔧🔧 instead
- With Fire/Poison: Single 💥 breaks weapon AND deals 1 damage to user

**First Born Weaponry:**

- Green items
- Ignore ALL 💥 effects (never jam/break)
- Cannot be combined with standard weapon upgrades

**Rotating Tokens:**

- Multiple effects on different sides
- Orient so text upright
- After use: Rotate 90° clockwise
- If shows 🔄 or 🗑️ after rotation: Do immediately

Example: Liege Ring
- Use 1: 4 dice ranged
- Use 2: 4 dice ranged
- Use 3: 3 dice ranged
- Use 4: Discard

**Items for Others:**

- Can use on friendly character in base contact
- Don't have to trade item first
- Example: Use Medi-Stim on adjacent ally

**Nano Tokens:**

- Half-size tokens
- All are Reliable (🔧)
- Often upgrade other items
- Example: Sniper Sight applies to ranged weapon

**Rock Worm Larvae:**

- When drawn: Suffer hits shown
- Ignore physical armour
- Machines not affected
- Then discard

**Skill Items:**

- Grant skill as if on trader board
- Flip token instead of spending skill peg
- Example: Matter Shifter (Manipulate Skill)

**Laser Cutter:**

- Unlock and open locked doors in base contact

**Jump Pack:**

- Effortless action
- Make Move using Scramble icon shown

**Mines & Detonators:**

- Mine: Throw or drop as effortless action
- Detonator: Use within range shown (no LoS needed) to detonate mine
- Different crews need different colored reminder counters

**Shard Fins:**

- Effortless action
- Make Move using icons shown

**Necro Flask:**

- Throw at trader (even defeated) or use on self
- Add 4 Health pegs (can exceed max)
- Place token on board
- Character loses 1 Health in each Assessment Phase until defeated

**Sypher Orbs:**

- Look at next 1 or 2 event cards
- Put back in same order

**Repair Fibril:**

- Use in Repair action: Auto-apply repair points shown (no roll)
- Unused amount lost
- Can use in Maintenance Phase: Pay 2UA labor, make repairs shown

**Exclusive Items:**

- Some items only for specific character/species/class
- Marked on token

### F6. Equipment Management

**Item Limits:**

**Item Tray:**
- Size varies by trader
- Can hold weapons, items, armour
- Armour in tray doesn't provide protection

**Armour Slot:**
- Only 1 item
- Only armour in this slot provides protection

**Ship's Hold (Campaign):**
- Limited space
- Storage between missions

**During Mission:**

- Cannot pick up items if no room
- Must drop something first
- Can swap between traders (effortless action)

**Token Backs:**

Show: [Purchase Cost] / [Sell Value]

Used in Trade Phase (campaign)

---

## G. Terrain & Environment

### G1. Board Setup

**Grid/Gridless:**
- Gridded: 25mm squares
- Gridless: Measured in inches

**Board Edge:**
- Considered wall for rules purposes
- Don't need physical walls

**Movement:**

**Gridded:**
- Diagonal allowed if both orthogonal squares empty
- Squares with terrain at floor level: Impassable
- Measure angles by closest valid route

**Measured:**
- Move in any direction
- Cannot move through terrain

### G2. Doors & Windows

**Basic Game:**
- All doors: Open and unlocked
- All windows: Open but cannot move through (except with Scramble or First Born)

**Advanced (Optional):**
- Doors can be locked
- Require Interact action to open
- Or Laser Cutter to unlock
- Tech skills can lock/unlock remotely

### G3. Entry Points & Patrol Points

**Entry Points:**

- Where First Born arrive (most types)
- Roll chance die to determine which
- Place arriving characters in contact

**Patrol Points:**

- Where Drones and True Born arrive
- Represent emerging from inside rock

### G4. Searchable Terrain

**First Born Arks:**

- Contain equipment
- Searchable any number of times
- See Terrain Reference for details

**Stasis Pods:**

- Contain equipment
- May contain Lieges
- If searched during Patrol: Liege dies, mark with Search Counter
- Searchable any number of times

**Cargo Crates:**

- Contain equipment
- Loaded before game per mission
- Searchable any number of times

### G5. Interactive Terrain

**Command Console:**

- Can be interacted with per mission rules
- May require Repair

**Dyson Reactor:**

- Provides energy
- May require interaction

**Exhaust Vents:**

- Emit harmful energy
- Characters won't enter within 2 squares unless no other route
- If within area: May take damage

**Pillars:**

- Provide cover
- Block movement

**Rock Worm Holes:**

- Start facedown (hidden)
- Flip when worm arrives
- See Rock Worms (I5)

### G6. Terrain & LoS

**Height:**

- Terrain has height
- Blocks LoS if as tall as target
- Characters in base contact can ignore shorter terrain

**Cover:**

- Terrain provides partial cover if 25-90% obscures target
- See Cover (C4)

**Scramble Ability:**

- Can climb over/through terrain
- Icon shows max height/width + safe jump distance
- Format: [Max climb/pass through] / [Safe jump down]

---

## H. Campaign Rules

### H1. Post-Game Sequence

**Order:**

1. Extraction Phase
2. Advancement Phase
3. Trade Phase
4. Maintenance Phase

### H2. Extraction Phase

**If all crew made it out:** Skip this phase

**For each defeated trader:**

1. Roll chance die
2. 💀 result: Permanently dead (remove from campaign)
3. Otherwise, choose option:

**Option A: Rescue Mission**

- Immediately start new game
- Board and components remain in place
- Hostility stays at current level
- All traders reload ammo, swap equipment, restore 2 health
- Mission ends normally
- Can only rescue once per game
- Solo or other players can join
- If leave trader after rescue: Must use different extraction

**Option B: Emergency Teleport**

Roll chance die on table (varies by rulebook edition):

Results vary but include:
- Successful teleport
- Wounded but alive
- Lost equipment
- Captured
- Other consequences

**Option C: You're On Your Own**

Roll chance die on table (varies by rulebook edition):

Results if no crew aboard ship vary but include:
- Found by others
- Lost in space
- Captured
- Killed
- Other consequences

### H3. Advancement Phase

**Career Points:**

Each trader that:
- Survived AND
- Made it back to ship (not extracted)

Gains: +1 career point

**True Born Kill Point:**

If trader has True Born kill point counter:
- Exchange for +1 additional career point

**Spending Career Points:**

- Fill next empty space on trader board
- Can also allocate to skills on class board

**Leveling Up:**

When complete a level row:

- **Level 1:** +1 Health, +1 Skill (permanently)
- **Level 2:** +1 Health, +1 Skill (permanently)
- **Level 3:** +1 Health, +1 Skill, +1 Action (permanently, max level)

**Restrictions:**

- Can only level up if potential spaces available on board
- Defeated traders needing extraction: Don't gain career points

### H4. Trade Phase

**Choosing Trading Post:**

Each crew chooses ONE trading post to visit

**Trading:**

- Buy items: Pay cost (first number on token back)
- Sell items: Receive value (second number on token back)
- Rare items (💎): Cannot be bought
- Objective tokens with UA: Can be sold
- Stock limited to available tokens
- Can barter with other players

**Turn Order:**

- Winner picks first, alternates
- If no winner: Flip turn counter
- If 2 players same post: Winner first pick, then alternate

**Hiring Crew:**

- Can hire new traders
- Maximum 7 traders total
- Pay cost shown

**Permanent NPC Hires:**

If NPC joined crew during mission AND made it to ship:
- Can permanently hire
- Costs as shown on board
- Becomes trader for future missions
- Exception: Galactic Corps and Security cannot be hired

**Restrictions:**

- If no room in item trays/ship's hold: Cannot purchase

### H5. Maintenance Phase

**Ship Systems:**

1. **Degradation Check:**
   - Roll chance die
   - Apply result to ship system
   - If any system reaches 0: Ship destroyed, crew out of campaign (unless repair this phase)

2. **Repairs:**
   - 2 UA per repair point (fill 1 space)
   - Ship parts tokens: Provide repairs = amount shown
   - Can repair multiple systems

3. **Upgrades:**
   - Can purchase ship upgrades
   - Mark on both sides of ship board
   - Types: Scanners, Airlock Auto-Defences, Docking Thrusters
   - 3 levels each

**Repair Fibril (Campaign Use):**

Can use Repair Fibril in Maintenance Phase:
- Pay 2 UA labor
- Apply repair points shown
- Unused amount lost

### H6. Selecting a Crew

**Pre-Built Crew:**

Use crew as provided

**Custom Crew (Point Buy):**

1. Agree on points limit (e.g., 180)
2. Each player buys:
   - 1 Captain (mandatory)
   - Up to 6 additional crew (7 total max)
   - Can choose any traders (including civilians/gangers on reverse side)
3. Select class board for each trader
4. Allocate career points to skills (up to default values)
5. Must include at least 1 trader with Tech class

**Rookie Crews:**

- No career advancements
- Starting statistics only
- Equip from 0-cost items only:
  - Each: 1 ranged weapon, 1 close combat weapon, 1 medi-stim
  - Maximum 2 medi-stims per crew

**Experienced Crews:**

1. Select traders as normal
2. Agree on starting career level (e.g., level 2)
3. Advance each trader that many times
4. Agree on UA budget (e.g., 20 UA each)
5. Buy equipment from any trading posts

### H7. Mission Structure

**Primary Objective:**

- Main goal
- Completing = winner
- Not completing = all players lost

**Secondary Objectives:**

- Optional
- May provide benefits

**Objectives Don't Have to Complete:**

- Can end mission without completing
- Can sabotage objectives if needed

**Mission End:**

Immediately when:
- All traders defeated OR
- All traders back on ships

**Winning:**

- If entire crew defeated: Automatic loss
- Otherwise: Who completed primary objective
- If nobody: Most traders alive
- Still tied: Most valuable equipment (token sell values)

**Campaign Winner (overall):**

- May gain benefits in next mission
- Example: First choice of deployment position

---

## I. Special Mechanics

### I1. Hostility Tracker

**Function:** Doom clock measuring enemy awareness

**Increasing:**

- Every round: +1 automatic
- First ranged shot each round: +1 (ammo peg goes here)
- Some event cards: +varies
- Some terrain/actions: +varies

**Decreasing:**

- Rare (some Tech skills like Regulate)
- Usually cannot decrease

**Levels:** See A2

**Strategy:**

- Work quickly early
- Coordinate who shoots first each round
- Plan extraction before CLEANSE

### I2. Chance Die & Randomization

**Chance Die:**

6-sided die with directional arrows and symbols

**Uses:**

- **Direction:** Scatter, random movement
- **Random Number:** Ignore main icon, use number
- **Specific Results:** Each face has unique symbol

**Rolling for Entry Points:**

- Roll chance die
- Place at entry point matching result
- If no match or blocked: First player chooses

**Scatter:**

- Roll chance die
- Move object # of inches in direction shown
- If hits wall/character/obstruction: Stops
- Some effects scatter twice (roll twice)

### I3. True Born (Special)

**States:**

1. **Somnambulant:** Sleepwalking, limited threat
2. **Awake:** Full combat ability

**Arrival:**

- Only one True Born per game
- Arrives in Stasis Chamber at Patrol Point
- If arrives before Wake Protocols: Stays in chamber
- At Wake Protocols: Emerges from chamber (Somnambulant)
- If arrives at/after Wake Protocols: Emerges immediately

**Somnambulant Activation:**

- Scatter twice only
- No other actions
- Never makes attacks of opportunity

**Waking Up:**

In each First Born Phase:
1. Closest Liege to True Born activates first (before other Lieges)
2. Must spend all actions moving toward True Born
3. Provokes attacks of opportunity if appropriate
4. Once in contact: Next action wakes True Born

**Once Awake:**

1. Flip board to Awake side
2. Insert #1 health insert (ignore prior damage)
3. Swap miniature
4. Activates following AI chart as normal
5. Has 4 health inserts (defeated only when 4th removed)

**Forced Awakening:**

If still Somnambulant when hostility reaches CLEANSE:
1. Flip to Awake immediately
2. Insert #2 (not #1)
3. Place Fear Counter
4. Target = closest character (friend or foe) rest of game
5. Draw 2 True Born equipment tokens (1 small, 1 large), place in item slots
6. True Born won't use items but can be claimed if defeated

**Attacking Somnambulant True Born:**

If would take damage (after armor):
1. Don't apply damage
2. Roll Knowledge Die instead:
   - **1 (Reality Shift):** Scatter twice (ignore terrain/walls)
   - **2 (Matter Mirror):** Attack reflected back at attacker
   - **3 (Kinetic Absorber):** No effect
   - **4 (Instinctive Reflexes):** Make 2 Moves toward nearest (friend/foe), if engaged make Close Assault, if survives target pushed back 1 square and knocked prone
   - **5 (Scryer Overload):** 1 damage, all in short range knocked prone, traders may view 1 event card each
   - **6 (Reboot):** 2 damage, if survives place 3 lowest-rank First Born in contact

**Attacking Awake True Born:**

- Normal attack resolution
- Has 4 health inserts
- Remove insert for each damage
- When 4th removed: Defeated

**Defeating True Born:**

**Somnambulant or Awake:**
1. Mark all Lieges and Iconoclasts with Reminder Counter (miss next turn)
2. Flip First Born board to CLEANSE side (if not already)

**Awake Only:**
- Equipment carried drops where fell

**First to Defeat:**
- Takes True Born Kill Point Counter (Somnambulant or Awake version)
- Exchange in Advancement Phase for +1 career point

### I4. Knowledge Die

**Used By:** Drones, some First Born when attacking

**Process:**

1. Make normal attack, determine hits
2. Roll Knowledge Die
3. Apply result based on icon

**Common Results:**

- **Shift Target:** Choose different target in LoS
- **Scramble:** First Born can move through windows this activation
- **Other effects:** As shown on First Born board

**CLEANSE Side:**

- When board flipped to CLEANSE
- Knowledge Die icon may show "2"
- Use die first TWO times character attacks each round (instead of once)

### I5. Rock Worms

**Characteristics:**

- Rank 3 Beast NPCs
- Emerge from worm holes
- Don't move around board
- React to nearby characters

**Arrival:**

1. When specified by event card
2. Flip random worm hole marker (hole visible)
3. Any character on 4 squares of hole: Swallowed, permanently dead, scatter 2 random items, lose rest
4. Instantly attack nearest character in range

**Activation:**

- **Don't activate in NPC Phase**
- Instead: React to anything nearby
- **Range:** 2 squares from worm hole (not blocked by walls)

**Triggers:**

When any character (any type) within range:
- Enters range: Immediate close assault (interrupts movement)
- Takes any action while in range: Immediate close assault (after action resolves)
- Does nothing (wastes action): Immediate close assault
- Defeats worm: Worm still attacks (death throes)

**Special Rules:**

- Don't alert Drones
- Cannot be knocked prone
- Immune to Fire and Poison tokens
- Take all other effects normally

**Trophy Tokens:**

If defeated while Game Hunter in play:
- Drop Trophy token where fell
- Game Hunters collect these

### I6. Game Hunters

**Behavior:**

**Target Priority:**
1. Beasts (Rock Worms)
2. Worm holes (potential beasts)
3. Trophy tokens (from dead beasts)
4. First Born
5. Others

**Movement:**
- Toward nearest Beast/worm hole
- Take least-threatened route (fewest/weakest enemies)
- If tied: Shortest route

**Collecting Trophies:**

When Beast defeated with Hunter in play:
1. Drop Trophy token where Beast fell
2. Hunters move toward Trophy (like living Beast)
3. Adjacent to Trophy: Spend next action collecting
4. Place in item slot (discard non-Trophies to make room)

**Leaving:**

When all available Trophies collected OR all surviving Hunters carrying Trophy:
- Don't activate normally
- Spend actions Moving toward nearest board edge
- Exit when reach edge
- Removed from game

### I7. Civilians (If Present)

**Activation:**

Roll chance die each activation:

**⬆️ (Move):**
- Move in direction shown
- Move around terrain

**⚔️ (Attack):**
- Assault closest target (close if engaged, ranged otherwise)
- Then panic: 2 Moves in direction shown
- If no targets in LoS: 1 Move in direction shown

**🛡️ (Hide):**
- Move to cover from nearest visible enemy (shortest route)
- If no cover or no visible enemies: 1 Move in direction shown

**👍 (Join):**
- If trader within short range and LoS: Join closest
- If none in range: 1 Move in direction shown

**💰 (Trade):**
- Move toward nearest trader in LoS (not engaged)
- If stop: No effect
- If reach: Offer trade (draw random token, may accept/swap/reject)
- Place traded/rejected items in NPC item slot (or bag if full)
- If no traders in LoS: 1 Move in direction shown

**💀 (Live One):**
- If hostility high enough AND Live One available: Replace with Live One
- Otherwise: No effect

**First Born Proximity:**

- Won't move within 4" of First Born (unless roll Attack)
- If start within 4": First move away from First Born, then continue action
- Leaving base contact with First Born: Provoke attacks of opportunity

**Target Priority:**

- First Born first
- Then Gangers or Traders (whichever closest)
- Never attack Galactic Corps, Security, or other Civilians

**Attacks of Opportunity:**

Moving away from Civilians: No attacks of opportunity

**Joining Crews:**

- Still roll chance die in NPC Phase each round
- If roll JOIN: Change mind, revert to civilian
- If roll LIVE ONE (and valid): Transform
- Other results: Ignored

### I8. Machines

**Special Rules:**

**Repair Instead of Healing:**
- Machines don't use medical items
- Can be Repaired (see Repair B13)
- Defeated Machines: 5 Repair Points to stand up with 1 Health
- Damaged Machines: 1 Repair Point per Health

**Repair Action:**
- Only Machines or Tech Class can Repair
- Machines generally can't Repair themselves

**Immune to Effects:**
- Rock Worm Larvae: Not affected
- Other biological effects: Check specific items

**Exclusive Equipment:**
- Some items Machine-only

### I9. Assistance Cards

**Drawing:**

- If draw assistance card (👍) in Hostility Phase
- Keep secret (don't show other players)
- Can use later

**Using:**

- Discard during any of your turns
- Follow instructions on card
- Timing as specified on card

**Examples:**

- Shield your eyes: Flash bomb effect
- Other benefits vary by card

### I10. Linked Actions (⛓️)

**Restriction:** All actions in turn must be same type

**Icon:** ⛓️ on NPC board

**Effect:**

If character takes Move:
- All actions this turn must be Move

If character takes Assault:
- All actions this turn must be Assault

**NPCs with This:**
- Certain First Born types
- Some NPCs

### I11. Massive (🏔️)

**Icon:** Shows number

**Effects:**

**LoS:**
- Can be seen past/over smaller characters
- Characters with lower number (or no icon): Don't block LoS to Massive
- May provide cover

**Knock Back Defense:**
- Reduce Knock Back hits by number shown
- Like armour against Knock Back

**Knock Back Offense:**
- Add number as automatic hits to own Knock Back attempts

---

## J. Appendices

### J1. Quick Reference Tables

**Actions Cost Table:**

| Action | Cost | Key Restrictions |
|--------|------|------------------|
| Move | 1 | Max 11"/round total |
| Ranged Assault | 1 | LoS, not engaged, ammo |
| Close Assault | 1 | In base contact |
| Search Terrain | 1 | Base contact, not engaged |
| General Search | 1 | In room, no enemies in room, not engaged, once per room |
| Mine | 1 | Mining tool, solid wall, not engaged, once per room |
| Knock Back | 1 | Base contact |
| Persuade | 1 | Base contact, not engaged |
| Reload | 1 | Ammo token, not engaged |
| Interact | 1 | Per mission rules |
| Clear Jam | 1 | Not engaged |
| Don/Remove Armour | 1 | Not engaged |
| Stand Up | 1 | Character prone |
| Repair | 1 | Machine/Tech, base contact, not engaged |
| Proximity Move | Effortless | Counts toward 11" max |
| Use ✓ Item | Effortless | Have item |
| Throw Item | Effortless | Have item, LoS |
| Pick Up/Drop | Effortless | Base contact |
| Swap Items | Effortless | Base contact with ally |

**Dice Symbols:**

| Symbol | Meaning |
|--------|---------|
| ⚔️ | Hit (successful) |
| Blank | Miss |
| 💥 | Misfire (2+ = jam/break) |

**Range Bands:**

| Range | Distance (Measured) | Distance (Gridded) |
|-------|---------------------|---------------------|
| Short | 0-5" | 0-5 squares |
| Medium | 5-13" | 5-13 squares |
| Long | 13"+ | 13+ squares |

**Cover Effects:**

| Obscured | Cover Level | Ranged Attack Effect |
|----------|-------------|----------------------|
| <25% | None | No modifier |
| 25-90% | Partial | -1 hit |
| >90% | Full | Cannot draw LoS |

**Hostility Levels:**

| Pegs | Level | First Born |
|------|-------|------------|
| 0-4 | Relaxed | None |
| 5-9 | Patrol | Light |
| 10-14 | Inspection | Moderate |
| 15-19 | Wake Protocols | Heavy |
| 20-24 | Threat Defence | Maximum |
| 25+ | CLEANSE | Charged stats |

### J2. Icon Glossary

**Character Statistics:**

- Actions: Number of actions per turn
- Health: Hit points (green pegs)
- Skill: Mental/social ability (purple pegs)
- Ammo: Ammunition (yellow pegs)
- Close Assault: Melee dice
- Ranged Assault: Shooting dice
- Armour: Damage reduction

**Item Icons:**

- 🏃 Movement: Add inches to Move
- 🎯 Throw: Can be thrown
- ✓ Effortless: Use as effortless action
- 💎 Rare: Cannot be bought
- 📦 Burst Fire: Add dice, spend extra ammo
- ⚡ Full Charge: Empty all ammo for bonus
- ∞ Infinite Ammo: Don't remove ammo pegs
- 🔧 Reliable: Ignore 💥
- 🎯 Target Lock: Ignore partial cover
- 🤫 Silent: Don't add to hostility
- ☠️ Dangerous: Suffer attack after use
- 🔄 Sustained Fire: Free second shot if hit
- 🔄 Flip: Flip token after use
- 🗑️ Discard: Return to supply after use
- ⚡ Fast Reload: Reload as effortless
- 🚫 No Reload: Can't reload in mission
- ⏳ Can't Use: Not this mission
- ❄️ Freeze: Target misses turn
- 📡 Disarm Field: Area can't ranged attack
- 🌀 Scatter: Push target away

**NPC Icons:**

- 🗡️ Close Assault stat
- 🔫 Ranged Assault stat
- 🛡️ Armour value
- 🗣️ Persuade difficulty
- Rank: Power level (1-6)
- ⛓️ Linked Actions: All same type
- 🏔️ Massive: LoS and Knock Back effects
- 🔧 Scramble: Climb/pass through terrain
- 👤 Regen: Self-heal when defeated
- 🔄 Charge: Special attack when engaging
- 🚫 Restrictions: Cannot use certain items

**Dice Icons:**

- ⚔️ Hit
- 💥 Misfire
- 👍 Assistance card
- 💀 Live One / Death

**Terrain Icons:**

- 🔒 Locked
- 🔓 Unlocked
- ⚠️ Hazardous
- 🔍 Searchable

### J3. Timing Reference

**"Immediate"/"Immediately":**
- Happens right now
- Interrupts current action/activation
- Resolves completely before resuming

**"After":**
- Happens after triggering action/effect completes
- Before next action/effect

**"Before":**
- Happens before triggering action/effect
- Must declare before rolls/resolution

**"At the end of the round":**
- Assessment Phase
- After all activations complete

**"In each [Phase]":**
- Every time that phase occurs
- Until end of game or effect expires

**"This turn":**
- Current character's activation only
- Ends when place activation counter

**"This round":**
- Entire round (all 5 phases)
- Ends when pass turn counter

**"Rest of the game"/"Until mission ends":**
- Permanently for this mission
- Doesn't persist to campaign

**"Campaign"/"Between missions":**
- Persists across missions
- Only relevant in campaign play

### J4. Common Edge Cases

**Simultaneous Effects:**

If multiple effects trigger simultaneously:
- First player chooses order
- Resolve completely one at a time

**Contradicting Rules:**

Priority order:
1. Mission-specific rules
2. Skills
3. Equipment/Items
4. Terrain
5. Core rules

**Cannot/Must Conflicts:**

"Cannot" always wins over "must" or other permissive rules

**Rounding:**

Unless specified: Always round up

**Minimum/Maximum:**

- Minimum 0 (negative values become 0)
- Maximum as specified (usually 11" movement, max ammo, etc.)

**Choosing Targets/Routes:**

If multiple equally valid options:
- First player chooses
- Or acting player if specified

**Re-Rolls:**

- Unless specified, cannot re-roll
- Each die rolled once only
- Some skills may allow re-rolls

**Random Selection:**

- Draw without looking (equipment)
- Roll chance die (entry points, directions)
- First player arbitrates disputes

### J5. FAQ Integration (v2.1 Clarifications)

**Equipment Tokens:**

Q: Can large tokens go in small crates?
A: No. Place on floor adjacent if won't fit.

Q: Can I use someone else's equipment?
A: Only if in base contact and they allow swap/give

**Combat:**

Q: Can I shoot through teammates?
A: Check LoS normally. Teammates may block LoS or provide cover.

Q: What if I roll all blanks?
A: No hits, attack fails, still lose ammo (ranged)

**Movement:**

Q: Can I move through diagonal gap?
A: Only if both orthogonal squares empty

Q: Do I have to use all my movement?
A: No, can move less than maximum

**NPCs:**

Q: Do NPCs use items they carry?
A: No, but traders in same crew can swap and use them

Q: Can First Born open doors?
A: Basic game: All doors open. Advanced: May interact per mission rules.

**Campaign:**

Q: What if my ship destroyed?
A: Crew out of campaign unless repair in same Maintenance Phase

Q: Do skills reset between missions?
A: No, spent skill pegs stay spent for career (though gain more when level up)

---

## Document Purpose & Usage

**This Reference Is For:**

- Comprehensive rule lookups
- LLM context and analysis
- Resolving disputes
- Finding exact mechanics
- Edge case resolution
- Campaign rules reference

**This Reference Is NOT:**

- A learning guide (see Player Flow Guide)
- A tutorial (see Learn to Play booklet)
- Flavor/story content (see rulebook)
- Strategy guide

**Companion Document:**

**Player Flow Guide** - Beginner-friendly walkthrough for learning and playing

**Source Documents:**

- Core Space First Born Rulebook (primary)
- CoreSpace v2.1 FAQ/Player Aids
- Core_Space_Summary (player-generated)

**Last Updated:** 2025-10-05

---

**END OF LLM RULES REFERENCE**
