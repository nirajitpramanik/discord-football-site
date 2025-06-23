// Football Manager Draft Main Script

class FMDraftManager {
    constructor() {
        this.matchdaysContainer = document.getElementById('fm-matchdays-container');
        this.loadingElement = document.getElementById('fm-loading');
        this.errorElement = document.getElementById('fm-error');
        this.loadedMatchdays = new Set();
        
        this.init();
    }

    async init() {
        try {
            await this.loadMatchdays();
            this.createParticles();
        } catch (error) {
            console.error('Failed to initialize FM Draft:', error);
            this.showError();
        }
    }

    async loadMatchdays() {
        try {
            // Start from matchday 1 and check which ones exist
            const matchdays = [];
            
            // Check for up to 38 matchdays (typical league season)
            for (let i = 1; i <= 38; i++) {
                try {
                    const response = await fetch(`results/${i}/matchday_data.json`);
                    if (response.ok) {
                        const data = await response.json();
                        matchdays.push({ number: i, data });
                    }
                } catch (error) {
                    // Matchday doesn't exist, continue checking
                }
            }

            if (matchdays.length === 0) {
                throw new Error('No matchdays found');
            }

            this.renderMatchdays(matchdays);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading matchdays:', error);
            this.showError();
        }
    }

    renderMatchdays(matchdays) {
        this.matchdaysContainer.innerHTML = '';

        matchdays.forEach(matchday => {
            const matchdayCard = this.createMatchdayCard(matchday);
            this.matchdaysContainer.appendChild(matchdayCard);
        });
    }

    createMatchdayCard(matchday) {
        const card = document.createElement('div');
        card.className = 'fm-matchday-card';
        card.innerHTML = `
            <div class="fm-matchday-header" onclick="fmDraft.toggleMatchday(${matchday.number})">
                <h3 class="fm-matchday-title">Matchday ${matchday.number}</h3>
                <span class="fm-matchday-toggle" id="toggle-${matchday.number}">▼</span>
            </div>
            <div class="fm-matchday-content" id="content-${matchday.number}">
                <div class="fm-matchday-inner">
                    <div class="fm-results-grid">
                        ${this.createResultsGrid(matchday.number, matchday.data)}
                    </div>
                    <div style="text-align: center; margin-top: 1.5rem;">
                        <a href="fm-details.html?matchday=${matchday.number}" class="fm-view-details-btn">
                            View Detailed Results
                        </a>
                    </div>
                </div>
            </div>
        `;
        return card;
    }

    createResultsGrid(matchdayNumber, data) {
        let html = '';
        
        // Display results1 and results2 if they exist
        if (data.results1) {
            html += `
                <div class="fm-result-card">
                    <img src="${data.results1}" alt="Results 1 - Matchday ${matchdayNumber}" class="fm-result-image" loading="lazy">
                </div>
            `;
        }
        
        if (data.results2) {
            html += `
                <div class="fm-result-card">
                    <img src="${data.results2}" alt="Results 2 - Matchday ${matchdayNumber}" class="fm-result-image" loading="lazy">
                </div>
            `;
        }

        return html || '<p style="color: #cccccc; text-align: center;">No results available for this matchday</p>';
    }

    toggleMatchday(matchdayNumber) {
        const content = document.getElementById(`content-${matchdayNumber}`);
        const toggle = document.getElementById(`toggle-${matchdayNumber}`);
        
        if (content && toggle) {
            const isActive = content.classList.contains('active');
            
            if (isActive) {
                content.classList.remove('active');
                toggle.classList.remove('active');
            } else {
                content.classList.add('active');
                toggle.classList.add('active');
            }
        }
    }

    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
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

        const particleCount = 30;

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
    window.fmDraft = new FMDraftManager();
});

// Handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fm-matchday-card');
    
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