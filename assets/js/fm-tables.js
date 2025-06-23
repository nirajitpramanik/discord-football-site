// Football Manager Draft Tables Script

class FMTablesManager {
    constructor() {
        this.tablesGrid = document.getElementById('fm-tables-grid');
        this.loadingElement = document.getElementById('fm-tables-loading');
        this.errorElement = document.getElementById('fm-tables-error');
        
        this.init();
    }

    async init() {
        try {
            await this.loadLatestTables();
            this.createParticles();
        } catch (error) {
            console.error('Failed to initialize FM Tables:', error);
            this.showError();
        }
    }

    async loadLatestTables() {
        try {
            // Find the latest matchday with table data
            const latestMatchday = await this.findLatestMatchdayWithTables();
            
            if (!latestMatchday) {
                throw new Error('No table data found');
            }

            const response = await fetch(`results/${latestMatchday}/matchday_data.json`);
            
            if (!response.ok) {
                throw new Error(`Failed to load matchday ${latestMatchday} data`);
            }

            const data = await response.json();
            this.renderTables(data, latestMatchday);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading tables:', error);
            this.showError();
        }
    }

    async findLatestMatchdayWithTables() {
        // Check matchdays from highest to lowest to find the most recent one with table data
        for (let i = 38; i >= 1; i--) {
            try {
                const response = await fetch(`results/${i}/matchday_data.json`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.table1 || data.table2) {
                        return i;
                    }
                }
            } catch (error) {
                // Continue checking previous matchdays
            }
        }
        return null;
    }

    renderTables(data, matchdayNumber) {
        this.tablesGrid.innerHTML = '';

        // Create header with matchday info
        const headerInfo = document.createElement('div');
        headerInfo.className = 'fm-tables-header';
        headerInfo.innerHTML = `
            <p class="fm-tables-info">Showing tables after Matchday ${matchdayNumber}</p>
        `;
        this.tablesGrid.appendChild(headerInfo);

        // Create tables container
        const tablesContainer = document.createElement('div');
        tablesContainer.className = 'fm-tables-container';

        // Add Division 1 table if available
        if (data.table1) {
            const division1Card = this.createTableCard('Conference A', data.table1, 'division-1');
            tablesContainer.appendChild(division1Card);
        }

        // Add Division 2 table if available
        if (data.table2) {
            const division2Card = this.createTableCard('Conference B', data.table2, 'division-2');
            tablesContainer.appendChild(division2Card);
        }

        // If no tables are available
        if (!data.table1 && !data.table2) {
            const noTablesMessage = document.createElement('div');
            noTablesMessage.className = 'fm-no-tables';
            noTablesMessage.innerHTML = `
                <p style="color: #cccccc; text-align: center; margin: 2rem 0;">
                    No table data available for matchday ${matchdayNumber}
                </p>
            `;
            tablesContainer.appendChild(noTablesMessage);
        }

        this.tablesGrid.appendChild(tablesContainer);
    }

    createTableCard(title, imageUrl, divisionClass) {
        const card = document.createElement('div');
        card.className = `fm-table-card ${divisionClass}`;
        card.innerHTML = `
            <div class="fm-table-header">
                <h2 class="fm-table-title">${title}</h2>
            </div>
            <div class="fm-table-content">
                <img src="${imageUrl}" alt="${title} Table" class="fm-table-image" loading="lazy">
            </div>
        `;
        return card;
    }

    showLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'flex';
        }
        if (this.tablesGrid) {
            this.tablesGrid.style.opacity = '0.5';
        }
    }

    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
        if (this.tablesGrid) {
            this.tablesGrid.style.opacity = '1';
        }
    }

    showError() {
        this.hideLoading();
        if (this.errorElement) {
            this.errorElement.style.display = 'block';
        }
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fmTables = new FMTablesManager();
});

// Handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fm-table-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.animation = 'fm-fadeInUp 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fm-fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', handleScrollAnimations);