(function () {
    'use strict';

    /**
     * Core Space Character Page - Interactive skill tracker for character progression.
     * @module CharacterPage
     * @version See window.characterPageConfig.buildVersion
     */

    // ============================================
    // Constants
    // ============================================

    /** @constant {string} Prefix for all localStorage keys */
    const STORAGE_PREFIX = 'corespace';

    /** @constant {string} Separator used in localStorage keys */
    const STORAGE_SEPARATOR = '::';

    /** @constant {RegExp} Valid character ID pattern (alphanumeric, hyphens, underscores) */
    const VALID_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

    // ============================================
    // State
    // ============================================

    /**
     * Application state container
     * @type {Object}
     */
    const state = {
        /** @type {Object|null} Current character data */
        character: null,
        /** @type {Map<string, Object>} Available classes for current character */
        classes: new Map(),
        /** @type {Map<string, Object>} All global class definitions */
        globalClasses: new Map(),
        /** @type {Map<string, Object>} All skill definitions */
        skills: new Map(),
        /** @type {string|null} Currently selected class ID */
        selectedClassId: null,
        /** @type {Object} Page configuration from window.characterPageConfig */
        config: {},
        /** @type {Array<Object>} List of available classes for this character */
        availableClassList: [],
    };

    /**
     * Cache for DOM element references to avoid repeated queries
     * @type {Map<string, Element>}
     */
    const domCache = new Map();

    // ============================================
    // Initialization
    // ============================================

    document.addEventListener('DOMContentLoaded', init);

    /**
     * Initialize the character page application.
     * Loads data, validates configuration, and renders initial state.
     * @async
     * @returns {Promise<void>}
     */
    async function init() {
        state.config = window.characterPageConfig || {};

        // Log build version if available
        if (state.config.buildVersion) {
            console.log('Character Page Build:', state.config.buildVersion);
        }

        const characterId = state.config.characterId || getCharacterIdFromUrl();

        if (!characterId) {
            renderError('No character specified. Add `?character=<id>` to the URL.');
            return;
        }

        // Validate character ID format
        if (!isValidId(characterId)) {
            renderError('Invalid character ID format. Only alphanumeric characters, hyphens, and underscores are allowed.');
            return;
        }

        let data;
        try {
            data = await loadData(state.config.dataPath || 'data/corespace-data.json');
        } catch (err) {
            console.error('Data loading error:', err);
            renderError(`Unable to load character data: ${err.message}`);
            return;
        }

        state.character = data.characters?.find((c) => c.id === characterId);
        if (!state.character) {
            renderError(`Character with id "${escapeHtml(characterId)}" not found in data file.`);
            return;
        }

        state.globalClasses = new Map((data.classes || []).map((cls) => [cls.id, cls]));
        const availableClasses = resolveAvailableClasses(data.classes || []);
        state.availableClassList = availableClasses;
        state.classes = new Map(availableClasses.map((cls) => [cls.id, cls]));
        state.skills = new Map((data.skills || []).map((skill) => [skill.id, skill]));

        if (!state.skills.size) {
            renderError('No skill definitions found in data file.');
            return;
        }

        populateStaticContent();
        buildClassSelector(state.availableClassList);
        const initialClass = resolveInitialClassId(state.availableClassList);
        if (!initialClass) {
            renderError('No classes available in data file.');
            return;
        }
        renderForClass(initialClass);
    }

    // ============================================
    // Validation Functions
    // ============================================

    /**
     * Validates an ID string against allowed patterns.
     * @param {string} id - The ID to validate
     * @returns {boolean} True if valid, false otherwise
     */
    function isValidId(id) {
        return typeof id === 'string' && VALID_ID_PATTERN.test(id);
    }

    /**
     * Escapes HTML special characters to prevent XSS.
     * @param {string} str - String to escape
     * @returns {string} Escaped string safe for HTML insertion
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ============================================
    // Data Loading
    // ============================================

    /**
     * Extracts character ID from URL query parameters.
     * @returns {string|null} Character ID or null if not found
     */
    function getCharacterIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('character');
        if (id && !isValidId(id)) {
            console.warn('Invalid character ID format in URL');
            return null;
        }
        return id;
    }

    /**
     * Loads and parses JSON data from a path.
     * @async
     * @param {string} path - Path to the JSON file
     * @returns {Promise<Object>} Parsed JSON data
     * @throws {Error} If fetch fails or JSON is invalid
     */
    async function loadData(path) {
        const response = await fetch(path, { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Failed to fetch character data: HTTP ${response.status}`);
        }
        try {
            return await response.json();
        } catch (err) {
            throw new Error('Invalid JSON format in data file');
        }
    }

    // ============================================
    // Class Resolution
    // ============================================

    /**
     * Resolves available classes for the current character.
     * Merges character-specific class boards with global class definitions.
     * @param {Array<Object>} fallbackClasses - Global class definitions
     * @returns {Array<Object>} Available classes for the character
     */
    function resolveAvailableClasses(fallbackClasses) {
        const boards = Array.isArray(state.character?.classBoards)
            ? state.character.classBoards
            : null;
        if (!boards || !boards.length) {
            return fallbackClasses;
        }

        // Check if this is a machine-only character (only has machine/machineTech classes)
        const isMachineOnly = boards.every(board =>
            board.id === 'machine' || board.id === 'machineTech'
        );

        // Machine characters only get their restricted class options
        if (isMachineOnly) {
            return boards.map((board) => {
                const global = state.globalClasses.get(board.id) || {};
                return {
                    ...global,
                    ...board,
                    availableSkills: board.availableSkills || global.availableSkills || [],
                    description: board.description || global.description || '',
                    flavorText: board.flavorText || global.flavorText || '',
                };
            });
        }

        // Non-machine characters get all classes, with character-specific customizations merged in
        const customBoards = new Map(boards.map(board => [board.id, board]));

        return fallbackClasses.map((globalClass) => {
            const customBoard = customBoards.get(globalClass.id);
            if (customBoard) {
                return {
                    ...globalClass,
                    ...customBoard,
                    availableSkills: customBoard.availableSkills || globalClass.availableSkills || [],
                    description: customBoard.description || globalClass.description || '',
                    flavorText: customBoard.flavorText || globalClass.flavorText || '',
                };
            }
            return globalClass;
        });
    }

    /**
     * Determines the initial class to display.
     * @param {Array<Object>} classes - Available classes
     * @returns {string|null} Class ID to display initially
     */
    function resolveInitialClassId(classes) {
        if (!classes.length) return null;
        if (state.config.defaultClass && state.classes.has(state.config.defaultClass)) {
            return state.config.defaultClass;
        }
        if (state.character?.defaultClass && state.classes.has(state.character.defaultClass)) {
            return state.character.defaultClass;
        }
        return classes[0].id;
    }

    // ============================================
    // DOM Cache Helpers
    // ============================================

    /**
     * Gets a cached DOM element reference, querying only if not cached.
     * @param {string} id - Element ID
     * @returns {Element|null} The DOM element or null
     */
    function getCachedElement(id) {
        if (!domCache.has(id)) {
            const el = document.getElementById(id);
            if (el) domCache.set(id, el);
            return el;
        }
        return domCache.get(id);
    }

    /**
     * Clears the DOM cache (call when re-rendering).
     */
    function clearDomCache() {
        domCache.clear();
    }

    // ============================================
    // Static Content Rendering
    // ============================================

    /**
     * Populates static character information on the page.
     */
    function populateStaticContent() {
        const { character } = state;
        if (!character) return;

        if (state.config.pageTitle) {
            document.title = state.config.pageTitle;
        }

        const tagline = getCachedElement('page-tagline');
        if (tagline) {
            tagline.textContent = `${character.name} - Character Progression Tracker`;
        }

        const breadcrumb = getCachedElement('breadcrumb-character');
        if (breadcrumb) {
            breadcrumb.textContent = character.name;
        }

        const overviewName = getCachedElement('overview-name');
        if (overviewName) {
            overviewName.textContent = character.name;
        }

        const description = getCachedElement('character-description');
        if (description) {
            description.textContent = character.description || 'No description available.';
        }

        const notes = getCachedElement('character-notes');
        if (notes) {
            if (character.notes) {
                notes.hidden = false;
                notes.textContent = character.notes;
            } else {
                notes.hidden = true;
            }
        }

        renderBaseStats(character);
        renderInherentSkills(character);
    }

    /**
     * Renders character base stats.
     * @param {Object} character - Character data
     */
    function renderBaseStats(character) {
        const baseStats = getCachedElement('base-stats');
        if (!baseStats) return;

        // Clear existing content safely
        while (baseStats.firstChild) {
            baseStats.removeChild(baseStats.firstChild);
        }

        if (character.baseStats) {
            Object.entries(character.baseStats).forEach(([stat, value]) => {
                const statEl = document.createElement('span');
                statEl.className = 'stat';
                statEl.textContent = `${formatStatName(stat)}: ${value}`;
                baseStats.appendChild(statEl);
            });
        }
    }

    /**
     * Renders character inherent skills.
     * @param {Object} character - Character data
     */
    function renderInherentSkills(character) {
        const inherent = getCachedElement('inherent-skills');
        if (!inherent) return;

        // Clear existing content safely
        while (inherent.firstChild) {
            inherent.removeChild(inherent.firstChild);
        }

        (character.inherentSkills || []).forEach((skillRef) => {
            const skill = state.skills.get(skillRef.skillId);
            const badge = document.createElement('span');
            badge.className = 'skill-badge inherent';

            const label = document.createElement('span');
            label.className = 'badge-label';
            label.textContent = skill ? skill.name : skillRef.skillId;
            badge.appendChild(label);

            const detail = document.createElement('span');
            detail.textContent = ` FREE Lv ${skillRef.level}`;
            badge.appendChild(detail);

            inherent.appendChild(badge);
        });
    }

    // ============================================
    // Class Selector
    // ============================================

    /**
     * Builds the class selection dropdown.
     * @param {Array<Object>} classes - Available classes
     */
    function buildClassSelector(classes) {
        const select = getCachedElement('class-select');
        if (!select) return;

        // Clear existing options safely
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }

        classes.forEach((cls) => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;
            select.appendChild(option);
        });

        select.addEventListener('change', (event) => {
            const newClassId = event.target.value;
            renderForClass(newClassId);
        });
    }

    // ============================================
    // Class Rendering
    // ============================================

    /**
     * Renders the page for a specific class.
     * @param {string} classId - Class ID to render
     */
    function renderForClass(classId) {
        if (!state.classes.has(classId)) {
            renderError(`Class with id "${escapeHtml(classId)}" not found in data file.`);
            return;
        }
        state.selectedClassId = classId;
        const cls = state.classes.get(classId);
        const select = getCachedElement('class-select');
        if (select && select.value !== classId) {
            select.value = classId;
        }

        renderClassSummary(cls);
        const entries = computeSkillEntries(state.character, cls);
        renderSkillCards(entries, cls);
        renderPassiveSummary(entries);
        renderReactionSummary(entries);
        refreshSummaries();
        registerResetHandler();
    }

    /**
     * Renders the class summary description.
     * @param {Object} cls - Class data
     */
    function renderClassSummary(cls) {
        const summary = getCachedElement('class-summary');
        if (summary) {
            summary.textContent = cls?.description || 'No description for this class yet.';
        }
    }

    // ============================================
    // Skill Entry Computation
    // ============================================

    /**
     * Computes skill entries for a character with a specific class.
     * Merges inherent skills with class-available skills.
     * @param {Object} character - Character data
     * @param {Object} cls - Class data
     * @returns {Array<Object>} Sorted array of skill entry objects
     */
    function computeSkillEntries(character, cls) {
        const entries = new Map();
        const inherentSkills = new Map((character.inherentSkills || []).map((s) => [s.skillId, s]));

        inherentSkills.forEach((skillData, skillId) => {
            const skill = state.skills.get(skillId);
            if (!skill) {
                console.warn(`Missing skill definition for inherent skill: ${skillId}`);
                return;
            }
            entries.set(skillId, {
                skill,
                inherentLevel: skillData.level || 0,
                inherentNote: skillData.note || '',
                classMaxLevel: 0,
                classNotes: [],
            });
        });

        (cls.availableSkills || []).forEach((skillInfo) => {
            const skill = state.skills.get(skillInfo.skillId);
            if (!skill) {
                console.warn(`Missing skill definition for class skill: ${skillInfo.skillId}`);
                return;
            }
            const existing = entries.get(skillInfo.skillId) || {
                skill,
                inherentLevel: 0,
                inherentNote: '',
                classMaxLevel: 0,
                classNotes: [],
            };
            existing.classMaxLevel = Math.max(existing.classMaxLevel, skillInfo.maxLevel || 0);
            if (skillInfo.notes) {
                existing.classNotes.push(skillInfo.notes);
            }
            entries.set(skillInfo.skillId, existing);
        });

        return Array.from(entries.values())
            .map((entry) => ({
                ...entry,
                maxLevel: (entry.inherentLevel || 0) + (entry.classMaxLevel || 0),
                levels: buildLevelDetails(entry.skill, (entry.inherentLevel || 0) + (entry.classMaxLevel || 0)),
            }))
            .filter((entry) => entry.maxLevel > 0 && entry.levels.length > 0)
            .sort((a, b) => {
                if (a.skill.category === b.skill.category) {
                    return a.skill.name.localeCompare(b.skill.name);
                }
                return a.skill.category.localeCompare(b.skill.category);
            });
    }

    /**
     * Builds level detail objects for a skill.
     * @param {Object} skill - Skill data
     * @param {number} maxLevel - Maximum level available
     * @returns {Array<Object>} Level detail objects
     */
    function buildLevelDetails(skill, maxLevel) {
        const details = [];

        (skill.levels || []).forEach((levelInfo) => {
            if (typeof levelInfo.level !== 'number') {
                return;
            }
            if (levelInfo.level > maxLevel) {
                return;
            }
            const text = levelInfo.passiveEffect || levelInfo.effect || levelInfo.description || levelInfo.summary;
            if (!text) {
                return;
            }
            details.push({
                level: levelInfo.level,
                label: levelInfo.isPassive ? `Passive ${levelInfo.level}` : `Level ${levelInfo.level}`,
                isPassive: Boolean(levelInfo.isPassive),
                isReaction: Boolean(levelInfo.isReaction),
                trigger: levelInfo.trigger || null,
                text,
                notes: levelInfo.notes || null,
                pegCost: levelInfo.pegCost,
                dataLevel: levelInfo.isPassive ? 'passive' : String(levelInfo.level),
            });
        });

        return details;
    }

    // ============================================
    // Skill Card Rendering
    // ============================================

    /**
     * Renders all skill cards for the current class.
     * @param {Array<Object>} entries - Skill entries to render
     * @param {Object} cls - Current class data
     */
    function renderSkillCards(entries, cls) {
        const grid = getCachedElement('skills-grid');
        if (!grid) return;

        // Clear existing content safely
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        if (!entries.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = 'No skills available for this configuration yet.';
            grid.appendChild(empty);
            return;
        }

        entries.forEach((entry) => {
            const card = createSkillCard(entry, cls);
            grid.appendChild(card);
        });
    }

    /**
     * Creates a skill card DOM element.
     * @param {Object} entry - Skill entry data
     * @param {Object} cls - Current class data
     * @returns {Element} Skill card element
     */
    function createSkillCard(entry, cls) {
        const card = document.createElement('div');
        card.className = 'action-card';
        card.dataset.skill = entry.skill.id;
        card.dataset.inherentLevel = String(entry.inherentLevel || 0);

        const select = buildLevelSelector(entry);
        card.appendChild(select);

        // Title container with icon
        const titleContainer = document.createElement('div');
        titleContainer.className = 'skill-title-container';

        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'skill-icon-wrapper';

        const icon = document.createElement('img');
        const iconFilename = entry.skill.id.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') + '.png';
        icon.src = `images/skills/${iconFilename}`;
        icon.alt = entry.skill.name;
        icon.className = 'skill-icon';
        icon.onerror = function() {
            this.style.display = 'none';
            iconWrapper.style.display = 'none';
        };
        iconWrapper.appendChild(icon);
        titleContainer.appendChild(iconWrapper);

        const title = document.createElement('div');
        title.className = 'action-card-title';
        title.textContent = entry.skill.name;
        titleContainer.appendChild(title);

        card.appendChild(titleContainer);

        // Subtitle
        const subtitle = document.createElement('div');
        subtitle.className = 'action-requirements';
        subtitle.textContent = buildSkillSubtitle(entry.skill);
        card.appendChild(subtitle);

        // Summary
        if (entry.skill.summary) {
            const summaryEl = document.createElement('div');
            summaryEl.className = 'skill-summary';
            summaryEl.textContent = entry.skill.summary;
            card.appendChild(summaryEl);
        }

        // Meta (badges and notes)
        const meta = buildSkillMeta(entry, cls);
        if (meta) {
            card.appendChild(meta);
        }

        // Level details
        const levelsContainer = document.createElement('div');
        entry.levels.forEach((level) => {
            const levelEl = buildLevelElement(level);
            levelsContainer.appendChild(levelEl);
        });
        card.appendChild(levelsContainer);

        // Initialize state from storage
        const savedLevel = loadSkillLevel(entry.skill.id, entry.inherentLevel || 0);
        select.value = String(savedLevel);
        updateSkillDisplay(entry.skill.id, savedLevel);

        // Add change listener
        select.addEventListener('change', (event) => {
            const newLevel = parseInt(event.target.value, 10) || 0;
            saveSkillLevel(entry.skill.id, newLevel);
            updateSkillDisplay(entry.skill.id, newLevel);
        });

        return card;
    }

    /**
     * Builds a level selector dropdown for a skill.
     * @param {Object} entry - Skill entry data
     * @returns {Element} Select element
     */
    function buildLevelSelector(entry) {
        const select = document.createElement('select');
        select.className = 'skill-select';
        select.setAttribute('aria-label', `${entry.skill.name} level selector`);
        const max = entry.maxLevel || 0;

        for (let level = 0; level <= max; level += 1) {
            const option = document.createElement('option');
            option.value = String(level);
            option.textContent = level === 0 ? 'Not Learned' : `Level ${level}`;
            select.appendChild(option);
        }
        return select;
    }

    /**
     * Builds the skill type/category subtitle.
     * @param {Object} skill - Skill data
     * @returns {string} Formatted subtitle
     */
    function buildSkillSubtitle(skill) {
        const pieces = [];
        if (skill.type) {
            pieces.push(formatSkillType(skill.type));
        }
        if (skill.category) {
            pieces.push(skill.category);
        }
        return pieces.join(' · ');
    }

    /**
     * Builds skill metadata (badges and notes).
     * @param {Object} entry - Skill entry data
     * @param {Object} cls - Current class data
     * @returns {Element|null} Meta container or null
     */
    function buildSkillMeta(entry, cls) {
        const container = document.createElement('div');
        container.className = 'skill-meta';

        const badges = document.createElement('div');
        badges.className = 'skill-badges';
        let hasBadge = false;

        if (entry.inherentLevel) {
            badges.appendChild(createBadge(`Inherent Lv ${entry.inherentLevel}`, 'inherent'));
            hasBadge = true;
        }
        if (entry.classMaxLevel) {
            badges.appendChild(createBadge(`${cls.name} max Lv ${entry.classMaxLevel}`, 'class-source'));
            hasBadge = true;
        }
        if (entry.maxLevel > entry.classMaxLevel && entry.classMaxLevel) {
            badges.appendChild(createBadge(`Total max Lv ${entry.maxLevel}`, 'max-level'));
            hasBadge = true;
        }

        if (hasBadge) {
            container.appendChild(badges);
        }

        const notes = [];
        if (entry.inherentNote) {
            notes.push(entry.inherentNote);
        }
        notes.push(...(entry.classNotes || []));
        if (notes.length) {
            const noteEl = document.createElement('div');
            noteEl.className = 'skill-note';
            noteEl.textContent = notes.join(' ');
            container.appendChild(noteEl);
        }

        if (!container.childNodes.length) {
            return null;
        }
        return container;
    }

    /**
     * Creates a badge element.
     * @param {string} text - Badge text
     * @param {string} variant - Badge variant class
     * @returns {Element} Badge element
     */
    function createBadge(text, variant) {
        const badge = document.createElement('span');
        badge.className = `skill-badge ${variant}`;
        const label = document.createElement('span');
        label.className = 'badge-label';
        label.textContent = text;
        badge.appendChild(label);
        return badge;
    }

    /**
     * Builds a skill level detail element.
     * @param {Object} level - Level data
     * @returns {Element} Level element
     */
    function buildLevelElement(level) {
        const levelEl = document.createElement('div');
        levelEl.className = 'skill-level hidden';
        levelEl.dataset.level = level.dataLevel;
        levelEl.dataset.minLevel = String(level.level);

        if (level.trigger) {
            const trigger = document.createElement('div');
            trigger.className = 'skill-trigger';
            trigger.textContent = `Trigger: ${level.trigger}`;
            levelEl.appendChild(trigger);
        }

        const label = document.createElement('span');
        label.className = 'level-label';
        label.dataset.level = level.dataLevel;
        label.textContent = `${level.label}:`;
        levelEl.appendChild(label);

        const text = document.createElement('span');
        text.textContent = ` ${level.text}`;
        levelEl.appendChild(text);

        if (level.notes) {
            const notes = document.createElement('div');
            notes.className = 'skill-note';
            notes.textContent = level.notes;
            levelEl.appendChild(notes);
        }

        // Peg cost: passive skills are free, non-passive skills cost pegs equal to their level
        const cost = document.createElement('div');
        cost.className = 'skill-note';
        if (level.isPassive) {
            cost.textContent = 'Peg Cost: Free';
        } else {
            const pegs = level.level || 1;
            cost.textContent = `Peg Cost: ${pegs} Peg${pegs > 1 ? 's' : ''}`;
        }
        levelEl.appendChild(cost);

        return levelEl;
    }

    // ============================================
    // Summary Rendering (Passives & Reactions)
    // ============================================

    /**
     * Renders the passive skills summary section.
     * Uses safe DOM methods instead of innerHTML.
     * @param {Array<Object>} entries - Skill entries
     */
    function renderPassiveSummary(entries) {
        const container = getCachedElement('passive-skills-list');
        if (!container) return;

        // Clear safely
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        entries.forEach((entry) => {
            entry.levels
                .filter((level) => level.isPassive)
                .forEach((level) => {
                    const passive = document.createElement('div');
                    passive.className = 'passive-item';
                    passive.dataset.skill = entry.skill.id;
                    passive.dataset.minLevel = String(level.level);

                    const strong = document.createElement('strong');
                    strong.textContent = `${entry.skill.name} ${level.level}:`;
                    passive.appendChild(strong);
                    passive.appendChild(document.createTextNode(` ${level.text}`));

                    container.appendChild(passive);
                });
        });
    }

    /**
     * Renders the reaction skills summary section.
     * Uses safe DOM methods instead of innerHTML.
     * @param {Array<Object>} entries - Skill entries
     */
    function renderReactionSummary(entries) {
        const container = getCachedElement('reaction-skills-list');
        if (!container) return;

        // Clear safely
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        entries.forEach((entry) => {
            entry.levels
                .filter((level) => level.isReaction)
                .forEach((level) => {
                    const reaction = document.createElement('div');
                    reaction.className = 'passive-item';
                    reaction.dataset.skill = entry.skill.id;
                    reaction.dataset.minLevel = String(level.level);

                    const strong = document.createElement('strong');
                    strong.textContent = `${entry.skill.name} ${level.level}:`;
                    reaction.appendChild(strong);

                    const triggerText = level.trigger ? ` ${level.trigger} — ` : ' ';
                    reaction.appendChild(document.createTextNode(triggerText + level.text));

                    container.appendChild(reaction);
                });
        });
    }

    /**
     * Refreshes visibility of passive and reaction summaries based on current skill levels.
     */
    function refreshSummaries() {
        updateSummaryVisibility('passive-skills-list', 'no-passives');
        updateSummaryVisibility('reaction-skills-list', 'no-reactions');
    }

    /**
     * Updates visibility of summary items based on current skill levels.
     * @param {string} listId - Container element ID
     * @param {string} emptyStateId - Empty state element ID
     */
    function updateSummaryVisibility(listId, emptyStateId) {
        const list = getCachedElement(listId);
        const emptyState = getCachedElement(emptyStateId);
        if (!list || !emptyState) return;

        const items = Array.from(list.children);
        let hasVisible = false;
        items.forEach((item) => {
            const minLevel = parseInt(item.dataset.minLevel || '1', 10);
            const skillId = item.dataset.skill;
            const currentLevel = getCurrentSkillLevel(skillId);
            if (currentLevel >= minLevel) {
                item.style.display = '';
                hasVisible = true;
            } else {
                item.style.display = 'none';
            }
        });

        emptyState.style.display = hasVisible ? 'none' : 'block';
    }

    // ============================================
    // Skill Display & State Management
    // ============================================

    /**
     * Updates the display of a skill card based on its level.
     * @param {string} skillId - Skill ID
     * @param {number} level - Current level
     */
    function updateSkillDisplay(skillId, level) {
        const selector = `.action-card[data-skill="${CSS.escape(skillId)}"]`;
        const card = document.querySelector(selector);

        if (!card) {
            console.warn(`Card not found for skill: ${skillId}`);
            return;
        }

        if (level === 0) {
            card.classList.add('not-learned');
        } else {
            card.classList.remove('not-learned');
        }

        const levelEls = card.querySelectorAll('.skill-level');
        levelEls.forEach((el) => {
            const minLevel = parseInt(el.dataset.minLevel || '1', 10);
            if (level >= minLevel) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });

        refreshSummaries();
    }

    /**
     * Gets the current skill level from its selector.
     * @param {string} skillId - Skill ID
     * @returns {number} Current level
     */
    function getCurrentSkillLevel(skillId) {
        const select = document.querySelector(`[data-skill="${CSS.escape(skillId)}"] .skill-select`);
        if (!select) return 0;
        return parseInt(select.value, 10) || 0;
    }

    // ============================================
    // LocalStorage Management
    // ============================================

    /**
     * Saves a skill level to localStorage.
     * @param {string} skillId - Skill ID
     * @param {number} level - Level to save
     */
    function saveSkillLevel(skillId, level) {
        try {
            const key = buildStorageKey(skillId);
            localStorage.setItem(key, String(level));
        } catch (err) {
            console.warn('Unable to save skill level to localStorage', err);
        }
    }

    /**
     * Loads a skill level from localStorage.
     * @param {string} skillId - Skill ID
     * @param {number} [fallback=0] - Default value if not found
     * @returns {number} Stored level or fallback
     */
    function loadSkillLevel(skillId, fallback = 0) {
        try {
            const key = buildStorageKey(skillId);
            const stored = localStorage.getItem(key);
            if (stored === null) {
                return fallback;
            }
            const value = parseInt(stored, 10);
            return Number.isNaN(value) ? fallback : value;
        } catch (err) {
            console.warn('Unable to read skill level from localStorage', err);
            return fallback;
        }
    }

    /**
     * Builds a localStorage key for a skill.
     * Format: corespace::character::{characterId}::{classId}::{skillId}
     * @param {string} skillId - Skill ID
     * @returns {string} Storage key
     */
    function buildStorageKey(skillId) {
        const parts = [
            STORAGE_PREFIX,
            'character',
            state.character.id,
            state.selectedClassId || 'default',
            skillId
        ];
        return parts.join(STORAGE_SEPARATOR);
    }

    // ============================================
    // Reset Handler
    // ============================================

    /**
     * Registers the reset button click handler.
     */
    function registerResetHandler() {
        const reset = getCachedElement('reset-button');
        if (!reset) return;
        reset.onclick = () => {
            const confirmed = window.confirm('Reset all skills to their inherent level?');
            if (!confirmed) return;
            const cards = document.querySelectorAll('[data-skill]');
            cards.forEach((card) => {
                const inherent = parseInt(card.dataset.inherentLevel || '0', 10);
                const select = card.querySelector('.skill-select');
                if (!select) return;
                select.value = String(inherent);
                saveSkillLevel(card.dataset.skill, inherent);
                updateSkillDisplay(card.dataset.skill, inherent);
            });
        };
    }

    // ============================================
    // Error Display
    // ============================================

    /**
     * Displays an error message and hides the main content.
     * @param {string} message - Error message to display
     */
    function renderError(message) {
        const panel = getCachedElement('error-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.textContent = message;
        }
        const content = getCachedElement('character-content');
        if (content) {
            content.style.display = 'none';
        }
    }

    // ============================================
    // Formatting Utilities
    // ============================================

    /**
     * Formats a camelCase stat name for display.
     * @param {string} stat - Stat name
     * @returns {string} Formatted name
     */
    function formatStatName(stat) {
        return stat.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
    }

    /**
     * Formats a skill type for display.
     * @param {string} type - Skill type
     * @returns {string} Formatted type name
     */
    function formatSkillType(type) {
        switch (type) {
            case 'reaction':
                return 'Reaction Skill';
            case 'passive':
                return 'Passive Skill';
            case 'between-game':
                return 'Between Game Skill';
            case 'mixed':
                return 'Mixed Skill';
            case 'standard':
            default:
                return 'Active Skill';
        }
    }
})();
