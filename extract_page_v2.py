"""
Multi-modal PDF page extraction - Version 2
IMPROVED: Better handling of images-within-images and noise filtering
"""

import fitz  # PyMuPDF
import pdfplumber
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
from pathlib import Path
from typing import Dict, List, Any, Tuple
import json
import re

from utils import ensure_dir, save_json, clean_text


def detect_noise_text(text: str) -> bool:
    """
    Detect if text is likely noise from images-within-images

    Heuristics:
    - Very short lines with random capitals
    - Excessive punctuation/special chars
    - Fragmented words
    - Known patterns from embedded images

    Args:
        text: Text to check

    Returns:
        True if text appears to be noise
    """
    if not text or len(text.strip()) < 10:
        return True

    # Check for known noise patterns
    noise_patterns = [
        r'^[A-Z\s]{20,}$',  # All caps with excessive spaces
        r'[a-z]\s[a-z]\s[a-z]',  # Fragmented single letters
        r'(\w\s){10,}',  # Excessive spacing between chars
    ]

    for pattern in noise_patterns:
        if re.search(pattern, text):
            return True

    # Check character distribution
    if len(text) > 50:
        space_ratio = text.count(' ') / len(text)
        if space_ratio > 0.4:  # More than 40% spaces
            return True

    return False


def filter_extracted_text(text: str, known_image_markers: List[str] = None) -> str:
    """
    Filter out noise and text from embedded images

    Args:
        text: Raw extracted text
        known_image_markers: List of strings that indicate embedded image text

    Returns:
        Filtered text
    """
    if not text:
        return ""

    # Default markers for embedded images
    if known_image_markers is None:
        known_image_markers = [
            "LEARN TO PLAY",
            "READ THIS FIRST",
            "DRONE ACTIVITY",
            "PATROL",
            "INSPECTION",
            "WAKE PROTOCOLS",
            "THREAT DEFENCE",
        ]

    # Split into sections
    lines = text.split('\n')
    filtered_lines = []
    skip_mode = False

    for line in lines:
        line_stripped = line.strip()

        # Check if this line starts an embedded image section
        if any(marker in line_stripped for marker in known_image_markers):
            skip_mode = True
            continue

        # Check if we're back to normal content (paragraph-like text)
        if skip_mode and len(line_stripped) > 60 and line_stripped[0].isupper():
            skip_mode = False

        # Skip noisy lines
        if detect_noise_text(line):
            continue

        if not skip_mode:
            filtered_lines.append(line)

    return '\n'.join(filtered_lines)


def compare_extraction_quality(pymupdf_text: str, ocr_text: str) -> Dict[str, Any]:
    """
    Compare quality of different extraction methods

    Args:
        pymupdf_text: Text from PyMuPDF
        ocr_text: Text from OCR

    Returns:
        Quality metrics
    """
    pymupdf_clean = clean_text(pymupdf_text)
    ocr_clean = clean_text(ocr_text)

    # Calculate basic metrics
    pymupdf_len = len(pymupdf_clean)
    ocr_len = len(ocr_clean)

    # Check for noise indicators
    pymupdf_noise_score = 0
    ocr_noise_score = 0

    # Excessive length suggests embedded images
    if pymupdf_len > ocr_len * 1.5:
        pymupdf_noise_score += 2

    # Check for fragmentation
    pymupdf_words = pymupdf_clean.split()
    ocr_words = ocr_clean.split()

    pymupdf_avg_word_len = sum(len(w) for w in pymupdf_words) / len(pymupdf_words) if pymupdf_words else 0
    ocr_avg_word_len = sum(len(w) for w in ocr_words) / len(ocr_words) if ocr_words else 0

    # Very short average word length suggests fragmentation
    if pymupdf_avg_word_len < 3:
        pymupdf_noise_score += 1
    if ocr_avg_word_len < 3:
        ocr_noise_score += 1

    return {
        "pymupdf_length": pymupdf_len,
        "ocr_length": ocr_len,
        "pymupdf_noise_score": pymupdf_noise_score,
        "ocr_noise_score": ocr_noise_score,
        "recommended": "ocr" if ocr_noise_score < pymupdf_noise_score else "pymupdf"
    }


