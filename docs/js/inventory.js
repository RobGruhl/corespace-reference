/**
 * Core Space First Born - Inventory System
 *
 * Interactive inventory browser with search, filters, and detailed item views.
 */

(function() {
    'use strict';

    // State
    let currentCategory = 'all';
    let currentSize = 'all';
    let currentSearch = '';
    let currentSort = 'name';
    let expandedItemId = null;

    // DOM elements
    const searchInput = document.getElementById('search-input');
    const itemGrid = document.getElementById('item-grid');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');
    const sortSelect = document.getElementById('sort-select');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const sizeFilters = document.querySelectorAll('.filter-btn[data-size]');

    /**
     * Initialize the inventory system
     */
    function init() {
        // Set up event listeners
        searchInput.addEventListener('input', debounce(handleSearch, 200));
        sortSelect.addEventListener('change', handleSort);

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => handleCategoryChange(tab.dataset.category));
        });

        sizeFilters.forEach(filter => {
            filter.addEventListener('click', () => handleSizeChange(filter.dataset.size));
        });

        // Initial render
        updateCategoryCounts();
        renderItems();
    }

    /**
     * Debounce function for search input
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Handle search input
     */
    function handleSearch(e) {
        currentSearch = e.target.value.toLowerCase().trim();
        renderItems();
    }

    /**
     * Handle category tab change
     */
    function handleCategoryChange(category) {
        currentCategory = category;

        // Update active tab
        categoryTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        renderItems();
    }

    /**
     * Handle size filter change
     */
    function handleSizeChange(size) {
        currentSize = size;

        // Update active filter
        sizeFilters.forEach(filter => {
            filter.classList.toggle('active', filter.dataset.size === size);
        });

        renderItems();
    }

    /**
     * Handle sort change
     */
    function handleSort(e) {
        currentSort = e.target.value;
        renderItems();
    }

    /**
     * Filter items based on current state
     */
    function filterItems() {
        return INVENTORY_DATA.items.filter(item => {
            // Category filter
            if (currentCategory !== 'all' && item.category !== currentCategory) {
                return false;
            }

            // Size filter
            if (currentSize !== 'all' && item.size !== currentSize) {
                return false;
            }

            // Search filter
            if (currentSearch) {
                const searchFields = [
                    item.name,
                    item.category,
                    item.subcategory,
                    item.product,
                    ...(item.icons || []),
                    ...(item.description || [])
                ].join(' ').toLowerCase();

                if (!searchFields.includes(currentSearch)) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Sort items based on current sort option
     */
    function sortItems(items) {
        const sorted = [...items];

        switch (currentSort) {
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'buy-asc':
                sorted.sort((a, b) => (getPrice(a.buy) || 999) - (getPrice(b.buy) || 999));
                break;
            case 'buy-desc':
                sorted.sort((a, b) => (getPrice(b.buy) || 0) - (getPrice(a.buy) || 0));
                break;
            case 'sell-asc':
                sorted.sort((a, b) => (getPrice(a.sell) || 999) - (getPrice(b.sell) || 999));
                break;
            case 'sell-desc':
                sorted.sort((a, b) => (getPrice(b.sell) || 0) - (getPrice(a.sell) || 0));
                break;
            case 'size':
                const sizeOrder = { nano: 0, sm: 1, md: 2, lg: 3 };
                sorted.sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size]);
                break;
        }

        return sorted;
    }

    /**
     * Get numeric price value (handles arrays)
     */
    function getPrice(price) {
        if (Array.isArray(price)) {
            return price[0];
        }
        return price;
    }

    /**
     * Format price for display
     */
    function formatPrice(price) {
        if (price === null || price === undefined) {
            return 'N/A';
        }
        if (Array.isArray(price)) {
            return price.join('/');
        }
        return price.toString();
    }

    /**
     * Update category counts
     */
    function updateCategoryCounts() {
        const counts = {
            all: INVENTORY_DATA.items.length,
            weapons: 0,
            armor: 0,
            equipment: 0,
            explosives: 0,
            firstborn: 0,
            consumables: 0,
            mission: 0,
            materials: 0
        };

        INVENTORY_DATA.items.forEach(item => {
            if (counts[item.category] !== undefined) {
                counts[item.category]++;
            }
        });

        // Update DOM
        Object.entries(counts).forEach(([category, count]) => {
            const el = document.getElementById(`count-${category}`);
            if (el) {
                el.textContent = count;
            }
        });
    }

    /**
     * Render items to the grid
     */
    function renderItems() {
        const filtered = filterItems();
        const sorted = sortItems(filtered);

        // Update results count
        resultsCount.textContent = sorted.length;

        // Show/hide empty state
        if (sorted.length === 0) {
            itemGrid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        itemGrid.style.display = 'grid';
        emptyState.style.display = 'none';

        // Render item cards
        itemGrid.innerHTML = sorted.map(item => renderItemCard(item)).join('');

        // Add click handlers
        itemGrid.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', () => toggleItemExpand(card.dataset.id));
        });
    }

    /**
     * Render a single item card
     */
    function renderItemCard(item) {
        const isExpanded = expandedItemId === item.id;
        const stats = item.stats || {};
        const icons = item.icons || [];
        const crystals = item.crystals || [];
        const descriptions = item.description || [];

        // Build stats display
        const statsHtml = buildStatsHtml(stats);
        const iconsHtml = buildIconsHtml(icons);
        const crystalsHtml = buildCrystalsHtml(crystals);
        const detailsHtml = buildDetailsHtml(item, icons, descriptions);

        // Size badge
        const sizeInfo = INVENTORY_DATA.sizes[item.size];
        const sizeBadge = sizeInfo ? sizeInfo.shortName : item.size.toUpperCase();

        // Product badge
        const productBadge = item.product === 'yamato' ? 'Yamato' : '';

        return `
            <div class="item-card ${isExpanded ? 'expanded' : ''}"
                 data-id="${item.id}"
                 data-color="${item.color}"
                 data-category="${item.category}">
                <div class="item-header">
                    <h3 class="item-name">${escapeHtml(item.name)}</h3>
                    <div class="item-badges">
                        ${item.count > 1 ? `<span class="item-badge badge-count">x${item.count}</span>` : ''}
                        <span class="item-badge badge-size">${sizeBadge}</span>
                        ${productBadge ? `<span class="item-badge badge-product">${productBadge}</span>` : ''}
                    </div>
                </div>

                ${statsHtml ? `<div class="item-stats">${statsHtml}</div>` : ''}

                ${iconsHtml ? `<div class="item-icons">${iconsHtml}</div>` : ''}

                ${crystalsHtml ? `<div class="item-crystals">${crystalsHtml}</div>` : ''}

                <div class="item-prices">
                    <div class="price-tag">
                        <span class="price-label">Buy:</span>
                        <span class="price-value ${item.buy === null ? 'na' : ''}">${formatPrice(item.buy)} UA</span>
                    </div>
                    <div class="price-tag">
                        <span class="price-label">Sell:</span>
                        <span class="price-value sell ${item.sell === null ? 'na' : ''}">${formatPrice(item.sell)} UA</span>
                    </div>
                </div>

                <div class="item-details">
                    ${detailsHtml}
                </div>
            </div>
        `;
    }

    /**
     * Build HTML for item stats
     */
    function buildStatsHtml(stats) {
        const chips = [];

        // Combat stats
        if (stats.short !== undefined) {
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Short:</span><span class="stat-value">${stats.short}</span></span>`);
        }
        if (stats.medium !== undefined) {
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Med:</span><span class="stat-value">${stats.medium}</span></span>`);
        }
        if (stats.long !== undefined) {
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Long:</span><span class="stat-value">${stats.long}</span></span>`);
        }
        if (stats.close !== undefined) {
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Close:</span><span class="stat-value">${stats.close}</span></span>`);
        }
        if (stats.heavy !== undefined) {
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Heavy:</span><span class="stat-value">${stats.heavy}</span></span>`);
        }
        if (stats.throw !== undefined) {
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Throw:</span><span class="stat-value">${stats.throw}</span></span>`);
        }

        // Defense stats
        if (stats.armour !== undefined) {
            chips.push(`<span class="stat-chip defense"><span class="stat-label">Armour:</span><span class="stat-value">${stats.armour}</span></span>`);
        }
        if (stats.shield !== undefined) {
            chips.push(`<span class="stat-chip defense"><span class="stat-label">Shield:</span><span class="stat-value">${stats.shield}</span></span>`);
        }

        // Utility stats
        if (stats.heal !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Heal:</span><span class="stat-value">${stats.heal}</span></span>`);
        }
        if (stats.super_heal !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Super Heal:</span><span class="stat-value">${stats.super_heal}</span></span>`);
        }
        if (stats.action !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Action:</span><span class="stat-value">+${stats.action}</span></span>`);
        }
        if (stats.skill !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Skill:</span><span class="stat-value">+${stats.skill}</span></span>`);
        }
        if (stats.super_skill !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Super Skill:</span><span class="stat-value">+${stats.super_skill}</span></span>`);
        }
        if (stats.move !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Move:</span><span class="stat-value">+${stats.move}"</span></span>`);
        }
        if (stats.dyson !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Dyson:</span><span class="stat-value">${stats.dyson}</span></span>`);
        }
        if (stats.phase !== undefined) {
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Phase:</span><span class="stat-value">${stats.phase}</span></span>`);
        }

        // Grenade/Explode stats
        if (stats.grenade) {
            const grenadeStr = Array.isArray(stats.grenade) ? stats.grenade.join('/') : stats.grenade;
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Grenade:</span><span class="stat-value">${grenadeStr}</span></span>`);
        }
        if (stats.explode) {
            const explodeStr = Array.isArray(stats.explode) ? stats.explode.join('/') : stats.explode;
            chips.push(`<span class="stat-chip combat"><span class="stat-label">Explode:</span><span class="stat-value">${explodeStr}</span></span>`);
        }
        if (stats.freeze) {
            const freezeStr = Array.isArray(stats.freeze) ? stats.freeze.join('/') : stats.freeze;
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Freeze:</span><span class="stat-value">${freezeStr}</span></span>`);
        }

        // Scramble
        if (stats.scramble) {
            const scrambleStr = Array.isArray(stats.scramble) ? stats.scramble.join('/') : stats.scramble;
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Scramble:</span><span class="stat-value">${scrambleStr}</span></span>`);
        }

        // Range
        if (stats.range) {
            const rangeMap = { s: 'Short', m: 'Medium', l: 'Long' };
            chips.push(`<span class="stat-chip utility"><span class="stat-label">Range:</span><span class="stat-value">${rangeMap[stats.range] || stats.range}</span></span>`);
        }

        return chips.join('');
    }

    /**
     * Build HTML for item icons
     */
    function buildIconsHtml(icons) {
        if (!icons || icons.length === 0) return '';

        return icons.map(iconId => {
            const iconInfo = INVENTORY_DATA.icons[iconId];
            if (!iconInfo) {
                return `<span class="icon-tag">${iconId}</span>`;
            }
            return `<span class="icon-tag" title="${escapeHtml(iconInfo.desc)}">
                <span class="icon-symbol">${iconInfo.symbol}</span>
                <span>${escapeHtml(iconInfo.name)}</span>
            </span>`;
        }).join('');
    }

    /**
     * Build HTML for crystals
     */
    function buildCrystalsHtml(crystals) {
        if (!crystals || crystals.length === 0) return '';

        return crystals.map(color =>
            `<span class="crystal ${color}" title="${color} crystal"></span>`
        ).join('');
    }

    /**
     * Build HTML for expanded details
     */
    function buildDetailsHtml(item, icons, descriptions) {
        const sections = [];

        // Category info
        const categoryInfo = INVENTORY_DATA.categories[item.category];
        if (categoryInfo) {
            sections.push(`
                <div class="detail-section">
                    <div class="detail-title">Category</div>
                    <div class="detail-content">${categoryInfo.icon} ${categoryInfo.name} - ${item.subcategory || 'General'}</div>
                </div>
            `);
        }

        // Token info
        const colorInfo = INVENTORY_DATA.colors[item.color];
        const sizeInfo = INVENTORY_DATA.sizes[item.size];
        sections.push(`
            <div class="detail-section">
                <div class="detail-title">Token</div>
                <div class="detail-content">
                    ${colorInfo ? colorInfo.name : item.color} ${sizeInfo ? sizeInfo.name : item.size} token
                    ${item.count > 1 ? ` (${item.count} in game)` : ''}
                </div>
            </div>
        `);

        // Icon descriptions
        if (icons && icons.length > 0) {
            const iconDescs = icons.map(iconId => {
                const info = INVENTORY_DATA.icons[iconId];
                if (info) {
                    return `<li><strong>${info.name}:</strong> ${info.desc}</li>`;
                }
                return `<li>${iconId}</li>`;
            }).join('');

            sections.push(`
                <div class="detail-section">
                    <div class="detail-title">Abilities</div>
                    <div class="detail-content"><ul style="margin: 0; padding-left: 20px;">${iconDescs}</ul></div>
                </div>
            `);
        }

        // Special descriptions
        if (descriptions && descriptions.length > 0) {
            const descTexts = descriptions.map(descId => {
                const text = INVENTORY_DATA.descriptions[descId];
                return text || descId;
            }).join('. ');

            sections.push(`
                <div class="detail-section">
                    <div class="detail-title">Special Rules</div>
                    <div class="detail-content">${escapeHtml(descTexts)}</div>
                </div>
            `);
        }

        // Crystals info
        if (item.crystals && item.crystals.length > 0) {
            const crystalText = item.crystals.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
            sections.push(`
                <div class="detail-section">
                    <div class="detail-title">Crystal Requirements</div>
                    <div class="detail-content">Requires ${crystalText} crystal slot(s) to equip</div>
                </div>
            `);
        }

        return sections.join('');
    }

    /**
     * Toggle item expansion
     */
    function toggleItemExpand(itemId) {
        if (expandedItemId === itemId) {
            expandedItemId = null;
        } else {
            expandedItemId = itemId;
        }
        renderItems();
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
