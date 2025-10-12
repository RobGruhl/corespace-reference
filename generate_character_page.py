#!/usr/bin/env python3
"""
Core Space Character Page Generator

This script generates character tracker HTML pages from JSON data files.
It reads character definitions and skill databases to create standardized
character pages without manual HTML editing.

Usage:
    python generate_character_page.py <character_id>
    python generate_character_page.py cassie
    python generate_character_page.py --all
"""

import json
import sys
from pathlib import Path
from typing import Dict, List, Any, Optional


def load_skills() -> Dict[str, Dict]:
    """Load the skills database."""
    skills_file = Path("character-data/skills.json")
    with open(skills_file, 'r') as f:
        data = json.load(f)
    return {skill['id']: skill for skill in data['skills']}


def load_character(character_id: str) -> Dict:
    """Load a character definition."""
    char_file = Path(f"character-data/characters/{character_id}.json")
    if not char_file.exists():
        raise FileNotFoundError(f"Character file not found: {char_file}")
    with open(char_file, 'r') as f:
        return json.load(f)


def generate_skill_card(skill: Dict, character_id: str) -> str:
    """Generate HTML for a single skill card."""
    skill_id = skill['id']
    skill_name = skill['name']
    skill_type = skill['type']
    description = skill['description']
    max_level = skill['max_level']

    # Generate level options
    options = ['<option value="0">Not Learned</option>']
    for i in range(1, max_level + 1):
        options.append(f'<option value="{i}">Level {i}</option>')
    options_html = '\n                        '.join(options)

    # Generate trigger if it's a reaction skill
    trigger_html = ''
    if 'trigger' in skill and skill['trigger']:
        trigger_html = f'''
                        <div class="skill-level" data-level="passive">
                            <span class="level-label" data-level="passive">Trigger:</span>
                            {skill['trigger']}
                        </div>'''

    # Generate level descriptions
    levels_html = []
    for level_data in skill['levels']:
        level = level_data['level']
        desc = level_data['description']

        if level == 'passive':
            levels_html.append(f'''
                        <div class="skill-level" data-level="passive">
                            <span class="level-label" data-level="passive">Passive {len([l for l in skill['levels'][:skill['levels'].index(level_data)] if l['level'] == 'passive']) + 1}:</span>
                            {desc}
                        </div>''')
        else:
            levels_html.append(f'''
                        <div class="skill-level" data-level="{level}">
                            <span class="level-label" data-level="{level}">Level {level}:</span>
                            {desc}
                        </div>''')

    levels_combined = trigger_html + ''.join(levels_html)

    return f'''
                <div class="action-card" data-skill="{skill_id}">
                    <select class="skill-select" onchange="updateSkill('{skill_id}', this.value)">
                        {options_html}
                    </select>
                    <div class="action-card-title">{skill_name}</div>
                    <div class="action-requirements">{skill_type.replace('+', ' + ').title()} - {description}</div>
                    <div>{levels_combined}
                    </div>
                </div>
'''


def generate_passive_summary_items(skills_db: Dict, character_skills: List[str]) -> str:
    """Generate passive summary items."""
    items = []
    for skill_id in character_skills:
        if skill_id not in skills_db:
            continue
        skill = skills_db[skill_id]
        if 'passive_summary' in skill:
            for passive in skill['passive_summary']:
                min_level = passive['min_level']
                text = passive['text']
                items.append(f'''
                    <div class="passive-item" data-skill="{skill_id}" data-min-level="{min_level}" style="display: none;">
                        <strong>{skill['name']} {min_level}:</strong> {text}
                    </div>''')
    return ''.join(items)


def generate_reaction_summary_items(skills_db: Dict, character_skills: List[str]) -> str:
    """Generate reaction summary items."""
    items = []
    for skill_id in character_skills:
        if skill_id not in skills_db:
            continue
        skill = skills_db[skill_id]
        if 'reaction_summary' in skill:
            for reaction in skill['reaction_summary']:
                min_level = reaction['min_level']
                text = reaction['text']
                items.append(f'''
                    <div class="passive-item" data-skill="{skill_id}" data-min-level="{min_level}" style="display: none;">
                        <strong>{skill['name']} {min_level}:</strong> {text}
                    </div>''')
    return ''.join(items)


def generate_base_ability_section(base_ability: Optional[Dict]) -> str:
    """Generate the base ability section if character has one."""
    if not base_ability:
        return ''

    icon = base_ability.get('icon', '⭐')
    name = base_ability.get('name', 'Special Ability')
    description = base_ability.get('description', '')

    return f'''
        <div class="section">
            <h2>Character Ability</h2>
            <div class="character-ability">
                <div class="ability-title">{icon} {name}</div>
                <div>{description}</div>
            </div>
        </div>
'''


