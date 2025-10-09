# Core Space Quick Reference Website

**Status**: ✅ Production - GitHub Pages Live Site
**Type**: Multi-page HTML/CSS quick reference website
**Platform**: GitHub Pages (corespace/docs)
**Last Updated**: 2025-10-08

---

## Overview

This is a **complete quick reference website** for the Core Space First Born board game. It provides instant lookup for game rules, mechanics, and character progression during gameplay.

### Purpose
- **At-table reference** during game sessions
- **Quick rule lookup** without searching PDFs
- **Character progression tracking** with persistent storage
- **Print-friendly** individual pages
- **Mobile-responsive** for tablet/phone use

---

## Architecture: Hub & Spoke

### Hub
**index.html** - Central navigation page with:
- Overview of all game systems
- Quick navigation to 7 detail pages
- At-a-glance stats and round sequence
- Links to 4 character trackers
- Common actions table
- Combat quick reference

### Spokes (Detail Pages)
1. **actions.html** - All 17+ actions with full rules
2. **phases.html** - 5 game phases deep dive
3. **combat.html** - Complete combat mechanics
4. **hostility.html** - Hostility system & events
5. **enemies.html** - First Born & NPCs
6. **advancement.html** - Skills, equipment & campaign
7. **tables.html** - Quick reference tables

### Character Trackers
1. **character-cassie.html** - Cassie skill progression
2. **character-wade.html** - Wade skill progression
3. **character-balcor.html** - Balcor skill progression
4. **character-hopper.html** - Hopper skill progression

---

## Technical Stack

### Frontend
- **HTML5**: Semantic markup, accessibility-focused
- **CSS3**: Shared `style.css` (9KB)
- **No JavaScript**: Pure HTML/CSS (except character trackers use localStorage)
- **No frameworks**: Vanilla web technologies

### Features
- **Responsive design**: Desktop → Tablet → Mobile
- **Print-friendly**: White background, optimized breaks
- **Interactive**: Hover effects, clickable navigation
- **Persistent storage**: Character tracker preferences saved locally

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

---

## File Structure

```
docs/
├── index.html                    # Main hub page
├── style.css                     # Shared stylesheet
│
├── actions.html                  # Actions detail page
├── phases.html                   # Game phases detail page
├── combat.html                   # Combat mechanics detail page
├── hostility.html                # Hostility system detail page
├── enemies.html                  # Enemies detail page
├── advancement.html              # Skills & campaign detail page
├── tables.html                   # Quick tables page
│
├── character-cassie.html         # Cassie tracker
├── character-wade.html           # Wade tracker
├── character-balcor.html         # Balcor tracker
├── character-hopper.html         # Hopper tracker
│
├── LLM_Rules_Reference.md        # Complete rules database (source)
├── Player_Flow_Guide.md          # Learning guide (source)
├── Core_Space_First_Born.md      # Rulebook markdown (source)
├── CoreSpace_v2.1.md             # FAQ source
├── CSFB_FAQ_v1.1.md              # FAQ markdown
│
├── Cassie_Skills.md              # Cassie skills reference
├── Wade_Skills.md                # Wade skills reference
├── Balcor_Skills.md              # Balcor skills reference
├── Hopper_Skills.md              # Hopper skills reference
│
├── README.md                     # Site documentation
├── SITEMAP.md                    # Site structure plan
└── CLAUDE.md                     # This file
```

---

## Design System

### Color Palette