class PageExtractorV2:
    """Enhanced PDF page extractor with noise filtering"""

    def __init__(self, pdf_path: str, dpi: int = 300):
        """
        Initialize extractor

        Args:
            pdf_path: Path to PDF file
            dpi: Resolution for image rendering (default 300)
        """
        self.pdf_path = Path(pdf_path)
        self.dpi = dpi

        if not self.pdf_path.exists():
            raise FileNotFoundError(f"PDF not found: {self.pdf_path}")

    def extract_page_as_image(self, page_num: int, output_path: str | Path) -> Path:
        """Extract single page as high-quality PNG"""
        output_path = Path(output_path)
        ensure_dir(output_path.parent)

        images = convert_from_path(
            self.pdf_path,
            dpi=self.dpi,
            first_page=page_num + 1,
            last_page=page_num + 1
        )

        if images:
            images[0].save(output_path, 'PNG')
            return output_path
        else:
            raise RuntimeError(f"Failed to convert page {page_num} to image")

    def extract_text_pymupdf(self, page_num: int) -> Dict[str, Any]:
        """Extract text using PyMuPDF with noise filtering"""
        doc = fitz.open(self.pdf_path)
        page = doc[page_num]

        text_simple = page.get_text("text")
        doc.close()

        # Filter noise
        text_filtered = filter_extracted_text(text_simple)

        return {
            "method": "pymupdf",
            "text": clean_text(text_filtered),
            "text_raw": text_simple,  # Keep raw for debugging
            "has_text": bool(text_filtered.strip()),
            "char_count": len(text_filtered),
            "raw_char_count": len(text_simple),
            "filtered": len(text_simple) != len(text_filtered)
        }

    def extract_text_pdfplumber(self, page_num: int) -> Dict[str, Any]:
        """Extract text and tables using pdfplumber"""
        with pdfplumber.open(self.pdf_path) as pdf:
            page = pdf.pages[page_num]

            text = page.extract_text() or ""
            tables = page.extract_tables()

            # Filter noise from main text
            text_filtered = filter_extracted_text(text)

            # Filter tables (remove those that are mostly noise)
            clean_tables = []
            if tables:
                for table in tables:
                    # Check if table has meaningful content
                    total_cells = sum(len(row) for row in table)
                    empty_cells = sum(1 for row in table for cell in row if not cell or len(str(cell).strip()) < 2)

                    # Keep table if more than 30% of cells have content
                    if empty_cells / total_cells < 0.7:
                        clean_tables.append(table)

            width = page.width
            height = page.height

            return {
                "method": "pdfplumber",
                "text": clean_text(text_filtered),
                "text_raw": text,
                "tables": clean_tables,
                "dimensions": {"width": width, "height": height},
                "has_text": bool(text_filtered.strip()),
                "table_count": len(clean_tables),
                "filtered": len(text) != len(text_filtered)
            }

    def extract_text_ocr(self, image_path: str | Path) -> Dict[str, Any]:
        """Run Tesseract OCR on page image"""
        img = Image.open(image_path)

        text = pytesseract.image_to_string(img)
        data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

        confidences = [c for c in data['conf'] if c != -1]
        avg_confidence = sum(confidences) / len(confidences) if confidences else 0

        # Filter OCR noise
        text_filtered = filter_extracted_text(text)

        return {
            "method": "tesseract_ocr",
            "text": clean_text(text_filtered),
            "text_raw": text,
            "avg_confidence": avg_confidence,
            "has_text": bool(text_filtered.strip()),
            "word_count": len([w for w in data['text'] if w.strip()]),
            "filtered": len(text) != len(text_filtered)
        }

    def extract_page_all_methods(
        self,
        page_num: int,
        output_dir: str | Path
    ) -> Dict[str, Any]:
        """
        Extract page content using all methods with quality comparison
        """
        output_dir = ensure_dir(output_dir)

        print(f"Processing page {page_num + 1}...")

        # Extract as image
        print(f"  - Rendering page as image (DPI: {self.dpi})...")
        image_path = output_dir / f"page-{page_num + 1:03d}.png"
        self.extract_page_as_image(page_num, image_path)

        # Extract via different methods
        print(f"  - Extracting text (PyMuPDF with filtering)...")
        pymupdf_result = self.extract_text_pymupdf(page_num)

        print(f"  - Extracting text and tables (pdfplumber with filtering)...")
        pdfplumber_result = self.extract_text_pdfplumber(page_num)

        print(f"  - Running OCR (Tesseract with filtering)...")
        ocr_result = self.extract_text_ocr(image_path)

        # Compare quality
        quality = compare_extraction_quality(
            pymupdf_result['text'],
            ocr_result['text']
        )

        # Show filtering results
        if pymupdf_result['filtered'] or pdfplumber_result['filtered'] or ocr_result['filtered']:
            print(f"  ⚠️  Noise detected and filtered:")
            if pymupdf_result['filtered']:
                removed = pymupdf_result['raw_char_count'] - pymupdf_result['char_count']
                print(f"     PyMuPDF: Removed {removed} chars")
            if pdfplumber_result['filtered']:
                removed = len(pdfplumber_result['text_raw']) - len(pdfplumber_result['text'])
                print(f"     pdfplumber: Removed {removed} chars")
            if ocr_result['filtered']:
                removed = len(ocr_result['text_raw']) - len(ocr_result['text'])
                print(f"     OCR: Removed {removed} chars")

        print(f"  ✓ Recommended extraction method: {quality['recommended'].upper()}")

        results = {
            "page_number": page_num + 1,
            "page_index": page_num,
            "image_path": str(image_path),
            "extractions": {
                "pymupdf": pymupdf_result,
                "pdfplumber": pdfplumber_result,
                "ocr": ocr_result
            },
            "quality_analysis": quality,
            "vision_ready": True
        }

        # Save results
        results_path = output_dir / f"page-{page_num + 1:03d}-extraction.json"
        save_json(results, results_path)

        print(f"  ✓ Page {page_num + 1} extraction complete")

        return results


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
        page_num = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    else:
        pdf_path = "Core Space First Born Rulebook.pdf"
        page_num = 1  # Test on page 2 (0-indexed = 1)

    print(f"Testing V2 extraction on: {pdf_path}, page {page_num + 1}")
    print("-" * 60)

    extractor = PageExtractorV2(pdf_path)
    result = extractor.extract_page_all_methods(page_num, "test-v2-output/pages")

    print("\n" + "=" * 60)
    print("EXTRACTION SUMMARY")
    print("=" * 60)
    print(f"Recommended method: {result['quality_analysis']['recommended']}")
    print(f"PyMuPDF filtered: {result['extractions']['pymupdf']['filtered']}")
    print(f"OCR filtered: {result['extractions']['ocr']['filtered']}")
