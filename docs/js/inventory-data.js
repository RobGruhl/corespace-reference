/**
 * Core Space First Born - Inventory Data
 *
 * All item tokens from First Born base game and Yamato expansion.
 * Items are organized by category for easier browsing.
 *
 * Data sourced from xinix/core-space open source project (MIT License)
 * https://github.com/xinix/core-space
 */

const INVENTORY_DATA = {
    // Icon definitions with display names and descriptions
    icons: {
        // Combat icons
        'burst-1': { name: 'Burst 1', desc: 'Fire an additional shot (uses extra ammo)', symbol: '🔥' },
        'burst-2': { name: 'Burst 2', desc: 'Fire two additional shots (uses extra ammo)', symbol: '🔥🔥' },
        'full-charge': { name: 'Full Charge', desc: 'No ammo required - energy weapon', symbol: '⚡' },
        'reliable': { name: 'Reliable', desc: 'Re-roll one miss', symbol: '✓' },
        'super-reliable': { name: 'Super Reliable', desc: 'Re-roll all misses', symbol: '✓✓' },
        'silent': { name: 'Silent', desc: 'Does not add peg to hostility tracker', symbol: '🤫' },
        'infinite': { name: 'Infinite', desc: 'Never runs out of ammo', symbol: '∞' },
        're-roll': { name: 'Re-roll', desc: 'Re-roll combat dice', symbol: '🎲' },
        're-roll-ranged': { name: 'Ranged Re-roll', desc: 'Re-roll ranged attack dice', symbol: '🎯' },
        'target-lock': { name: 'Target Lock', desc: 'Lock onto target for bonus', symbol: '🎯' },
        'effortless-reload': { name: 'Effortless Reload', desc: 'Reload as effortless action', symbol: '↻' },
        'ammo-returns': { name: 'Ammo Returns', desc: 'Ammo returns after use', symbol: '↩️' },
        'grenade-launcher': { name: 'Grenade Launcher', desc: 'Can launch grenades', symbol: '💣' },
        'ignore-armour': { name: 'Ignore Armour', desc: 'Bypasses physical armour', symbol: '🛡️❌' },
        'ignore-shield': { name: 'Ignore Shield', desc: 'Bypasses energy shields', symbol: '🔵❌' },
        'auto-close-hit': { name: 'Auto Close Hit', desc: 'Automatic hit in close combat', symbol: '⚔️✓' },

        // Defense icons
        'flip': { name: 'Flip', desc: 'Can be flipped to use ability', symbol: '↔️' },
        'discard': { name: 'Discard', desc: 'Discard after use', symbol: '🗑️' },
        'temp-armour': { name: 'Temp Armour', desc: 'Temporary armour bonus', symbol: '🛡️⏱️' },
        'effortless': { name: 'Effortless', desc: 'Use as effortless action', symbol: '✨' },
        'deflect': { name: 'Deflect', desc: 'Deflect incoming attacks', symbol: '↩️' },

        // Movement icons
        'scramble': { name: 'Scramble', desc: 'Enhanced movement ability', symbol: '🏃' },

        // Utility icons
        'ammo': { name: 'Ammo', desc: 'Reload weapon', symbol: '📦' },
        'super-ammo': { name: 'Super Ammo', desc: 'Enhanced ammunition', symbol: '📦⭐' },
        'ammo-7': { name: 'Ammo (7)', desc: 'Reload 7 ammo', symbol: '📦7' },
        'ammo-d6': { name: 'Ammo (d6)', desc: 'Reload d6 ammo', symbol: '📦🎲' },
        'ammo-box': { name: 'Ammo Box', desc: 'Multiple reloads available', symbol: '📦📦' },
        'search': { name: 'Search', desc: 'Enhanced search ability', symbol: '🔍' },
        'breach': { name: 'Breach', desc: 'Open locked doors/containers', symbol: '🚪' },
        'swap': { name: 'Swap', desc: 'Swap items with ally', symbol: '🔄' },
        'mine': { name: 'Mine', desc: 'Place explosive mine', symbol: '💥' },
        'key': { name: 'Key', desc: 'Unlock doors/containers', symbol: '🔑' },
        'objective': { name: 'Objective', desc: 'Mission objective item', symbol: '🎯' },
        'trophy': { name: 'Trophy', desc: 'Hunter trophy objective', symbol: '🏆' },
        'event': { name: 'Event', desc: 'Draw event card', symbol: '📜' },
        'timewarp': { name: 'Timewarp', desc: 'Manipulate time', symbol: '⏰' },
        'repair': { name: 'Repair', desc: 'Repair damaged items', symbol: '🔧' },

        // First Born specific
        'dyson': { name: 'Dyson', desc: 'Dyson energy system', symbol: '🔮' },
        'dyson-throw': { name: 'Dyson Throw', desc: 'Throw using Dyson energy', symbol: '🔮🎯' },
        'dyson-range': { name: 'Dyson Range', desc: 'Ranged Dyson attack', symbol: '🔮→' },
        'boomerang': { name: 'Boomerang', desc: 'Returns after throwing', symbol: '🪃' },
        'phase': { name: 'Phase', desc: 'Phase through obstacles', symbol: '👻' },
        'scatter': { name: 'Scatter', desc: 'Scatter effect', symbol: '💫' },
        'artifact': { name: 'Artifact', desc: 'Ancient First Born artifact', symbol: '🏺' },
        'necro-flask': { name: 'Necro Flask', desc: 'First Born necro technology', symbol: '⚗️' },
        'fade-to-black-3': { name: 'Fade to Black', desc: 'Disappear into shadows', symbol: '🌑' },
        'blast-2': { name: 'Blast 2', desc: 'Area blast attack', symbol: '💥' },
        'manipulate-3': { name: 'Manipulate', desc: 'Manipulate objects/enemies', symbol: '🖐️' },
        'infra-lens': { name: 'Infra Lens', desc: 'See through obstacles', symbol: '👁️' },
        'pairs': { name: 'Pairs', desc: 'Works in pairs', symbol: '👥' },
        'free-close': { name: 'Free Close', desc: 'Free close assault', symbol: '⚔️✨' },

        // Equipment icons
        'na': { name: 'N/A', desc: 'Not applicable', symbol: '-' },
        'mech': { name: 'Mech', desc: 'For mechanical characters only', symbol: '🤖' },
        'rare': { name: 'Rare', desc: 'Rare item', symbol: '⭐' },
        'dangerous': { name: 'Dangerous', desc: 'Can harm user', symbol: '☠️' },
        'impervious-1': { name: 'Impervious', desc: 'Ignore status effects', symbol: '🛡️' }
    },

    // Item descriptions
    descriptions: {
        'rotating': 'This item can be rotated to show different states',
        'larva': 'First Born larva - handle with care',
        'mineral': 'Raw minerals that can be sold or refined',
        'dyson-rod': 'Dyson energy rod - variable sell value based on charge',
        'detonator': 'Remote detonation device',
        'mines': 'Explosive mines - place and detonate',
        'caaligorn': 'Caaligorn hunting weapon',
        'merg': 'Merg technology - bonds with user',
        'credits': 'Data credits - pure currency',
        'hack': 'Hacking device',
        'tech-pack': 'Technical equipment pack',
        'ship-parts': 'Ship repair components'
    },

    // All First Born items organized by category
    items: [
        // ============================================
        // WEAPONS - RANGED (Blue tokens)
        // ============================================
        // Pistols (Small)
        { id: 'common-pistol', name: 'Common Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 3, sell: 1, stats: { short: 1, medium: 1 }, icons: ['burst-1'] },
        { id: 'military-pistol', name: 'Military Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 2, buy: 8, sell: 4, stats: { short: 2, medium: 1 }, icons: ['burst-1'] },
        { id: 'energy-pistol', name: 'Energy Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 2, buy: 10, sell: 5, stats: { short: 2, medium: 2 }, icons: ['full-charge'] },
        { id: 'machine-pistol', name: 'Machine Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 2, buy: 12, sell: 6, stats: { short: 3, medium: 1 }, icons: [] },
        { id: 'officer-pistol-custom', name: "Officer's Pistol Custom", category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 12, sell: 6, stats: { short: 2, medium: 2, long: 1 }, icons: ['burst-1'] },
        { id: 'sneak-pistol', name: 'Sneak Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 10, sell: 4, stats: { short: 2, medium: 2, long: 1 }, icons: ['silent'] },
        { id: 'marine-military-pistol', name: 'Marine Military Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 14, sell: 8, stats: { short: 3, medium: 1 }, icons: ['reliable'] },
        { id: 'breach-pistol', name: 'Breach Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 45, sell: 18, stats: { short: 3, medium: 2 }, icons: ['super-reliable'], crystals: ['orange', 'orange', 'green'] },
        { id: 'repeat-pistol', name: 'Repeat Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 35, sell: 21, stats: { short: 3 }, icons: ['ammo-returns'], crystals: ['purple', 'orange', 'green'] },
        { id: 'magnum-custom', name: 'Magnum Custom', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 15, sell: 10, stats: { short: 3, medium: 2 }, icons: [], crystals: ['orange', 'green'] },
        { id: 'military-twin', name: 'Military Twin', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 13, sell: 10, stats: { short: 2, medium: 2 }, icons: ['burst-1'], crystals: ['green'] },
        { id: 'quell-riposte', name: "Quell's Riposte", category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 12, sell: 8, stats: { short: 2, close: 3 }, icons: ['burst-1'], crystals: ['orange'] },
        { id: 'havoc-custom', name: 'Havoc Custom', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 12, sell: 8, stats: { short: 3 }, icons: ['re-roll'], crystals: ['orange', 'green', 'green'] },
        { id: 'outland-pistol-1', name: 'Outland Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 0, sell: 0, stats: { short: 1 }, icons: [] },
        { id: 'outland-pistol-2', name: 'Outland Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 2, sell: 1, stats: { short: 2 }, icons: [] },

        // Rifles (Large/Medium)
        { id: 'combat-rifle-custom', name: 'Combat Rifle Custom', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'lg', product: 'first-born', count: 1, buy: 8, sell: 4, stats: { short: 2, medium: 1 }, icons: ['reliable', 'burst-1'] },
        { id: 'shock-rifle', name: 'Shock Rifle', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'lg', product: 'first-born', count: 1, buy: 11, sell: 5, stats: { short: 3, medium: 1 }, icons: ['effortless-reload'] },
        { id: 'breach-rifle', name: 'Breach Rifle', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'lg', product: 'first-born', count: 1, buy: 37, sell: 21, stats: { short: 3, medium: 2 }, icons: ['burst-2'] },
        { id: 'tactical-rifle', name: 'Tactical Rifle', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'md', product: 'first-born', count: 1, buy: 32, sell: 14, stats: { short: 3, medium: 2 }, icons: ['burst-1', 'reliable'] },
        { id: 'outland-gun', name: 'Outland Gun', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'md', product: 'first-born', count: 1, buy: 22, sell: 10, stats: { short: 2, medium: 2 }, icons: ['burst-1', 'super-reliable'], crystals: ['orange', 'green'] },
        { id: 'machine-rifle-grenade-launcher', name: 'Machine Rifle w/ Grenade Launcher', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'md', product: 'first-born', count: 1, buy: 25, sell: 17, stats: { short: 3, medium: 2, range: 'm' }, icons: ['grenade-launcher'] },
        { id: 'smart-shot-energy-rifle', name: 'Smart Shot Energy Rifle', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'md', product: 'first-born', count: 1, buy: 23, sell: 10, stats: { short: 3, medium: 2 }, icons: ['target-lock', 'full-charge'], crystals: ['green'] },
        { id: 'caaligorn-hunt-rifle', name: 'Caaligorn Hunt Rifle', category: 'weapons', subcategory: 'rifle', color: 'blue', size: 'lg', product: 'first-born', count: 1, buy: null, sell: 24, stats: { short: 3, medium: 3, long: 2 }, icons: ['super-reliable'], description: ['caaligorn'] },

        // ============================================
        // WEAPONS - MELEE (Blue tokens)
        // ============================================
        { id: 'utility-knife', name: 'Utility Knife', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 2, sell: 1, stats: { close: 1, throw: 1 }, icons: [] },
        { id: 'energy-combat-knife', name: 'Energy Combat Knife', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 4, sell: 2, stats: { close: 2, throw: 2 }, icons: [] },
        { id: 'short-sword-crafted', name: 'Short Sword Crafted', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 7, sell: 3, stats: { close: 2, heavy: 3, throw: 2 }, icons: [] },
        { id: 'combat-axe', name: 'Combat Axe', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 4, sell: 2, stats: { close: 1, heavy: 3, throw: 2 }, icons: [] },
        { id: 'combat-knife-crafted', name: 'Combat Knife Crafted', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'sm', product: 'first-born', count: 1, buy: 4, sell: 2, stats: { close: 1, heavy: 2, throw: 2 }, icons: [] },
        { id: 'combat-sword', name: 'Combat Sword', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'lg', product: 'first-born', count: 1, buy: 4, sell: 2, stats: { short: 2, heavy: 3 }, icons: [] },
        { id: 'shock-tonfa-compact', name: 'Shock Tonfa Compact', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'md', product: 'first-born', count: 1, buy: 14, sell: 9, stats: { close: 2, heavy: 4 }, icons: [] },
        { id: 'kalamite-fist', name: 'Kalamite Fist', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'md', product: 'first-born', count: 1, buy: 12, sell: 10, stats: { close: 3, heavy: 4 }, icons: ['effortless'], crystals: ['green', 'green', 'green'] },
        { id: 'tactical-bracers', name: 'Tactical Bracers', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'md', product: 'first-born', count: 1, buy: 24, sell: 15, stats: { close: 3, short: 3, medium: 1 }, icons: ['effortless'], crystals: ['orange'] },
        { id: 'iconoclast-shard-sword', name: 'Iconoclast Shard Sword', category: 'weapons', subcategory: 'melee', color: 'green', size: 'md', product: 'first-born', count: 1, buy: null, sell: 12, stats: { close: 3 }, icons: ['ignore-shield'] },

        // Throwing weapons (Nano)
        { id: 'n-throw', name: 'Throwing Knife', category: 'weapons', subcategory: 'thrown', color: 'blue', size: 'nano', product: 'first-born', count: 3, buy: 1, sell: 0, stats: { throw: 2 }, icons: ['effortless'] },

        // ============================================
        // ARMOR (Yellow tokens)
        // ============================================
        { id: 'combat-vest', name: 'Combat Vest', category: 'armor', subcategory: 'physical', color: 'yellow', size: 'sm', product: 'first-born', count: 1, buy: 7, sell: 3, stats: { armour: 1 }, icons: [] },
        { id: 'combat-vest-shiny', name: 'Combat Vest Shiny', category: 'armor', subcategory: 'physical', color: 'yellow', size: 'sm', product: 'first-born', count: 1, buy: 8, sell: 4, stats: { armour: 1 }, icons: [] },
        { id: 'shield-belt', name: 'Shield Belt', category: 'armor', subcategory: 'shield', color: 'yellow', size: 'sm', product: 'first-born', count: 1, buy: 4, sell: 2, stats: { shield: 1 }, icons: [] },
        { id: 'shield-belt-custom', name: 'Shield Belt Custom', category: 'armor', subcategory: 'shield', color: 'yellow', size: 'sm', product: 'first-born', count: 1, buy: 7, sell: 3, stats: { shield: 2 }, icons: [] },
        { id: 'neoflex-plate-upgrade', name: 'Neoflex Plate Upgrade', category: 'armor', subcategory: 'physical', color: 'yellow', size: 'sm', product: 'first-born', count: 1, buy: null, sell: null, stats: { armour: 1 }, icons: ['na', 'mech'] },
        { id: 'burst-vest', name: 'Burst Vest', category: 'armor', subcategory: 'physical', color: 'yellow', size: 'sm', product: 'first-born', count: 1, buy: 14, sell: 8, stats: { armour: 1 }, icons: ['effortless', 'flip', 'discard'], description: ['rotating'] },
        { id: 'marine-combat-suit', name: 'Marine Combat Suit', category: 'armor', subcategory: 'physical', color: 'yellow', size: 'sm', product: 'first-born', count: 1, buy: 34, sell: 18, stats: { armour: 1 }, icons: ['re-roll-ranged'] },
        { id: 'n-phase', name: 'Phase Armour', category: 'armor', subcategory: 'physical', color: 'yellow', size: 'nano', product: 'first-born', count: 1, buy: 11, sell: 9, stats: { armour: 1 }, icons: [], crystals: ['purple'] },
        { id: 'dialena-shard-guard', name: 'Dialena Shard Guard', category: 'armor', subcategory: 'shield', color: 'green', size: 'md', product: 'first-born', count: 1, buy: null, sell: 12, stats: { close: 3, armour: 2 }, icons: [], crystals: ['purple', 'purple'] },
        { id: 'mantle-armour', name: 'Mantle Armour', category: 'armor', subcategory: 'shield', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 21, stats: { shield: 3 }, icons: ['flip'] },

        // ============================================
        // EQUIPMENT (Orange tokens)
        // ============================================
        { id: 'mining-drubber', name: 'Mining Drubber', category: 'equipment', subcategory: 'tools', color: 'orange', size: 'sm', product: 'first-born', count: 1, buy: 4, sell: 2, stats: {}, icons: ['mine'] },
        { id: 'jump-pack', name: 'Jump Pack', category: 'equipment', subcategory: 'mobility', color: 'orange', size: 'sm', product: 'first-born', count: 1, buy: 5, sell: 4, stats: { scramble: [3, 5] }, icons: ['effortless', 'flip'] },
        { id: 'sensor-goggles', name: 'Sensor Goggles', category: 'equipment', subcategory: 'tools', color: 'orange', size: 'sm', product: 'first-born', count: 1, buy: 7, sell: 2, stats: {}, icons: ['effortless', 'search'] },
        { id: 'medi-pack', name: 'Medi Pack', category: 'equipment', subcategory: 'medical', color: 'orange', size: 'sm', product: 'first-born', count: 1, buy: 3, sell: 1, stats: { heal: 4 }, icons: ['effortless', 'discard'] },
        { id: 'medi-stim', name: 'Medi Stim', category: 'equipment', subcategory: 'medical', color: 'orange', size: 'sm', product: 'first-born', count: 2, buy: 0, sell: 0, stats: { heal: 2 }, icons: ['effortless', 'discard'] },
        { id: 'ammo-box', name: 'Ammo Box', category: 'equipment', subcategory: 'ammo', color: 'orange', size: 'sm', product: 'first-born', count: 1, buy: 5, sell: 2, stats: {}, icons: ['ammo', 'discard'], description: ['rotating'] },
        { id: 'laser-cutter', name: 'Laser Cutter', category: 'equipment', subcategory: 'tools', color: 'orange', size: 'sm', product: 'first-born', count: 1, buy: 4, sell: 2, stats: {}, icons: ['breach'] },

        // Nano equipment
        { id: 'n-walkie', name: 'Walkie Talkie', category: 'equipment', subcategory: 'tools', color: 'orange', size: 'nano', product: 'first-born', count: 2, buy: 5, sell: 3, stats: {}, icons: ['swap'] },
        { id: 'n-ammo', name: 'Ammo', category: 'equipment', subcategory: 'ammo', color: 'orange', size: 'nano', product: 'first-born', count: 5, buy: 4, sell: 2, stats: {}, icons: ['ammo', 'discard'] },
        { id: 'n-reroll', name: 'Ranged Re-roll Device', category: 'equipment', subcategory: 'tools', color: 'orange', size: 'nano', product: 'first-born', count: 1, buy: 18, sell: 11, stats: {}, icons: ['re-roll-ranged'] },
        { id: 'n-action', name: 'Stim Actions', category: 'equipment', subcategory: 'medical', color: 'orange', size: 'nano', product: 'first-born', count: 2, buy: 3, sell: 1, stats: { action: 2 }, icons: ['effortless', 'discard'] },
        { id: 'n-heal', name: 'Stim Heal', category: 'equipment', subcategory: 'medical', color: 'orange', size: 'nano', product: 'first-born', count: 3, buy: 2, sell: 1, stats: { heal: 2 }, icons: ['effortless', 'discard'] },
        { id: 'n-skill', name: 'Stim Skill', category: 'equipment', subcategory: 'medical', color: 'orange', size: 'nano', product: 'first-born', count: 2, buy: 4, sell: 1, stats: { skill: 2 }, icons: ['effortless', 'discard'] },
        { id: 'n-target', name: 'Target Laser', category: 'equipment', subcategory: 'tools', color: 'orange', size: 'nano', product: 'first-born', count: 1, buy: 15, sell: 8, stats: {}, icons: ['target-lock'] },
        { id: 'n-shield', name: 'Temporary Shield', category: 'equipment', subcategory: 'tools', color: 'orange', size: 'nano', product: 'first-born', count: 1, buy: 3, sell: 2, stats: {}, icons: ['effortless', 'temp-armour', 'discard'] },

        // ============================================
        // EXPLOSIVES (Blue nano tokens)
        // ============================================
        { id: 'n-nade', name: 'Grenade', category: 'explosives', subcategory: 'thrown', color: 'blue', size: 'nano', product: 'first-born', count: 5, buy: 5, sell: 4, stats: { grenade: [4, 3, 1] }, icons: ['discard'] },
        { id: 'n-mine', name: 'Mine', category: 'explosives', subcategory: 'placed', color: 'blue', size: 'nano', product: 'first-born', count: 3, buy: 4, sell: 1, stats: { explode: [5, 3, 1] }, icons: ['effortless', 'discard'], description: ['mines'] },
        { id: 'detonator-l', name: 'Detonator (Long)', category: 'explosives', subcategory: 'tools', color: 'blue', size: 'nano', product: 'first-born', count: 1, buy: 22, sell: 13, stats: { range: 'l' }, icons: ['effortless'], description: ['detonator'] },
        { id: 'detonator-m', name: 'Detonator (Medium)', category: 'explosives', subcategory: 'tools', color: 'blue', size: 'nano', product: 'first-born', count: 1, buy: 15, sell: 9, stats: { range: 'm' }, icons: ['effortless'], description: ['detonator'] },
        { id: 'n-timewarp', name: 'Timewarp', category: 'explosives', subcategory: 'special', color: 'blue', size: 'nano', product: 'first-born', count: 1, buy: 7, sell: 5, stats: {}, icons: ['timewarp', 'discard'] },

        // ============================================
        // FIRST BORN TECH (Green tokens)
        // ============================================
        // Engrams
        { id: 'port-engram', name: 'Port Engram', category: 'firstborn', subcategory: 'engram', color: 'green', size: 'sm', product: 'first-born', count: 2, buy: null, sell: 3, stats: {}, icons: ['scatter', 'effortless', 'flip'] },
        { id: 'shield-engram', name: 'Shield Engram', category: 'firstborn', subcategory: 'engram', color: 'green', size: 'sm', product: 'first-born', count: 2, buy: null, sell: 3, stats: {}, icons: ['effortless', 'flip', 'physical_armour', 'discard'], description: ['rotating'] },
        { id: 'phase-engram', name: 'Phase Engram', category: 'firstborn', subcategory: 'engram', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 5, stats: { phase: 1 }, icons: ['effortless', 'flip'] },
        { id: 'n-engram', name: 'Shift Engram', category: 'firstborn', subcategory: 'engram', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 3, stats: {}, icons: ['effortless', 'pairs', 'flip'] },

        // Shards
        { id: 'liege-shard-roll', name: 'Liege Shard (Re-roll)', category: 'firstborn', subcategory: 'shard', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 6, stats: { close: 3, throw: 3 }, icons: ['re-roll'] },
        { id: 'liege-shard-eff', name: 'Liege Shard (Effortless)', category: 'firstborn', subcategory: 'shard', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 4, stats: { close: 3, throw: 3 }, icons: ['effortless'] },
        { id: 'liege-shard', name: 'Liege Shard (Free Close)', category: 'firstborn', subcategory: 'shard', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 5, stats: { close: 3, throw: 3 }, icons: ['free-close'] },
        { id: 'n-shard', name: 'Shard', category: 'firstborn', subcategory: 'shard', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 2, stats: { throw: 3 }, icons: ['effortless'] },
        { id: 'shard-fins-3', name: 'Shard Fins (Scramble)', category: 'firstborn', subcategory: 'shard', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 8, stats: { scramble: [1, 3] }, icons: ['effortless'] },
        { id: 'shard-fins-4', name: 'Shard Fins (Move)', category: 'firstborn', subcategory: 'shard', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 4, stats: { move: 4 }, icons: ['effortless', 'flip'] },

        // Dyson tech
        { id: 'dyson-spike', name: 'Dyson Spike', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 8, stats: { close: 3, grenade: [6, 3, 2], range: 'm' }, icons: [] },
        { id: 'dyson-draw-5', name: 'Dyson Draw (5)', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 8, stats: { dyson: 5 }, icons: ['dyson-throw'] },
        { id: 'dyson-draw-3', name: 'Dyson Draw (3)', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 5, stats: { dyson: 3 }, icons: ['dyson-throw'] },
        { id: 'dyson-vent-5', name: 'Dyson Vent (5)', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 8, stats: { dyson: 5 }, icons: ['dyson-range'] },
        { id: 'dyson-vent-3', name: 'Dyson Vent (3)', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 8, stats: { dyson: 3 }, icons: ['dyson-range'] },
        { id: 'dyson-vent-8', name: 'Dyson Vent (8)', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 14, stats: { dyson: 8 }, icons: ['dyson', 'dyson-range'] },
        { id: 'dyson-rod', name: 'Dyson Rod', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'nano', product: 'first-born', count: 5, buy: null, sell: [3, 5, 10], stats: {}, icons: [], description: ['dyson-rod'] },
        { id: 'dyson-core', name: 'Dyson Core', category: 'firstborn', subcategory: 'dyson', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 11, stats: {}, icons: ['auto-close-hit', 'ignore-armour', 'discard'] },

        // Orbs and special items
        { id: 'phase-loop-4', name: 'Phase Loop (4)', category: 'firstborn', subcategory: 'orb', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 12, stats: { throw: 4 }, icons: ['boomerang'] },
        { id: 'phase-loop-3', name: 'Phase Loop (3)', category: 'firstborn', subcategory: 'orb', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 6, stats: { throw: 3 }, icons: ['boomerang'] },
        { id: 'sypher-orb', name: 'Sypher Orb', category: 'firstborn', subcategory: 'orb', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 2, stats: {}, icons: ['effortless', 'event', 'discard'] },
        { id: 'ecco-orb', name: 'Ecco Orb', category: 'firstborn', subcategory: 'orb', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 7, stats: {}, icons: ['deflect', 'flip'], description: ['rotating'] },
        { id: 'n-orb-5', name: 'Nano Orb (5)', category: 'firstborn', subcategory: 'orb', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 3, stats: { grenade: [5, 3, 1] }, icons: ['discard'] },
        { id: 'n-orb-4', name: 'Nano Orb (4)', category: 'firstborn', subcategory: 'orb', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 3, stats: { grenade: [4, 3, 3] }, icons: ['discard'] },

        // Rings and shifters
        { id: 'liege-ring-4', name: 'Liege Ring (4)', category: 'firstborn', subcategory: 'ring', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 6, stats: { short: 4 }, icons: ['discard'], description: ['rotating'] },
        { id: 'liege-ring-3', name: 'Liege Ring (3)', category: 'firstborn', subcategory: 'ring', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 4, stats: { short: 3 }, icons: ['discard'], description: ['rotating'] },
        { id: 'photon-shifter', name: 'Photon Shifter', category: 'firstborn', subcategory: 'shifter', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 4, stats: {}, icons: ['fade-to-black-3', 'flip'] },
        { id: 'matter-shifter-1', name: 'Matter Shifter (Blast)', category: 'firstborn', subcategory: 'shifter', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 4, stats: {}, icons: ['blast-2', 'flip'] },
        { id: 'matter-shifter-2', name: 'Matter Shifter (Manipulate)', category: 'firstborn', subcategory: 'shifter', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 5, stats: {}, icons: ['manipulate-3', 'flip'] },
        { id: 'quantum-lens', name: 'Quantum Lens', category: 'firstborn', subcategory: 'tools', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 4, stats: { range: 's' }, icons: ['effortless', 'infra-lens', 'flip'] },
        { id: 'bracer', name: 'Bracer', category: 'firstborn', subcategory: 'tools', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 6, stats: { short: 2, medium: 3 }, icons: ['effortless', 'silent', 'infinite'] },
        { id: 'velocity-bond', name: 'Velocity Bond', category: 'firstborn', subcategory: 'mobility', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 14, stats: { move: 2 }, icons: [] },

        // Repair and healing
        { id: 'repair-4', name: 'Fibril (4)', category: 'firstborn', subcategory: 'repair', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 8, stats: {}, icons: ['repair', 'discard'] },
        { id: 'repair-2', name: 'Fibril (2)', category: 'firstborn', subcategory: 'repair', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 5, stats: {}, icons: ['repair', 'discard'] },
        { id: 'repair-1', name: 'Fibril (1)', category: 'firstborn', subcategory: 'repair', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 3, stats: {}, icons: ['repair', 'discard'] },
        { id: 'necro-flask', name: 'Necro Flask', category: 'firstborn', subcategory: 'special', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 5, stats: {}, icons: ['necro-flask'] },
        { id: 'potent-fibril', name: 'Potent Fibril (8)', category: 'firstborn', subcategory: 'repair', color: 'green', size: 'md', product: 'first-born', count: 1, buy: null, sell: 20, stats: {}, icons: ['repair'] },

        // Larva
        { id: 'larva', name: 'Larva', category: 'firstborn', subcategory: 'special', color: 'green', size: 'sm', product: 'first-born', count: 2, buy: null, sell: null, stats: {}, icons: ['flip'], description: ['larva'] },

        // Artifacts
        { id: 'artifact-1', name: 'Artifact', category: 'firstborn', subcategory: 'artifact', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: [4, 8], stats: {}, icons: ['artifact'] },
        { id: 'artifact-2', name: 'Artifact', category: 'firstborn', subcategory: 'artifact', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: [4, 8], stats: {}, icons: ['artifact'] },
        { id: 'artifact-3', name: 'Artifact', category: 'firstborn', subcategory: 'artifact', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: [4, 5, 7, 11], stats: {}, icons: ['artifact'] },
        { id: 'artifact-4', name: 'Artifact', category: 'firstborn', subcategory: 'artifact', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: [4, 5, 7, 11], stats: {}, icons: ['artifact'] },
        { id: 'artifact-5', name: 'Artifact', category: 'firstborn', subcategory: 'artifact', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: [4, 5, 7, 11], stats: {}, icons: ['artifact'] },
        { id: 'artifact-6', name: 'Artifact', category: 'firstborn', subcategory: 'artifact', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: [4, 5, 7, 11], stats: {}, icons: ['artifact'] },

        // ============================================
        // CONSUMABLES (Green nano tokens)
        // ============================================
        { id: 's-heal', name: 'Health Stim (Super)', category: 'consumables', subcategory: 'stim', color: 'green', size: 'nano', product: 'first-born', count: 3, buy: null, sell: 3, stats: { super_heal: 2 }, icons: ['discard'] },
        { id: 's-skill-2', name: 'Skill Stim (2)', category: 'consumables', subcategory: 'stim', color: 'green', size: 'nano', product: 'first-born', count: 1, buy: null, sell: 3, stats: { super_skill: 2 }, icons: ['discard'] },
        { id: 's-skill-3', name: 'Skill Stim (3)', category: 'consumables', subcategory: 'stim', color: 'green', size: 'nano', product: 'first-born', count: 1, buy: null, sell: 4, stats: { super_skill: 3 }, icons: ['discard'] },
        { id: 's-action-2', name: 'Action Stim (2)', category: 'consumables', subcategory: 'stim', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 3, stats: { action: 2 }, icons: ['discard'] },
        { id: 's-action-3', name: 'Action Stim (3)', category: 'consumables', subcategory: 'stim', color: 'green', size: 'nano', product: 'first-born', count: 1, buy: null, sell: 4, stats: { action: 3 }, icons: ['discard'] },
        { id: 's-ammo', name: 'Accelerant Ammo', category: 'consumables', subcategory: 'ammo', color: 'orange', size: 'nano', product: 'first-born', count: 4, buy: null, sell: 3, stats: {}, icons: ['super-ammo', 'discard'], crystals: ['orange'] },
        { id: 'n-event', name: 'Sypher Orb (Nano)', category: 'consumables', subcategory: 'special', color: 'green', size: 'nano', product: 'first-born', count: 1, buy: null, sell: null, stats: {}, icons: ['effortless', 'event', 'discard'] },
        { id: 'n-freeze', name: 'Freeze Blast', category: 'consumables', subcategory: 'special', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 2, stats: { freeze: [2, 2] }, icons: [] },

        // ============================================
        // MISSION ITEMS
        // ============================================
        { id: 'n-key', name: 'Key', category: 'mission', subcategory: 'objective', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 4, stats: {}, icons: ['key'] },
        { id: 'objective', name: 'Objective', category: 'mission', subcategory: 'objective', color: 'green', size: 'nano', product: 'first-born', count: 3, buy: null, sell: null, stats: {}, icons: ['objective'] },
        { id: 'hunter-trophy', name: "Hunter's Trophy", category: 'mission', subcategory: 'objective', color: 'brown', size: 'sm', product: 'first-born', count: 2, buy: null, sell: null, stats: {}, icons: ['trophy'] },

        // ============================================
        // RAW MATERIALS
        // ============================================
        { id: 'raw-minerals', name: 'Raw Minerals', category: 'materials', subcategory: 'mineral', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 3, stats: {}, icons: [], description: ['mineral'] },
        { id: 'raw-minerals-1', name: 'Raw Minerals', category: 'materials', subcategory: 'mineral', color: 'green', size: 'sm', product: 'first-born', count: 1, buy: null, sell: 4, stats: {}, icons: [], description: ['mineral'] },
        { id: 'raw-green', name: 'Raw Minerals (Green)', category: 'materials', subcategory: 'mineral', color: 'green', size: 'nano', product: 'first-born', count: 1, buy: null, sell: 2, stats: {}, icons: [], description: ['mineral'] },
        { id: 'raw-orange', name: 'Raw Minerals (Orange)', category: 'materials', subcategory: 'mineral', color: 'green', size: 'nano', product: 'first-born', count: 2, buy: null, sell: 3, stats: {}, icons: [], description: ['mineral'] },
        { id: 'raw-purple', name: 'Raw Minerals (Purple)', category: 'materials', subcategory: 'mineral', color: 'green', size: 'nano', product: 'first-born', count: 1, buy: null, sell: 6, stats: {}, icons: [], description: ['mineral'] },

        // ============================================
        // YAMATO EXPANSION
        // ============================================
        { id: 'yamato-common-pistol', name: 'Common Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'yamato', count: 1, buy: 3, sell: 1, stats: { short: 1, medium: 1 }, icons: ['burst-1'] },
        { id: 'yamato-knife', name: 'Knife', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'sm', product: 'yamato', count: 2, buy: 0, sell: 0, stats: { close: 1 }, icons: [] },
        { id: 'yamato-machine-pistol', name: 'Machine Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'yamato', count: 1, buy: 12, sell: 6, stats: { short: 3, medium: 1 }, icons: [] },
        { id: 'yamato-military-pistol', name: 'Military Pistol', category: 'weapons', subcategory: 'pistol', color: 'blue', size: 'sm', product: 'yamato', count: 1, buy: 8, sell: 4, stats: { short: 2, medium: 1 }, icons: ['reliable'] },
        { id: 'yamato-storm-bracers', name: 'Storm Bracers', category: 'weapons', subcategory: 'melee', color: 'blue', size: 'lg', product: 'yamato', count: 1, buy: null, sell: 8, stats: { close: 4 }, icons: ['rare'], description: ['merg'] },
        { id: 'yamato-merg-plating', name: 'Merg Plating', category: 'armor', subcategory: 'physical', color: 'yellow', size: 'sm', product: 'yamato', count: 1, buy: 30, sell: 18, stats: { armour: 2 }, icons: [], description: ['merg'] },
        { id: 'yamato-military-coat', name: 'Military Coat', category: 'armor', subcategory: 'combo', color: 'yellow', size: 'sm', product: 'yamato', count: 1, buy: null, sell: null, stats: { armour: 1, shield: 2, close: 2 }, icons: ['flip', 'rare'] },
        { id: 'yamato-empathic-cuffs', name: 'Empathic Cuffs', category: 'equipment', subcategory: 'special', color: 'orange', size: 'sm', product: 'yamato', count: 1, buy: null, sell: 8, stats: {}, icons: ['impervious-1', 'rare'] },
        { id: 'yamato-ammo', name: 'Ammo Mag', category: 'equipment', subcategory: 'ammo', color: 'orange', size: 'sm', product: 'yamato', count: 2, buy: 2, sell: 1, stats: {}, icons: ['ammo-7', 'discard'] }
    ],

    // Category metadata for UI
    categories: {
        'weapons': { name: 'Weapons', icon: '⚔️', description: 'Ranged and melee weapons' },
        'armor': { name: 'Armor', icon: '🛡️', description: 'Physical armor and shields' },
        'equipment': { name: 'Equipment', icon: '🎒', description: 'Tools, ammo, and gear' },
        'explosives': { name: 'Explosives', icon: '💣', description: 'Grenades, mines, and detonators' },
        'firstborn': { name: 'First Born Tech', icon: '🔮', description: 'Alien technology and artifacts' },
        'consumables': { name: 'Consumables', icon: '💊', description: 'Stims and one-use items' },
        'mission': { name: 'Mission Items', icon: '🎯', description: 'Objectives and keys' },
        'materials': { name: 'Materials', icon: '💎', description: 'Raw minerals and resources' }
    },

    // Token colors with display info
    colors: {
        'blue': { name: 'Blue', hex: '#3498db', description: 'Weapons' },
        'yellow': { name: 'Yellow', hex: '#f1c40f', description: 'Armor' },
        'orange': { name: 'Orange', hex: '#e67e22', description: 'Equipment' },
        'green': { name: 'Green', hex: '#2ecc71', description: 'First Born / Alien' },
        'brown': { name: 'Brown', hex: '#8b4513', description: 'Mission' },
        'purple': { name: 'Purple', hex: '#9b59b6', description: 'Special' }
    },

    // Token sizes
    sizes: {
        'nano': { name: 'Nano', shortName: 'N', description: 'Smallest tokens' },
        'sm': { name: 'Small', shortName: 'S', description: 'Standard small tokens' },
        'md': { name: 'Medium', shortName: 'M', description: 'Medium tokens' },
        'lg': { name: 'Large', shortName: 'L', description: 'Large tokens' }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = INVENTORY_DATA;
}
