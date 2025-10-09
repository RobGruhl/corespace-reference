# Core Space First Born: Extraction Progress

**Last Updated**: 2025-10-06
**Current Batch**: Pages 1-15 (trial extraction)
**Overall Status**: 15/15 pages complete (100%) ✅

---

## Quick Status

| Phase | Status | Progress |
|-------|--------|----------|
| Automated Extraction | ✅ Complete | 15/15 pages |
| Manual Vision Curation | ✅ Complete | 15/15 pages |
| Final Merge | ✅ Complete | 1/1 (2,405 lines, 117KB) |

---

## Page-by-Page Status

| Page | Auto Extract | Vision Curation | Quality | Notes |
|------|-------------|-----------------|---------|-------|
| 1 | ✅ | ✅ | ⭐⭐⭐ | Title/credits page - COMPLETE |
| 2 | ✅ | ✅ | ⭐⭐⭐ | Game overview - COMPLETE (filtered noise from photo) |
| 3 | ✅ | ✅ | ⭐⭐⭐ | Contents/lore - COMPLETE |
| 4 | ✅ | ✅ | ⭐⭐⭐ | Terrain intro with photos - COMPLETE |
| 5 | ✅ | ✅ | ⭐⭐⭐ | Standalone terrain catalog - COMPLETE |
| 6 | ✅ | ✅ | ⭐⭐⭐ | Glossary with rank icon and movement example - COMPLETE |
| 7 | ✅ | ✅ | ⭐⭐⭐ | Glossary continued with First Born photo - COMPLETE |
| 8 | ✅ | ✅ | ⭐⭐⭐ | Crew Dashboards with character board photos - COMPLETE |
| 9 | ✅ | ✅ | ⭐⭐⭐ | Pegs system with Cassie example - COMPLETE |
| 10 | ✅ | ✅ | ⭐⭐⭐ | Hostility Tracker with board photos - COMPLETE |
| 11 | ✅ | ✅ | ⭐⭐⭐ | Combat Dice & Randomization - COMPLETE |
| 12 | ✅ | ✅ | ⭐⭐⭐ | Line of Sight with tactical diagrams - COMPLETE |
| 13 | ✅ | ✅ | ⭐⭐⭐ | Cover & Range mechanics - COMPLETE |
| 14 | ✅ | ✅ | ⭐⭐⭐ | Equipment system color codes - COMPLETE |
| 15 | ✅ | ✅ | ⭐⭐⭐ | Statistics & Icons reference - COMPLETE |

**Legend**:
- ✅ = Complete
- ⏳ = Pending
- ⭐ = Quality rating (1-3 stars)

---

## Completed Pages Details

### Page 1 - Title/Credits
- **Type**: Title page with lore introduction
- **Content**: Game title, First Born faction symbol, backstory, credits
- **Images**: 1 (asteroid field illustration)
- **Icons**: 2 (First Born emblem, Battle Systems logo)
- **Special Notes**: Clean extraction, minimal noise
- **Vision JSON**: enhanced-output/pages/page-001-vision.json
- **Completed**: 2025-10-05

### Page 2 - Game Overview
- **Type**: Introduction to game mechanics
- **Content**: Game description, IMPORTANT callout, mechanical overview
- **Images**: 4 (Learn to Play booklet photo, dashboards, dice, armed figure)
- **Icons**: 1 (EVENT token)
- **Special Notes**: Heavy noise from Learn to Play booklet photo - filtered successfully
- **Filtering**: Removed 2,501 chars of embedded image text
- **Vision JSON**: enhanced-output/pages/page-002-vision.json
- **Completed**: 2025-10-05

### Page 3 - Contents & Lore
- **Type**: Table of contents + First Born backstory
- **Content**: Full rulebook index, "The First Born" lore section
- **Images**: 2 (First Born miniature photo, border illustration)
- **Icons**: 0
- **Tables**: 1 (table of contents with dotted leaders)
- **Special Notes**: Complex multi-column table of contents extracted cleanly
- **Vision JSON**: enhanced-output/pages/page-003-vision.json
- **Completed**: 2025-10-05

### Page 4 - Terrain Introduction
- **Type**: Text-heavy with product photos
- **Content**: Explanation of 3D modular terrain system, assembly instructions
- **Images**: 6 (main terrain setup photo with 3 circular callouts, 2 assembly instruction photos)
- **Icons**: 0
- **Special Notes**: Clean extraction - no noise from photos. Photos show physical game components for instructional/promotional purposes. Callout circles effectively highlight different aspects.
- **Game Mechanics**: Terrain setup (2x2 foot area, plastic clips, 15-20 min setup time)
- **Vision JSON**: enhanced-output/pages/page-004-vision.json
- **Completed**: 2025-10-05

