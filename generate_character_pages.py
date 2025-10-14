#!/usr/bin/env python3
"""Generate data-driven character respec pages from shared JSON data."""
from __future__ import annotations

import json
from pathlib import Path
from string import Template

DATA_PATH = Path("docs/data/corespace-data.json")
TEMPLATE_PATH = Path("templates/character-page.html")
OUTPUT_DIR = Path("docs")


def load_data() -> dict:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Data file not found: {DATA_PATH}")
    with DATA_PATH.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def render_character(template: Template, character: dict) -> str:
    tagline = f"{character['name']} - Character Progression Tracker"
    return template.substitute(
        character_id=character["id"],
        character_name=character["name"],
        tagline=tagline,
    )


def write_character_page(character: dict, html: str) -> Path:
    output_path = OUTPUT_DIR / f"character-{character['id']}.html"
    output_path.write_text(html, encoding="utf-8")
    return output_path


def main() -> None:
    data = load_data()
    template_text = TEMPLATE_PATH.read_text(encoding="utf-8")
    template = Template(template_text)

    characters = data.get("characters", [])
    if not characters:
        raise ValueError("No characters defined in data file")

    generated_files: list[Path] = []
    for character in characters:
        if "id" not in character or "name" not in character:
            raise ValueError(f"Character entries must include 'id' and 'name': {character}")
        html = render_character(template, character)
        generated_files.append(write_character_page(character, html))

    summary = "\n".join(f" - {path}" for path in generated_files)
    print("Generated character pages:\n" + summary)


if __name__ == "__main__":
    main()
