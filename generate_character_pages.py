#!/usr/bin/env python3
"""
Generate data-driven character respec pages from shared JSON data.

This script reads character definitions from the JSON data file and generates
individual HTML pages for each character using a shared template.

Usage:
    python3 generate_character_pages.py
"""
from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path
from string import Template
from typing import Any

# Configuration
DATA_PATH = Path("docs/data/corespace-data.json")
TEMPLATE_PATH = Path("templates/character-page.html")
OUTPUT_DIR = Path("docs")
BUILD_VERSION = datetime.now().strftime("%Y.%m.%d.%H%M")


def load_data() -> dict[str, Any]:
    """
    Load and parse the character data JSON file.

    Returns:
        dict: Parsed JSON data containing characters, classes, and skills.

    Raises:
        FileNotFoundError: If the data file doesn't exist.
        ValueError: If the JSON is invalid or malformed.
    """
    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"Data file not found: {DATA_PATH}\n"
            f"Expected location: {DATA_PATH.absolute()}"
        )

    try:
        with DATA_PATH.open("r", encoding="utf-8") as fh:
            data = json.load(fh)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in {DATA_PATH}: {e}") from e

    # Basic validation
    if not isinstance(data, dict):
        raise ValueError(f"Data file must contain a JSON object, got {type(data).__name__}")

    if "characters" not in data:
        raise ValueError("Data file must contain a 'characters' array")

    if not isinstance(data["characters"], list):
        raise ValueError("'characters' must be an array")

    return data


def load_template() -> Template:
    """
    Load the HTML template file.

    Returns:
        Template: String template for character pages.

    Raises:
        FileNotFoundError: If the template file doesn't exist.
    """
    if not TEMPLATE_PATH.exists():
        raise FileNotFoundError(
            f"Template file not found: {TEMPLATE_PATH}\n"
            f"Expected location: {TEMPLATE_PATH.absolute()}"
        )

    template_text = TEMPLATE_PATH.read_text(encoding="utf-8")
    return Template(template_text)


def validate_character(character: dict[str, Any], index: int) -> None:
    """
    Validate a character entry has required fields.

    Args:
        character: Character data dictionary.
        index: Index in the characters array (for error messages).

    Raises:
        ValueError: If required fields are missing.
    """
    if not isinstance(character, dict):
        raise ValueError(f"Character at index {index} must be an object")

    if "id" not in character:
        raise ValueError(f"Character at index {index} is missing required 'id' field")

    if "name" not in character:
        raise ValueError(f"Character '{character.get('id', index)}' is missing required 'name' field")

    # Validate ID format (alphanumeric, hyphens, underscores)
    char_id = character["id"]
    if not isinstance(char_id, str) or not char_id:
        raise ValueError(f"Character at index {index} has invalid 'id' (must be non-empty string)")

    import re
    if not re.match(r'^[a-zA-Z0-9_-]+$', char_id):
        raise ValueError(
            f"Character ID '{char_id}' contains invalid characters. "
            f"Only alphanumeric, hyphens, and underscores are allowed."
        )


def validate_html(html: str, character_id: str) -> None:
    """
    Perform basic HTML structure validation.

    Args:
        html: Generated HTML content.
        character_id: Character ID (for error messages).

    Raises:
        ValueError: If HTML structure is invalid.
    """
    if '<!DOCTYPE html>' not in html:
        raise ValueError(f"Generated HTML for '{character_id}' is missing DOCTYPE declaration")

    if '</html>' not in html:
        raise ValueError(f"Generated HTML for '{character_id}' has unclosed html tag")

    if '<title>' not in html or '</title>' not in html:
        raise ValueError(f"Generated HTML for '{character_id}' is missing title element")


def render_character(template: Template, character: dict[str, Any]) -> str:
    """
    Render a character page from the template.

    Args:
        template: HTML template.
        character: Character data dictionary.

    Returns:
        str: Rendered HTML content.
    """
    tagline = f"{character['name']} - Character Progression Tracker"
    default_class = character.get("defaultClass")
    default_class_str = f'"{default_class}"' if default_class else "null"

    return template.substitute(
        character_id=character["id"],
        character_name=character["name"],
        tagline=tagline,
        default_class=default_class_str,
        build_version=BUILD_VERSION,
    )


def write_character_page(character: dict[str, Any], html: str) -> Path:
    """
    Write a character page to disk.

    Args:
        character: Character data dictionary.
        html: Rendered HTML content.

    Returns:
        Path: Path to the written file.
    """
    output_path = OUTPUT_DIR / f"character-{character['id']}.html"
    output_path.write_text(html, encoding="utf-8")
    return output_path


def main() -> int:
    """
    Main entry point for character page generation.

    Returns:
        int: Exit code (0 for success, 1 for error).
    """
    print(f"Core Space Character Page Generator")
    print(f"Build Version: {BUILD_VERSION}")
    print("-" * 40)

    try:
        # Load data and template
        data = load_data()
        template = load_template()

        characters = data.get("characters", [])
        if not characters:
            print("Warning: No characters defined in data file")
            return 0

        print(f"Found {len(characters)} character(s) to generate")

        # Validate all characters first
        for index, character in enumerate(characters):
            validate_character(character, index)

        # Generate pages
        generated_files: list[Path] = []
        for character in characters:
            html = render_character(template, character)
            validate_html(html, character["id"])
            output_path = write_character_page(character, html)
            generated_files.append(output_path)
            print(f"  ✓ {character['name']} -> {output_path.name}")

        print("-" * 40)
        print(f"Successfully generated {len(generated_files)} character page(s)")
        return 0

    except FileNotFoundError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1
    except ValueError as e:
        print(f"Validation Error: {e}", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"Unexpected Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
