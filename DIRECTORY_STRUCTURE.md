# Core Space Project: Clean Directory Structure

**Date**: 2025-10-05
**Status**: Production-ready

---

## Root Directory

```
corespace/
├── Core Space First Born Rulebook.pdf    # Source PDF (128MB, 108 pages)
├── venv/                                  # Python 3.13 virtual environment
│
├── CLAUDE.md                              # 🔥 MAIN WORKFLOW (read after compaction)
├── PROGRESS.md                            # 🔥 PAGE STATUS (update after every page)
├── TIPS_AND_TRICKS.md                     # 🔥 LESSONS LEARNED (add discoveries)
├── RECOMMENDED_WORKFLOW.md                # Manual curation playbook
├── PDF_TO_MARKDOWN_PLAN.md               # Technical strategy document
├── EXTRACTION_SUMMARY.md                  # Project overview
├── SETUP_COMPLETE.md                      # Setup completion summary
│
├── extract_page_v2.py                     # 🔧 Extraction script (with filtering)
├── merge_outputs.py                       # 🔧 Merge script (individual + combined)
├── process_pages.py                       # 🔧 Batch processor
├── run_vision_analysis.py                 # 🔧 Progress tracker
├── utils.py                               # Helper functions
│
├── enhanced-output/                       # 📁 PRODUCTION OUTPUT
│   ├── pages/
│   │   ├── page-001.png                   # High-res page images
│   │   ├── page-001-extraction.json       # Automated extractions
│   │   ├── page-001-vision.json           # ✅ Manual vision curation
│   │   ├── page-002.png
│   │   ├── page-002-extraction.json
│   │   ├── page-002-vision.json           # ✅
│   │   ├── page-003.png
│   │   ├── page-003-extraction.json
│   │   ├── page-003-vision.json           # ✅
│   │   └── page-004 through 015...        # ⏳ Awaiting vision curation
│   │
│   ├── vision-prompts/                    # Vision analysis prompts
│   │   └── page-001 through 015-prompt.txt
│   │
│   └── processing-summary.json            # Metadata
│
└── markdown-output/                       # 📁 PREVIOUS WORK (reference)
    ├── Core_Space_First_Born.md           # Old markitdown output
    ├── LLM_Rules_Reference.md
    ├── SKILLS_REFERENCE.md
    └── ... (various HTML/MD files)
```

---

## Key Directories

### Production (`enhanced-output/`)
**Active work area** - all extraction and curation happens here
- Pages 1-3: ✅ Complete (automated + vision)
- Pages 4-15: ⏳ Automated extraction done, awaiting vision curation

### Reference (`markdown-output/`)
**Previous work** - kept for reference
- Old markitdown extractions
- HTML versions
- Skills references
- **Note**: Not part of current multi-modal workflow

---

## Scripts (Production-Ready)

| Script | Purpose | Usage |
|--------|---------|-------|
| `extract_page_v2.py` | Extract single page (PDF + OCR + filtering) | `python extract_page_v2.py "PDF" <page_num>` |
| `process_pages.py` | Batch process multiple pages | `python process_pages.py "PDF" --pages "1-15"` |
| `merge_outputs.py` | Merge into markdown (individual + combined) | `python merge_outputs.py --pages "1-15"` |
| `run_vision_analysis.py` | Track curation progress | `python run_vision_analysis.py` |

---

## Documentation (Compaction-Resilient)

| Document | When to Read |
|----------|-------------|
| **CLAUDE.md** | After compaction - main workflow |
| **PROGRESS.md** | Every time - see what's next |
| **TIPS_AND_TRICKS.md** | Before processing new page type |
| **RECOMMENDED_WORKFLOW.md** | When starting curation |
| **SETUP_COMPLETE.md** | Quick reference / onboarding |

---

## What Was Removed (Cleanup)

✅ `test-output/` - Initial test directory
✅ `test-v2-output/` - V2 test directory  
✅ `enhanced-output/test-individual/` - Merge test output
✅ `extract_page.py` - Old version (superseded by v2)
✅ `__pycache__/` - Python cache
✅ `enhanced-output/pages-001-003-merged.md` - Test merge file

---

## Current Status

**Automated Extraction**: ✅ Complete (pages 1-15)
**Manual Curation**: 3/15 pages complete (20%)
**Next Task**: Begin page 4 vision curation

---

**Clean, organized, and ready to work!** 🚀
