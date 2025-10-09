#!/usr/bin/env python3
"""
Multi-modal PDF extraction pipeline
Processes pages and prepares for vision analysis
"""

import argparse
import sys
from pathlib import Path
from typing import List, Dict, Any
import fitz  # PyMuPDF

from extract_page import PageExtractor, extract_multiple_pages
from utils import (
    ensure_dir,
    parse_page_range,
    estimate_processing_time,
    get_file_size_mb,
    save_json
)


def get_pdf_info(pdf_path: str | Path) -> Dict[str, Any]:
    """
    Get PDF metadata

    Args:
        pdf_path: Path to PDF

    Returns:
        Dict with PDF info
    """
    doc = fitz.open(pdf_path)

    info = {
        "filename": Path(pdf_path).name,
        "path": str(pdf_path),
        "size_mb": get_file_size_mb(pdf_path),
        "page_count": len(doc),
        "metadata": doc.metadata
    }

    doc.close()

    return info


def create_vision_prompt(page_num: int) -> str:
    """
    Create prompt for Claude vision analysis

    Args:
        page_num: Page number (1-indexed)

    Returns:
        Vision analysis prompt
    """
    return f"""You are analyzing page {page_num} of the Core Space First Born game rulebook PDF.

Please provide a comprehensive analysis in JSON format with the following structure:

{{
  "page_number": {page_num},
  "layout": "Brief description of page layout (columns, sections, etc.)",
  "main_heading": "Main heading/title on page (if any)",

  "text_sections": [
    {{
      "heading": "Section heading",
      "content_summary": "Brief summary of section content",
      "location": "top|middle|bottom|left|right|full-width"
    }}
  ],

  "images": [
    {{
      "type": "photo|diagram|icon|illustration|miniature",
      "title": "What the image shows",
      "description": "Detailed description of image content",
      "purpose": "Why this image is included (context/teaching purpose)",
      "location": "Position on page"
    }}
  ],

  "diagrams_flowcharts": [
    {{
      "type": "flowchart|process|layout|map|sequence",
      "title": "Diagram title",
      "description": "What the diagram illustrates",
      "elements": ["List", "of", "key", "elements"],
      "flow_description": "Description of flow or relationship between elements",
      "actionable_steps": "Step-by-step explanation if applicable"
    }}
  ],

  "tables": [
    {{
      "title": "Table title",
      "description": "What the table shows",
      "columns": ["Column", "headers"],
      "key_data": "Summary of important data or patterns"
    }}
  ],

  "icons_symbols": [
    {{
      "symbol": "Description of icon/symbol",
      "meaning": "What it represents in the game",
      "context": "Where/how it's used"
    }}
  ],

  "special_formatting": [
    "Callout boxes",
    "Sidebars",
    "Highlighted text",
    "Color-coded sections",
    "etc."
  ],

  "game_mechanics": [
    "Any specific game rules or mechanics explained on this page"
  ],

  "notes": "Any other important observations about this page"
}}

Focus on:
1. **Complete text extraction** - Capture all readable text
2. **Detailed image descriptions** - Especially for diagrams, flowcharts, and game components
3. **Icon identification** - Explain what each icon/symbol means
4. **Table structure** - Preserve table content and relationships
5. **Layout elements** - Note callouts, sidebars, special formatting
6. **Game context** - Explain how visual elements relate to gameplay

Be thorough and precise. This will be merged with OCR and PDF text extraction."""


