#!/usr/bin/env python3
"""
Data validation tests for Core Space reference site.

Run with: python3 -m pytest tests/ -v
Or just: python3 tests/test_data_validation.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
DATA_PATH = PROJECT_ROOT / "docs" / "data" / "corespace-data.json"


def load_data() -> dict:
    """Load the JSON data file."""
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


class TestDataFileStructure:
    """Tests for basic data file structure."""

    def test_data_file_exists(self) -> None:
        """Data file should exist."""
        assert DATA_PATH.exists(), f"Data file not found: {DATA_PATH}"

    def test_data_file_valid_json(self) -> None:
        """Data file should contain valid JSON."""
        try:
            load_data()
        except json.JSONDecodeError as e:
            raise AssertionError(f"Invalid JSON: {e}") from e

    def test_has_required_top_level_keys(self) -> None:
        """Data file should have characters, classes, and skills arrays."""
        data = load_data()
        assert "characters" in data, "Missing 'characters' key"
        assert "classes" in data, "Missing 'classes' key"
        assert "skills" in data, "Missing 'skills' key"

    def test_top_level_values_are_arrays(self) -> None:
        """Top-level keys should contain arrays."""
        data = load_data()
        assert isinstance(data["characters"], list), "'characters' should be an array"
        assert isinstance(data["classes"], list), "'classes' should be an array"
        assert isinstance(data["skills"], list), "'skills' should be an array"


class TestCharacterSchema:
    """Tests for character data schema."""

    def test_all_characters_have_required_fields(self) -> None:
        """All characters should have id and name fields."""
        data = load_data()
        for i, char in enumerate(data["characters"]):
            assert "id" in char, f"Character at index {i} missing 'id'"
            assert "name" in char, f"Character '{char.get('id', i)}' missing 'name'"

    def test_character_ids_are_valid_format(self) -> None:
        """Character IDs should only contain alphanumeric, hyphens, underscores."""
        data = load_data()
        pattern = re.compile(r'^[a-zA-Z0-9_-]+$')
        for char in data["characters"]:
            char_id = char.get("id", "")
            assert pattern.match(char_id), f"Invalid character ID format: '{char_id}'"

    def test_character_ids_are_unique(self) -> None:
        """Character IDs should be unique."""
        data = load_data()
        ids = [char["id"] for char in data["characters"]]
        duplicates = [x for x in ids if ids.count(x) > 1]
        assert not duplicates, f"Duplicate character IDs found: {set(duplicates)}"

    def test_characters_have_default_class_or_classboards(self) -> None:
        """Characters should have either defaultClass or classBoards."""
        data = load_data()
        for char in data["characters"]:
            has_default = "defaultClass" in char
            has_boards = "classBoards" in char and len(char.get("classBoards", [])) > 0
            assert has_default or has_boards, (
                f"Character '{char['name']}' needs either defaultClass or classBoards"
            )


class TestClassSchema:
    """Tests for class data schema."""

    def test_all_classes_have_required_fields(self) -> None:
        """All classes should have id and name fields."""
        data = load_data()
        for i, cls in enumerate(data["classes"]):
            assert "id" in cls, f"Class at index {i} missing 'id'"
            assert "name" in cls, f"Class '{cls.get('id', i)}' missing 'name'"

    def test_class_ids_are_unique(self) -> None:
        """Class IDs should be unique."""
        data = load_data()
        ids = [cls["id"] for cls in data["classes"]]
        duplicates = [x for x in ids if ids.count(x) > 1]
        assert not duplicates, f"Duplicate class IDs found: {set(duplicates)}"


class TestSkillSchema:
    """Tests for skill data schema."""

    def test_all_skills_have_required_fields(self) -> None:
        """All skills should have id, name, and levels."""
        data = load_data()
        for i, skill in enumerate(data["skills"]):
            assert "id" in skill, f"Skill at index {i} missing 'id'"
            assert "name" in skill, f"Skill '{skill.get('id', i)}' missing 'name'"
            assert "levels" in skill, f"Skill '{skill['name']}' missing 'levels'"

    def test_skill_ids_are_unique(self) -> None:
        """Skill IDs should be unique."""
        data = load_data()
        ids = [skill["id"] for skill in data["skills"]]
        duplicates = [x for x in ids if ids.count(x) > 1]
        assert not duplicates, f"Duplicate skill IDs found: {set(duplicates)}"

    def test_skills_have_summaries(self) -> None:
        """All skills should have summary descriptions."""
        data = load_data()
        missing = []
        for skill in data["skills"]:
            if "summary" not in skill or not skill["summary"]:
                missing.append(skill.get("name", skill.get("id")))
        assert not missing, f"Skills missing summaries: {missing}"

    def test_skill_levels_have_required_fields(self) -> None:
        """Skill levels should have level number and description/effect."""
        data = load_data()
        for skill in data["skills"]:
            for i, level in enumerate(skill.get("levels", [])):
                assert "level" in level, (
                    f"Skill '{skill['name']}' level {i} missing 'level' number"
                )
                has_text = (
                    "description" in level or
                    "effect" in level or
                    "passiveEffect" in level
                )
                assert has_text, (
                    f"Skill '{skill['name']}' level {level.get('level', i)} needs "
                    f"description, effect, or passiveEffect"
                )


class TestReferentialIntegrity:
    """Tests for data relationships and references."""

    def test_character_default_classes_exist(self) -> None:
        """Character defaultClass values should reference existing classes."""
        data = load_data()
        class_ids = {cls["id"] for cls in data["classes"]}

        for char in data["characters"]:
            default_class = char.get("defaultClass")
            if default_class:
                assert default_class in class_ids, (
                    f"Character '{char['name']}' references unknown class '{default_class}'"
                )

    def test_character_inherent_skills_exist(self) -> None:
        """Character inherentSkills should reference existing skills."""
        data = load_data()
        skill_ids = {skill["id"] for skill in data["skills"]}

        for char in data["characters"]:
            for skill_ref in char.get("inherentSkills", []):
                skill_id = skill_ref.get("skillId")
                assert skill_id in skill_ids, (
                    f"Character '{char['name']}' has unknown inherent skill '{skill_id}'"
                )

    def test_class_available_skills_exist(self) -> None:
        """Class availableSkills should reference existing skills."""
        data = load_data()
        skill_ids = {skill["id"] for skill in data["skills"]}

        for cls in data["classes"]:
            for skill_ref in cls.get("availableSkills", []):
                skill_id = skill_ref.get("skillId")
                assert skill_id in skill_ids, (
                    f"Class '{cls['name']}' has unknown skill '{skill_id}'"
                )


def run_tests() -> int:
    """Run all tests and return exit code."""
    import traceback

    test_classes = [
        TestDataFileStructure,
        TestCharacterSchema,
        TestClassSchema,
        TestSkillSchema,
        TestReferentialIntegrity,
    ]

    passed = 0
    failed = 0
    errors: list[tuple[str, str]] = []

    print("=" * 60)
    print("Core Space Data Validation Tests")
    print("=" * 60)

    for test_class in test_classes:
        instance = test_class()
        print(f"\n{test_class.__name__}:")

        for method_name in dir(instance):
            if not method_name.startswith("test_"):
                continue

            method = getattr(instance, method_name)
            test_name = method_name.replace("_", " ").replace("test ", "")

            try:
                method()
                print(f"  ✓ {test_name}")
                passed += 1
            except AssertionError as e:
                print(f"  ✗ {test_name}")
                print(f"    {e}")
                failed += 1
                errors.append((f"{test_class.__name__}.{method_name}", str(e)))
            except Exception as e:
                print(f"  ! {test_name} (ERROR)")
                print(f"    {e}")
                failed += 1
                errors.append((f"{test_class.__name__}.{method_name}", traceback.format_exc()))

    print("\n" + "=" * 60)
    print(f"Results: {passed} passed, {failed} failed")
    print("=" * 60)

    if errors:
        print("\nFailed tests:")
        for test_name, error in errors:
            print(f"  - {test_name}")

    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(run_tests())
