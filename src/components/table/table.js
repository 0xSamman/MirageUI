/**
 * MIRAGE ADVANCED TABLES COMPONENT - RTL PERSIAN OPTIMIZED
 * ========================================================
 * 
 * Advanced data tables with sorting, filtering, selection, and Persian support
 * Features: RTL layout, Persian numbers, glass morphism design, responsive
 * 
 * @author Mirage Design System
 * @version 1.0.0
 */

class MirageTable {
    constructor(options = {}) {
        this.options = {
            container: null,
            data: [],
            columns: [],
            sortable: true,
            filterable: true,
            searchable: true,
            selectable: true,
            pagination: true,
            perPage: 10,
            perPageOptions: [5, 10, 25, 50, 100],
            responsive: true,
            bulkActions: true,
            emptyMessage: 'هیچ داده‌ای یافت نشد',
            loadingMessage: 'در حال بارگیری...',
            searchPlaceholder: 'جستجو...',
            language: 'fa',
            rtl: true,
            persianNumbers: true,
            onSort: null,
            onFilter: null,
            onSearch: null,
            onSelect: null,
            onBulkAction: null,
            onRowClick: null,
            ...options
        };

        this.state = {
            currentPage: 1,
            sortColumn: null,
            sortDirection: 'asc',
            filters: {},
            searchTerm: '',
            selectedRows: new Set(),
            filteredData: [],
            isLoading: false,
            selectAll: false
        };

        this.elements = {
            container: null,
            table: null,
            thead: null,
            tbody: null,
            searchInput: null,
            filterElements: {},
            paginationElements: {},
            bulkActionsBar: null,
            perPageSelect: null
        };

        this.init();
    }

    init() {
        this.validateOptions();
        this.setupContainer();
        this.processData();
        this.render();
        this.bindEvents();
    }

    validateOptions() {
        if (!this.options.container) {
            throw new Error('Container element is required');
        }

        if (!this.options.columns || this.options.columns.length === 0) {
            throw new Error('Columns configuration is required');
        }

        this.elements.container = typeof this.options.container === 'string' 
            ? document.querySelector(this.options.container)
            : this.options.container;

        if (!this.elements.container) {
            throw new Error('Container element not found');
        }
    }

    setupContainer() {
        this.elements.container.className = 'mir-table-container';
        this.elements.container.setAttribute('dir', this.options.rtl ? 'rtl' : 'ltr');
        this.elements.container.innerHTML = '';
    }

    processData() {
        this.state.filteredData = this.filterData(this.options.data);
        this.state.filteredData = this.searchData(this.state.filteredData);
        this.state.filteredData = this.sortData(this.state.filteredData);
    }

    render() {
        this.renderHeader();
        this.renderFilters();
        this.renderBulkActions();
        this.renderTable();
        this.renderFooter();
    }

    renderHeader() {
        const header = document.createElement('div');
        header.className = 'mir-table-header';
        
        const title = document.createElement('h3');
        title.className = 'mir-table-title';
        title.textContent = this.options.title || 'جدول داده‌ها';
        header.appendChild(title);

        const actions = document.createElement('div');
        actions.className = 'mir-table-actions';

        // Search input
        if (this.options.searchable) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'mir-table-search';

            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'mir-table-search-input';
            searchInput.placeholder = this.options.searchPlaceholder;
            searchInput.value = this.state.searchTerm;
            searchInput.setAttribute('dir', this.options.rtl ? 'rtl' : 'ltr');

            const searchIcon = document.createElement('i');
            searchIcon.className = 'mir-table-search-icon';
            searchIcon.setAttribute('data-feather', 'search');

            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(searchIcon);
            actions.appendChild(searchContainer);

            this.elements.searchInput = searchInput;
        }