def process_pdf_pages(
    pdf_path: str,
    pages: str | List[int],
    output_dir: str = "enhanced-output",
    dpi: int = 300
) -> Dict[str, Any]:
    """
    Process PDF pages with multi-modal extraction

    Args:
        pdf_path: Path to PDF file
        pages: Page specification (e.g., "1-15") or list of page numbers
        output_dir: Output directory
        dpi: Image resolution

    Returns:
        Processing summary
    """
    pdf_path = Path(pdf_path)

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    # Parse page specification
    if isinstance(pages, str):
        page_numbers = parse_page_range(pages)
    else:
        page_numbers = pages

    # Get PDF info
    pdf_info = get_pdf_info(pdf_path)

    # Validate page numbers
    max_page = pdf_info['page_count'] - 1
    invalid_pages = [p for p in page_numbers if p < 0 or p > max_page]
    if invalid_pages:
        raise ValueError(f"Invalid page numbers: {invalid_pages}")

    # Setup output directories
    output_dir = ensure_dir(output_dir)
    pages_dir = ensure_dir(output_dir / "pages")
    vision_dir = ensure_dir(output_dir / "vision-prompts")

    # Print summary
    print("=" * 70)
    print("PDF TO MARKDOWN: Multi-Modal Extraction Pipeline")
    print("=" * 70)
    print(f"PDF: {pdf_info['filename']}")
    print(f"Size: {pdf_info['size_mb']:.1f} MB")
    print(f"Total pages: {pdf_info['page_count']}")
    print(f"Processing pages: {min(page_numbers) + 1}-{max(page_numbers) + 1} ({len(page_numbers)} pages)")
    print(f"DPI: {dpi}")
    print(f"Output: {output_dir}")
    print(f"Estimated time: {estimate_processing_time(len(page_numbers))}")
    print("=" * 70)
    print()

    # Extract pages
    print("PHASE 1: Multi-method extraction (PDF text + OCR)")
    print("-" * 70)

    results = extract_multiple_pages(
        pdf_path=str(pdf_path),
        page_numbers=page_numbers,
        output_dir=str(pages_dir),
        dpi=dpi
    )

    print()
    print("-" * 70)
    print(f"✓ Phase 1 complete: {len(results)} pages processed")
    print()

    # Generate vision prompts
    print("PHASE 2: Preparing vision analysis prompts")
    print("-" * 70)

    vision_prompts = {}

    for result in results:
        page_num = result['page_number']
        prompt = create_vision_prompt(page_num)

        prompt_path = vision_dir / f"page-{page_num:03d}-prompt.txt"
        with open(prompt_path, 'w') as f:
            f.write(prompt)

        vision_prompts[page_num] = {
            "prompt_path": str(prompt_path),
            "image_path": result['image_path']
        }

        print(f"  ✓ Page {page_num} prompt ready: {prompt_path}")

    print()
    print("-" * 70)
    print(f"✓ Phase 2 complete: {len(vision_prompts)} vision prompts generated")
    print()

    # Create processing summary
    summary = {
        "pdf_info": pdf_info,
        "pages_processed": len(results),
        "page_numbers": [r['page_number'] for r in results],
        "output_directory": str(output_dir),
        "dpi": dpi,
        "results": results,
        "vision_prompts": vision_prompts,
        "next_steps": [
            "1. Use Claude Code Read tool on each page image",
            "2. Provide the vision prompt for each page",
            "3. Save vision analysis as JSON",
            "4. Run merge script to combine all extractions"
        ]
    }

    summary_path = output_dir / "processing-summary.json"
    save_json(summary, summary_path)

    # Print next steps
    print("=" * 70)
    print("PROCESSING COMPLETE")
    print("=" * 70)
    print(f"Summary: {summary_path}")
    print()
    print("NEXT STEPS:")
    print("-" * 70)
    print("Phase 3: Vision Analysis (requires Claude Code)")
    print()
    print("For each page, use Claude Code's Read tool:")
    print()

    # Show example for first page
    first_result = results[0]
    first_page_num = first_result['page_number']
    print(f"Example for page {first_page_num}:")
    print(f"  1. Read the image: {first_result['image_path']}")
    print(f"  2. Use the prompt: {vision_prompts[first_page_num]['prompt_path']}")
    print(f"  3. Save output as: {pages_dir}/page-{first_page_num:03d}-vision.json")
    print()
    print("After vision analysis is complete for all pages:")
    print("  Run: python merge_outputs.py")
    print()
    print("=" * 70)

    return summary


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description="Multi-modal PDF to Markdown extraction pipeline"
    )
    parser.add_argument(
        "pdf",
        help="Path to PDF file"
    )
    parser.add_argument(
        "--pages",
        default="1-15",
        help="Pages to process (e.g., '1-15', '1,3,5', '1-3,7-9')"
    )
    parser.add_argument(
        "--output-dir",
        default="enhanced-output",
        help="Output directory (default: enhanced-output)"
    )
    parser.add_argument(
        "--dpi",
        type=int,
        default=300,
        help="Image DPI (default: 300)"
    )

    args = parser.parse_args()

    try:
        summary = process_pdf_pages(
            pdf_path=args.pdf,
            pages=args.pages,
            output_dir=args.output_dir,
            dpi=args.dpi
        )

        return 0

    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