### Page 5 - Standalone Terrain Catalog
- **Type**: Catalog/reference page with product photos
- **Content**: Standalone terrain pieces (interactive objects beyond walls)
- **Images**: 10 (photos of 7 terrain types: Exhaust Vents, Stasis Pods, Command Console, Arks, Pillars, True Born Stasis Pod, Dyson Reactor)
- **Icons**: 1 (First Born symbol on True Born Stasis Pod)
- **Special Notes**: Clean grid layout. Each terrain piece photographed and labeled. True Born pieces marked with faction symbol. Dyson Reactor is largest piece shown.
- **Game Mechanics**: Interactive terrain provides cover, objectives. Assembly required. Rules on page 90.
- **Vision JSON**: enhanced-output/pages/page-005-vision.json
- **Completed**: 2025-10-05

### Page 6 - Glossary
- **Type**: Two-column reference page with terminology definitions
- **Content**: Core game terminology (Player, Character, Crew, Trader, NPC, Rank, First Player, Mission, Round, Phase, Activation, Turn, Action, Enemy, Square)
- **Images**: 1 (Rank shield icon), 1 diagram (movement example in cyan EXAMPLE box)
- **Icons**: 1 (Rank shield icon with number)
- **Diagrams**: 1 (Liege movement path around Ark terrain - demonstrates diagonal movement rule)
- **Special Notes**: Foundational reference page. First Player definition is extensive (longest entry) with 4-point bullet list. EXAMPLE box uses cyan border to highlight tutorial content. Clean extraction - 3,016 chars, 94.59% OCR confidence.
- **Game Mechanics**: Establishes core concepts - player/crew hierarchy, NPC system with rank-based turn order, First Player rotation mechanics, turn structure (Mission→Round→Phase→Activation→Turn→Action), movement grid (25mm squares), terrain blocking rules.
- **Vision JSON**: enhanced-output/pages/page-006-vision.json
- **Completed**: 2025-10-06

### Page 7 - Glossary (continued) & Measured Movement
- **Type**: Asymmetric layout - narrow glossary column, large photo of First Born miniature, cyan rules box
- **Content**: Additional terminology (Adjacent, Engaged, Attack, Target, Hit, Damage, Prone, Defeated, D6, Scatter, UA, May) + alternative movement rules
- **Images**: 1 large photo (First Born warrior miniature - product photography against teal background)
- **Icons**: Hit icon referenced but not clearly shown
- **Special Notes**: Asymmetric design with photo dominating ~70% of page. MEASURED MOVEMENT box provides gridless play alternative (ruler/tape measure). Distinguishes Trader vs NPC defeat conditions. Clean extraction - 2,292 chars, 94.16% OCR confidence.
- **Game Mechanics**: Adjacency includes diagonals (8 squares), engagement orthogonal only (4 squares). Attack→Hit→Damage pipeline with armor/cover modifying hits. Alternative movement: 1 square = 1 inch, base contact required for adjacency/engagement. Traders stay on board when defeated, NPCs removed. 'May' keyword = optional rule.
- **Vision JSON**: enhanced-output/pages/page-007-vision.json
- **Completed**: 2025-10-06

### Page 8 - Crew Dashboards
- **Type**: Two-column rules explanation with embedded component photos
- **Content**: Character management system - Trader Board, Items, Class, Pegs sections explained
- **Images**: 3 photos (Trader Board showing "Cassie" character with statistics, Items tray with inventory tokens, Marine Class Board with colored skill icons)
- **Icons**: Multiple - filled/empty statistic circles, colored skill icons, base ability symbols
- **Special Notes**: Dense instructional page explaining physical game components. Photos essential to understand abstract rules. Default vs Potential mechanic central to character progression. Physical inventory limit (tray capacity) is tangible constraint. Clean extraction - 3,646 chars, 93.39% OCR confidence.
- **Game Mechanics**: Four dashboard sections (Trader Board, Items, Class, Pegs). Statistics: Health (damage), Action (actions/round), Skill (number usable), Career (learning capacity). Default vs Potential: start at default, can improve to potential ceiling, can drop below but never exceed. Dry-wipe pen tracks values. Points system for crew selection. Armour slot punch-out (holds armour OR reveals base ability). Physical inventory limit based on tray capacity. Class determines profession/available Skills. Skill progression Level 1-3, allocated via Career points. Civilian guise on reverse side of board.
- **Vision JSON**: enhanced-output/pages/page-008-vision.json
- **Completed**: 2025-10-06