        // Custom action buttons
        if (this.options.actions) {
            this.options.actions.forEach(action => {
                const button = document.createElement('button');
                button.className = `mir-btn mir-btn-${action.variant || 'primary'} mir-btn-sm`;
                button.innerHTML = `${action.icon ? `<i data-feather="${action.icon}"></i>` : ''}${action.label}`;
                button.addEventListener('click', action.handler);
                actions.appendChild(button);
            });
        }

        header.appendChild(actions);
        this.elements.container.appendChild(header);
    }

    renderFilters() {
        if (!this.options.filterable) return;

        const filterableColumns = this.options.columns.filter(col => col.filterable);
        if (filterableColumns.length === 0) return;

        const filtersContainer = document.createElement('div');
        filtersContainer.className = 'mir-table-filters';

        filterableColumns.forEach(column => {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'mir-table-filter';

            const label = document.createElement('label');
            label.className = 'mir-table-filter-label';
            label.textContent = column.label;

            const select = document.createElement('select');
            select.className = 'mir-table-filter-select';
            select.setAttribute('dir', this.options.rtl ? 'rtl' : 'ltr');

            // Get unique values for filter options
            const uniqueValues = [...new Set(this.options.data.map(row => row[column.key]))];
            
            const allOption = document.createElement('option');
            allOption.value = '';
            allOption.textContent = 'همه';
            select.appendChild(allOption);

            uniqueValues.forEach(value => {
                if (value !== null && value !== undefined && value !== '') {
                    const option = document.createElement('option');
                    option.value = value;
                    option.textContent = this.options.persianNumbers ? this.convertToPersianNumbers(value.toString()) : value;
                    select.appendChild(option);
                }
            });

            filterContainer.appendChild(label);
            filterContainer.appendChild(select);
            filtersContainer.appendChild(filterContainer);

            this.elements.filterElements[column.key] = select;
        });

        // Clear filters button
        const clearButton = document.createElement('button');
        clearButton.className = 'mir-table-filter-clear';
        clearButton.textContent = 'پاک کردن فیلترها';
        filtersContainer.appendChild(clearButton);

        this.elements.container.appendChild(filtersContainer);
    }

    renderBulkActions() {
        if (!this.options.bulkActions || !this.options.selectable) return;

        const bulkActionsBar = document.createElement('div');
        bulkActionsBar.className = 'mir-table-bulk-actions mir-hidden';

        const info = document.createElement('div');
        info.className = 'mir-table-bulk-info';
        info.textContent = `${this.convertToPersianNumbers(this.state.selectedRows.size.toString())} مورد انتخاب شده`;

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'mir-table-bulk-actions-buttons';

        // Default bulk actions
        const defaultActions = [
            { label: 'حذف انتخاب شده‌ها', action: 'delete', variant: 'danger' },
            { label: 'صادر کردن', action: 'export', variant: 'secondary' }
        ];

        const actions = this.options.bulkActions === true ? defaultActions : this.options.bulkActions;
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = `mir-btn mir-btn-${action.variant || 'primary'} mir-btn-sm`;
            button.textContent = action.label;
            button.setAttribute('data-action', action.action);
            actionsContainer.appendChild(button);
        });

        bulkActionsBar.appendChild(info);
        bulkActionsBar.appendChild(actionsContainer);

        this.elements.container.appendChild(bulkActionsBar);
        this.elements.bulkActionsBar = bulkActionsBar;
    }

    renderTable() {
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'mir-table-wrapper';

        const table = document.createElement('table');
        table.className = 'mir-table';
        table.setAttribute('dir', this.options.rtl ? 'rtl' : 'ltr');

        this.renderTableHeader(table);
        this.renderTableBody(table);

        tableWrapper.appendChild(table);
        this.elements.container.appendChild(tableWrapper);
        this.elements.table = table;
    }

    renderTableHeader(table) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Selection checkbox column
        if (this.options.selectable) {
            const th = document.createElement('th');
            th.className = 'mir-checkbox-column';
            
            const checkboxContainer = document.createElement('label');
            checkboxContainer.className = 'mir-table-checkbox';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = this.state.selectAll;
            
            const checkboxMark = document.createElement('span');
            checkboxMark.className = 'mir-table-checkbox-mark';
            
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(checkboxMark);
            th.appendChild(checkboxContainer);
            headerRow.appendChild(th);
        }

        // Data columns
        this.options.columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column.label;
            th.setAttribute('data-column', column.key);

            if (column.sortable !== false && this.options.sortable) {
                th.className = 'mir-sortable';
                if (this.state.sortColumn === column.key) {
                    th.classList.add(`mir-sort-${this.state.sortDirection}`);
                }
            }

            if (column.width) {
                th.style.width = column.width;
            }

            headerRow.appendChild(th);
        });

        // Actions column
        if (this.hasRowActions()) {
            const th = document.createElement('th');
            th.className = 'mir-actions-column';
            th.textContent = 'عملیات';
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        table.appendChild(thead);
        this.elements.thead = thead;
    }

    renderTableBody(table) {
        const tbody = document.createElement('tbody');

        if (this.state.isLoading) {
            this.renderLoadingState(tbody);
        } else if (this.state.filteredData.length === 0) {
            this.renderEmptyState(tbody);
        } else {
            this.renderDataRows(tbody);
        }

        table.appendChild(tbody);
        this.elements.tbody = tbody;
    }

    renderLoadingState(tbody) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = this.getColumnCount();
        cell.className = 'mir-table-loading';
        
        const spinner = document.createElement('div');
        spinner.className = 'mir-table-loading-spinner';
        
        const text = document.createElement('div');
        text.className = 'mir-table-loading-text';
        text.textContent = this.options.loadingMessage;
        
        cell.appendChild(spinner);
        cell.appendChild(text);
        row.appendChild(cell);
        tbody.appendChild(row);
    }

    renderEmptyState(tbody) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = this.getColumnCount();
        cell.className = 'mir-table-empty';
        
        const icon = document.createElement('i');
        icon.className = 'mir-table-empty-icon';
        icon.setAttribute('data-feather', 'inbox');
        
        const title = document.createElement('h4');
        title.className = 'mir-table-empty-title';
        title.textContent = 'داده‌ای یافت نشد';
        
        const description = document.createElement('p');
        description.className = 'mir-table-empty-description';
        description.textContent = this.options.emptyMessage;
        
        cell.appendChild(icon);
        cell.appendChild(title);
        cell.appendChild(description);
        row.appendChild(cell);
        tbody.appendChild(row);
    }

    renderDataRows(tbody) {
        const startIndex = (this.state.currentPage - 1) * this.options.perPage;
        const endIndex = startIndex + this.options.perPage;
        const pageData = this.state.filteredData.slice(startIndex, endIndex);

        pageData.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-row-index', startIndex + index);
            
            if (this.state.selectedRows.has(startIndex + index)) {
                tr.classList.add('mir-selected');
            }

            // Selection checkbox
            if (this.options.selectable) {
                const td = document.createElement('td');
                td.className = 'mir-checkbox-column';
                
                const checkboxContainer = document.createElement('label');
                checkboxContainer.className = 'mir-table-checkbox';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = this.state.selectedRows.has(startIndex + index);
                checkbox.setAttribute('data-row-index', startIndex + index);
                
                const checkboxMark = document.createElement('span');
                checkboxMark.className = 'mir-table-checkbox-mark';
                
                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(checkboxMark);
                td.appendChild(checkboxContainer);
                tr.appendChild(td);
            }

            // Data columns
            this.options.columns.forEach(column => {
                const td = document.createElement('td');
                let cellValue = row[column.key];

                if (column.render) {
                    td.innerHTML = column.render(cellValue, row, startIndex + index);
                } else if (column.type === 'user') {
                    td.innerHTML = this.renderUserCell(cellValue, row);
                } else if (column.type === 'status') {
                    td.innerHTML = this.renderStatusCell(cellValue, row);
                } else if (column.type === 'date') {
                    td.textContent = this.formatDate(cellValue);
                } else if (column.type === 'number') {
                    td.textContent = this.formatNumber(cellValue);
                } else {
                    td.textContent = this.options.persianNumbers ? this.convertToPersianNumbers(cellValue?.toString() || '') : cellValue || '';
                }

                if (column.className) {
                    td.className = column.className;
                }

                tr.appendChild(td);
            });

            // Actions column
            if (this.hasRowActions()) {
                const td = document.createElement('td');
                td.className = 'mir-actions-column';
                td.innerHTML = this.renderRowActions(row, startIndex + index);
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        });
    }

    renderUserCell(value, row) {
        if (typeof value === 'object' && value !== null) {
            return `
                <div class="mir-table-user">
                    <img src="${value.avatar || 'https://via.placeholder.com/32x32'}" alt="${value.name}" class="mir-table-avatar">
                    <div class="mir-table-user-info">
                        <div class="mir-table-user-name">${value.name}</div>
                        ${value.email ? `<div class="mir-table-user-email">${value.email}</div>` : ''}
                    </div>
                </div>
            `;
        }
        return value;
    }

    renderStatusCell(value, row) {
        const statusClasses = {
            'success': 'mir-status-success',
            'warning': 'mir-status-warning',
            'error': 'mir-status-error',
            'info': 'mir-status-info',
            'default': 'mir-status-default'
        };

        const statusClass = statusClasses[value] || statusClasses.default;
        const statusText = this.getStatusText(value);

        return `<span class="mir-table-status ${statusClass}">${statusText}</span>`;
    }

    renderRowActions(row, index) {
        const actions = this.options.rowActions || [
            { label: 'مشاهده', action: 'view', variant: 'view', icon: 'eye' },
            { label: 'ویرایش', action: 'edit', variant: 'edit', icon: 'edit' },
            { label: 'حذف', action: 'delete', variant: 'delete', icon: 'trash-2' }
        ];

        const actionsHtml = actions.map(action => `
            <button class="mir-table-action-btn mir-action-${action.variant || action.action}" 
                    data-action="${action.action}" 
                    data-row-index="${index}">
                ${action.icon ? `<i data-feather="${action.icon}"></i>` : ''}
                ${action.label}
            </button>
        `).join('');

        return `<div class="mir-table-actions-cell">${actionsHtml}</div>`;
    }

    renderFooter() {
        if (!this.options.pagination) return;

        const footer = document.createElement('div');
        footer.className = 'mir-table-footer';

        const info = document.createElement('div');
        info.className = 'mir-table-info';

        // Per page selector
        const perPageContainer = document.createElement('div');
        perPageContainer.className = 'mir-table-per-page';

        const perPageLabel = document.createElement('span');
        perPageLabel.textContent = 'نمایش';

        const perPageSelect = document.createElement('select');
        perPageSelect.className = 'mir-table-per-page-select';
        perPageSelect.setAttribute('dir', this.options.rtl ? 'rtl' : 'ltr');

        this.options.perPageOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = this.options.persianNumbers ? this.convertToPersianNumbers(option.toString()) : option;
            optionElement.selected = option === this.options.perPage;
            perPageSelect.appendChild(optionElement);
        });

        const perPageLabel2 = document.createElement('span');
        perPageLabel2.textContent = 'مورد در صفحه';

        perPageContainer.appendChild(perPageLabel);
        perPageContainer.appendChild(perPageSelect);
        perPageContainer.appendChild(perPageLabel2);

        // Info text
        const totalRows = this.state.filteredData.length;
        const startIndex = (this.state.currentPage - 1) * this.options.perPage + 1;
        const endIndex = Math.min(startIndex + this.options.perPage - 1, totalRows);
        
        const infoText = document.createElement('span');
        infoText.textContent = `${this.convertToPersianNumbers(startIndex.toString())} تا ${this.convertToPersianNumbers(endIndex.toString())} از ${this.convertToPersianNumbers(totalRows.toString())} مورد`;

        info.appendChild(perPageContainer);
        info.appendChild(infoText);

        // Pagination controls
        const pagination = this.createPagination();

        footer.appendChild(info);
        footer.appendChild(pagination);

        this.elements.container.appendChild(footer);
        this.elements.perPageSelect = perPageSelect;
    }

    createPagination() {
        const pagination = document.createElement('div');
        pagination.className = 'mir-table-pagination';

        const totalPages = Math.ceil(this.state.filteredData.length / this.options.perPage);
        const currentPage = this.state.currentPage;

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'mir-table-pagination-btn';
        prevBtn.innerHTML = '<i data-feather="chevron-right"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.setAttribute('data-page', currentPage - 1);
        pagination.appendChild(prevBtn);

        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            const firstBtn = document.createElement('button');
            firstBtn.className = 'mir-table-pagination-btn';
            firstBtn.textContent = this.options.persianNumbers ? '۱' : '1';
            firstBtn.setAttribute('data-page', 1);
            pagination.appendChild(firstBtn);

            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'mir-table-pagination-dots';
                pagination.appendChild(dots);
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'mir-table-pagination-btn';
            pageBtn.textContent = this.options.persianNumbers ? this.convertToPersianNumbers(page.toString()) : page.toString();
            pageBtn.setAttribute('data-page', page);
            
            if (page === currentPage) {
                pageBtn.classList.add('mir-active');
            }
            
            pagination.appendChild(pageBtn);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'mir-table-pagination-dots';
                pagination.appendChild(dots);
            }

            const lastBtn = document.createElement('button');
            lastBtn.className = 'mir-table-pagination-btn';
            lastBtn.textContent = this.options.persianNumbers ? this.convertToPersianNumbers(totalPages.toString()) : totalPages.toString();
            lastBtn.setAttribute('data-page', totalPages);
            pagination.appendChild(lastBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'mir-table-pagination-btn';
        nextBtn.innerHTML = '<i data-feather="chevron-left"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.setAttribute('data-page', currentPage + 1);
        pagination.appendChild(nextBtn);

        return pagination;
    }

    bindEvents() {
        // Search input
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', this.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }

        // Column sorting
        if (this.elements.thead) {
            this.elements.thead.addEventListener('click', (e) => {
                const th = e.target.closest('th.mir-sortable');
                if (th) {
                    const column = th.getAttribute('data-column');
                    this.handleSort(column);
                }
            });
        }

        // Row selection
        if (this.options.selectable) {
            this.elements.container.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox') {
                    const rowIndex = e.target.getAttribute('data-row-index');
                    if (rowIndex !== null) {
                        this.handleRowSelection(parseInt(rowIndex), e.target.checked);
                    } else {
                        this.handleSelectAll(e.target.checked);
                    }
                }
            });
        }

        // Row actions
        this.elements.container.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.mir-table-action-btn');
            if (actionBtn) {
                const action = actionBtn.getAttribute('data-action');
                const rowIndex = parseInt(actionBtn.getAttribute('data-row-index'));
                this.handleRowAction(action, rowIndex);
            }
        });

        // Bulk actions
        if (this.elements.bulkActionsBar) {
            this.elements.bulkActionsBar.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('[data-action]');
                if (actionBtn) {
                    const action = actionBtn.getAttribute('data-action');
                    this.handleBulkAction(action);
                }
            });
        }

        // Pagination
        this.elements.container.addEventListener('click', (e) => {
            const pageBtn = e.target.closest('.mir-table-pagination-btn');
            if (pageBtn && !pageBtn.disabled) {
                const page = parseInt(pageBtn.getAttribute('data-page'));
                this.handlePageChange(page);
            }
        });

        // Per page change
        if (this.elements.perPageSelect) {
            this.elements.perPageSelect.addEventListener('change', (e) => {
                this.handlePerPageChange(parseInt(e.target.value));
            });
        }

        // Filters
        Object.keys(this.elements.filterElements).forEach(key => {
            this.elements.filterElements[key].addEventListener('change', (e) => {
                this.handleFilter(key, e.target.value);
            });
        });

        // Clear filters
        const clearFiltersBtn = this.elements.container.querySelector('.mir-table-filter-clear');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Row click
        if (this.options.onRowClick) {
            this.elements.container.addEventListener('click', (e) => {
                const row = e.target.closest('tbody tr');
                if (row && !e.target.closest('.mir-table-action-btn, .mir-table-checkbox')) {
                    const rowIndex = parseInt(row.getAttribute('data-row-index'));
                    this.options.onRowClick(this.state.filteredData[rowIndex], rowIndex);
                }
            });
        }

        // Keyboard navigation
        this.elements.container.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Responsive handling
        if (this.options.responsive) {
            window.addEventListener('resize', this.debounce(() => {
                this.handleResize();
            }, 100));
        }
    }

    // Event handlers
    handleSearch(searchTerm) {
        this.state.searchTerm = searchTerm;
        this.state.currentPage = 1;
        this.processData();
        this.updateTable();
        
        if (this.options.onSearch) {
            this.options.onSearch(searchTerm);
        }
    }

    handleSort(column) {
        if (this.state.sortColumn === column) {
            this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sortColumn = column;
            this.state.sortDirection = 'asc';
        }
        
        this.processData();
        this.updateTable();
        
        if (this.options.onSort) {
            this.options.onSort(column, this.state.sortDirection);
        }
    }

    handleRowSelection(rowIndex, checked) {
        if (checked) {
            this.state.selectedRows.add(rowIndex);
        } else {
            this.state.selectedRows.delete(rowIndex);
        }
        
        this.updateSelectionState();
        this.updateBulkActionsVisibility();
        
        if (this.options.onSelect) {
            this.options.onSelect(Array.from(this.state.selectedRows));
        }
    }

    handleSelectAll(checked) {
        this.state.selectAll = checked;
        this.state.selectedRows.clear();
        
        if (checked) {
            this.state.filteredData.forEach((_, index) => {
                this.state.selectedRows.add(index);
            });
        }
        
        this.updateTable();
        this.updateBulkActionsVisibility();
        
        if (this.options.onSelect) {
            this.options.onSelect(Array.from(this.state.selectedRows));
        }
    }

    handleRowAction(action, rowIndex) {
        const rowData = this.state.filteredData[rowIndex];
        
        if (this.options.onRowAction) {
            this.options.onRowAction(action, rowData, rowIndex);
        }
        
        // Default actions
        switch (action) {
            case 'delete':
                if (confirm('آیا از حذف این مورد اطمینان دارید؟')) {
                    this.deleteRow(rowIndex);
                }
                break;
            case 'edit':
                console.log('Edit row:', rowData);
                break;
            case 'view':
                console.log('View row:', rowData);
                break;
        }
    }

    handleBulkAction(action) {
        const selectedRowsArray = Array.from(this.state.selectedRows);
        const selectedData = selectedRowsArray.map(index => this.state.filteredData[index]);
        
        if (this.options.onBulkAction) {
            this.options.onBulkAction(action, selectedData, selectedRowsArray);
        }
        
        // Default bulk actions
        switch (action) {
            case 'delete':
                if (confirm(`آیا از حذف ${this.convertToPersianNumbers(selectedRowsArray.length.toString())} مورد انتخاب شده اطمینان دارید؟`)) {
                    this.deleteRows(selectedRowsArray);
                }
                break;
            case 'export':
                this.exportData(selectedData);
                break;
        }
    }

    handlePageChange(page) {
        this.state.currentPage = page;
        this.updateTable();
    }

    handlePerPageChange(perPage) {
        this.options.perPage = perPage;
        this.state.currentPage = 1;
        this.processData();
        this.updateTable();
    }

    handleFilter(column, value) {
        if (value === '') {
            delete this.state.filters[column];
        } else {
            this.state.filters[column] = value;
        }
        
        this.state.currentPage = 1;
        this.processData();
        this.updateTable();
        
        if (this.options.onFilter) {
            this.options.onFilter(this.state.filters);
        }
    }

    handleKeyboard(e) {
        // Add keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'a':
                    if (this.options.selectable) {
                        e.preventDefault();
                        this.handleSelectAll(true);
                    }
                    break;
                case 'f':
                    if (this.elements.searchInput) {
                        e.preventDefault();
                        this.elements.searchInput.focus();
                    }
                    break;
            }
        }
    }

    handleResize() {
        // Handle responsive behavior
        // This can be extended based on specific responsive needs
    }

    // Data processing methods
    filterData(data) {
        if (Object.keys(this.state.filters).length === 0) {
            return data;
        }
        
        return data.filter(row => {
            return Object.entries(this.state.filters).every(([column, value]) => {
                return row[column] === value;
            });
        });
    }

    searchData(data) {
        if (!this.state.searchTerm) {
            return data;
        }
        
        const searchTerm = this.state.searchTerm.toLowerCase();
        return data.filter(row => {
            return this.options.columns.some(column => {
                const value = row[column.key];
                if (value === null || value === undefined) return false;
                return value.toString().toLowerCase().includes(searchTerm);
            });
        });
    }

    sortData(data) {
        if (!this.state.sortColumn) {
            return data;
        }
        
        return [...data].sort((a, b) => {
            const aVal = a[this.state.sortColumn];
            const bVal = b[this.state.sortColumn];
            
            if (aVal === bVal) return 0;
            
            let comparison = 0;
            if (aVal > bVal) comparison = 1;
            if (aVal < bVal) comparison = -1;
            
            return this.state.sortDirection === 'desc' ? comparison * -1 : comparison;
        });
    }

    // Update methods
    updateTable() {
        this.elements.tbody.innerHTML = '';
        
        if (this.state.isLoading) {
            this.renderLoadingState(this.elements.tbody);
        } else if (this.state.filteredData.length === 0) {
            this.renderEmptyState(this.elements.tbody);
        } else {
            this.renderDataRows(this.elements.tbody);
        }
        
        this.updatePagination();
        this.updateSelectionState();
        this.updateSortingState();
        
        // Re-initialize icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    updatePagination() {
        const footer = this.elements.container.querySelector('.mir-table-footer');
        if (footer) {
            footer.remove();
        }
        this.renderFooter();
    }

    updateSelectionState() {
        const checkboxes = this.elements.container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const rowIndex = checkbox.getAttribute('data-row-index');
            if (rowIndex !== null) {
                checkbox.checked = this.state.selectedRows.has(parseInt(rowIndex));
            } else {
                // Header checkbox
                const totalRows = this.state.filteredData.length;
                const selectedCount = this.state.selectedRows.size;
                checkbox.checked = selectedCount > 0 && selectedCount === totalRows;
                checkbox.indeterminate = selectedCount > 0 && selectedCount < totalRows;
            }
        });
    }

    updateSortingState() {
        const headers = this.elements.thead.querySelectorAll('th.mir-sortable');
        headers.forEach(header => {
            const column = header.getAttribute('data-column');
            header.classList.remove('mir-sort-asc', 'mir-sort-desc');
            
            if (column === this.state.sortColumn) {
                header.classList.add(`mir-sort-${this.state.sortDirection}`);
            }
        });
    }

    updateBulkActionsVisibility() {
        if (this.elements.bulkActionsBar) {
            const selectedCount = this.state.selectedRows.size;
            if (selectedCount > 0) {
                this.elements.bulkActionsBar.classList.remove('mir-hidden');
                const info = this.elements.bulkActionsBar.querySelector('.mir-table-bulk-info');
                if (info) {
                    info.textContent = `${this.convertToPersianNumbers(selectedCount.toString())} مورد انتخاب شده`;
                }
            } else {
                this.elements.bulkActionsBar.classList.add('mir-hidden');
            }
        }
    }

    // Public API methods
    setData(data) {
        this.options.data = data;
        this.state.currentPage = 1;
        this.state.selectedRows.clear();
        this.processData();
        this.updateTable();
        this.updateBulkActionsVisibility();
    }

    addRow(rowData) {
        this.options.data.push(rowData);
        this.processData();
        this.updateTable();
    }

    deleteRow(index) {
        this.options.data.splice(index, 1);
        this.state.selectedRows.delete(index);
        this.processData();
        this.updateTable();
        this.updateBulkActionsVisibility();
    }

    deleteRows(indices) {
        indices.sort((a, b) => b - a).forEach(index => {
            this.options.data.splice(index, 1);
        });
        this.state.selectedRows.clear();
        this.processData();
        this.updateTable();
        this.updateBulkActionsVisibility();
    }

    updateRow(index, rowData) {
        this.options.data[index] = { ...this.options.data[index], ...rowData };
        this.processData();
        this.updateTable();
    }

    clearFilters() {
        this.state.filters = {};
        Object.values(this.elements.filterElements).forEach(select => {
            select.value = '';
        });
        this.state.currentPage = 1;
        this.processData();
        this.updateTable();
    }

    clearSearch() {
        this.state.searchTerm = '';
        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
        }
        this.state.currentPage = 1;
        this.processData();
        this.updateTable();
    }

    clearSelection() {
        this.state.selectedRows.clear();
        this.updateSelectionState();
        this.updateBulkActionsVisibility();
    }

    getSelectedRows() {
        return Array.from(this.state.selectedRows).map(index => this.state.filteredData[index]);
    }

    exportData(data = null) {
        const exportData = data || this.state.filteredData;
        const csv = this.convertToCSV(exportData);
        this.downloadCSV(csv, 'table-data.csv');
    }

    setLoading(isLoading) {
        this.state.isLoading = isLoading;
        this.updateTable();
    }

    refresh() {
        this.processData();
        this.updateTable();
    }

    // Utility methods
    convertToCSV(data) {
        const headers = this.options.columns.map(col => col.label);
        const rows = data.map(row => this.options.columns.map(col => row[col.key]));
        
        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        return csvContent;
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    convertToPersianNumbers(text) {
        if (!this.options.persianNumbers) return text;
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return text.replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fa-IR');
    }

    formatNumber(number) {
        if (number === null || number === undefined) return '';
        const formatted = new Intl.NumberFormat('fa-IR').format(number);
        return this.options.persianNumbers ? formatted : formatted.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    }

    getStatusText(status) {
        const statusTexts = {
            'success': 'موفق',
            'warning': 'هشدار',
            'error': 'خطا',
            'info': 'اطلاعات',
            'default': 'پیش‌فرض'
        };
        return statusTexts[status] || status;
    }

    getColumnCount() {
        let count = this.options.columns.length;
        if (this.options.selectable) count++;
        if (this.hasRowActions()) count++;
        return count;
    }

    hasRowActions() {
        return this.options.rowActions && this.options.rowActions.length > 0;
    }

    debounce(func, wait) {
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

    destroy() {
        // Clean up event listeners and DOM
        this.elements.container.innerHTML = '';
        this.elements = {};
        this.options = {};
        this.state = {};
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MirageTable;
}
if (typeof window !== 'undefined') {
    window.MirageTable = MirageTable;
}