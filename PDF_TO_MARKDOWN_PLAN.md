# Core Space First Born: Multi-Modal PDF Extraction Plan

**Created**: 2025-10-05
**Target**: Pages 1-15 (trial run)
**Goal**: Extract complete content including text, images, diagrams, flowcharts, and tables

---

## Problem Statement

The Core Space First Born rulebook (~108 pages, 128MB) contains:
- Complex multi-column layouts
- Diagrams and flowcharts
- Icons and miniature photos
- Tables with intricate formatting
- Mixed text and visual elements

Single-method extraction (markitdown alone) misses critical content or produces poor formatting.

---

## Multi-Modal Strategy

### Overview: Triple Extraction + Vision Analysis

```
┌─────────────────────────────────────────────────────────┐
│                    FOR EACH PAGE                        │
└─────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌────▼────┐      ┌────▼────┐     ┌────▼────┐
    │ Method 1│      │ Method 2│     │ Method 3│
    │ PDF Text│      │   OCR   │     │  Vision │
    │ Extract │      │         │     │   LLM   │
    └────┬────┘      └────┬────┘     └────┬────┘
         │                │                │
         └────────────────┼────────────────┘
                          │
                     ┌────▼────┐
                     │  Merge  │
                     │ Engine  │
                     └────┬────┘
                          │
                   ┌──────▼──────┐
                   │ Comprehensive│
                   │   Markdown   │
                   └──────────────┘
```

---

## Method Breakdown

### Method 1: PDF Text Extraction
**Tools**: PyMuPDF (fitz) + pdfplumber
**Purpose**: Extract clean, selectable text from PDF
**Strengths**:
- Fastest method
- Preserves actual text (no OCR errors)
- Good for structured text content
- Can detect basic layout structure

**Weaknesses**:
- Misses embedded images
- Struggles with complex layouts
- No image descriptions
- Tables may be poorly formatted

**Installation**:
```bash
# In project venv
pip install PyMuPDF pdfplumber
```

### Method 2: OCR (Optical Character Recognition)
**Tools**: Tesseract via pytesseract + pdf2image
**Purpose**: Read text from PDF as images (catches everything)
**Strengths**:
- Catches text in images
- Works on scanned/image-based PDFs
- Can handle rotated or skewed text
- Layout analysis capabilities

**Weaknesses**:
- OCR errors (especially on low-quality scans)
- Slower than direct text extraction
- May struggle with special fonts
- No semantic understanding

**Installation**:
```bash
# System dependencies
brew install poppler  # For pdf2image

# In project venv
pip install pdf2image pytesseract Pillow
```

### Method 3: Vision LLM Analysis
**Tools**: Claude Code's built-in vision model
**Purpose**: Understand images, diagrams, icons, and layout
**Strengths**:
- Describes images and diagrams
- Understands flowcharts and their logic
- Identifies icons and their meanings
- Contextual understanding (e.g., "this is a combat flowchart")
- Table structure recognition

**Weaknesses**:
- May not capture exact text verbatim
- Token-intensive
- Slower for large documents

**Implementation**:
```bash
# Convert page to high-DPI image
# Use Read tool on image → Claude processes via vision
```

### Method 4 (Bonus): Specialized Table Extraction
**Tools**: camelot-py or tabula-py
**Purpose**: Extract tables with precise structure
**Strengths**:
- Preserves table structure
- Outputs to CSV/markdown tables
- Handles complex multi-cell layouts

**Weaknesses**:
- Only works on tables
- Requires clear table borders (or lattice structure)

**Installation** (if needed):
```bash
# In project venv
pip install "camelot-py[cv]"  # Includes OpenCV
# OR
pip install tabula-py
```

---

## Extraction Pipeline Design

### Stage 1: Page Isolation & Image Generation
```python
import fitz  # PyMuPDF

def extract_page_as_image(pdf_path, page_num, output_path, dpi=300):
    """
    Extract single page as high-quality PNG

    Args:
        pdf_path: Path to PDF
        page_num: Page number (0-indexed)
        output_path: Where to save PNG
        dpi: Resolution (300+ recommended for OCR)

    Returns:
        Path to generated image
    """
    doc = fitz.open(pdf_path)
    page = doc[page_num]

    # Render at high DPI
    mat = fitz.Matrix(dpi/72, dpi/72)  # 72 DPI is default
    pix = page.get_pixmap(matrix=mat)
    pix.save(output_path)

    return output_path
```

### Stage 2: Triple Extraction

#### 2A: PDF Text Extraction
```python
import fitz
import pdfplumber

def extract_text_pymupdf(pdf_path, page_num):
    """Extract text with layout preservation"""
    doc = fitz.open(pdf_path)
    page = doc[page_num]

    # Get text with layout
    text = page.get_text("text")  # Options: "text", "blocks", "dict"

    return text

def extract_text_pdfplumber(pdf_path, page_num):
    """Alternative extraction with table detection"""
    with pdfplumber.open(pdf_path) as pdf:
        page = pdf.pages[page_num]

        # Extract text
        text = page.extract_text()

        # Extract tables
        tables = page.extract_tables()

        return {"text": text, "tables": tables}
```

