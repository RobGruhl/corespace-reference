#!/usr/bin/env python3
"""
Helper script to track vision analysis progress
This script doesn't run vision analysis automatically (requires Claude Code Read tool)
but helps organize and track which pages need vision analysis
"""

import json
from pathlib import Path
import argparse


def check_vision_status(pages_dir: str = "enhanced-output/pages") -> dict:
    """
    Check which pages have vision analysis completed

    Args:
        pages_dir: Directory containing page extractions

    Returns:
        Dict with status info
    """
    pages_dir = Path(pages_dir)

    # Find all extraction files
    extraction_files = sorted(pages_dir.glob("page-*-extraction.json"))
    vision_files = sorted(pages_dir.glob("page-*-vision.json"))

    extraction_pages = set(
        int(f.stem.split('-')[1])
        for f in extraction_files
    )

    vision_pages = set(
        int(f.stem.split('-')[1])
        for f in vision_files
    )

    pending_pages = sorted(extraction_pages - vision_pages)
    completed_pages = sorted(vision_pages)

    return {
        "total_pages": len(extraction_pages),
        "completed": len(completed_pages),
        "pending": len(pending_pages),
        "completed_pages": completed_pages,
        "pending_pages": pending_pages
    }


def show_next_page_info(pages_dir: str = "enhanced-output/pages"):
    """Show info for next page needing vision analysis"""
    status = check_vision_status(pages_dir)

    if not status['pending_pages']:
        print("✅ All pages have vision analysis completed!")
        print(f"Total: {status['completed']} pages")
        return None

    next_page = status['pending_pages'][0]
    pages_dir = Path(pages_dir)

    print(f"📋 Vision Analysis Progress: {status['completed']}/{status['total_pages']} pages")
    print(f"✅ Completed: {status['completed_pages']}")
    print(f"⏳ Pending: {status['pending_pages']}")
    print()
    print(f"🎯 Next page to analyze: Page {next_page}")
    print()
    print("To analyze this page with Claude Code:")
    print(f"1. Read the image: {pages_dir}/page-{next_page:03d}.png")
    print(f"2. Use the prompt from: enhanced-output/vision-prompts/page-{next_page:03d}-prompt.txt")
    print(f"3. Save the JSON response to: {pages_dir}/page-{next_page:03d}-vision.json")
    print()

    return next_page


def create_vision_template(page_num: int, pages_dir: str = "enhanced-output/pages"):
    """
    Create a template vision JSON file

    Args:
        page_num: Page number
        pages_dir: Pages directory
    """
    template = {
        "page_number": page_num,
        "layout": "",
        "main_heading": "",
        "text_sections": [],
        "images": [],
        "diagrams_flowcharts": [],
        "tables": [],
        "icons_symbols": [],
        "special_formatting": [],
        "game_mechanics": [],
        "notes": ""
    }

    output_path = Path(pages_dir) / f"page-{page_num:03d}-vision.json"

    with open(output_path, 'w') as f:
        json.dump(template, f, indent=2)

    print(f"✓ Created template: {output_path}")
    print("Fill in this file with vision analysis results")


def main():
    parser = argparse.ArgumentParser(
        description="Track vision analysis progress"
    )
    parser.add_argument(
        "--pages-dir",
        default="enhanced-output/pages",
        help="Pages directory"
    )
    parser.add_argument(
        "--status",
        action="store_true",
        help="Show status only"
    )
    parser.add_argument(
        "--next",
        action="store_true",
        help="Show next page to analyze"
    )
    parser.add_argument(
        "--template",
        type=int,
        help="Create vision template for specific page"
    )

    args = parser.parse_args()

    if args.template:
        create_vision_template(args.template, args.pages_dir)
    elif args.status:
        status = check_vision_status(args.pages_dir)
        print(f"Total pages: {status['total_pages']}")
        print(f"Completed: {status['completed']}")
        print(f"Pending: {status['pending']}")
    else:
        show_next_page_info(args.pages_dir)


if __name__ == "__main__":
    main()
