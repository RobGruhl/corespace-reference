# Core Space Project - Multi-Modal PDF Extraction

**Status**: ✅ Trial Complete - Pages 1-15 extracted and merged
**Approach**: Hybrid manual curation + automated tools
**Last Updated**: 2025-10-08

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
├── docs/                                  # Game reference documentation (HTML/MD)
│   ├── index.html                         # Main index
│   ├── LLM_Rules_Reference.md            # LLM-optimized rules
│   ├── character-*.html                   # Character trackers
│   └── ... (various game references)
│
└── enhanced-output/
    ├── pages/
    │   ├── page-001.png                   # High-res page images (300 DPI)
    │   ├── page-001-extraction.json       # Automated extractions
    │   ├── page-001-vision.json           # Manual vision curation
    │   └── ... (pages 1-15, all complete)
    │
    ├── vision-prompts/                    # Vision analysis prompts
    │   └── page-XXX-prompt.txt
    │
    ├── Core_Space_First_Born_Pages_1-15.md  # ✅ TRIAL COMPLETE
    ├── batch-1-pages-1-8.md               # Intermediate batch output
    └── individual-pages/                   # Individual page markdown
```

---

## Progress Tracking

**See PROGRESS.md** for detailed page-by-page status.

**Trial Phase Complete**: Pages 1-15 ✅
- Automated extraction: ✅ Complete (15/15 pages)
- Manual vision curation: ✅ Complete (15/15 pages)
- Final merge: ✅ Complete (2,405 lines, 117KB)
  - Output: `enhanced-output/Core_Space_First_Born_Pages_1-15.md`

---

## Critical Workflow Notes

### After Compaction

If conversation is compacted, **read these files in order**:
1. **PROGRESS.md** - See current status (trial complete)
2. **This file** (CLAUDE.md) - Understand the approach
3. **enhanced-output/Core_Space_First_Born_Pages_1-15.md** - Review trial results
4. Decide on next steps based on trial quality

### Token Management (For Future Batches)

- Each page review uses ~500-1000 tokens
- Batch of 15 pages ≈ 7,500-15,000 tokens
- Update PROGRESS.md after EVERY page (enables recovery)
- Work in batches of 10-15 pages between progress saves
- **Trial used**: ~20,000-25,000 tokens total (including setup/merge)

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

## Trial Results (Pages 1-15)

**Completion**: 2025-10-06
**Output**: `enhanced-output/Core_Space_First_Born_Pages_1-15.md` (2,405 lines, 117KB)

### What Worked Well
- ✅ **Automated extraction** captured most text accurately (94-95% confidence)
- ✅ **Noise filtering** successfully removed embedded image text (2,500+ chars on page 2)
- ✅ **Vision curation** effectively separated page content from photos
- ✅ **Image descriptions** provided context for miniatures, terrain, and components
- ✅ **Icon documentation** explained game-specific symbols
- ✅ **Merge process** created comprehensive, searchable markdown

### Challenges Identified
- ⚠️ Manual curation is time-intensive (~3-5 min per page)
- ⚠️ Some PDF text extraction missed sentences (OCR caught most)
- ⚠️ Photos-within-photos require careful visual identification
- ⚠️ Complex layouts (multi-column, callout boxes) need special attention

### Quality Assessment
- **Text accuracy**: Excellent (95%+ complete with manual curation)
- **Image coverage**: Excellent (all images described with context)
- **Icon documentation**: Excellent (game meanings explained)
- **Searchability**: Excellent (LLM can answer questions from content)
- **Overall**: ⭐⭐⭐ High quality, suitable for scaling

### Estimated Effort for Full Rulebook
- **Pages remaining**: 93 (pages 16-108)
- **Time per page**: ~3-5 minutes
- **Total estimated time**: ~4.5-7.5 hours of curation work
- **Recommendation**: Proceed in batches of 10-15 pages

---

**Trial Status**: ✅ COMPLETE - Pages 1-15 extracted, curated, and merged
**Next Decision**: Evaluate trial quality and decide whether to:
  - Scale approach to remaining 93 pages (16-108)
  - Refine methodology based on lessons learned
  - Focus on other aspects of game documentation
**End Goal**: Complete rulebook in comprehensive markdown format (if proceeding)