#### 2B: OCR Extraction
```python
import pytesseract
from PIL import Image

def extract_text_ocr(image_path, lang='eng'):
    """
    Run Tesseract OCR on page image

    Args:
        image_path: Path to page PNG
        lang: Language (default English)

    Returns:
        Dict with text and metadata
    """
    img = Image.open(image_path)

    # Get detailed data (includes bounding boxes, confidence)
    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

    # Get plain text
    text = pytesseract.image_to_string(img)

    # Get layout-preserved text (hOCR format)
    hocr = pytesseract.image_to_pdf_or_hocr(img, extension='hocr')

    return {
        "text": text,
        "data": data,
        "hocr": hocr
    }
```

#### 2C: Vision LLM Analysis
```python
# Use Claude Code's Read tool on the image
# Prompt vision model to:
# 1. Describe overall page layout
# 2. Identify and describe all images, icons, diagrams
# 3. Extract text content
# 4. Describe tables and flowcharts
# 5. Note any special formatting or highlighted elements

def analyze_with_vision(image_path):
    """
    Analyze page image with Claude vision

    This will be done via Claude Code's Read tool
    Prompt will request:
    - Layout description
    - Image/icon descriptions
    - Flowchart explanations
    - Table structure
    - Text extraction
    """
    # Implemented via Claude Code Read tool
    pass
```

### Stage 3: Intelligent Merging

```python
def merge_extractions(pdf_text, ocr_text, vision_analysis, tables):
    """
    Combine all extraction methods into comprehensive markdown

    Strategy:
    1. Use PDF text as base (cleanest, most accurate)
    2. Fill gaps with OCR text (catches text in images)
    3. Enhance with vision analysis (descriptions, context)
    4. Insert tables from specialized extraction
    5. Add image descriptions from vision
    6. Format as clean markdown

    Returns:
        Comprehensive markdown string
    """
    markdown = []

    # Header from vision (page overview)
    markdown.append(f"# Page {page_num + 1}\n")
    markdown.append(f"**Layout**: {vision_analysis['layout']}\n")

    # Main text (prefer PDF text, fallback to OCR)
    if pdf_text and len(pdf_text.strip()) > 50:
        markdown.append("## Content\n")
        markdown.append(pdf_text)
    else:
        markdown.append("## Content (OCR)\n")
        markdown.append(ocr_text)

    # Images and diagrams
    if vision_analysis['images']:
        markdown.append("\n## Images & Diagrams\n")
        for img in vision_analysis['images']:
            markdown.append(f"### {img['type']}: {img['title']}\n")
            markdown.append(f"{img['description']}\n")

    # Tables
    if tables:
        markdown.append("\n## Tables\n")
        for table in tables:
            markdown.append(format_table_as_markdown(table))

    # Flowcharts
    if vision_analysis['flowcharts']:
        markdown.append("\n## Flowcharts\n")
        for fc in vision_analysis['flowcharts']:
            markdown.append(f"### {fc['title']}\n")
            markdown.append(f"{fc['description']}\n")
            markdown.append(f"```\n{fc['text_representation']}\n```\n")

    return "\n".join(markdown)
```

---

## Implementation Plan

### Phase 1: Environment Setup ✅

**Check existing tools**:
- ✅ markitdown installed (via pipx)
- ✅ tesseract installed (via brew)
- ✅ Python 3.13.7 available
- ❌ poppler NOT installed (needed)

**Install required tools**:
```bash
# System dependencies
brew install poppler  # For pdf2image

# Create project venv
cd /Users/robgruhl/Projects/corespace
/opt/homebrew/opt/python@3.13/bin/python3 -m venv venv
source venv/bin/activate

# Python libraries (in venv)
pip install PyMuPDF pdfplumber pdf2image pytesseract Pillow
pip install "camelot-py[cv]"  # Optional, for advanced table extraction
```

### Phase 2: Build Extraction Scripts

**Files to create**:
1. `extract_page.py` - Core extraction logic
2. `merge_outputs.py` - Intelligent merging
3. `process_pages.py` - Main orchestrator
4. `utils.py` - Helper functions

### Phase 3: Trial Run (Pages 1-3)

**Validate**:
- Image quality (DPI sufficient for OCR?)
- Text extraction accuracy (PDF vs OCR comparison)
- Vision model effectiveness (good descriptions?)
- Merge quality (coherent output?)

**Refine**:
- Adjust DPI if needed
- Tune OCR parameters (PSM modes)
- Refine vision prompts
- Improve merge logic

### Phase 4: Process Pages 1-15

**Run full pipeline**:
```bash
python process_pages.py "Core Space First Born Rulebook.pdf" \
  --pages 1-15 \
  --output-dir enhanced-output \
  --dpi 300
```