#### Phases
- **Hostility**: Red (#e94560)
- **Trader**: Blue (#5390d9)
- **First Born**: Purple (#9b59b6)
- **NPC**: Green (#2ecc71)
- **Assessment**: Gray (#95a5a6)

#### Hostility Levels
- **Relaxed**: Green (#2ecc71)
- **Patrol**: Yellow (#f39c12)
- **Inspection**: Orange (#e67e22)
- **Wake**: Red (#e74c3c)
- **Threat**: Dark Red (#c0392b)
- **CLEANSE**: Blood Red (#8b0000) - Animated pulse

#### UI Elements
- **Primary Accent**: Cyan (#53a8b6)
- **Background**: Deep Blue (#16213e → #0f3460 gradient)
- **Text**: Light Gray (#eee)
- **Headers**: Red (#e94560)

### Typography
- **Sans-serif**: System fonts for speed
- **Monospace**: Code/stats
- **Responsive sizes**: 16px base, scales for mobile

### Layout Patterns
- **Cards**: Hover effects, rounded corners, shadows
- **Tables**: Striped rows, bordered cells, responsive
- **Flowcharts**: Sequential steps with visual connectors
- **Grids**: Auto-fit responsive columns

---

## Navigation Design

### Every Page Has:
1. **Header**: Clickable site title (→ home)
2. **Breadcrumb**: `Home › Current Page`
3. **Main content**: Page-specific information
4. **Footer**: Related page links
5. **Back to Hub button**: Always accessible

### Navigation Flow
```
index.html (Hub)
    ↓
    ├─→ actions.html ←→ combat.html
    ├─→ phases.html ←→ hostility.html
    ├─→ enemies.html
    ├─→ advancement.html
    ├─→ tables.html (links to all pages)
    └─→ character-*.html (4 trackers)
```

---

## Content Strategy

### Rule Pages (actions, phases, combat, etc.)
- **Comprehensive**: Full rules, not summaries
- **Examples**: Real gameplay scenarios
- **Tables**: Quick lookup data
- **Flowcharts**: Decision trees and sequences
- **Cross-links**: Related pages linked

### Character Trackers
- **Interactive**: Show/hide skill levels as learned
- **Persistent**: localStorage saves preferences
- **Complete**: All skills with full descriptions
- **Color-coded**: Skill levels visually distinct

### Source Documents
- **LLM_Rules_Reference.md**: Master rules database (67KB, 2,527 lines)
- **Player_Flow_Guide.md**: Learning guide (28KB, 967 lines)
- **Core_Space_First_Born.md**: Full rulebook (271KB)
- **Skills markdown**: Individual character references

---

## GitHub Pages Deployment

### Setup
1. Repository: `corespace`
2. Branch: `main`
3. Folder: `/docs`
4. URL: `https://[username].github.io/corespace/`

### Deployment Process
```bash
# From project root
git add docs/
git commit -m "Update website"
git push origin main
```

Changes go live automatically (1-2 minutes).

### Testing Locally
```bash
# Open in browser
open docs/index.html

# Or use simple HTTP server
cd docs
python3 -m http.server 8000
# Visit: http://localhost:8000
```

---

## Key Workflows

### Adding New Content

#### New Rule Page
1. Create `new-page.html` in `docs/`
2. Copy structure from existing page (e.g., `actions.html`)
3. Link stylesheet: `<link rel="stylesheet" href="style.css">`
4. Add breadcrumb: `Home › New Page`
5. Add footer links to related pages
6. Update `index.html` navigation
7. Update `SITEMAP.md`

#### Updating Existing Page
1. Edit HTML file directly
2. Test locally (`open docs/[page].html`)
3. Verify links work
4. Check mobile responsiveness (browser dev tools)
5. Test print layout (Cmd+P preview)
6. Commit and push

#### Modifying Design
1. Edit `docs/style.css`
2. Changes apply to ALL pages
3. Test on multiple pages
4. Verify print styles (`@media print`)
5. Check mobile breakpoints

### Character Tracker Updates

#### Adding New Skill
1. Edit character HTML file
2. Find skills section
3. Add new skill block:
```html
<div class="skill-item" data-level="1">
    <strong>Skill Name</strong> - Description
</div>
```
4. Ensure `data-level` attribute for filtering
5. Test show/hide functionality

#### Fixing Skill Information
1. Reference source: `docs/[Character]_Skills.md`
2. Update HTML in character tracker
3. Maintain formatting consistency
4. Test on actual page

---

## Common Tasks

### Task: Update Combat Rules
**Files to edit**: `combat.html`, possibly `tables.html`
**Steps**:
1. Read `LLM_Rules_Reference.md` for accurate rules
2. Update `combat.html` content
3. Check if `tables.html` needs updates (quick ref)
4. Test print layout
5. Verify cross-links to other pages

### Task: Add New Character Tracker
**Template**: Copy `character-cassie.html`
**Steps**:
1. Duplicate `character-cassie.html` → `character-[name].html`
2. Update character name throughout
3. Replace skills from `[Name]_Skills.md`
4. Update base stats (Health, Action, Skill, Career)
5. Add to `index.html` character trackers section
6. Test localStorage persistence

### Task: Fix Styling Issue
**File**: `style.css`
**Steps**:
1. Identify CSS selector causing issue
2. Test fix in browser dev tools first
3. Update `style.css`
4. Test on ALL pages (changes are global)
5. Check both screen and print media queries

### Task: Add FAQ Answer
**Files**: `tables.html` (Edge Cases section) or relevant detail page
**Steps**:
1. Locate appropriate section
2. Add entry with clear question
3. Provide authoritative answer (cite FAQ version if needed)
4. Link related pages if applicable

---

## Quality Standards

### Content Accuracy
- **Source of truth**: Official rulebook, v2.1 FAQ
- **Cross-reference**: `LLM_Rules_Reference.md` (most comprehensive)
- **Cite sources**: When rules are unclear
- **No guessing**: If unsure, mark as [NEEDS VERIFICATION]

### Design Consistency
- **Use existing patterns**: Cards, tables, flowcharts
- **Color coding**: Follow established palette
- **Typography**: Match existing hierarchy
- **Spacing**: Consistent margins/padding

### Accessibility
- **Semantic HTML**: Proper headings, lists, tables
- **Alt text**: For any images (currently none)
- **Keyboard navigation**: Links must be tabbable
- **High contrast**: Readable color combinations

### Performance
- **No external dependencies**: All resources local
- **Minimal CSS**: Single 9KB file
- **Fast load**: Pure HTML, no frameworks
- **Optimized HTML**: Clean, semantic markup

---

## Maintenance Notes

### Regular Updates
- **After rulebook changes**: Check all affected pages
- **After FAQ updates**: Integrate new clarifications
- **Character progression**: Update trackers as campaign progresses
- **Broken links**: Periodically check all navigation

### Version Control
- **Commit frequently**: Each logical change
- **Descriptive messages**: "Update combat misfire rules" not "fix stuff"
- **Test before push**: Always verify locally first
- **Branch for experiments**: Use feature branches for major changes

---

## Relationship to Other Project Parts

### Markdown Sources (docs/*.md)
- **LLM_Rules_Reference.md**: Master database, source of truth
- **Player_Flow_Guide.md**: Learning sequence, tutorial
- **Core_Space_First_Born.md**: Full rulebook in markdown
- HTML pages **reference** these but are **simplified for table use**

### Enhanced Output (../enhanced-output/)
- **PDF extraction project**: Separate effort
- **Not directly related**: This website built from typed markdown
- **Future integration**: Could use extracted rulebook pages

### Main Project (../)
- **Root CLAUDE.md**: Describes whole project
- **This docs/CLAUDE.md**: Specific to website
- Website is **one component** of larger game reference system

---

## Future Enhancements

### Potential Additions
- [ ] Mission-specific quick refs
- [ ] Expansion content pages (when expansions owned)
- [ ] Searchable rules database (would need JS)
- [ ] Dice roll calculator (would need JS)
- [ ] Campaign tracker (would need JS + storage)
- [ ] Dark mode toggle (currently always dark)
- [ ] Bookmark/favorites system

### Known Limitations
- **No search**: Pure HTML/CSS, no search function
- **No dynamic filtering**: Tables are static
- **No database**: All content hard-coded
- **No user accounts**: localStorage only

### If Scaling Up
- Consider static site generator (Jekyll, Hugo, 11ty)
- Add minimal JS for search/filter
- Build system for markdown → HTML conversion
- Component system for repeated elements

---

## Troubleshooting

### Links Not Working
- **Check file paths**: All lowercase, correct extension
- **Relative paths**: Use `href="page.html"` not `href="/page.html"`
- **Case sensitivity**: GitHub Pages is case-sensitive

### Styling Not Applied
- **Check stylesheet link**: `<link rel="stylesheet" href="style.css">`
- **CSS syntax**: Validate at https://jigsaw.w3.org/css-validator/
- **Cache issue**: Hard refresh (Cmd+Shift+R)

### Character Tracker Not Saving
- **localStorage enabled**: Check browser settings
- **Private browsing**: localStorage disabled in private mode
- **Console errors**: Check browser developer console
- **Script tag**: Ensure `<script>` block is present

### Mobile Layout Broken
- **Viewport meta**: Check `<meta name="viewport">` present
- **CSS breakpoints**: Test at various widths (dev tools)
- **Table overflow**: Add `overflow-x: auto` to tables

### Print Layout Issues
- **Print media query**: Check `@media print` in CSS
- **Page breaks**: Add `page-break-after: avoid` to keep elements together
- **Print preview**: Always test with browser print preview

---

## Commands Cheatsheet

```bash
# Open main hub page
open docs/index.html

# Start local server
cd docs && python3 -m http.server 8000

# Check for broken links (macOS)
brew install lychee
lychee docs/*.html

# Validate HTML
# Visit: https://validator.w3.org/

# Validate CSS
# Visit: https://jigsaw.w3.org/css-validator/

# Deploy to GitHub Pages
git add docs/
git commit -m "Update website content"
git push origin main

# Count lines in all HTML files
wc -l docs/*.html

# Search for specific rule across all pages
grep -r "specific term" docs/*.html
```

---

## Success Metrics

### Usability
- ✅ Can find any rule in < 30 seconds
- ✅ Readable on phone/tablet during gameplay
- ✅ Print-friendly for physical reference
- ✅ No scrolling needed for most quick lookups

### Completeness
- ✅ All core rules covered
- ✅ All actions documented
- ✅ All skills included in trackers
- ✅ Combat system fully explained
- ✅ Hostility mechanics comprehensive

### Quality
- ✅ Accurate to official rulebook
- ✅ Cross-referenced with v2.1 FAQ
- ✅ Visually consistent across pages
- ✅ Fast load times
- ✅ Mobile-responsive

---

## Key Principles

### Design Philosophy
> **Hub & Spoke**: One central page links to focused detail pages
> **Comprehensive, not summary**: Full rules, not bullet points
> **At-table first**: Designed for actual gameplay use
> **Print-friendly**: Each page is useful printed

### Content Philosophy
> **Accuracy over speed**: Verify rules before publishing
> **Completeness over brevity**: Include all edge cases
> **Clarity over cleverness**: Plain language, examples
> **Usability over aesthetics**: Function before form

### Maintenance Philosophy
> **Test locally first**: Never push untested changes
> **Commit often**: Small, logical changes
> **Document changes**: Clear commit messages
> **Cross-reference**: Check impact on other pages

---

**GitHub Pages URL**: `https://[username].github.io/corespace/`
**Last Major Update**: 2025-10-05 (Multi-page site created)
**Version**: 2.0 (Hub & Spoke architecture)
**Status**: Production ready, actively maintained
