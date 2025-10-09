# Tips & Tricks: Multi-Modal PDF Extraction

**Purpose**: Lessons learned during manual curation
**Updated**: After every tricky page or new discovery

---

## Page Type Taxonomy

Based on pages reviewed so far, categorize each page:

### Type A: Text-Heavy Pages
**Examples**: Pages 1 (title), 2 (overview)
**Characteristics**: Mostly flowing text, some photos, minimal diagrams
**Approach**:
- Automated extraction works well (with filtering)
- Focus vision on image/photo descriptions
- Watch for photos-within-photos (extract text from page, not from photos!)

### Type B: Reference Tables
**Examples**: Page 99 (skills reference), Page 101 (icons reference)
**Characteristics**: Tables with icons/symbols + detailed text
**Challenges**:
- Table structure may be garbled by automated tools
- Icons need visual description + meaning explanation
- Multi-column layouts
**Approach**:
- Use vision to reconstruct table structure
- Describe each icon visually
- Explain game-mechanical meaning of each symbol
- Preserve hierarchical bullet structure

### Type C: Diagram-Heavy Pages
**Examples**: Page 85 (game setup diagram)
**Characteristics**: Large diagrams/maps, many icons, minimal text
**Challenges**:
- Little text to extract automatically
- Spatial relationships matter
- Many icons need identification
**Approach**:
- Describe diagram overall structure first
- Identify and explain every icon/symbol in diagram
- Note spatial relationships (e.g., "token A is north of token B")
- Extract labels and callouts
- Minimal text extraction, maximum description

### Type D: Contents/Index
**Examples**: Page 3 (table of contents)
**Characteristics**: Multi-column lists with page numbers
**Approach**:
- Automated extraction often good
- Preserve hierarchical structure
- Format as markdown table if needed

---

## Common Challenges & Solutions

### Challenge 1: Photos-Within-Photos

**Problem**: Page 2 had a photo of the "Learn to Play" booklet. PyMuPDF extracted ALL visible text, including text visible in that photo (~2,500 chars of noise).

**Solution**:
1. Automated filtering removes known markers ("LEARN TO PLAY", "DRONE ACTIVITY", etc.)
2. Vision review: Identify what's a photo vs. actual page content
3. Rule: **Text visible IN a photo is NOT page text** - describe the photo instead

**Example**:
```json
{
  "images": [
    {
      "type": "photo",
      "title": "Learn to Play booklet",
      "description": "Photo showing the booklet cover with First Born logo",
      "note": "Text visible in photo NOT extracted - this is image content"
    }
  ]
}
```

### Challenge 2: Icon-Dense Pages

**Problem**: Pages 85, 99, 101 have dozens of icons that need description AND explanation.

**Solution**:
1. **Visual description**: "Circular icon with diagonal line through it"
2. **Game meaning**: "This character cannot be knocked prone"
3. **Context**: "Used in Character Abilities reference"

**Template**:
```json
{
  "symbol": "Visual description of the icon",
  "meaning": "What it represents in the game",
  "context": "Where/how it's used"
}
```

### Challenge 3: Diagram Spatial Relationships

**Problem**: Page 85 setup diagram shows token placement. Location matters.

**Solution**:
- Use grid coordinates if available
- Use directional descriptions ("upper left", "center", "adjacent to")
- Note what tokens are grouped together
- Describe flow/connections (e.g., "paths connect tokens A and B")

**Example**:
```json
{
  "diagram_type": "game_board_setup",
  "grid_size": "16x16",
  "elements": [
    {
      "token": "Trader starting position",
      "location": "Grid square A1 (upper left)",
      "marker_color": "purple",
      "marker_number": "1"
    }
  ]
}
```

### Challenge 4: Multi-Column Layouts

**Problem**: Pages with 2+ columns can have confusing text flow in automated extractions.

**Solution**:
- Vision review to identify column breaks
- Manually reorder text if needed
- Note in JSON: `"layout": "two-column, left-to-right"`

### Challenge 5: Nested Bullets

**Problem**: Pages 99, 101 have bullets within bullets.

**Solution**:
- Preserve indentation in markdown
- Use `-` for main bullets, `  •` for sub-bullets
- Triple-check hierarchy is preserved

---

## Vision JSON Best Practices

### Always Include

```json
{
  "page_number": 1,
  "layout": "Brief layout description",
  "main_heading": "Primary heading if any",

  "text_sections": [/* curated clean text */],
  "images": [/* photos, illustrations */],
  "diagrams_flowcharts": [/* if applicable */],
  "tables": [/* if applicable */],
  "icons_symbols": [/* ALL icons with meanings */],
  "special_formatting": [/* callouts, sidebars, etc. */],
  "game_mechanics": [/* rules explained on page */],
  "notes": "Any important observations"
}
```

### Icon Description Template

