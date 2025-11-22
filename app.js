// Theory of Change Application
class TheoryOfChangeApp {
    constructor() {
        this.components = [];
        this.currentEditId = null;
        this.projectName = '';
        this.projectDescription = '';
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Project info
        document.getElementById('projectName').addEventListener('input', (e) => {
            this.projectName = e.target.value;
            this.saveToStorage();
        });

        document.getElementById('projectDescription').addEventListener('input', (e) => {
            this.projectDescription = e.target.value;
            this.saveToStorage();
        });

        // Add component
        document.getElementById('addComponent').addEventListener('click', () => {
            this.addComponent();
        });

        // View toggle
        document.getElementById('viewFlow').addEventListener('click', () => {
            this.switchView('flow');
        });

        document.getElementById('viewList').addEventListener('click', () => {
            this.switchView('list');
        });

        // Toolbar buttons
        document.getElementById('newProject').addEventListener('click', () => {
            if (confirm('Are you sure? This will clear all current data.')) {
                this.newProject();
            }
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });

        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        // Modal
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        document.getElementById('deleteComponent').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this component?')) {
                this.deleteComponent();
            }
        });

        // Close modal on outside click
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });
    }

    addComponent() {
        const type = document.getElementById('componentType').value;
        const component = {
            id: Date.now(),
            type: type,
            title: '',
            description: '',
            indicators: '',
            timeframe: ''
        };

        this.components.push(component);
        this.saveToStorage();
        this.render();

        // Open edit modal immediately
        this.openEditModal(component.id);
    }

    openEditModal(id) {
        const component = this.components.find(c => c.id === id);
        if (!component) return;

        this.currentEditId = id;
        document.getElementById('editTitle').value = component.title;
        document.getElementById('editDescription').value = component.description;
        document.getElementById('editIndicators').value = component.indicators || '';
        document.getElementById('editTimeframe').value = component.timeframe || '';

        document.getElementById('editModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.currentEditId = null;
    }

    saveEdit() {
        const component = this.components.find(c => c.id === this.currentEditId);
        if (!component) return;

        component.title = document.getElementById('editTitle').value;
        component.description = document.getElementById('editDescription').value;
        component.indicators = document.getElementById('editIndicators').value;
        component.timeframe = document.getElementById('editTimeframe').value;

        this.saveToStorage();
        this.render();
        this.closeModal();
    }

    deleteComponent() {
        this.components = this.components.filter(c => c.id !== this.currentEditId);
        this.saveToStorage();
        this.render();
        this.closeModal();
    }

    switchView(view) {
        if (view === 'flow') {
            document.getElementById('flowView').style.display = 'flex';
            document.getElementById('listView').style.display = 'none';
            document.getElementById('viewFlow').classList.add('active');
            document.getElementById('viewList').classList.remove('active');
        } else {
            document.getElementById('flowView').style.display = 'none';
            document.getElementById('listView').style.display = 'block';
            document.getElementById('viewFlow').classList.remove('active');
            document.getElementById('viewList').classList.add('active');
            this.renderListView();
        }
    }

    render() {
        this.renderFlowView();
        this.renderAssumptions();

        // Update project info
        document.getElementById('projectName').value = this.projectName;
        document.getElementById('projectDescription').value = this.projectDescription;
    }

    renderFlowView() {
        // Clear all drop zones
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.innerHTML = '';
        });

        // Group components by type
        const types = ['impact', 'outcome', 'output', 'activity', 'input'];

        types.forEach(type => {
            const zone = document.querySelector(`.drop-zone[data-type="${type}"]`);
            const componentsOfType = this.components.filter(c => c.type === type);

            if (componentsOfType.length === 0) {
                zone.innerHTML = '<div class="empty-state"><p>No components yet</p><p style="font-size: 0.75rem;">Click "Add Component" to get started</p></div>';
            } else {
                componentsOfType.forEach(component => {
                    zone.appendChild(this.createComponentCard(component));
                });
            }
        });

        this.setupDragAndDrop();
    }

    renderListView() {
        const listContent = document.getElementById('listContent');
        listContent.innerHTML = '';

        const types = [
            { key: 'impact', name: '🎯 Impact', color: 'var(--impact-color)' },
            { key: 'outcome', name: '📈 Outcomes', color: 'var(--outcome-color)' },
            { key: 'output', name: '📦 Outputs', color: 'var(--output-color)' },
            { key: 'activity', name: '⚡ Activities', color: 'var(--activity-color)' },
            { key: 'input', name: '🔧 Inputs', color: 'var(--input-color)' }
        ];

        types.forEach(type => {
            const componentsOfType = this.components.filter(c => c.type === type.key);

            if (componentsOfType.length > 0) {
                const section = document.createElement('div');
                section.className = 'list-section';

                const heading = document.createElement('h3');
                heading.textContent = type.name;
                heading.style.color = type.color;
                section.appendChild(heading);

                componentsOfType.forEach(component => {
                    section.appendChild(this.createComponentCard(component));
                });

                listContent.appendChild(section);
            }
        });

        if (this.components.filter(c => c.type !== 'assumption').length === 0) {
            listContent.innerHTML = '<div class="empty-state"><p>No components yet</p><p style="font-size: 0.875rem;">Add components to build your theory of change</p></div>';
        }
    }

    renderAssumptions() {
        const assumptionsList = document.getElementById('assumptionsList');
        const assumptions = this.components.filter(c => c.type === 'assumption');

        if (assumptions.length === 0) {
            assumptionsList.innerHTML = '<div class="empty-state"><p>No assumptions added yet</p></div>';
        } else {
            assumptionsList.innerHTML = '';
            assumptions.forEach(assumption => {
                const item = document.createElement('div');
                item.className = 'assumption-item';
                item.style.cursor = 'pointer';
                item.onclick = () => this.openEditModal(assumption.id);

                const title = document.createElement('h4');
                title.textContent = assumption.title || 'Untitled Assumption';
                item.appendChild(title);

                if (assumption.description) {
                    const desc = document.createElement('p');
                    desc.textContent = assumption.description;
                    item.appendChild(desc);
                }

                assumptionsList.appendChild(item);
            });
        }
    }

    createComponentCard(component) {
        const card = document.createElement('div');
        card.className = `component-card ${component.type}`;
        card.draggable = true;
        card.dataset.id = component.id;

        const title = document.createElement('h4');
        title.textContent = component.title || 'Untitled';
        card.appendChild(title);

        if (component.description) {
            const desc = document.createElement('p');
            desc.textContent = component.description;
            card.appendChild(desc);
        }

        if (component.timeframe) {
            const timeframe = document.createElement('div');
            timeframe.className = 'timeframe';
            timeframe.textContent = `⏱️ ${component.timeframe}`;
            card.appendChild(timeframe);
        }

        if (component.indicators) {
            const indicators = document.createElement('div');
            indicators.className = 'indicators';
            indicators.textContent = `📊 ${component.indicators}`;
            card.appendChild(indicators);
        }

        card.addEventListener('click', () => {
            this.openEditModal(component.id);
        });

        return card;
    }

    setupDragAndDrop() {
        const cards = document.querySelectorAll('.component-card');
        const zones = document.querySelectorAll('.drop-zone');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                card.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', card.innerHTML);
                e.dataTransfer.setData('componentId', card.dataset.id);
            });

            card.addEventListener('dragend', (e) => {
                card.classList.remove('dragging');
            });
        });

        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', (e) => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');

                const componentId = parseInt(e.dataTransfer.getData('componentId'));
                const newType = zone.dataset.type;

                const component = this.components.find(c => c.id === componentId);
                if (component && component.type !== newType) {
                    component.type = newType;
                    this.saveToStorage();
                    this.render();
                }
            });
        });
    }

    newProject() {
        this.components = [];
        this.projectName = '';
        this.projectDescription = '';
        this.saveToStorage();
        this.render();
    }

    exportData() {
        const data = {
            projectName: this.projectName,
            projectDescription: this.projectDescription,
            components: this.components,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `theory-of-change-${this.projectName.replace(/\s+/g, '-') || 'project'}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                if (data.components && Array.isArray(data.components)) {
                    this.components = data.components;
                    this.projectName = data.projectName || '';
                    this.projectDescription = data.projectDescription || '';
                    this.saveToStorage();
                    this.render();
                    alert('Data imported successfully!');
                } else {
                    alert('Invalid file format');
                }
            } catch (error) {
                alert('Error importing file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    saveToStorage() {
        const data = {
            projectName: this.projectName,
            projectDescription: this.projectDescription,
            components: this.components
        };
        localStorage.setItem('theoryOfChange', JSON.stringify(data));
    }

    loadFromStorage() {
        const data = localStorage.getItem('theoryOfChange');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                this.projectName = parsed.projectName || '';
                this.projectDescription = parsed.projectDescription || '';
                this.components = parsed.components || [];
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TheoryOfChangeApp();
});
