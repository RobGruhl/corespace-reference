# Character Page Generation System

This document explains how to add new characters to the Core Space reference site using the automated character page generation system.

## Overview

Instead of manually creating HTML files for each character, you can now:
1. Define character data in JSON files
2. Run a Python script to generate the HTML automatically
3. The generated pages will have consistent formatting and functionality

## Quick Start

### Adding a New Character

1. **Create a character JSON file** in `character-data/characters/`:
   ```bash
   touch character-data/characters/newcharacter.json
   ```

2. **Define the character** (see example below)

3. **Generate the HTML page**:
   ```bash
   python3 generate_character_page.py newcharacter
   ```

4. **The generated file** will be at `docs/character-newcharacter.html`

### Regenerating All Characters

To regenerate all character pages:
```bash
python3 generate_character_page.py --all
```

## File Structure

```
corespace-reference/
├── character-data/
│   ├── schema.json              # JSON schema (documentation)
│   ├── skills.json              # Database of all skills
│   └── characters/
│       ├── cassie.json          # Character definition
│       ├── wade.json            # Character definition
│       └── newcharacter.json    # Your new character
├── generate_character_page.py   # Generator script
└── docs/
    ├── character-cassie.html    # Generated output
    ├── character-wade.html      # Generated output
    └── character-newcharacter.html  # Your generated page
```

## Character Definition Format

Create a JSON file in `character-data/characters/<character-id>.json`:

```json
{
  "id": "charactername",
  "name": "Character Display Name",
  "class": "marine",
  "base_ability": {
    "icon": "🏃",
    "name": "Special Ability Name",
    "description": "Description of the character's inherent ability."
  },
  "skills": [
    "evade",
    "weaponsexpert",
    "countershot"
  ]
}
```

### Required Fields

- **id**: Lowercase identifier (used in filenames and URLs)
- **name**: Character's display name
- **class**: Character's default class
- **skills**: Array of skill IDs available to this character

### Optional Fields

- **base_ability**: Character's inherent special ability (if any)
  - **icon**: Emoji or icon
  - **name**: Ability name
  - **description**: What the ability does

## Skill System

All skills are defined in `character-data/skills.json`. The generator automatically pulls skill data from this central database.

### Adding a New Skill

If you need to add a new skill that doesn't exist yet:

1. Open `character-data/skills.json`
2. Add a new skill object to the `skills` array:

```json
{
  "id": "newskill",
  "name": "New Skill Name",
  "type": "active",
  "description": "short description",
  "max_level": 3,
  "trigger": "When something happens (for reaction skills)",
  "levels": [
    {
      "level": 1,
      "description": "What level 1 does"
    },
    {
      "level": 2,
      "description": "What level 2 does"
    },
    {
      "level": 3,
      "description": "What level 3 does"
    }
  ],
  "passive_summary": [
    {
      "min_level": 1,
      "text": "Short passive description"
    }
  ],
  "reaction_summary": [
    {
      "min_level": 1,
      "text": "Short reaction description"
    }
  ]
}
```

### Skill Types

- **active**: Active skills that require an action
- **passive**: Always-on abilities
- **reaction**: Triggered abilities
- **active+passive**: Skills with both active and passive components
- **active+reaction**: Skills with both active and reaction components

### Skill Levels

Skills can have levels from 1-3. You can also include `"passive"` levels that are always active when the skill is learned:

```json
"levels": [
  {
    "level": "passive",
    "description": "This is always on when you have level 1+"
  },
  {
    "level": 1,
    "description": "Active ability at level 1"
  },
  {
    "level": 2,
    "description": "Enhanced version at level 2"
  }
]
```

### Summary Boxes

The **passive_summary** and **reaction_summary** arrays create the quick-reference boxes at the top of character pages:

- **passive_summary**: Shows always-active abilities
- **reaction_summary**: Shows triggered abilities

Each summary entry specifies:
- **min_level**: What skill level is needed for this to appear
- **text**: Short description shown in the summary box

## Examples

### Example 1: Simple Character (No Base Ability)

```json
{
  "id": "hopper",
  "name": "Hopper",
  "class": "engineer",
  "skills": [
    "repair",
    "gadgeteer",
    "techexpert"
  ]
}
```

### Example 2: Character with Base Ability

```json
{
  "id": "wade",
  "name": "Wade",
  "class": "smuggler",
  "base_ability": {
    "icon": "🏃",
    "name": "Extra Movement",
    "description": "When making a Move action, this character can move an additional number of squares equal to the number in the icon. Still limited to 11\" maximum."
  },
  "skills": [
    "distraction",
    "countershot",
    "walkitoff",
    "persuasion",
    "lightfingers",
    "evade",
    "ambush",
    "slippery"
  ]
}
```

## Testing Your Changes

1. **Generate the page**:
   ```bash
   python3 generate_character_page.py yourcharacter
   ```

2. **Open in browser**:
   ```bash
   open docs/character-yourcharacter.html
   # or
   firefox docs/character-yourcharacter.html
   ```

3. **Check**:
   - Character name appears correctly
   - Base ability shows (if defined)
   - All skills are present
   - Skill levels work correctly
   - Passive and reaction summaries populate when you select skills

## Benefits of This System

### Before (Manual HTML)
- ❌ Copy/paste entire HTML file
- ❌ Find/replace character name in ~20 places
- ❌ Manually add each skill card
- ❌ Risk of typos and inconsistencies
- ❌ Hard to update formatting across all characters

### After (Data-Driven)
- ✅ Define character in simple JSON
- ✅ One command generates perfect HTML
- ✅ Skills pulled from central database
- ✅ Consistent formatting guaranteed
- ✅ Update all characters by running `--all`

## Workflow for Adding 10 New Characters

1. **Add skill definitions** to `character-data/skills.json` (if needed)
2. **Create 10 JSON files** in `character-data/characters/`
3. **Run the generator**: `python3 generate_character_page.py --all`
4. **Done!** All 10 HTML pages created in `docs/`

This takes minutes instead of hours of manual HTML editing.

## Troubleshooting

### Error: "Character file not found"
- Check the character ID matches the filename
- Ensure the file is in `character-data/characters/`
- Character ID should be lowercase, no spaces

### Error: "Skill not found"
- Check skill ID spelling in character JSON
- Ensure skill exists in `character-data/skills.json`
- Skill IDs are case-sensitive

### Generated page looks wrong
- Check that `docs/style.css` exists
- Verify JSON syntax (use a JSON validator)
- Ensure all required fields are present

### Need to regenerate after skill changes
- Edit `character-data/skills.json`
- Run generator again: `python3 generate_character_page.py --all`
- All pages will pick up the new skill definitions

## Advanced: Class System

While not yet fully implemented, the system supports class definitions for future expansion. You can define classes in a similar way to characters, and skills can be organized by class.

## Support

For issues or questions about the character generation system:
1. Check this documentation
2. Review existing character JSON files for examples
3. Validate your JSON at jsonlint.com
4. Check the console output for error messages