def generate_character_page(character_id: str, output_dir: Path = Path("docs")) -> str:
    """Generate a complete character tracker page."""
    # Load data
    character = load_character(character_id)
    skills_db = load_skills()

    char_name = character['name']
    char_class = character['class']
    char_skills = character['skills']
    base_ability = character.get('base_ability')

    # Generate sections
    base_ability_html = generate_base_ability_section(base_ability)
    passive_items = generate_passive_summary_items(skills_db, char_skills)
    reaction_items = generate_reaction_summary_items(skills_db, char_skills)

    # Generate skill cards
    skill_cards = []
    for skill_id in char_skills:
        if skill_id in skills_db:
            skill_cards.append(generate_skill_card(skills_db[skill_id], character_id))

    skill_cards_html = '\n'.join(skill_cards)

    # Build complete HTML
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{char_name} - Character Tracker</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .character-ability {{
            background: rgba(83, 168, 182, 0.15);
            border: 2px solid #53a8b6;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }}
        .ability-title {{
            font-weight: bold;
            color: #53a8b6;
            font-size: 1.1em;
            margin-bottom: 8px;
        }}
        .passive-summary {{
            background: rgba(155, 89, 182, 0.15);
            border: 2px solid #9b59b6;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }}
        .passive-summary h3 {{
            color: #9b59b6;
            margin-top: 0;
            margin-bottom: 10px;
        }}
        .passive-item {{
            padding: 8px 0;
            border-bottom: 1px solid rgba(155, 89, 182, 0.2);
        }}
        .passive-item:last-child {{
            border-bottom: none;
        }}
        .skill-controls {{
            background: rgba(83, 168, 182, 0.1);
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 15px;
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            align-items: center;
        }}
        .reset-btn {{
            background: rgba(231, 76, 60, 0.3);
            border: 2px solid #e74c3c;
            color: #e74c3c;
            padding: 6px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.85em;
            transition: all 0.3s;
        }}
        .reset-btn:hover {{
            background: rgba(231, 76, 60, 0.5);
        }}
        .skill-select {{
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #53a8b6;
            color: #eee;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.9em;
            cursor: pointer;
            margin-bottom: 8px;
        }}
        .skill-select option {{
            background: #1a1a2e;
            color: #eee;
        }}
        .action-card.not-learned {{
            opacity: 0.3;
            filter: grayscale(0.8);
        }}
        .action-card.not-learned .action-card-title {{
            text-decoration: line-through;
        }}
        .skill-level {{
            padding: 8px 12px;
            margin: 5px 0;
            border-radius: 4px;
            border-left: 4px solid;
        }}
        .skill-level[data-level="1"] {{
            border-left-color: #2ecc71;
            background: rgba(46, 204, 113, 0.1);
        }}
        .skill-level[data-level="2"] {{
            border-left-color: #f39c12;
            background: rgba(243, 156, 18, 0.1);
        }}
        .skill-level[data-level="3"] {{
            border-left-color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
        }}
        .skill-level[data-level="passive"] {{
            border-left-color: #9b59b6;
            background: rgba(155, 89, 182, 0.1);
        }}
        .skill-level.hidden {{
            display: none;
        }}
        .level-label {{
            font-weight: bold;
            margin-right: 8px;
        }}
        .level-label[data-level="1"] {{ color: #2ecc71; }}
        .level-label[data-level="2"] {{ color: #f39c12; }}
        .level-label[data-level="3"] {{ color: #e74c3c; }}
        .level-label[data-level="passive"] {{ color: #9b59b6; }}
        @media print {{
            .skill-controls, .back-btn, .breadcrumb, .skill-select {{ display: none; }}
            .action-card.not-learned {{ display: none; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1><a href="index.html">⚡ CORE SPACE ⚡</a></h1>
            <div class="tagline">{char_name} - Character Progression Tracker</div>
        </header>

        <div class="breadcrumb">
            <a href="index.html">Home</a>
            <span>›</span>
            <span>{char_name}</span>
        </div>

        <a href="index.html" class="back-btn">← Back to Hub</a>
{base_ability_html}
        <div class="section">
            <h2>Passive Skills Summary</h2>
            <div class="passive-summary">
                <h3>🔮 Always Active Abilities</h3>
                <div id="passive-skills-list">{passive_items}
                </div>
                <div id="no-passives" style="color: #888; font-style: italic;">
                    No passive abilities learned yet. Passive abilities will appear here as you learn skills.
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Available Reactions</h2>
            <div class="passive-summary" style="border-color: #e67e22;">
                <h3 style="color: #e67e22;">⚡ Triggered Abilities</h3>
                <div id="reaction-skills-list">{reaction_items}
                </div>
                <div id="no-reactions" style="color: #888; font-style: italic;">
                    No reaction abilities learned yet. Reaction abilities will appear here as you learn skills.
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Campaign Tracker</h2>
            <div class="skill-controls">
                <div class="info-box" style="margin: 0; flex: 1;">
                    <strong>How to use:</strong> Use the dropdown on each skill card to set your current level. Cards update automatically and your progress is saved!
                </div>
                <button class="reset-btn" onclick="resetAll()">Reset All Skills</button>
            </div>
        </div>

        <div class="section">
            <h2>{char_name}'s Skills</h2>
            <div class="action-grid">
{skill_cards_html}
            </div>
        </div>

        <footer>
            <div class="guide-links">
                <a href="index.html" class="guide-link">← Back to Hub</a>
                <a href="advancement.html" class="guide-link">View All Skills</a>
            </div>
        </footer>
    </div>

    <script>
        const CHARACTER = '{character_id}';

        function updateSkill(skillName, level) {{
            level = parseInt(level);
            localStorage.setItem(`${{CHARACTER}}-${{skillName}}`, level);

            const card = document.querySelector(`[data-skill="${{skillName}}"]`);
            const skillLevels = card.querySelectorAll('.skill-level');

            if (level === 0) {{
                card.classList.add('not-learned');
            }} else {{
                card.classList.remove('not-learned');
            }}

            skillLevels.forEach(levelDiv => {{
                const divLevel = levelDiv.getAttribute('data-level');

                if (divLevel === 'passive') {{
                    if (level > 0) {{
                        levelDiv.classList.remove('hidden');
                    }} else {{
                        levelDiv.classList.add('hidden');
                    }}
                }} else {{
                    const divLevelNum = parseInt(divLevel);
                    if (divLevelNum <= level) {{
                        levelDiv.classList.remove('hidden');
                    }} else {{
                        levelDiv.classList.add('hidden');
                    }}
                }}
            }});

            // Update passive skills summary
            updatePassiveSummary();
            // Update reaction skills summary
            updateReactionSummary();
        }}

        function updatePassiveSummary() {{
            const passiveItems = document.querySelectorAll('#passive-skills-list .passive-item');
            let hasAnyPassive = false;

            passiveItems.forEach(item => {{
                const skillName = item.getAttribute('data-skill');
                const minLevel = parseInt(item.getAttribute('data-min-level'));
                const currentLevel = parseInt(localStorage.getItem(`${{CHARACTER}}-${{skillName}}`) || '0');

                if (currentLevel >= minLevel) {{
                    item.style.display = '';
                    hasAnyPassive = true;
                }} else {{
                    item.style.display = 'none';
                }}
            }});

            const noPassivesMsg = document.getElementById('no-passives');
            if (hasAnyPassive) {{
                noPassivesMsg.style.display = 'none';
            }} else {{
                noPassivesMsg.style.display = 'block';
            }}
        }}

        function updateReactionSummary() {{
            const reactionItems = document.querySelectorAll('#reaction-skills-list .passive-item');
            let hasAnyReaction = false;

            reactionItems.forEach(item => {{
                const skillName = item.getAttribute('data-skill');
                const minLevel = parseInt(item.getAttribute('data-min-level'));
                const currentLevel = parseInt(localStorage.getItem(`${{CHARACTER}}-${{skillName}}`) || '0');

                if (currentLevel >= minLevel) {{
                    item.style.display = '';
                    hasAnyReaction = true;
                }} else {{
                    item.style.display = 'none';
                }}
            }});

            const noReactionsMsg = document.getElementById('no-reactions');
            if (hasAnyReaction) {{
                noReactionsMsg.style.display = 'none';
            }} else {{
                noReactionsMsg.style.display = 'block';
            }}
        }}

        function resetAll() {{
            if (!confirm('Reset all skills to "Not Learned"? This cannot be undone.')) {{
                return;
            }}

            const cards = document.querySelectorAll('[data-skill]');
            cards.forEach(card => {{
                const skillName = card.getAttribute('data-skill');
                const select = card.querySelector('select');
                select.value = '0';
                updateSkill(skillName, 0);
            }});
        }}

        window.addEventListener('DOMContentLoaded', () => {{
            const cards = document.querySelectorAll('[data-skill]');
            cards.forEach(card => {{
                const skillName = card.getAttribute('data-skill');
                const savedLevel = localStorage.getItem(`${{CHARACTER}}-${{skillName}}`) || '0';
                const select = card.querySelector('select');
                select.value = savedLevel;
                updateSkill(skillName, savedLevel);
            }});

            // Initial passive and reaction summary updates
            updatePassiveSummary();
            updateReactionSummary();
        }});
    </script>
</body>
</html>
'''

    # Write output
    output_file = output_dir / f"character-{character_id}.html"
    with open(output_file, 'w') as f:
        f.write(html)

    return str(output_file)


def main():
    """Main entry point."""
    if len(sys.argv) < 2:
        print("Usage: python generate_character_page.py <character_id>")
        print("       python generate_character_page.py --all")
        sys.exit(1)

    if sys.argv[1] == '--all':
        # Generate all characters
        char_dir = Path("character-data/characters")
        for char_file in char_dir.glob("*.json"):
            character_id = char_file.stem
            try:
                output = generate_character_page(character_id)
                print(f"✓ Generated: {output}")
            except Exception as e:
                print(f"✗ Error generating {character_id}: {e}")
    else:
        # Generate single character
        character_id = sys.argv[1]
        try:
            output = generate_character_page(character_id)
            print(f"✓ Generated: {output}")
        except Exception as e:
            print(f"✗ Error: {e}")
            sys.exit(1)


if __name__ == '__main__':
    main()
