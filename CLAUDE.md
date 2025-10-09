# Core Space Project - Multi-Modal PDF Extraction

**Status**: In Progress - Pages 1-15 trial extraction
**Approach**: Hybrid manual curation + automated tools
**Last Updated**: 2025-10-05

---

## Current Strategy: 3-Layer Multi-Modal Extraction

### Problem
Game rulebooks contain complex content that single-method extraction can't handle:
- Text in multiple layouts
- Images, diagrams, flowcharts (need descriptions)
- Photos-within-photos (component images on pages)
- Icons with game-specific meanings
- Tables with intricate structure

Simple tools like `markitdown` miss critical context.

### Solution: Hybrid Approach

**Layer 1**: Automated extraction + noise filtering
- PyMuPDF (PDF text extraction)
- Tesseract OCR (safety net)
- pdfplumber (tables)
- Custom filtering removes noise from embedded images

**Layer 2**: Manual vision review (Claude)
- Visually identify page content vs. photos
- Curate clean text from best extraction method
- Describe images, diagrams, icons, flowcharts
- Create structured vision JSON for each page

**Layer 3**: Intelligent merge
- Combines curated text + vision descriptions
- Generates comprehensive markdown

---

## Key Documents (READ THESE FIRST)

| Document | Purpose |
|----------|---------|
| **PROGRESS.md** | Track which pages are complete - UPDATE AFTER EVERY PAGE |
| **RECOMMENDED_WORKFLOW.md** | Detailed manual curation workflow |
| **PDF_TO_MARKDOWN_PLAN.md** | Original technical strategy (reference) |
| **EXTRACTION_SUMMARY.md** | Project overview and results |

---

## Quick Reference: Processing a Page

### 1. Extract (Automated)
```bash
source venv/bin/activate
python extract_page_v2.py "Core Space First Born Rulebook.pdf" <page_num>
```

### 2. Review & Curate (Manual - Claude does this)
1. Read the page image: `enhanced-output/pages/page-XXX.png`
2. Review extractions: `enhanced-output/pages/page-XXX-extraction.json`
3. Visually identify:
   - Actual page text (extract)
   - Photos of components (describe only)
   - Diagrams/flowcharts (describe flow)
   - Icons (explain meaning)
4. Create vision JSON: `enhanced-output/pages/page-XXX-vision.json`

### 3. Update Progress
```bash
# Update PROGRESS.md with page status
# Mark page as ✅ complete
```

### 4. Merge (When batch is complete)
```bash
python merge_outputs.py --pages "1-15" --output enhanced-output/pages-001-015-merged.md
```

---

## File Structure

```
corespace/
├── CLAUDE.md                              # This file - overview
├── PROGRESS.md                            # PAGE COMPLETION TRACKER
├── RECOMMENDED_WORKFLOW.md                # Manual curation playbook
├── PDF_TO_MARKDOWN_PLAN.md               # Technical strategy
├── EXTRACTION_SUMMARY.md                  # Project summary
│
├── Core Space First Born Rulebook.pdf    # Source PDF
│
├── venv/                                  # Python 3.13 venv
├── extract_page_v2.py                     # Extraction script (with filtering)
├── merge_outputs.py                       # Merge script
├── utils.py                               # Helper functions
│
└── enhanced-output/
    ├── pages/
    │   ├── page-001.png                   # High-res page images (300 DPI)
    │   ├── page-001-extraction.json       # Automated extractions
    │   ├── page-001-vision.json           # Manual vision curation
    │   └── ... (pages 2-15)
    │
    ├── vision-prompts/                    # Vision analysis prompts
    │   └── page-XXX-prompt.txt
    │
    └── pages-001-015-merged.md            # Final comprehensive markdown
```

---

## Progress Tracking

**See PROGRESS.md** for detailed page-by-page status.

**Current Phase**: Pages 1-15 trial extraction
- Automated extraction: ✅ Complete (all 15 pages)
- Manual curation: ⏳ In progress (pages 1-3 done)
- Final merge: ⏳ Pending

---

## Critical Workflow Notes

### After Compaction

If conversation is compacted, **read these files in order**:
1. **PROGRESS.md** - See where we left off
2. **This file** (CLAUDE.md) - Understand the approach
3. **RECOMMENDED_WORKFLOW.md** - Remember the playbook
4. Continue from next incomplete page in PROGRESS.md

### Token Management

- Each page review uses ~500-1000 tokens
- 15 pages ≈ 7,500-15,000 tokens
- Update PROGRESS.md after EVERY page (enables recovery)
- Work in batches of 5 pages between progress saves

### Quality Standards

For **each page**, vision curation must include:
- ✅ Clean text (best method OR manual typing)
- ✅ Clear separation: page content vs. photos
- ✅ Image/diagram descriptions
- ✅ Icon meanings (game context)
- ✅ Layout notes
- ✅ Special formatting

---

## Commands Cheatsheet

```bash
# Activate environment
source venv/bin/activate

# Process single page (automated)
python extract_page_v2.py "Core Space First Born Rulebook.pdf" <page_num>

# Check progress
cat PROGRESS.md

# Merge completed pages
python merge_outputs.py --pages "1-5" --output enhanced-output/batch-1.md

# Merge all when complete
python merge_outputs.py --pages "1-15" --output enhanced-output/Core_Space_First_Born_Pages_1-15.md
```

---

## Success Criteria

**For trial (pages 1-15)**:
- ✅ Complete, accurate text extraction
- ✅ All images/diagrams described
- ✅ All icons explained with game context
- ✅ Tables properly formatted
- ✅ Flowcharts with step-by-step descriptions
- ✅ Searchable, LLM-optimized markdown

**If successful**: Scale to full 108 pages

---

**Current Task**: Manual curation of pages 2-15
**Next Milestone**: Complete pages 1-15, merge, and review quality
**End Goal**: Complete rulebook in comprehensive markdown format
