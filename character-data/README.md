# Character Data

This directory contains JSON data files that define characters and skills for the Core Space reference site.

## Directory Structure

```
character-data/
├── README.md           # This file
├── schema.json         # JSON schema (for reference)
├── skills.json         # All skill definitions
└── characters/         # Individual character files
    ├── cassie.json
    ├── wade.json
    └── ...
```

## Quick Reference

### Add a New Character

1. Create `characters/newname.json`:
```json
{
  "id": "newname",
  "name": "Display Name",
  "class": "marine",
  "skills": ["evade", "countershot"]
}
```

2. Run: `python3 generate_character_page.py newname`

### Add a New Skill

Edit `skills.json` and add to the `skills` array:
```json
{
  "id": "skillid",
  "name": "Skill Name",
  "type": "active",
  "description": "what it does",
  "max_level": 3,
  "levels": [...]
}
```

## Files

### skills.json
Central database of all skills in the game. Referenced by character definitions.

### characters/*.json
Individual character definitions. Each file defines:
- Character ID and display name
- Default class
- Optional base ability
- List of available skills (references skill IDs from skills.json)

### schema.json
JSON schema documenting the data structure. Used for reference and validation.

## See Also

- **CHARACTER_GENERATION.md** - Complete documentation
- **generate_character_page.py** - The generator script