**Output structure**:
```
enhanced-output/
├── pages/
│   ├── page-001.png
│   ├── page-001-pdf-text.txt
│   ├── page-001-ocr.txt
│   ├── page-001-vision.json
│   └── page-001.md  (merged)
├── combined/
│   └── pages-001-015.md  (all pages merged)
└── logs/
    └── extraction.log
```

### Phase 5: Review & Iterate

**Quality checks**:
- [ ] All text captured?
- [ ] Images described accurately?
- [ ] Tables formatted correctly?
- [ ] Flowcharts explained clearly?
- [ ] Markdown readable and well-structured?

**Iterate if needed**:
- Adjust extraction parameters
- Enhance merge logic
- Add missing descriptions
- Fix formatting issues

---

## Vision Analysis Prompts

### Page Analysis Prompt Template

```
You are analyzing page {page_num} of a game rulebook PDF.

Please provide a comprehensive analysis in JSON format:

{
  "page_number": {page_num},
  "layout": "Description of page layout (columns, sections, etc.)",
  "main_heading": "Main heading/title on page",
  "text_sections": [
    {
      "heading": "Section heading",
      "content": "Section content summary",
      "location": "top/middle/bottom/left/right"
    }
  ],
  "images": [
    {
      "type": "photo|diagram|icon|illustration",
      "title": "What the image shows",
      "description": "Detailed description of image content",
      "purpose": "Why this image is included (e.g., 'Shows miniature example')",
      "location": "Position on page"
    }
  ],
  "diagrams": [
    {
      "type": "flowchart|process|layout|map",
      "title": "Diagram title",
      "description": "What the diagram illustrates",
      "elements": ["List of key elements"],
      "flow": "Description of flow or relationship between elements"
    }
  ],
  "tables": [
    {
      "title": "Table title",
      "description": "What the table shows",
      "columns": ["Column headers"],
      "row_count": number,
      "key_data": "Summary of important data"
    }
  ],
  "icons": [
    {
      "symbol": "Description of icon",
      "meaning": "What it represents",
      "context": "Where/how it's used"
    }
  ],
  "special_formatting": [
    "Callout boxes",
    "Sidebars",
    "Highlighted text",
    "etc."
  ],
  "notes": "Any other important observations"
}

Focus on:
1. Complete text extraction
2. Detailed image descriptions (especially diagrams and flowcharts)
3. Icon identification and meaning
4. Table structure and content
5. Layout and formatting elements
```

---

## Success Criteria

### For Pages 1-15 Trial:

✅ **Text Accuracy**:
- All visible text extracted
- Minimal OCR errors
- Proper paragraph structure

✅ **Image Coverage**:
- All images identified
- Clear descriptions provided
- Icons explained with context

✅ **Diagrams & Flowcharts**:
- Structure explained
- Flow/logic described
- Actionable understanding (reader can follow without seeing image)

✅ **Tables**:
- Proper markdown table format
- All data preserved
- Headers and relationships clear

✅ **Usability**:
- Markdown is readable
- Searchable content
- Can be used as LLM context effectively

---

## Tools & Dependencies Summary

| Category | Tool | Purpose | Install Method |
|----------|------|---------|----------------|
| **System** | poppler | PDF rendering | `brew install poppler` |
| **System** | tesseract | OCR engine | ✅ Already installed |
| **Python** | PyMuPDF (fitz) | PDF text extraction | venv: `pip install PyMuPDF` |
| **Python** | pdfplumber | Table extraction | venv: `pip install pdfplumber` |
| **Python** | pdf2image | PDF → PNG | venv: `pip install pdf2image` |
| **Python** | pytesseract | Tesseract wrapper | venv: `pip install pytesseract` |
| **Python** | Pillow | Image handling | venv: `pip install Pillow` |
| **Python** | camelot-py | Advanced tables (opt) | venv: `pip install "camelot-py[cv]"` |
| **LLM** | Claude Vision | Image analysis | Built into Claude Code |

---

## Next Steps

1. ✅ Install poppler: `brew install poppler`
2. ✅ Create project venv with Python 3.13
3. ✅ Install Python dependencies
4. ⏳ Create extraction scripts
5. ⏳ Test on page 1
6. ⏳ Refine approach
7. ⏳ Process pages 1-15
8. ⏳ Review and document findings

---

## Alternative Approaches Considered

### Why not just use markitdown?
- Already tried, misses complex layouts and images
- No vision/OCR capabilities
- Limited table handling

### Why not just use OCR?
- OCR errors on clear text
- No semantic understanding
- Can't describe images/diagrams

### Why not just use vision LLM?
- Token-intensive (expensive for 108 pages)
- May miss exact text details
- Slower than automated extraction

### Why triple extraction?
- **PDF text**: Fast, accurate for clean text
- **OCR**: Safety net for embedded images/complex layouts
- **Vision**: Semantic understanding, descriptions, context
- **Combined**: Best of all worlds

---

**Status**: Plan complete, ready for implementation
**Estimated time**:
- Setup: 15 minutes
- Script development: 1-2 hours
- Pages 1-15 processing: 30-60 minutes
- Total: ~2-4 hours

**Next**: Begin Phase 1 (Environment Setup)
