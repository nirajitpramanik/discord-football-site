// Football Manager Draft Details Script

class FMDetailsManager {
    constructor() {
        this.detailsContainer = document.getElementById('fm-details-container');
        this.loadingElement = document.getElementById('fm-details-loading');
        this.errorElement = document.getElementById('fm-details-error');
        this.titleElement = document.getElementById('fm-details-title');
        this.matchdayNumber = this.getMatchdayFromURL();
        
        this.init();
    }

    getMatchdayFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('matchday') || '1';
    }

    async init() {
        try {
            this.updateTitle();
            await this.loadDetailedResults();
            this.createParticles();
            this.setupModal();
        } catch (error) {
            console.error('Failed to initialize FM Details:', error);
            this.showError();
        }
    }

    updateTitle() {
        if (this.titleElement) {
            this.titleElement.textContent = `Matchday ${this.matchdayNumber} - Detailed Results`;
        }
    }

    async loadDetailedResults() {
        try {
            const response = await fetch(`results/${this.matchdayNumber}/matchday_data.json`);
            
            if (!response.ok) {
                throw new Error(`Failed to load matchday ${this.matchdayNumber} data`);
            }

            const data = await response.json();
            this.renderDetailedResults(data);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading detailed results:', error);
            this.showError();
        }
    }

    renderDetailedResults(data) {
        this.detailsContainer.innerHTML = '';

        // Only render detailed match results if available
        if (data.resultsdetailed && data.resultsdetailed.length > 0) {
            const detailedSection = this.createDetailedSection(data.resultsdetailed);
            this.detailsContainer.appendChild(detailedSection);
        } else {
            this.detailsContainer.innerHTML = '<p class="fm-no-results">No detailed results available for this matchday.</p>';
        }
    }

    createDetailedSection(detailedResults) {
        const section = document.createElement('div');
        section.className = 'fm-details-section';
        
        let detailedHTML = `
            <h2 class="fm-section-title">Individual Match Details</h2>
            <div class="fm-detailed-grid">
        `;

        detailedResults.forEach((resultImage, index) => {
            const imageName = this.extractImageName(resultImage);
            detailedHTML += `
                <div class="fm-detailed-card" data-image="${resultImage}" data-title="${imageName}">
                    <div class="fm-detailed-image-container">
                        <img src="${resultImage}" alt="${imageName}" class="fm-detailed-image" loading="lazy">
                        <div class="fm-detailed-overlay">
                            <div class="fm-detailed-title">${imageName}</div>
                            <div class="fm-detailed-expand">Click to expand</div>
                        </div>
                    </div>
                </div>
            `;
        });

        detailedHTML += '</div>';
        section.innerHTML = detailedHTML;
        
        // Add click event listeners to each card
        section.addEventListener('click', (e) => {
            const card = e.target.closest('.fm-detailed-card');
            if (card) {
                const imageUrl = card.dataset.image;
                const title = card.dataset.title;
                this.openModal(imageUrl, title);
            }
        });
        
        return section;
    }

    extractImageName(url) {
        // Extract filename from URL and format it nicely
        const filename = url.split('/').pop().split('?')[0]; // Get filename without query params
        const nameWithoutExt = filename.replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
        
        // Convert kebab-case or snake_case to Title Case
        return nameWithoutExt
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' vs '); // Use 'vs' to indicate match between teams
    }

    setupModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="fm-modal" id="fm-modal">
                <div class="fm-modal-backdrop"></div>
                <div class="fm-modal-content">
                    <button class="fm-modal-close">&times;</button>
                    <h3 class="fm-modal-title" id="fm-modal-title"></h3>
                    <div class="fm-modal-image-container">
                        <img class="fm-modal-image" id="fm-modal-image" alt="">
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        const modal = document.getElementById('fm-modal');
        const closeBtn = modal.querySelector('.fm-modal-close');
        const backdrop = modal.querySelector('.fm-modal-backdrop');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        backdrop.addEventListener('click', () => this.closeModal());
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(imageUrl, title) {
        const modal = document.getElementById('fm-modal');
        const modalTitle = document.getElementById('fm-modal-title');
        const modalImage = document.getElementById('fm-modal-image');
        
        modalTitle.textContent = title;
        modalImage.src = imageUrl;
        modalImage.alt = title;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal() {
        const modal = document.getElementById('fm-modal');
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
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

        const particleCount = 25;

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
    window.fmDetails = new FMDetailsManager();
});

// Handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fm-details-section, .fm-detailed-card');
    
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