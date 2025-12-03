# Core Space First Born - Gear System Plan

**Version**: 1.1
**Date**: 2025-12-03
**Status**: Design Specification

---

## 1. Overview

This document outlines the design for adding a comprehensive gear/equipment reference system to the Core Space First Born application. The gear system will follow the same data-driven architecture as the existing skills system, with filtering capabilities and integration with character progression tracking.

### Goals

1. **Complete Equipment Reference** - All tokens from Core Space First Born with detailed properties
2. **Multiple Filter Modes** - Filter by size, weapon type, effects, rarity, color, and more
3. **Integration Ready** - Compatible with future character inventory tracking
4. **Consistent UX** - Same design patterns as skills reference pages

### Data Source Reference

This design is based on analysis of the [xinix/core-space](https://github.com/xinix/core-space) unofficial glossary app, which provides token data for Core Space games. The First Born expansion contains ~120+ item tokens across various categories.

---

## 2. Data Model Design

### 2.1 Core Gear Structure

Following the skill model pattern in `corespace-data.json`:

```json
{
  "gear": [
    {
      "id": "combat-rifle",
      "name": "Combat Rifle",
      "category": "ranged",
      "type": "rifle",
      "size": "lg",
      "color": "blue",
      "rarity": "common",
      "economy": {
        "buy": 12,
        "sell": 6
      },
      "stats": {
        "range": {
          "short": 2,
          "medium": 2,
          "long": 1
        },
        "close": null,
        "heavy": null,
        "ammo": 6
      },
      "effects": ["reliable"],
      "description": "Standard-issue military rifle with balanced range performance.",
      "rules": [],
      "sources": ["core-space", "first-born"]
    }
  ]
}
```

### 2.2 Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Kebab-case unique identifier |
| `name` | string | Yes | Display name |
| `category` | enum | Yes | Primary classification (see 2.3) |
| `type` | enum | Yes | Sub-classification (see 2.4) |
| `size` | enum | Yes | Physical size: `nano`, `sm`, `md`, `lg` |
| `color` | enum | Yes | Token color: `blue`, `yellow`, `orange`, `purple`, `green`, `brown` |
| `rarity` | enum | Yes | `common`, `uncommon`, `rare`, `unique` |
| `economy.buy` | number | No | Purchase cost (null if not purchasable) |
| `economy.sell` | number | Yes | Sell value |
| `stats` | object | Yes | Combat/utility statistics (varies by category) |
| `effects` | string[] | No | Special abilities/modifiers |
| `description` | string | Yes | Flavor text and summary |
| `rules` | string[] | No | Special rules text for complex items |
| `sources` | string[] | Yes | Expansion/product source |

### 2.3 Category Enumeration

Primary gear categories (maps to token function):

```javascript
const GearCategory = {
  RANGED: "ranged",        // Guns, rifles, pistols
  MELEE: "melee",          // Close combat weapons
  ARMOR: "armor",          // Protective equipment
  CONSUMABLE: "consumable", // One-use items (stims, grenades)
  EQUIPMENT: "equipment",  // Reusable tools and gear
  RESOURCE: "resource",    // Credits, ammo, fuel
  SPECIAL: "special"       // Engrams, artifacts, mission items
};
```

### 2.4 Type Enumeration (by Category)

**Ranged Types:**
```javascript
const RangedType = {
  PISTOL: "pistol",
  RIFLE: "rifle",
  HEAVY: "heavy",
  SPECIAL: "special"
};
```

**Melee Types:**
```javascript
const MeleeType = {
  KNIFE: "knife",
  SWORD: "sword",
  AXE: "axe",
  BLUNT: "blunt",
  ENERGY: "energy"
};
```

**Armor Types:**
```javascript
const ArmorType = {
  JACKET: "jacket",
  VEST: "vest",
  SHIELD: "shield",
  SUIT: "suit"
};
```

**Consumable Types:**
```javascript
const ConsumableType = {
  STIM: "stim",
  GRENADE: "grenade",
  MINE: "mine",
  MEDPACK: "medpack"
};
```

**Equipment Types:**
```javascript
const EquipmentType = {
  SENSOR: "sensor",
  TOOL: "tool",
  PACK: "pack",
  JUMP: "jump"
};
```

**Resource Types:**
```javascript
const ResourceType = {
  AMMO: "ammo",
  CREDITS: "credits",
  FUEL: "fuel",
  PARTS: "parts"
};
```

**Special Types:**
```javascript
const SpecialType = {
  ENGRAM: "engram",
  SHARD: "shard",
  ARTIFACT: "artifact",
  OBJECTIVE: "objective"
};
```

### 2.5 Effect/Icon Enumeration

Special abilities and modifiers (complete list from Core Space token system - 100+ icons):

```javascript
const GearEffect = {
  // === COMBAT MODIFIERS ===
  BURST: "burst",              // Add combat dice, spend extra ammo
  BURST_1: "burst-1",          // Burst fire +1 die
  BURST_2: "burst-2",          // Burst fire +2 dice
  RELIABLE: "reliable",        // Ignores misfire results
  SUPER_RELIABLE: "super-reliable", // Ignores misfire even with accelerant
  SILENT: "silent",            // No hostility peg added
  TARGET_LOCK: "target-lock",  // Ignores partial cover, no randomization
  SUSTAINED_FIRE: "sustained-fire", // Free follow-up attack on hit
  FULL_CHARGE: "full-charge",  // Empty weapon for bonus dice
  INFINITE: "infinite",        // No ammo pegs required
  DANGEROUS: "dangerous",      // User suffers attack after firing

  // === BLAST/AREA EFFECTS ===
  BLAST: "blast",              // Area effect weapon
  BLAST_2: "blast-2",          // Blast skill level 2
  GRENADE: "grenade",          // Throwable blast weapon
  EXPLODE: "explode",          // Detonation effect
  SCATTER: "scatter",          // Pushes targets
  SCATTER_CORE: "scatter-core", // Scatter without attacks of opportunity

  // === SPECIAL DAMAGE ===
  PHASE: "phase",              // Move through walls
  FIRE: "fire",                // Ongoing fire damage
  TOXIC: "toxic",              // Poison damage over time
  STUN: "stun",                // Apply stun tokens
  FREEZE: "freeze",            // Target misses next turn
  FEAR: "fear",                // Target flees

  // === DEFENSE ===
  ARMOUR: "armour",            // Physical armor value
  PHYSICAL_ARMOUR: "physical_armour", // Reduces hits
  SHIELD: "shield",            // Energy shield
  SHIELD_ARMOUR: "shield_armour", // Shield value
  BLUE_ARMOUR: "blue-armour",  // Blue shield pegs
  BLUE_ARMOUR_REGEN: "blue-armour-regen", // Regenerating shields
  TEMP_ARMOUR: "temp-armour",  // Temporary armor
  ARMOUR_RE_ROLL: "armour-re-roll", // Force enemy re-roll
  DEFLECT: "deflect",          // Reflect First Born attacks
  SPECIAL_ARMOUR: "special-armour", // Extends to nearby allies

  // === MELEE ===
  CLOSE: "close",              // Close assault dice
  HEAVY: "heavy",              // Heavy assault dice
  THROW: "throw",              // Can be thrown
  SCYTHE: "scythe",            // Hits diagonal squares
  FREE_CLOSE: "free-close",    // Free close assault on contact
  AUTO_CLOSE_HIT: "auto-close-hit", // Automatic hit in melee
  IGNORE_ARMOUR: "ignore-armour", // Bypasses physical armor
  IGNORE_SHIELD: "ignore-shield", // Bypasses shield armor

  // === RANGED ===
  SHORT: "short",              // Short range dice
  MEDIUM: "medium",            // Medium range dice
  LONG: "long",                // Long range dice
  RANGE: "range",              // Range indicator (s/m/l)
  BREACH: "breach",            // Opens locked doors

  // === UTILITY/HEALING ===
  HEAL: "heal",                // Restore health
  SUPER_HEAL: "super-heal",    // Restore beyond starting health
  SKILL: "skill",              // Restore skill pegs
  SUPER_SKILL: "super-skill",  // Restore skill beyond starting
  ACTION: "action",            // Extra actions
  MOVE: "move",                // Bonus movement
  REPAIR: "repair",            // Repair action bonus
  REPAIR_2: "repair-2",        // Repair skill level 2

  // === TOKEN BEHAVIOR ===
  EFFORTLESS: "effortless",    // Use as effortless action
  EFFORTLESS_RELOAD: "effortless-reload", // Reload effortlessly
  EFFORTLESS_ARMOUR: "effortless-armour", // Don/remove effortlessly
  FLIP: "flip",                // Flip token when used
  DISCARD: "discard",          // Discard after use
  ROTATING: "rotating",        // Multi-use with rotation
  RARE: "rare",                // Cannot be purchased

  // === AMMO ===
  AMMO: "ammo",                // Reload 7 standard pegs
  SUPER_AMMO: "super-ammo",    // Reload 7 accelerant pegs
  AMMO_BOX: "ammo-box",        // Two batches of ammo
  AMMO_7: "ammo-7",            // 7 ammo token
  AMMO_D6: "ammo-d6",          // Roll for ammo amount
  AMMO_21: "ammo-21",          // Purge 21 ammo module
  AMMO_RETURNS: "ammo-returns", // Misses return to gun
  CANNOT_RELOAD: "cannot-reload", // Only reloads between missions

  // === FIRST BORN SPECIFIC ===
  DYSON: "dyson",              // Stores First Born energy
  DYSON_THROW: "dyson-throw",  // Throw with energy counters
  DYSON_RANGE: "dyson-range",  // Ranged attack with energy
  BOOMERANG: "boomerang",      // Returns on hit
  ARTIFACT: "artifact",        // Multi-part valuable item
  KEY: "key",                  // Opens First Born doors
  PORT: "port",                // Teleports cargo to ship
  PAIRS: "pairs",              // Used in pairs for swap

  // === SPECIAL ABILITIES ===
  SEARCH: "search",            // Search effortlessly
  HACK: "hack",                // Open/close doors at range
  MINE: "mine",                // Mining action
  SCRAMBLE: "scramble",        // Climb over obstacles
  SWAP: "swap",                // Trade actions with ally
  GRAPPLE: "grapple",          // Grapple gun movement
  HOVER: "hover",              // Ignore terrain/AoO
  INTERRUPT: "interrupt",      // Free ranged attack on enemy turn
  EVENT: "event",              // View event cards
  TIMEWARP: "timewarp",        // Reverse enemy actions

  // === SKILL ITEMS ===
  FADE_TO_BLACK_3: "fade-to-black-3", // Fade to Black skill
  MANIPULATE_3: "manipulate-3", // Manipulate skill
  IMPERVIOUS_1: "impervious-1", // Impervious skill
  INFRA_LENS: "infra-lens",    // See through walls

  // === GRENADES/EXPLOSIVES ===
  GRENADE_LAUNCHER: "grenade-launcher", // Fire grenades at medium range
  DETONATOR: "detonator",      // Remote mine trigger
  MINES: "mines",              // Placeable mines
  BOMB: "bomb",                // Timed explosive
  FLASH: "flash",              // Knocks prone, loses action
  TRIPLE_CHARGE: "triple-charge", // Line attack through enemies
  JAM: "jam",                  // Prevents ranged attacks

  // === STOWAGE ===
  BACKPACK_ALL: "backpack-all", // Holds any items
  BACKPACK_NANO: "backpack-nano", // Holds nano items only
  BELT: "belt",                // Doesn't count toward limit
  WEAPON_MOUNT: "weapon-mount", // Quick access heavy weapons

  // === STATUS/META ===
  TROPHY: "trophy",            // Game Hunter target
  OBJECTIVE: "objective",      // Mission objective
  MISSION_KEY: "mission-key",  // Mission-specific door key
  NA: "na",                    // Cannot use same mission found
  TRUE_BORN: "true-born",      // True Born equipment
  JOINED: "joined",            // Combined ammo tracks
  SYMBIOTE: "symbiote",        // Linked characters

  // === EXCLUSIVE ITEMS ===
  MECH: "mech",                // Machine class only
  AUG: "aug",                  // Augmented class only
  MERG: "merg",                // Merg class only
  CHIT: "chit",                // Chit class only

  // === SPECIAL ITEMS ===
  NECRO_FLASK: "necro-flask",  // Revive with degenerating health
  LARVA: "larva",              // Rock Worm Larvae bite
  CAALIGORN: "caaligorn",      // Caaligorn's special item
  MOTHERS_VENOM: "mothers-venom", // The Mother's parts
  PURGE_TOKENS: "purge-tokens", // Rogue Purge crafted items
  SUPPLY_DROP: "supply-drop",  // Call in supply drop
  STIM_VEST: "stim-vest",      // Burst vest special effect

  // === RE-ROLLS ===
  RE_ROLL: "re-roll",          // Re-roll single die
  RE_ROLL_RANGED: "re-roll-ranged", // Re-roll any ranged attack

  // === CREDITS/RESOURCES ===
  CREDITS: "credits",          // Data credits
  RAW_BLUE: "raw-blue",        // Purge energy (variable sell)
  MINERAL: "mineral",          // Raw minerals for crafting
  DYSON_ROD: "dyson-rod",      // Mission item / sellable
  SHIP_PARTS: "ship-parts",    // Maintenance repairs
  TECH_PACK: "tech-pack",      // Bonus repair die
  DATA: "data",                // Stores data tokens
  FUEL: "fuel",                // Limited uses
  GEAR: "gear",                // Clear jam effortlessly
  ROCK: "rock",                // Valuable mission reward
  CUFFS: "cuffs"               // Restrain characters
};
```

### 2.6 Size Definitions

Token physical sizes affect carrying capacity:

| Size | Code | Slots | Examples |
|------|------|-------|----------|
| Nano | `nano` | 0 | Grenades, stims, ammo |
| Small | `sm` | 1 | Pistols, knives, data pads |
| Medium | `md` | 2 | Rifles, vests, tool packs |
| Large | `lg` | 3 | Heavy weapons, combat suits |

### 2.7 Color Coding

Token colors indicate function at-a-glance:

| Color | Code | Meaning |
|-------|------|---------|
| Blue | `blue` | Weapons (ranged and melee) |
| Yellow | `yellow` | Armor and protective gear |
| Orange | `orange` | Equipment and consumables |
| Purple | `purple` | Credits and special resources |
| Green | `green` | Special items and objectives |
| Brown | `brown` | Mission-specific tokens |

---

## 3. Sample Data Entries

### 3.1 Ranged Weapons

```json
{
  "id": "military-pistol",
  "name": "Military Pistol",
  "category": "ranged",
  "type": "pistol",
  "size": "sm",
  "color": "blue",
  "rarity": "common",
  "economy": { "buy": 6, "sell": 3 },
  "stats": {
    "range": { "short": 2, "medium": 1, "long": null },
    "ammo": 4
  },
  "effects": [],
  "description": "Standard sidearm with good short-range stopping power.",
  "rules": [],
  "sources": ["core-space", "first-born"]
}
```

```json
{
  "id": "energy-rifle",
  "name": "Energy Rifle",
  "category": "ranged",
  "type": "rifle",
  "size": "lg",
  "color": "blue",
  "rarity": "uncommon",
  "economy": { "buy": 18, "sell": 9 },
  "stats": {
    "range": { "short": 2, "medium": 2, "long": 2 },
    "ammo": null
  },
  "effects": ["reliable", "phase"],
  "description": "Advanced energy weapon that ignores physical armor.",
  "rules": ["Uses energy charges instead of ammo", "Phase: Ignores armor saves"],
  "sources": ["first-born"]
}
```

```json
{
  "id": "incinerator-gun",
  "name": "Incinerator Gun",
  "category": "ranged",
  "type": "heavy",
  "size": "lg",
  "color": "blue",
  "rarity": "rare",
  "economy": { "buy": null, "sell": 12 },
  "stats": {
    "range": { "short": 3, "medium": null, "long": null },
    "ammo": 3,
    "blast": 2
  },
  "effects": ["blast", "fire", "dangerous"],
  "description": "Devastating flamethrower that hits multiple targets.",
  "rules": ["Blast 2: Affects all models within 2 spaces of target", "Fire: Burning targets take 1 damage at end of turn"],
  "sources": ["core-space"]
}
```

### 3.2 Melee Weapons

```json
{
  "id": "combat-knife",
  "name": "Combat Knife",
  "category": "melee",
  "type": "knife",
  "size": "sm",
  "color": "blue",
  "rarity": "common",
  "economy": { "buy": 4, "sell": 2 },
  "stats": {
    "close": 2,
    "throw": 1
  },
  "effects": ["silent"],
  "description": "Reliable blade for close quarters combat.",
  "rules": ["Can be thrown once per game"],
  "sources": ["core-space", "first-born"]
}
```

```json
{
  "id": "paragon-sword",
  "name": "Paragon Sword",
  "category": "melee",
  "type": "sword",
  "size": "lg",
  "color": "blue",
  "rarity": "rare",
  "economy": { "buy": null, "sell": 15 },
  "stats": {
    "close": 4,
    "heavy": 2
  },
  "effects": ["breach"],
  "description": "Ancient First Born blade of exceptional craftsmanship.",
  "rules": ["Breach: Target cannot use cover"],
  "sources": ["first-born"]
}
```

### 3.3 Armor

```json
{
  "id": "combat-vest",
  "name": "Combat Vest",
  "category": "armor",
  "type": "vest",
  "size": "md",
  "color": "yellow",
  "rarity": "common",
  "economy": { "buy": 8, "sell": 4 },
  "stats": {
    "armor": 1
  },
  "effects": [],
  "description": "Standard protective vest providing basic armor.",
  "rules": ["Armor 1: Roll 1 die when hit, block on shield symbol"],
  "sources": ["core-space", "first-born"]
}
```

```json
{
  "id": "shield-belt",
  "name": "Shield Belt",
  "category": "armor",
  "type": "shield",
  "size": "sm",
  "color": "yellow",
  "rarity": "uncommon",
  "economy": { "buy": 14, "sell": 7 },
  "stats": {
    "shield": 2
  },
  "effects": ["shield-regen"],
  "description": "Personal energy shield that regenerates between engagements.",
  "rules": ["Shield 2: Blocks 2 hits automatically", "Regenerates to full at end of round"],
  "sources": ["first-born"]
}
```

### 3.4 Consumables

```json
{
  "id": "medi-stim",
  "name": "Medi-Stim",
  "category": "consumable",
  "type": "stim",
  "size": "nano",
  "color": "orange",
  "rarity": "common",
  "economy": { "buy": 4, "sell": 2 },
  "stats": {
    "heal": 2
  },
  "effects": ["heal"],
  "description": "Quick-inject medical stimulant for field healing.",
  "rules": ["Use as effortless action", "Heal 2 health"],
  "sources": ["core-space", "first-born"]
}
```

```json
{
  "id": "frag-grenade",
  "name": "Frag Grenade",
  "category": "consumable",
  "type": "grenade",
  "size": "nano",
  "color": "orange",
  "rarity": "common",
  "economy": { "buy": 5, "sell": 2 },
  "stats": {
    "throw": 3,
    "blast": 1
  },
  "effects": ["blast", "scatter"],
  "description": "Standard fragmentation grenade for area denial.",
  "rules": ["Throw range 3", "Blast 1: Hits all models in target space", "Scatter: Roll scatter die for deviation"],
  "sources": ["core-space", "first-born"]
}
```

### 3.5 Equipment

```json
{
  "id": "sensor-goggles",
  "name": "Sensor Goggles",
  "category": "equipment",
  "type": "sensor",
  "size": "sm",
  "color": "orange",
  "rarity": "uncommon",
  "economy": { "buy": 10, "sell": 5 },
  "stats": {},
  "effects": [],
  "description": "Enhanced visual sensors for detecting hidden threats.",
  "rules": ["Reveal crate contents before opening", "Ignore smoke for line of sight"],
  "sources": ["core-space", "first-born"]
}
```

### 3.6 Special Items

```json
{
  "id": "port-engram",
  "name": "Port Engram",
  "category": "special",
  "type": "engram",
  "size": "nano",
  "color": "green",
  "rarity": "rare",
  "economy": { "buy": null, "sell": 8 },
  "stats": {},
  "effects": ["dyson"],
  "description": "First Born technology for emergency teleportation.",
  "rules": ["Once per game: Teleport to any Port Marker", "Requires Dyson charge"],
  "sources": ["first-born"]
}
```

---

## 4. Filtering System Design

### 4.1 Filter Dimensions

The gear page will support multiple simultaneous filter dimensions:

| Filter | Type | Values | Description |
|--------|------|--------|-------------|
| Category | Multi-select | 7 categories | Primary classification |
| Type | Multi-select | Varies by category | Sub-classification |
| Size | Multi-select | nano, sm, md, lg | Physical size |
| Effects | Multi-select | All effects | Special abilities |
| Rarity | Multi-select | common, uncommon, rare, unique | Item rarity |
| Source | Multi-select | core-space, first-born, etc. | Expansion source |
| Search | Text | Free text | Name/description search |

### 4.2 Filter Bar Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔍 Search: [________________]   [Clear All Filters]                     │
├─────────────────────────────────────────────────────────────────────────┤
│ Category: [All] [Ranged] [Melee] [Armor] [Consumable] [Equipment] ...  │
├─────────────────────────────────────────────────────────────────────────┤
│ Size:     [All] [Nano] [Small] [Medium] [Large]                        │
├─────────────────────────────────────────────────────────────────────────┤
│ Type:     [All] [Pistol] [Rifle] [Heavy] ... (dynamic based on cat)    │
├─────────────────────────────────────────────────────────────────────────┤
│ Effects:  [+Add Effect Filter ▼]  Active: [burst ×] [reliable ×]       │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Filter Implementation Pattern

Following the skills.html pattern:

```javascript
// Filter state
const filterState = {
  search: '',
  categories: new Set(),      // Empty = all
  types: new Set(),
  sizes: new Set(),
  effects: new Set(),
  rarities: new Set(),
  sources: new Set()
};

// Filter function
function filterGear(gear) {
  return gear.filter(item => {
    // Text search
    if (filterState.search) {
      const searchLower = filterState.search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filterState.categories.size > 0 &&
        !filterState.categories.has(item.category)) {
      return false;
    }

    // Type filter
    if (filterState.types.size > 0 &&
        !filterState.types.has(item.type)) {
      return false;
    }

    // Size filter
    if (filterState.sizes.size > 0 &&
        !filterState.sizes.has(item.size)) {
      return false;
    }

    // Effects filter (item must have ALL selected effects)
    if (filterState.effects.size > 0) {
      const itemEffects = new Set(item.effects || []);
      for (const effect of filterState.effects) {
        if (!itemEffects.has(effect)) return false;
      }
    }

    // Rarity filter
    if (filterState.rarities.size > 0 &&
        !filterState.rarities.has(item.rarity)) {
      return false;
    }

    return true;
  });
}
```

### 4.4 Dynamic Type Filtering

Type options should update based on selected categories:

```javascript
function updateTypeFilters() {
  const activeCategories = filterState.categories.size > 0
    ? filterState.categories
    : new Set(Object.values(GearCategory));

  const availableTypes = new Set();

  if (activeCategories.has('ranged')) {
    Object.values(RangedType).forEach(t => availableTypes.add(t));
  }
  if (activeCategories.has('melee')) {
    Object.values(MeleeType).forEach(t => availableTypes.add(t));
  }
  // ... etc for other categories

  renderTypeButtons(availableTypes);
}
```

### 4.5 Quick Filter Presets

Provide common filter combinations as one-click presets:

| Preset | Filters Applied |
|--------|-----------------|
| **All Weapons** | category: ranged, melee |
| **Pistols Only** | category: ranged; type: pistol |
| **Melee Only** | category: melee |
| **Armor & Shields** | category: armor |
| **Consumables** | category: consumable |
| **Rare Items** | rarity: rare, unique |
| **First Born Gear** | source: first-born |
| **Silent Weapons** | effects: silent |
| **Energy Weapons** | effects: phase |

---

## 5. UI Components

### 5.1 Gear Card Component

Following the skill card pattern from `skills.html`:

```html
<a href="gear-detail.html?id=combat-rifle" class="gear-card"
   data-category="ranged" data-type="rifle" data-size="lg">
  <div class="gear-icon">
    <img src="images/gear/combat-rifle.png"
         onerror="this.classList.add('broken')"
         alt="Combat Rifle">
  </div>
  <div class="gear-info">
    <div class="gear-name">
      Combat Rifle
      <span class="size-badge lg">LG</span>
      <span class="rarity-badge common">Common</span>
    </div>
    <div class="gear-category">Ranged › Rifle</div>
    <div class="gear-stats">
      <span class="stat">S:2</span>
      <span class="stat">M:2</span>
      <span class="stat">L:1</span>
      <span class="stat ammo">⬢6</span>
    </div>
    <div class="gear-effects">
      <span class="effect-tag reliable">Reliable</span>
    </div>
    <div class="gear-economy">
      <span class="buy">Buy: 12</span>
      <span class="sell">Sell: 6</span>
    </div>
    <div class="view-detail">Click to view details →</div>
  </div>
</a>
```

### 5.2 Card Styling

```css
.gear-card {
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

/* Category-based border colors */
.gear-card[data-category="ranged"] { border-left: 4px solid #5390d9; }
.gear-card[data-category="melee"] { border-left: 4px solid #e94560; }
.gear-card[data-category="armor"] { border-left: 4px solid #f4d35e; }
.gear-card[data-category="consumable"] { border-left: 4px solid #ff9f1c; }
.gear-card[data-category="equipment"] { border-left: 4px solid #ff9f1c; }
.gear-card[data-category="resource"] { border-left: 4px solid #9b59b6; }
.gear-card[data-category="special"] { border-left: 4px solid #2ecc71; }

/* Size badges */
.size-badge {
  font-size: 0.65em;
  padding: 2px 5px;
  border-radius: 3px;
  text-transform: uppercase;
}
.size-badge.nano { background: #6c757d; }
.size-badge.sm { background: #28a745; }
.size-badge.md { background: #17a2b8; }
.size-badge.lg { background: #dc3545; }

/* Rarity badges */
.rarity-badge.common { background: #6c757d; }
.rarity-badge.uncommon { background: #28a745; }
.rarity-badge.rare { background: #007bff; }
.rarity-badge.unique { background: #ff9f1c; }

/* Effect tags */
.effect-tag {
  font-size: 0.7em;
  padding: 2px 6px;
  border-radius: 10px;
  background: rgba(83, 168, 182, 0.3);
  color: #53a8b6;
}

.effect-tag.dangerous { background: rgba(233, 69, 96, 0.3); color: #e94560; }
.effect-tag.phase { background: rgba(155, 89, 182, 0.3); color: #9b59b6; }
.effect-tag.silent { background: rgba(46, 204, 113, 0.3); color: #2ecc71; }
```

### 5.3 Gear Stats Display

Compact stat visualization for different gear types:

**Ranged Weapons:**
```
┌─────────────────────────────────┐
│ Combat Rifle              [LG] │
│ Ranged › Rifle                  │
│ ──────────────────────────────  │
│ S:2  M:2  L:1   ⬢×6            │
│ [Reliable]                      │
│ Buy: 12  Sell: 6               │
└─────────────────────────────────┘
```

**Melee Weapons:**
```
┌─────────────────────────────────┐
│ Combat Knife              [SM] │
│ Melee › Knife                   │
│ ──────────────────────────────  │
│ Close: 2  Throw: 1             │
│ [Silent]                        │
│ Buy: 4  Sell: 2                │
└─────────────────────────────────┘
```

**Armor:**
```
┌─────────────────────────────────┐
│ Shield Belt               [SM] │
│ Armor › Shield                  │
│ ──────────────────────────────  │
│ Shield: 2                       │
│ [Shield Regen]                  │
│ Buy: 14  Sell: 7               │
└─────────────────────────────────┘
```

### 5.4 Gear Grid Layout

```css
.gear-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .gear-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 6. Page Structure

### 6.1 gear.html - Main Gear Reference

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                  │
│ Core Space First Born - Gear Reference                                 │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                              │
│ Home › Gear Reference                                                  │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ FILTER BAR                                                              │
│ Search + Category + Size + Type + Effects + Presets                    │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ RESULTS SUMMARY                                                         │
│ Showing 47 of 120 items                                                │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ GEAR GRID                                                               │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐               │
│ │ Item Card │ │ Item Card │ │ Item Card │ │ Item Card │               │
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘               │
│ ...                                                                     │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ FOOTER                                                                  │
│ Navigation links                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 gear-detail.html - Individual Gear Page

Similar to `skill-detail.html`:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                  │
│ Combat Rifle - Gear Details                                            │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                              │
│ Home › Gear Reference › Combat Rifle                                   │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ GEAR OVERVIEW                                                           │
│ ┌────────┐                                                              │
│ │  ICON  │  Combat Rifle                                               │
│ │        │  Ranged › Rifle  [LG] [Common]                              │
│ └────────┘                                                              │
│ Standard-issue military rifle with balanced range performance.         │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ COMBAT STATS                                                            │
│ ┌─────────────┬─────────────┬─────────────┐                            │
│ │ Short: 2    │ Medium: 2   │ Long: 1     │                            │
│ └─────────────┴─────────────┴─────────────┘                            │
│ Ammo Capacity: 6                                                        │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ SPECIAL EFFECTS                                                         │
│ • Reliable: May re-roll one miss result per attack                     │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ ECONOMY                                                                 │
│ Buy: 12 credits | Sell: 6 credits                                      │
│ Sources: Core Space, First Born                                        │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ RELATED GEAR                                                            │
│ Other Rifles: Energy Rifle, Shock Rifle, Sniper Rifle                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Data Integration

### 7.1 Adding to corespace-data.json

Extend the existing data file:

```json
{
  "_comment": "Core Space First Born - Character Builder Data",
  "_version": "2.0",
  "_lastUpdated": "2025-12-03",
  "characters": [...],
  "classes": [...],
  "skills": [...],
  "gear": [
    // All gear items here
  ],
  "gearEffects": {
    "burst": {
      "name": "Burst",
      "description": "Fire multiple shots. Roll additional dice equal to burst value."
    },
    "reliable": {
      "name": "Reliable",
      "description": "May re-roll one miss result per attack."
    }
    // ... all effect definitions
  }
}
```

### 7.2 Character Inventory Integration (Future)

Prepare for inventory tracking on character pages:

```javascript
// localStorage key pattern (consistent with skill storage)
const INVENTORY_KEY = `corespace::character::${characterId}::inventory`;

// Inventory structure
const inventory = {
  equipped: {
    weapon1: "combat-rifle",
    weapon2: "military-pistol",
    armor: "combat-vest",
    equipment: ["sensor-goggles"]
  },
  carried: ["medi-stim", "frag-grenade", "ammo-mag"],
  stash: ["energy-rifle", "paragon-sword"]
};
```

---

## 8. Implementation Phases

### Phase 1: Data Structure (Estimated: Foundation)
1. Define complete gear JSON schema
2. Enumerate all items from Core Space First Born
3. Add `gear` and `gearEffects` arrays to `corespace-data.json`
4. Validate data completeness

### Phase 2: Gear Reference Page
1. Create `gear.html` with filter bar
2. Implement JavaScript filtering logic
3. Create gear card components
4. Add responsive grid layout
5. Test filtering combinations

### Phase 3: Gear Detail Page
1. Create `gear-detail.html` template
2. Implement dynamic content loading
3. Add related items section
4. Link from gear cards

### Phase 4: Character Integration (Future)
1. Add inventory section to character pages
2. Implement inventory localStorage
3. Add equip/unequip functionality
4. Display carried capacity

---

## 9. File Structure

```
docs/
├── gear.html                    # Main gear reference page
├── gear-detail.html             # Individual gear detail page
├── js/
│   └── gear-page.js             # Gear filtering and rendering
├── data/
│   └── corespace-data.json      # Updated with gear array
├── images/
│   └── gear/                    # Gear icons (optional)
│       ├── combat-rifle.png
│       ├── military-pistol.png
│       └── ...
└── style.css                    # Extended with gear styles
```

---

## 10. Sitemap Updates

Add to `SITEMAP.md`:

```markdown
### 9. **gear.html** - Equipment Reference

**Content:**
- All equipment tokens from Core Space First Born
- Filterable by category, type, size, effects, rarity
- Quick filter presets for common searches
- Click-through to detailed gear pages

### 10. **gear-detail.html** - Individual Gear Details

**Content:**
- Full item specifications
- Combat statistics visualization
- Special effects explanations
- Economy information
- Related items suggestions
```

---

## 11. Summary

This gear system design:

1. **Follows Existing Patterns** - Uses the same data-driven architecture as skills
2. **Comprehensive Filtering** - Multiple filter dimensions for quick lookups
3. **Consistent UX** - Card-based UI matching the skills reference
4. **Extensible** - Ready for inventory integration on character pages
5. **Complete Coverage** - Supports all token types from Core Space games

The implementation prioritizes the filter system since gear lookup is the primary use case during gameplay, allowing players to quickly find items by any combination of properties.

---

## Appendix A: First Born Token Inventory

Complete list of tokens from the First Born expansion (extracted from xinix/core-space data):

### A.1 First Born Special Items (Green Tokens)

| Name | Size | Sell | Stats/Effects | Description |
|------|------|------|---------------|-------------|
| Port Engram | sm | 3 | scatter, effortless, flip | Teleportation device |
| Shield Engram | sm | 3 | rotating, effortless, flip, physical_armour, discard | Temporary protection |
| Phase Engram | sm | 5 | phase: 1, effortless, flip | Move through walls |
| Liege Shard (re-roll) | sm | 6 | close: 3, throw: 3, re-roll | Melee with re-roll |
| Liege Shard (effortless) | sm | 4 | close: 3, throw: 3, effortless | Effortless melee |
| Liege Shard (free-close) | sm | 5 | close: 3, throw: 3, free-close | Free melee on contact |
| Dyson Spike | sm | 8 | close: 3, grenade: [6,3,2], range: m | Hybrid melee/ranged |
| Dyson Draw (5) | sm | 8 | dyson: 5, dyson-throw | Store 5 energy, throw |
| Dyson Draw (3) | sm | 5 | dyson: 3, dyson-throw | Store 3 energy, throw |
| Dyson Vent (5) | sm | 8 | dyson: 5, dyson-range | Store 5, ranged attack |
| Dyson Vent (3) | sm | 8 | dyson: 3, dyson-range | Store 3, ranged attack |
| Dyson Vent (8) | sm | 14 | dyson, dyson-range | Store 8, ranged attack |
| Phase Loop (4) | sm | 12 | throw: 4, boomerang | Returns on hit |
| Phase Loop (3) | sm | 6 | throw: 3, boomerang | Returns on hit |
| Larva | sm | - | larva, flip | Rock Worm Larvae |
| Fibril (4) | sm | 8 | repair, discard | 4 repair points |
| Fibril (2) | sm | 5 | repair, discard | 2 repair points |
| Fibril (1) | sm | 3 | repair, discard | 1 repair point |
| Necro Flask | sm | 5 | necro-flask | Revive with degeneration |
| Sypher Orb | sm | 2 | effortless, event, discard | View event cards |
| Ecco Orb | sm | 7 | rotating, deflect, flip | Reflects First Born attacks |
| Photon Shifter | sm | 4 | fade-to-black-3, flip | Fade to Black skill |
| Matter Shifter (blast) | sm | 4 | blast-2, flip | Blast skill |
| Matter Shifter (manipulate) | sm | 5 | manipulate-3, flip | Manipulate skill |
| Liege Ring (4) | sm | 6 | short: 4, rotating, discard | Multi-use ranged |
| Liege Ring (3) | sm | 4 | short: 3, rotating, discard | Multi-use ranged |
| Artifact (×6) | sm | 4-11 | artifact | Multi-part valuable |
| Quantum Lens | sm | 4 | range: s, effortless, infra-lens, flip | See through walls |
| Bracer | sm | 6 | short: 2, medium: 3, effortless, silent, infinite | Silent infinite ranged |
| Shard Fins (scramble) | sm | 8 | scramble: [1,3], effortless | Climbing ability |
| Shard Fins (move) | sm | 4 | move: 4, effortless, flip | Bonus movement |
| Raw Minerals | sm | 3-4 | mineral | Crafting materials |
| Velocity Bond | sm | 14 | move: 2 | Permanent +2 movement |
| Mantle Armour | sm | 21 | shield: 3, flip | High shield value |
| Dialena Shard Guard | md | 12 | close: 3, armour: 2 | Melee + armor combo |
| Iconoclast Shard Sword | md | 12 | close: 3, ignore-shield | Bypasses shields |
| Potent Fibril | md | 20 | repair | High repair value |

### A.2 Ranged Weapons (Blue Tokens)

| Name | Size | Buy | Sell | Short | Med | Long | Effects |
|------|------|-----|------|-------|-----|------|---------|
| Common Pistol | sm | 3 | 1 | 1 | 1 | - | burst-1 |
| Military Pistol | sm | 8 | 4 | 2 | 1 | - | burst-1 |
| Energy Pistol | sm | 10 | 5 | 2 | 2 | - | full-charge |
| Machine Pistol | sm | 12 | 6 | 3 | 1 | - | - |
| Officer's Pistol Custom | sm | 12 | 6 | 2 | 2 | 1 | burst-1 |
| Sneak Pistol | sm | 10 | 4 | 2 | 2 | 1 | silent |
| Marine Military Pistol | sm | 14 | 8 | 3 | 1 | - | reliable |
| Breach Pistol | sm | 45 | 18 | 3 | 2 | - | super-reliable |
| Repeat Pistol | sm | 35 | 21 | 3 | - | - | ammo-returns |
| Magnum Custom | sm | 15 | 10 | 3 | 2 | - | crystals |
| Military Twin | sm | 13 | 10 | 2 | 2 | - | burst-1 |
| Quell's Riposte | sm | 12 | 8 | 2 | - | - | burst-1, close: 3 |
| Havoc Custom | sm | 12 | 8 | 3 | - | - | re-roll |
| Combat Rifle Custom | lg | 8 | 4 | 2 | 1 | - | reliable, burst-1 |
| Shock Rifle | lg | 11 | 5 | 3 | 1 | - | effortless-reload |
| Breach Rifle | lg | 37 | 21 | 3 | 2 | - | burst-2 |
| Tactical Rifle | md | 32 | 14 | 3 | 2 | - | burst-1, reliable |
| Outland Gun | md | 22 | 10 | 2 | 2 | - | burst-1, super-reliable |
| Machine Rifle GL | md | 25 | 17 | 3 | 2 | - | grenade-launcher |
| Smart Shot Energy Rifle | md | 23 | 10 | 3 | 2 | - | target-lock, full-charge |
| Caaligorn Hunt Rifle | lg | - | 24 | 3 | 3 | 3 | super-reliable |

### A.3 Melee Weapons (Blue Tokens)

| Name | Size | Buy | Sell | Close | Heavy | Throw | Effects |
|------|------|-----|------|-------|-------|-------|---------|
| Utility Knife | sm | 2 | 1 | 1 | - | 1 | - |
| Combat Knife Crafted | sm | 4 | 2 | 1 | 2 | 2 | - |
| Energy Combat Knife | sm | 4 | 2 | 2 | - | 2 | - |
| Short Sword Crafted | sm | 7 | 3 | 2 | 3 | 2 | - |
| Combat Axe | sm | 4 | 2 | 1 | 3 | 2 | - |
| Combat Sword | lg | 4 | 2 | 2 | 3 | - | - |
| Kalamite Fist | md | 12 | 10 | 3 | 4 | - | effortless |
| Shock Tonfa Compact | md | 14 | 9 | 2 | 4 | - | - |
| Tactical Bracers | md | 24 | 15 | 3 | - | - | effortless, short: 3, medium: 1 |

### A.4 Armor (Yellow Tokens)

| Name | Size | Buy | Sell | Armor | Shield | Effects |
|------|------|-----|------|-------|--------|---------|
| Combat Vest | sm | 7 | 3 | 1 | - | - |
| Combat Vest Shiny | sm | 8 | 4 | 1 | - | - |
| Burst Vest | sm | 14 | 8 | 1 | - | rotating, effortless, flip, discard |
| Shield Belt | sm | 4 | 2 | - | 1 | - |
| Shield Belt Custom | sm | 7 | 3 | - | 2 | - |
| Marine Combat Suit | sm | 34 | 18 | 1 | - | re-roll-ranged |
| Neoflex Plate Upgrade | sm | - | - | 1 | - | na, mech (Machine only) |

### A.5 Consumables & Equipment (Orange Tokens)

| Name | Size | Buy | Sell | Effects | Description |
|------|------|-----|------|---------|-------------|
| Mining Drubber | sm | 4 | 2 | mine | Mining action |
| Jump Pack | sm | 5 | 4 | scramble: [3,5], effortless, flip | Climbing/jumping |
| Sensor Goggles | sm | 7 | 2 | effortless, search | Search effortlessly |
| Medi Pack | sm | 3 | 1 | heal: 4, effortless, discard | Healing |
| Medi Stim | sm | 0 | 0 | heal: 2, effortless, discard | Basic healing |
| Laser Cutter | sm | 4 | 2 | breach | Open locked doors |
| Ammo Box | sm | 5 | 2 | rotating, ammo, discard | Multi-use ammo |
| Walkie Talkie | nano | 5 | 3 | swap | Trade actions |
| Target Laser | nano | 15 | 8 | target-lock | Ignore partial cover |
| Ranged Re-roll | nano | 18 | 11 | re-roll-ranged | Re-roll ranged attacks |

### A.6 Nano Items (Grenades, Stims, Ammo)

| Name | Count | Buy | Sell | Effects | Description |
|------|-------|-----|------|---------|-------------|
| Shard | 2 | - | 2 | throw: 3, effortless | Throwable |
| Dyson Rod | 5 | - | 3-10 | dyson-rod | Mission item/sellable |
| Shift Engram | 2 | - | 3 | effortless, pairs, flip | Teleport swap |
| Nano Orb (5) | 2 | - | 3 | grenade: [5,3,1], discard | Blast grenade |
| Nano Orb (4) | 2 | - | 3 | grenade: [4,3,3], discard | Blast grenade |
| Health Stim (S) | 3 | - | 3 | super_heal: 2, discard | Beyond max health |
| Skill Stim (S) | 2 | - | 3-4 | super_skill: 2-3, discard | Beyond max skill |
| Action Stim | 3 | - | 3-4 | action: 2-3, discard | Extra actions |
| Freeze Blast | 2 | - | 2 | freeze: [2,2] | Freezes targets |
| Grenade | 5 | 5 | 4 | grenade: [4,3,1], discard | Standard grenade |
| Throwing Knife | 3 | 1 | 0 | throw: 2, effortless | Throwable |
| Mine | 3 | 4 | 1 | explode: [5,3,1], mines, effortless, discard | Placeable |
| Detonator (L) | 1 | 22 | 13 | range: l, detonator, effortless | Long range trigger |
| Detonator (M) | 1 | 15 | 9 | range: m, detonator, effortless | Medium range trigger |
| Ammo | 5 | 4 | 2 | ammo, discard | Standard reload |
| Accelerant Ammo | 4 | - | 3 | super-ammo, discard | Special ammo |
| Stim Actions | 2 | 3 | 1 | action: 2, effortless, discard | Extra actions |
| Stim Heal | 3 | 2 | 1 | heal: 2, effortless, discard | Healing |
| Stim Skill | 2 | 4 | 1 | skill: 2, effortless, discard | Restore skill pegs |
| Temporary Shield | 1 | 3 | 2 | effortless, temp-armour, discard | Temporary armor |
| Timewarp | 1 | 7 | 5 | timewarp, discard | Reverse enemy actions |
| Key | 2 | - | 4 | key | Opens First Born doors |
| Objective | 3 | - | - | objective | Mission objective |

---

## Appendix B: Effect Descriptions

Complete descriptions for all icon effects (from xinix/core-space translations):

### Combat Effects

| Effect | Description |
|--------|-------------|
| **burst-1** | Add 1 combat die to attack, spend 1 extra ammo peg |
| **burst-2** | Add up to 2 combat dice, spend same number of extra ammo pegs |
| **reliable** | Ignores misfire results unless accelerant ammo is used |
| **super-reliable** | Ignores misfire results even with accelerant ammo |
| **silent** | Does not add a peg to the hostility tracker |
| **target-lock** | Ignores partial cover, can fire at engaged characters at any range without randomizing |
| **full-charge** | Empty weapon in one blast: +2 dice (4-5 pegs) or +3 dice (6-7 pegs) |
| **infinite** | No ammo pegs required, but 1 peg still added to hostility |
| **dangerous** | After shot, user suffers attack with dice equal to icon number |
| **fire** | Place fire tokens equal to hits; target loses 1 health per Assessment Phase |
| **toxic** | Place poison tokens equal to hits; target loses 1 health per Assessment Phase |
| **stun** | Apply stun tokens instead of damage; tokens must be removed before acting |
| **freeze** | Target misses next turn |
| **fear** | Target must spend all actions fleeing |

### Defense Effects

| Effect | Description |
|--------|-------------|
| **armour** | Reduces hits scored against wearer by armor value |
| **shield** | Blocks hits automatically; overloads if attack exceeds value |
| **blue-armour** | Blue pegs block first hit of each attack |
| **blue-armour-regen** | Shield regenerates if not used for a round |
| **temp-armour** | Temporary physical armor for number of rounds indicated |
| **deflect** | Reflects First Born ranged attacks back at attacker |
| **armour-re-roll** | Force enemy to re-roll a single die from attacks |

### Token Behavior

| Effect | Description |
|--------|-------------|
| **effortless** | Can be used as an effortless action |
| **flip** | Flip token face down when used; often has alternate effect on back |
| **discard** | Return token to supply when used |
| **rotating** | Multi-use token; rotate 90° clockwise after each use |
| **rare** | Cannot be bought; only found via Search action |
| **na** | Cannot be used in same mission it was found |

### First Born Specific

| Effect | Description |
|--------|-------------|
| **dyson** | Stores First Born energy; first hit of FB ranged attacks negated, adds Energy Counter |
| **dyson-throw** | Throw at enemy; dice equal to Energy Counters on item |
| **dyson-range** | Make ranged attacks; dice equal to Energy Counters discarded |
| **boomerang** | Returns to thrower if at least one hit scored |
| **artifact** | Part of larger item; worth more when sold with corresponding parts |
| **key** | Pass freely through closed/locked First Born doors |
| **phase** | Move action that can pass through all walls and terrain |

### Utility Effects

| Effect | Description |
|--------|-------------|
| **heal** | Restore health pegs up to starting maximum |
| **super-heal** | Restore health pegs, may exceed starting maximum |
| **repair** | Apply repair points automatically instead of rolling |
| **search** | Sensor goggles allow effortless Search actions |
| **hack** | Open or close doors within range (LoS not required) |
| **mine** | Make Mine actions when in contact with solid wall |
| **scramble** | Climb over objects; top number = max height, bottom = climb/jump |
| **breach** | Open locked doors when in base contact |
| **swap** | Trade actions with another character carrying matching item |