### Page 9 - Pegs System & Character Example
- **Type**: Two-column instructional with extensive detailed example and large photos
- **Content**: Peg system explanation (green/purple/yellow pegs for Health/Skill/Ammo) + comprehensive "Cassie" character example with 11 bullet points
- **Images**: 2 large photos (Cassie's complete Trader Board showing all statistics/abilities/items, Marine Class Board with skill allocations and physical colored pegs visible in rows)
- **Icons**: Green/purple/yellow pegs, filled/empty circles on boards, base ability icons, armour slot icon
- **Special Notes**: Exceptionally detailed EXAMPLE section showing campaign-progressed character (Health 6 vs 5 default, Career 10 vs 4 default). Photos show actual physical pegs in colored rows, making abstract peg system tangible. Demonstrates skill stacking (Weapons Expert base 2 + allocated 1 = Level 3). Red arrows/callouts connect text to photo elements. Clean extraction - 2,253 chars, 93.23% OCR confidence.
- **Game Mechanics**: Peg tracking system for fluctuating stats. Green pegs (Health): removed as damage taken, defeat when none remain. Purple pegs (Skill): cannot use Skills when none remain. Yellow pegs (Ammo): start full magazine (~7), cannot fire ranged weapons when depleted. Pegs set to match current statistics at game start. Character example shows: Career progression (10 points allocated to 7 skills), skill stacking mechanics, starting loadout determination (6 Health/5 Skill/7 Ammo pegs).
- **Vision JSON**: enhanced-output/pages/page-009-vision.json
- **Completed**: 2025-10-06

### Page 10 - Hostility Tracker System
- **Type**: Rules explanation with cyan ICON KEY box and photos of two-sided board component
- **Content**: Hostility mechanic - gauges First Born aggression with 6 escalation levels (Patrol → Inspection → Aware → Wake Protocols → Threat Defence → Cleanse)
- **Images**: 2 photos (two vertical strips showing both sides of Hostility Board with icons and level markers, painted First Born miniatures at bottom)
- **Icons**: Drone, Liege, Iconoclast, True Born, Cerberosa, Talos, First Born Die, Knowledge Die, black pegs for Hostility tracking, numbered circles (0-6) for levels
- **Tables**: 1 (ICON KEY - two-column reference listing 8 First Born character types with their icons)
- **Special Notes**: Introduces core tension mechanic - Hostility increases +1 per round, +1 additional after first Trader shot (noise attraction). At Cleanse level (6), board flips to harder side with increased enemy statistics permanently. Two-sided board: starter side for base set, reverse for expansions. Photos show actual game component strips. Clean extraction - 1,468 chars, 84.37% OCR confidence (lower due to board text in photos).
- **Game Mechanics**: Hostility Tracker (0-6 scale) measures First Born aggression. Auto-escalation: +1 per round, +1 after first shot. Black pegs track current level. Six levels determine: which enemy types spawn (via icons on board), spawn quantities (number or die roll), Event Card effects (page 19). Cleanse threshold: permanent difficulty increase via board flip. Predictable escalation creates stealth vs combat tactical decisions. Icon spawning: exact (icon+number) or variable (icon+die).
- **Vision JSON**: enhanced-output/pages/page-010-vision.json
- **Completed**: 2025-10-06

---

## Next Actions

### Immediate (Page 4)
1. Read image: `enhanced-output/pages/page-004.png`
2. Review extraction: `enhanced-output/pages/page-004-extraction.json`
3. Create vision JSON: `enhanced-output/pages/page-004-vision.json`
4. Update this file with completion

### Batch Workflow (Pages 4-8)
Process 5 pages, then:
1. Update PROGRESS.md
2. Test merge: `python merge_outputs.py --pages "1-8"`
3. Review merged output quality
4. Continue to pages 9-15

### Final Steps
1. Complete all 15 pages
2. Final merge: `python merge_outputs.py --pages "1-15"`
3. Quality review of complete output
4. Decide: proceed to full 108 pages or refine approach?

---

## Recovery Instructions (After Compaction)

If you're reading this after conversation compaction:

1. **Check current status**: Look at the table above - find first page with ⏳ in "Vision Curation"
2. **Read CLAUDE.md**: Understand the workflow
3. **Read RECOMMENDED_WORKFLOW.md**: Remember the playbook
4. **Continue from next page**: Process using the 3-step workflow
5. **Update this file**: After EVERY page completion

---

## Token Usage Tracking

| Batch | Pages | Tokens Used | Notes |
|-------|-------|-------------|-------|
| Initial Setup | 1-3 | ~15,000 | Created all infrastructure, tested approach |
| Pages 4-8 | TBD | TBD | |
| Pages 9-13 | TBD | TBD | |
| Pages 14-15 | TBD | TBD | |

**Estimated remaining**: ~10,000-15,000 tokens for pages 4-15

---

## Quality Metrics

### Extraction Accuracy
- **PDF Text**: 95% accurate (some missing sentences)
- **OCR**: 94% confident average
- **Filtering**: Successfully removed 2,500+ chars of noise from page 2

### Vision Curation Quality
- Pages 1-3: ⭐⭐⭐ (excellent - complete text, detailed descriptions)

### Areas for Improvement
- Page 2: Some sentences incomplete in PDF extraction (fixed via vision curation)
- Need to watch for more photos-within-photos (filter aggressively)

---

## Files Generated

```
enhanced-output/
├── pages/
│   ├── page-001.png ✅
│   ├── page-001-extraction.json ✅
│   ├── page-001-vision.json ✅
│   ├── page-002.png ✅
│   ├── page-002-extraction.json ✅
│   ├── page-002-vision.json ✅
│   ├── page-003.png ✅
│   ├── page-003-extraction.json ✅
│   ├── page-003-vision.json ✅
│   └── page-004 through 015... ⏳
│
├── pages-001-003-merged.md ✅ (test merge)
└── Core_Space_First_Born_Pages_1-15.md ⏳ (final output)
```

---

**Current Task**: Begin page 4 vision curation
**Completion ETA**: ~12 more pages × 3 min/page = 36 minutes
**Next Milestone**: Pages 1-8 complete, test merge
