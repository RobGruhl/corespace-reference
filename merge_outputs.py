#!/usr/bin/env python3
"""
Merge multi-modal extraction outputs into comprehensive markdown
Combines PDF text extraction, OCR, and vision analysis
"""

import json
import argparse
from pathlib import Path
from typing import Dict, List, Any

from utils import load_json, ensure_dir, format_table_as_markdown


class OutputMerger:
    """Merge extraction outputs into comprehensive markdown"""

    def __init__(self, pages_dir: str | Path):
        """
        Initialize merger

        Args:
            pages_dir: Directory containing extraction outputs
        """
        self.pages_dir = Path(pages_dir)

        if not self.pages_dir.exists():
            raise FileNotFoundError(f"Pages directory not found: {self.pages_dir}")

    def load_page_data(self, page_num: int) -> Dict[str, Any]:
        """
        Load all extraction data for a page

        Args:
            page_num: Page number (1-indexed)

        Returns:
            Dict with all extraction data
        """
        # Load extraction results (PDF + OCR)
        extraction_path = self.pages_dir / f"page-{page_num:03d}-extraction.json"

        if not extraction_path.exists():
            raise FileNotFoundError(f"Extraction file not found: {extraction_path}")

        extraction = load_json(extraction_path)

        # Load vision analysis (if available)
        vision_path = self.pages_dir / f"page-{page_num:03d}-vision.json"
        vision = None

        if vision_path.exists():
            vision = load_json(vision_path)

        return {
            "page_num": page_num,
            "extraction": extraction,
            "vision": vision
        }

    def select_best_text(self, extraction: Dict) -> str:
        """
        Select the best text extraction from available methods

        Strategy:
        1. Prefer PDF text extraction (cleanest)
        2. Fall back to OCR if PDF extraction is poor/empty

        Args:
            extraction: Extraction results

        Returns:
            Best text content
        """
        pymupdf_text = extraction['extractions']['pymupdf']['text']
        ocr_text = extraction['extractions']['ocr']['text']

        # If PDF has substantial text, use it
        if pymupdf_text and len(pymupdf_text.strip()) > 100:
            return pymupdf_text

        # Otherwise use OCR
        return ocr_text

    def format_vision_images(self, vision: Dict) -> str:
        """
        Format image descriptions from vision analysis

        Args:
            vision: Vision analysis data

        Returns:
            Markdown formatted image descriptions
        """
        if not vision or not vision.get('images'):
            return ""

        lines = ["## Images & Visual Elements\n"]

        for img in vision['images']:
            lines.append(f"### {img['type'].title()}: {img['title']}\n")
            lines.append(f"**Description**: {img['description']}\n")
            lines.append(f"**Purpose**: {img['purpose']}\n")
            lines.append(f"**Location**: {img['location']}\n")

        return "\n".join(lines)

    def format_vision_icons(self, vision: Dict) -> str:
        """
        Format icon/symbol descriptions from vision analysis

        Args:
            vision: Vision analysis data

        Returns:
            Markdown formatted icon descriptions
        """
        if not vision or not vision.get('icons_symbols'):
            return ""

        lines = ["## Icons & Symbols\n"]

        for icon in vision['icons_symbols']:
            lines.append(f"**{icon.get('symbol', 'Symbol')}**")

            if 'meaning' in icon:
                lines.append(f"- Meaning: {icon['meaning']}")

            if 'context' in icon:
                lines.append(f"- Context: {icon['context']}")

            if 'description' in icon:
                lines.append(f"- Description: {icon['description']}")

            lines.append("")

        return "\n".join(lines)

    def format_vision_diagrams(self, vision: Dict) -> str:
        """
        Format diagram/flowchart descriptions from vision analysis

        Args:
            vision: Vision analysis data

        Returns:
            Markdown formatted diagram descriptions
        """
        if not vision or not vision.get('diagrams_flowcharts'):
            return ""

        lines = ["## Diagrams & Flowcharts\n"]

        for diagram in vision['diagrams_flowcharts']:
            lines.append(f"### {diagram['title']}\n")
            lines.append(f"**Type**: {diagram['type']}\n")
            lines.append(f"**Description**: {diagram['description']}\n")

            if diagram.get('elements'):
                lines.append(f"**Elements**: {', '.join(diagram['elements'])}\n")

            if diagram.get('flow_description'):
                lines.append(f"**Flow**: {diagram['flow_description']}\n")

            if diagram.get('actionable_steps'):
                lines.append(f"**Steps**:\n{diagram['actionable_steps']}\n")

        return "\n".join(lines)

    def format_tables(self, extraction: Dict, vision: Dict = None) -> str:
        """
        Format tables from pdfplumber extraction

        Args:
            extraction: Extraction results
            vision: Vision analysis data (optional)

        Returns:
            Markdown formatted tables
        """
        tables = extraction['extractions']['pdfplumber'].get('tables', [])

        if not tables:
            return ""

        lines = ["## Tables\n"]

        for i, table in enumerate(tables, 1):
            # Add vision context if available
            if vision and vision.get('tables') and i <= len(vision['tables']):
                vision_table = vision['tables'][i - 1]
                lines.append(f"### {vision_table.get('title', f'Table {i}')}\n")
                if vision_table.get('description'):
                    lines.append(f"*{vision_table['description']}*\n")

            # Format table as markdown
            table_md = format_table_as_markdown(table)
            lines.append(table_md)
            lines.append("")

        return "\n".join(lines)

    def merge_page(self, page_num: int) -> str:
        """
        Merge all extraction methods for a single page

        Args:
            page_num: Page number (1-indexed)

        Returns:
            Comprehensive markdown for the page
        """
        data = self.load_page_data(page_num)
        extraction = data['extraction']
        vision = data['vision']

        lines = []

        # Page header
        lines.append(f"# Page {page_num}\n")

        # Add layout info from vision if available
        if vision and vision.get('layout'):
            lines.append(f"**Layout**: {vision['layout']}\n")

        if vision and vision.get('main_heading'):
            lines.append(f"**Main Heading**: {vision['main_heading']}\n")

        lines.append("---\n")

        # Main content text
        lines.append("## Content\n")

        # Select best text
        text = self.select_best_text(extraction)
        lines.append(text)
        lines.append("")

        # Add vision-enhanced sections
        if vision:
            # Images
            images_section = self.format_vision_images(vision)
            if images_section:
                lines.append(images_section)

            # Icons
            icons_section = self.format_vision_icons(vision)
            if icons_section:
                lines.append(icons_section)

            # Diagrams
            diagrams_section = self.format_vision_diagrams(vision)
            if diagrams_section:
                lines.append(diagrams_section)

            # Game mechanics
            if vision.get('game_mechanics'):
                lines.append("## Game Mechanics\n")
                for mechanic in vision['game_mechanics']:
                    lines.append(f"- {mechanic}")
                lines.append("")

            # Special formatting notes
            if vision.get('special_formatting'):
                lines.append("## Special Formatting\n")
                for item in vision['special_formatting']:
                    lines.append(f"- {item}")
                lines.append("")

            # Additional notes
            if vision.get('notes'):
                lines.append("## Notes\n")
                lines.append(vision['notes'])
                lines.append("")

        # Tables
        tables_section = self.format_tables(extraction, vision)
        if tables_section:
            lines.append(tables_section)

        return "\n".join(lines)

    def merge_multiple_pages(
        self,
        page_numbers: List[int],
        output_file: str | Path = None,
        save_individual: bool = True
    ) -> str:
        """
        Merge multiple pages into a single markdown document

        Args:
            page_numbers: List of page numbers (1-indexed)
            output_file: Optional path to save combined output
            save_individual: If True, save each page as individual markdown file

        Returns:
            Combined markdown
        """
        all_pages = []
        individual_dir = None

        # Setup individual files directory if needed
        if save_individual and output_file:
            output_path = Path(output_file)
            individual_dir = output_path.parent / "individual-pages"
            ensure_dir(individual_dir)

        for page_num in page_numbers:
            print(f"Merging page {page_num}...")
            try:
                page_md = self.merge_page(page_num)
                all_pages.append(page_md)

                # Save individual page markdown
                if save_individual and individual_dir:
                    individual_file = individual_dir / f"page-{page_num:03d}.md"
                    with open(individual_file, 'w', encoding='utf-8') as f:
                        f.write(page_md)
                    print(f"  ✓ Saved individual: {individual_file}")

            except Exception as e:
                print(f"  Warning: Failed to merge page {page_num}: {e}")

        # Combine all pages
        combined = "\n\n".join(all_pages)

        # Add document header
        header = f"""# Core Space First Born Rulebook
# Enhanced Extraction: Pages {min(page_numbers)}-{max(page_numbers)}

**Extraction Method**: Multi-modal (PDF text + OCR + Vision LLM)
**Pages**: {len(all_pages)} of {len(page_numbers)} requested

---

"""

        final_output = header + combined

        # Save if output file specified
        if output_file:
            output_file = Path(output_file)
            ensure_dir(output_file.parent)

            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(final_output)

            print(f"\n✓ Saved combined file: {output_file}")

            if save_individual and individual_dir:
                print(f"✓ Saved {len(all_pages)} individual pages: {individual_dir}/")

        return final_output


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description="Merge multi-modal PDF extraction outputs into markdown"
    )
    parser.add_argument(
        "--pages-dir",
        default="enhanced-output/pages",
        help="Directory containing extraction files"
    )
    parser.add_argument(
        "--output",
        default="enhanced-output/combined/merged.md",
        help="Output markdown file"
    )
    parser.add_argument(
        "--pages",
        help="Specific pages to merge (e.g., '1-15', '1,3,5'). If not specified, merges all available pages."
    )

    args = parser.parse_args()

    merger = OutputMerger(args.pages_dir)

    # Determine which pages to merge
    if args.pages:
        from utils import parse_page_range
        page_numbers = [p + 1 for p in parse_page_range(args.pages)]  # Convert to 1-indexed
    else:
        # Find all extraction files
        extraction_files = sorted(merger.pages_dir.glob("page-*-extraction.json"))
        page_numbers = [
            int(f.stem.split('-')[1])
            for f in extraction_files
        ]

    if not page_numbers:
        print("No pages found to merge!")
        return 1

    print("=" * 70)
    print("MERGE MULTI-MODAL EXTRACTIONS")
    print("=" * 70)
    print(f"Pages directory: {args.pages_dir}")
    print(f"Pages to merge: {page_numbers}")
    print(f"Output file: {args.output}")
    print("=" * 70)
    print()

    # Merge pages
    merger.merge_multiple_pages(page_numbers, args.output)

    print()
    print("=" * 70)
    print("MERGE COMPLETE")
    print("=" * 70)

    return 0


if __name__ == "__main__":
    import sys
    sys.exit(main())
