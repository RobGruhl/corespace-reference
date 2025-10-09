"""
Utility functions for PDF to Markdown extraction
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Any


def ensure_dir(path: str | Path) -> Path:
    """
    Ensure directory exists, create if needed

    Args:
        path: Directory path

    Returns:
        Path object
    """
    path = Path(path)
    path.mkdir(parents=True, exist_ok=True)
    return path


def save_json(data: Dict | List, filepath: str | Path) -> None:
    """
    Save data as JSON file

    Args:
        data: Data to save
        filepath: Output file path
    """
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def load_json(filepath: str | Path) -> Dict | List:
    """
    Load JSON file

    Args:
        filepath: JSON file path

    Returns:
        Loaded data
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)


def format_table_as_markdown(table: List[List[str]]) -> str:
    """
    Format table data as markdown table

    Args:
        table: 2D list representing table

    Returns:
        Markdown formatted table
    """
    if not table or len(table) < 2:
        return ""

    lines = []

    # Header row
    header = "| " + " | ".join(str(cell) if cell else "" for cell in table[0]) + " |"
    lines.append(header)

    # Separator
    separator = "|" + "|".join([" --- " for _ in table[0]]) + "|"
    lines.append(separator)

    # Data rows
    for row in table[1:]:
        row_str = "| " + " | ".join(str(cell) if cell else "" for cell in row) + " |"
        lines.append(row_str)

    return "\n".join(lines)


def clean_text(text: str) -> str:
    """
    Clean extracted text

    Args:
        text: Raw text

    Returns:
        Cleaned text
    """
    if not text:
        return ""

    # Remove excessive whitespace
    lines = [line.rstrip() for line in text.split('\n')]

    # Remove excessive blank lines (keep max 2 consecutive)
    cleaned_lines = []
    blank_count = 0

    for line in lines:
        if line.strip():
            cleaned_lines.append(line)
            blank_count = 0
        else:
            blank_count += 1
            if blank_count <= 2:
                cleaned_lines.append(line)

    return '\n'.join(cleaned_lines)


def parse_page_range(page_spec: str) -> List[int]:
    """
    Parse page specification into list of page numbers

    Args:
        page_spec: Page specification (e.g., "1-5", "1,3,5", "1-3,7-9")

    Returns:
        List of page numbers (0-indexed)

    Examples:
        "1-5" -> [0, 1, 2, 3, 4]
        "1,3,5" -> [0, 2, 4]
        "1-3,7-9" -> [0, 1, 2, 6, 7, 8]
    """
    pages = set()

    for part in page_spec.split(','):
        part = part.strip()

        if '-' in part:
            # Range
            start, end = part.split('-')
            start = int(start.strip())
            end = int(end.strip())
            # Convert to 0-indexed
            pages.update(range(start - 1, end))
        else:
            # Single page
            page = int(part.strip())
            # Convert to 0-indexed
            pages.add(page - 1)

    return sorted(list(pages))


def estimate_processing_time(num_pages: int) -> str:
    """
    Estimate processing time for given number of pages

    Args:
        num_pages: Number of pages to process

    Returns:
        Time estimate as string
    """
    # Rough estimates (will vary based on hardware)
    seconds_per_page = 10  # Conservative estimate

    total_seconds = num_pages * seconds_per_page

    if total_seconds < 60:
        return f"{total_seconds} seconds"
    elif total_seconds < 3600:
        minutes = total_seconds // 60
        return f"{minutes} minutes"
    else:
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours}h {minutes}m"


def get_file_size_mb(filepath: str | Path) -> float:
    """
    Get file size in megabytes

    Args:
        filepath: Path to file

    Returns:
        Size in MB
    """
    size_bytes = os.path.getsize(filepath)
    return size_bytes / (1024 * 1024)