```json
{
  "symbol": "Detailed visual description (shape, colors, elements)",
  "meaning": "What it represents (game concept, ability, status)",
  "context": "Where it's used (character sheet, board, cards)",
  "example_usage": "Optional: How it functions in gameplay"
}
```

### Image Description Template

```json
{
  "type": "photo|diagram|icon|illustration|miniature|flowchart",
  "title": "What the image shows",
  "description": "Detailed visual description",
  "purpose": "Why it's included (teaching, example, atmosphere)",
  "location": "Position on page",
  "contains_text": "true|false - if photo contains visible text, note it's NOT extracted"
}
```

---

## Filtering Effectiveness

| Page | Type | Noise Filtered | Method |
|------|------|---------------|--------|
| 2 | Text + Photos | 2,501 chars (PyMuPDF) | Removed "LEARN TO PLAY" booklet text |
| 85 | Diagram | 11 chars | Minimal noise |
| 99 | Table + Icons | 581 chars (OCR) | Garbled table structure |
| 101 | Icon Reference | 379 chars (OCR) | Fragmented layout |

**Lesson**: Filtering is most effective on Type A pages. Type B/C pages need more manual curation.

---

## Text Extraction Decision Tree

```
1. Review automated extractions (PyMuPDF, pdfplumber, OCR)
   ├─ All three agree? → Use PyMuPDF (cleanest)
   ├─ Disagreement? → Use vision to determine best
   └─ All garbled? → Manually type from image

2. Check for photos-within-photos
   ├─ Found photo? → Describe it, ignore embedded text
   └─ No photos? → Extract all visible text

3. Identify page type (A/B/C/D)
   ├─ Type A → Automated extraction + vision for images
   ├─ Type B → Reconstruct table + icon descriptions
   ├─ Type C → Full diagram description + icon catalog
   └─ Type D → Automated extraction works
```

---

## Page-Specific Notes

### Page 2 (Game Overview)
- ⚠️ Photo of Learn to Play booklet contains readable text
- ✅ Filtered successfully with custom rules
- Lesson: Always check for component photos with visible text

### Page 85 (Setup Diagram)
- ⚠️ Mostly visual, minimal text
- Icons: ~20+ unique symbols to describe
- Grid-based layout with precise placement
- Approach: Catalog every icon, describe spatial relationships

### Page 99 (Skills Reference)
- ⚠️ Complex table with icons in first column
- Numbered entries within each skill
- Nested bullets in some entries
- Approach: Reconstruct as markdown table, describe icons

### Page 101 (Icon Reference)
- ⚠️ Two-column layout, ~15+ icons
- Each icon has detailed multi-paragraph explanation
- Some icons have sub-bullets
- Approach: Process column-by-column, link icon to text

---

## Workflow Reminders

### Before Processing Each Page
1. Look at the image first - what type is it?
2. Review all three automated extractions
3. Identify challenges (photos? diagrams? icons?)
4. Plan approach based on page type

### During Processing
1. Start with easiest element (usually main text)
2. Process images/diagrams second
3. Handle icons last (most detail-intensive)
4. Cross-reference: Does this make sense?

### After Processing
1. Review vision JSON - complete?
2. Check: Did I describe ALL icons?
3. Check: Did I separate page text from photo text?
4. Update PROGRESS.md
5. Add any new lessons to this file

---

## Common Mistakes to Avoid

1. ❌ **Extracting text from photos** - Describe photos instead
2. ❌ **Missing icons** - Every symbol needs description
3. ❌ **Ignoring layout** - Note multi-column, callouts, sidebars
4. ❌ **Incomplete diagrams** - Describe ALL elements, not just some
5. ❌ **Forgetting game context** - Icons mean something in gameplay
6. ❌ **Skipping special formatting** - Callouts, highlights matter

---

## Quality Checklist

Before marking a page complete:

- [ ] All visible text extracted or described
- [ ] All photos identified and described (NOT text-extracted)
- [ ] All icons cataloged with visual description + meaning
- [ ] All diagrams described with spatial relationships
- [ ] All tables formatted properly
- [ ] Layout noted (columns, sidebars, callouts)
- [ ] Game mechanics explained where applicable
- [ ] PROGRESS.md updated
- [ ] Vision JSON saved

---

## Future Improvements

Ideas to try if current approach struggles:

1. **For complex diagrams**: Create ASCII art representation
2. **For dense tables**: Use CSV format as intermediate
3. **For icon-heavy pages**: Create icon glossary first, reference it
4. **For multi-layer diagrams**: Process layer by layer

---

**Last Updated**: 2025-10-05 (Initial from pages 1-3 + preview of 85, 99, 101)
**Pages Analyzed**: 1, 2, 3, 85, 99, 101
**Next Update**: After completing batch 1 (pages 4-8)
