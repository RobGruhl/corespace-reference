(function () {
    console.log('Character Page JS Build: 2025.11.05.001');

    const skillSummaries = {
        accelerate: "Make extra Move or Assault actions for enhanced mobility.",
        ambush: "Attack enemies from cover when they move near you.",
        assist: "Protect allies from ranged attacks or restore their health.",
        barter: "Re-roll trade costs or sell items at better prices between games.",
        blast: "Expel energy blasts for ranged attacks or propulsive movement.",
        bodyguardProtocol: "Protect allies by taking hits for them and healing them.",
        brutalAssault: "Make powerful close combat attacks that knock enemies prone.",
        camouflage: "Become untargetable while in contact with walls or terrain.",
        charge: "Rush into enemies and deal knock back damage.",
        combatExpert: "Reduce attacks of opportunity and make versatile close assaults.",
        counterShot: "Return fire against enemies who attack you.",
        disarm: "Steal enemy weapons when they fail to damage you in melee.",
        disconnect: "Enter a rage state for extra combat power, then become uncontrolled.",
        distraction: "Cause enemies to lose actions with clever distractions.",
        disrupt: "Jam enemy tech or shut down Purge units electronically.",
        energize: "Boost vitality to move, attack, or heal yourself.",
        engineering: "Apply repair points automatically without rolling.",
        evade: "Escape from enemy contact with quick movement.",
        fadeToBlack: "Vanish into cover to avoid ranged attacks.",
        hackAndGrab: "Lock/unlock doors, pickpocket enemies, or inspect crates remotely.",
        hack: "Shut down Purge units or control doors with hacking.",
        hardToHit: "Become immune to ranged damage while in cover or at distance.",
        heel: "Move to protect your handler and absorb damage for them.",
        impervious: "Resist effects that cost actions and boost your armor.",
        kata: "Add extra dice to close assault attacks.",
        lightFingers: "Steal items from attackers during combat.",
        manipulate: "Disrupt enemy minds, break their equipment, or move terrain.",
        marksman: "Make precise ranged attacks that can hit multiple targets.",
        negotiation: "Re-roll Persuade dice and improve extraction outcomes or work diplomatically with enemy crews.",
        onslaught: "Chain multiple close assault attacks together.",
        overdrive: "Take extra actions at the cost of health or self-destruct.",
        persuasion: "Convince enemies to miss turns or join your crew.",
        reflexes: "Ignore close assault hits and counter-attack instantly.",
        regulate: "Reduce hostility or repair items and machines.",
        repair: "Fix equipment and heal machines with repair nanites.",
        reroute: "Restore health or recover from being defeated.",
        scanners: "Inspect crates, manipulate Purge sensors, or jam transmissions.",
        scientificMind: "Re-roll chance dice or create chemical compounds between games.",
        slippery: "Move with enhanced scrambling ability and ignore attacks of opportunity.",
        sonicRoar: "Emit sonic pulses that stun and knock down Purge enemies.",
        stubborn: "Make steady movement and assault actions.",
        sureShot: "Roll targeted attacks against multiple enemies.",
        training: "Allow allies to repeat your actions or gain career points.",
        walkItOff: "Restore health, reduce damage, or recover from defeat.",
        weaponsExpert: "Reload effortlessly and make devastating ranged attacks."
    };

    const state = {
        character: null,
        classes: new Map(),
        globalClasses: new Map(),
        skills: new Map(),
        selectedClassId: null,
        config: {},
        availableClassList: [],
    };

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        state.config = window.characterPageConfig || {};
        const characterId = state.config.characterId || getCharacterIdFromUrl();
        if (!characterId) {
            renderError('No character specified. Add `?character=<id>` to the URL.');
            return;
        }

        let data;
        try {
            data = await loadData(state.config.dataPath || 'data/corespace-data.json');
        } catch (err) {
            console.error(err);
            renderError('Unable to load character data. Please verify that `docs/data/corespace-data.json` exists.');
            return;
        }

        state.character = data.characters?.find((c) => c.id === characterId);
        if (!state.character) {
            renderError(`Character with id "${characterId}" not found in data file.`);
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
                // Merge character-specific customizations with global class
                return {
                    ...globalClass,
                    ...customBoard,
                    availableSkills: customBoard.availableSkills || globalClass.availableSkills || [],
                    description: customBoard.description || globalClass.description || '',
                    flavorText: customBoard.flavorText || globalClass.flavorText || '',
                };
            }
            // Use global class definition as-is
            return globalClass;
        });
    }

    function getCharacterIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('character');
    }

    async function loadData(path) {
        const response = await fetch(path, { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Failed to fetch character data: ${response.status}`);
        }
        return response.json();
    }

    function populateStaticContent() {
        const { character } = state;
        if (!character) return;

        if (state.config.pageTitle) {
            document.title = state.config.pageTitle;
        }

        const tagline = document.getElementById('page-tagline');
        if (tagline) {
            tagline.textContent = `${character.name} - Character Progression Tracker`;
        }

        const breadcrumb = document.getElementById('breadcrumb-character');
        if (breadcrumb) {
            breadcrumb.textContent = character.name;
        }

        const overviewName = document.getElementById('overview-name');
        if (overviewName) {
            overviewName.textContent = character.name;
        }

        const description = document.getElementById('character-description');
        if (description) {
            description.textContent = character.description || 'No description available.';
        }

        const notes = document.getElementById('character-notes');
        if (notes) {
            if (character.notes) {
                notes.style.display = 'block';
                notes.textContent = character.notes;
            } else {
                notes.style.display = 'none';
            }
        }

        const baseStats = document.getElementById('base-stats');
        if (baseStats) {
            baseStats.innerHTML = '';
            if (character.baseStats) {
                Object.entries(character.baseStats).forEach(([stat, value]) => {
                    const statEl = document.createElement('span');
                    statEl.className = 'stat';
                    statEl.textContent = `${formatStatName(stat)}: ${value}`;
                    baseStats.appendChild(statEl);
                });
            }
        }

        const inherent = document.getElementById('inherent-skills');
        if (inherent) {
            inherent.innerHTML = '';
            (character.inherentSkills || []).forEach((skillRef) => {
                const skill = state.skills.get(skillRef.skillId);
                const badge = document.createElement('span');
                badge.className = 'skill-badge inherent';
                const label = document.createElement('span');
                label.className = 'badge-label';
                label.textContent = skill ? skill.name : skillRef.skillId;
                badge.appendChild(label);
                const detail = document.createElement('span');
                detail.textContent = `FREE Lv ${skillRef.level}`;
                badge.appendChild(detail);
                inherent.appendChild(badge);
            });
        }
    }

    function buildClassSelector(classes) {
        const select = document.getElementById('class-select');
        if (!select) return;
        select.innerHTML = '';

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

    function renderForClass(classId) {
        if (!state.classes.has(classId)) {
            renderError(`Class with id "${classId}" not found in data file.`);
            return;
        }
        state.selectedClassId = classId;
        const cls = state.classes.get(classId);
        const select = document.getElementById('class-select');
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

    function renderClassSummary(cls) {
        const summary = document.getElementById('class-summary');
        if (summary) {
            summary.textContent = cls?.description || 'No description for this class yet.';
        }
    }

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

    function renderSkillCards(entries, cls) {
        const grid = document.getElementById('skills-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (!entries.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = 'No skills available for this configuration yet.';
            grid.appendChild(empty);
            return;
        }

        entries.forEach((entry) => {
            const card = document.createElement('div');
            card.className = 'action-card';
            card.dataset.skill = entry.skill.id;
            card.dataset.inherentLevel = String(entry.inherentLevel || 0);

            const select = buildLevelSelector(entry);
            card.appendChild(select);

            const titleContainer = document.createElement('div');
            titleContainer.style.display = 'flex';
            titleContainer.style.alignItems = 'center';
            titleContainer.style.gap = '10px';
            titleContainer.style.marginBottom = '8px';

            const iconWrapper = document.createElement('div');
            iconWrapper.style.width = '40px';
            iconWrapper.style.height = '40px';
            iconWrapper.style.flexShrink = '0';

            const icon = document.createElement('img');
            const iconFilename = entry.skill.id.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') + '.png';
            icon.src = `images/skills/${iconFilename}`;
            icon.alt = entry.skill.name;
            icon.style.width = '40px';
            icon.style.height = '40px';
            icon.style.objectFit = 'contain';
            icon.onerror = function() {
                this.style.display = 'none';
                iconWrapper.style.display = 'none';
            };
            iconWrapper.appendChild(icon);
            titleContainer.appendChild(iconWrapper);

            const title = document.createElement('div');
            title.className = 'action-card-title';
            title.style.margin = '0';
            title.textContent = entry.skill.name;
            titleContainer.appendChild(title);

            card.appendChild(titleContainer);

            const subtitle = document.createElement('div');
            subtitle.className = 'action-requirements';
            subtitle.textContent = buildSkillSubtitle(entry.skill);
            card.appendChild(subtitle);

            const summary = skillSummaries[entry.skill.id];
            if (summary) {
                const summaryEl = document.createElement('div');
                summaryEl.className = 'skill-summary';
                summaryEl.style.fontSize = '0.85em';
                summaryEl.style.color = '#ddd';
                summaryEl.style.marginTop = '6px';
                summaryEl.style.marginBottom = '10px';
                summaryEl.style.lineHeight = '1.4';
                summaryEl.textContent = summary;
                card.appendChild(summaryEl);
            }

            const meta = buildSkillMeta(entry, cls);
            if (meta) {
                card.appendChild(meta);
            }

            const levelsContainer = document.createElement('div');
            entry.levels.forEach((level) => {
                const levelEl = buildLevelElement(level);
                levelsContainer.appendChild(levelEl);
            });
            card.appendChild(levelsContainer);

            grid.appendChild(card);

            const savedLevel = loadSkillLevel(entry.skill.id, entry.inherentLevel || 0);
            select.value = String(savedLevel);
            updateSkillDisplay(entry.skill.id, savedLevel);

            select.addEventListener('change', (event) => {
                const newLevel = parseInt(event.target.value, 10) || 0;
                saveSkillLevel(entry.skill.id, newLevel);
                updateSkillDisplay(entry.skill.id, newLevel);
            });
        });
    }

    function buildLevelSelector(entry) {
        const select = document.createElement('select');
        select.className = 'skill-select';
        const max = entry.maxLevel || 0;

        for (let level = 0; level <= max; level += 1) {
            const option = document.createElement('option');
            option.value = String(level);
            option.textContent = level === 0 ? 'Not Learned' : `Level ${level}`;
            select.appendChild(option);
        }
        return select;
    }

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

    function createBadge(text, variant) {
        const badge = document.createElement('span');
        badge.className = `skill-badge ${variant}`;
        const label = document.createElement('span');
        label.className = 'badge-label';
        label.textContent = text;
        badge.appendChild(label);
        return badge;
    }

    function buildLevelElement(level) {
        const levelEl = document.createElement('div');
        levelEl.className = 'skill-level hidden'; // Start hidden, updateSkillDisplay will show if needed
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
        text.textContent = level.text;
        levelEl.appendChild(text);

        if (level.notes) {
            const notes = document.createElement('div');
            notes.className = 'skill-note';
            notes.textContent = level.notes;
            levelEl.appendChild(notes);
        }

        if (typeof level.pegCost === 'number') {
            const cost = document.createElement('div');
            cost.className = 'skill-note';
            cost.textContent = `Peg Cost: ${level.pegCost}`;
            levelEl.appendChild(cost);
        }

        return levelEl;
    }

    function renderPassiveSummary(entries) {
        const container = document.getElementById('passive-skills-list');
        if (!container) return;
        container.innerHTML = '';

        entries.forEach((entry) => {
            entry.levels
                .filter((level) => level.isPassive)
                .forEach((level) => {
                    const passive = document.createElement('div');
                    passive.className = 'passive-item';
                    passive.dataset.skill = entry.skill.id;
                    passive.dataset.minLevel = String(level.level);
                    passive.innerHTML = `<strong>${entry.skill.name} ${level.level}:</strong> ${level.text}`;
                    container.appendChild(passive);
                });
        });
    }

    function renderReactionSummary(entries) {
        const container = document.getElementById('reaction-skills-list');
        if (!container) return;
        container.innerHTML = '';

        entries.forEach((entry) => {
            entry.levels
                .filter((level) => level.isReaction)
                .forEach((level) => {
                    const reaction = document.createElement('div');
                    reaction.className = 'passive-item';
                    reaction.dataset.skill = entry.skill.id;
                    reaction.dataset.minLevel = String(level.level);
                    const triggerText = level.trigger ? `${level.trigger} — ` : '';
                    reaction.innerHTML = `<strong>${entry.skill.name} ${level.level}:</strong> ${triggerText}${level.text}`;
                    container.appendChild(reaction);
                });
        });
    }

    function refreshSummaries() {
        updateSummaryVisibility('passive-skills-list', 'no-passives');
        updateSummaryVisibility('reaction-skills-list', 'no-reactions');
    }

    function updateSummaryVisibility(listId, emptyStateId) {
        const list = document.getElementById(listId);
        const emptyState = document.getElementById(emptyStateId);
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

    function saveSkillLevel(skillId, level) {
        try {
            const key = storageKey(skillId);
            localStorage.setItem(key, String(level));
        } catch (err) {
            console.warn('Unable to save skill level to localStorage', err);
        }
    }

    function loadSkillLevel(skillId, fallback = 0) {
        try {
            const key = storageKey(skillId);
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

    function storageKey(skillId) {
        const parts = ['corespace', 'character', state.character.id];
        parts.push(state.selectedClassId || 'default');
        parts.push(skillId);
        return parts.join('::');
    }

    function getCurrentSkillLevel(skillId) {
        const select = document.querySelector(`[data-skill="${CSS.escape(skillId)}"] .skill-select`);
        if (!select) return 0;
        return parseInt(select.value, 10) || 0;
    }

    function registerResetHandler() {
        const reset = document.getElementById('reset-button');
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

    function renderError(message) {
        const panel = document.getElementById('error-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.textContent = message;
        }
        const content = document.getElementById('character-content');
        if (content) {
            content.style.display = 'none';
        }
    }

    function formatStatName(stat) {
        return stat.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
    }

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
