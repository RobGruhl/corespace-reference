# Recommended Workflow: Hybrid Multi-Modal Extraction

**Problem Identified**: Automated extraction alone can't perfectly handle:
- Images-within-images (photos of other books/components)
- Complex layouts with mixed content
- Distinguishing actual page text from visible text in photographs

**Solution**: 3-Layer Hybrid Approach

---

## Layer 1: Automated Extraction (With Filtering)

**Tool**: `extract_page_v2.py`

```bash
python extract_page_v2.py "Core Space First Born Rulebook.pdf" <page_num>
```

**What it does**:
- Extracts text via PDF, pdfplumber, and OCR
- Automatically filters obvious noise (embedded image text)
- Compares quality of different methods
- **Saves raw AND filtered versions** for review

**Output**:
- `page-XXX-extraction.json` - All extraction methods + quality analysis
- `page-XXX.png` - High-res image for vision analysis

---

## Layer 2: Vision Review & Cleanup (Claude)

**For each page, I will**:

1. **View the page image**
2. **Review all extraction attempts**:
   - PyMuPDF (filtered)
   - pdfplumber (filtered)
   - OCR (filtered)
   - OCR (raw) as backup

3. **Identify content types visually**:
   - Actual page text
   - Photos of components (ignore text within photos)
   - Diagrams/flowcharts (describe, don't OCR)
   - Tables (extract structure)

4. **Construct clean text** by:
   - Selecting best extraction for each section
   - Manually filling gaps if all methods failed
   - Marking photos/components for description only

5. **Create vision JSON** with:
   - Clean curated text
   - Image/diagram descriptions
   - Icon meanings
   - Layout notes

---

## Layer 3: Intelligent Merge

**Tool**: `merge_outputs.py`

Combines:
- **Curated text** from vision review (highest priority)
- **Filtered automated extractions** as fallback
- **Vision descriptions** for non-text elements

**Output**: Comprehensive markdown with complete, accurate content

---

## Example: Page 2 Workflow

### Step 1: Automated Extraction ✅
```bash
python extract_page_v2.py "Core Space First Born Rulebook.pdf" 1
```

**Result**:
- ✅ Filtered out 2,501 chars of "LEARN TO PLAY" booklet text
- ✅ Removed garbled tables
- ⚠️ Some text still missing/incomplete

### Step 2: Vision Review (Manual)

**What I see in the image**:
1. Red "IMPORTANT!" callout box with **photo** of Learn to Play booklet
2. Main body text in two columns (actual page content)
3. Bottom: Photos of dashboards and dice (components)
4. Right edge: Decorative artwork

**Text sources**:
- **IMPORTANT box**: Real page text ("If this is your first adventure...")
- **Learn to Play booklet photo**: NOT page text (ignore)
- **Main columns**: Real page text (extract)
- **Component photos**: NOT text (describe visually)

**Curated extraction**:
```json
{
  "text_sections": [
    {
      "section": "IMPORTANT callout",
      "text": "If this is your first adventure in the Core Space universe, we recommend you start out by reading the accompanying Learn to Play booklet. This will take you through the components and basic mechanics step-by-step, ready to hit the ground running with the full Core Space experience.",
      "note": "Contains photo of Learn to Play booklet - text on booklet NOT extracted"
    },
    {
      "section": "Main body - left column",
      "text": "GAME OVERVIEW\n\nCore Space is a science fiction miniatures board game set in the frontier worlds on the fringes of known space, 1500 years in the future. In First Born, your crew venture into an asteroid field on the fringes of known space, but the ancient temples they find are not as abandoned as they seem...\n\n[continues with clean text]"
    }
  ],
  "images": [
    {
      "type": "photo",
      "title": "Learn to Play booklet",
      "description": "Photo showing the Learn to Play booklet cover",
      "text_visible_in_photo": "NOT EXTRACTED - this is visible IN a photo, not page content"
    }
  ]
}
```

### Step 3: Merge
Combines curated text + vision descriptions → Clean comprehensive markdown

---

## Implementation Plan

### For Pages 1-15

**I will**:
1. Run automated extraction with filtering (already done for pages 1-15)
2. Manually review each page image
3. Create **curated vision JSON** files with:
   - Clean text (best from all methods OR manually typed if needed)
   - Clear separation of page content vs. photos
   - Descriptions of visual elements
4. Merge all pages → Final markdown

**Timeline**: ~30-45 min for 15 pages with manual review

---

## Key Advantage

**This playbook approach** means:
- ✅ Automated tools do 80% of the work
- ✅ I do final 20% quality check using vision
- ✅ Perfect accuracy on what's page content vs. photos
- ✅ No garbage text from embedded images
- ✅ Complete descriptions of visual elements

**vs. Fully Automated**: Would be faster but less accurate

**vs. Fully Manual**: Would be too slow for 108 pages

---

## Next Steps

**Option A**: I manually review & curate pages 2-15 now (using the playbook)

**Option B**: You approve the approach, then I process pages in batches:
- Batch 1: Pages 2-5 (review workflow)
- Batch 2: Pages 6-10
- Batch 3: Pages 11-15

**Your call!**
