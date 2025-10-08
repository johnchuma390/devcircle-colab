// /js/data-loader.js

class DataLoader {
    constructor() {
        this.cache = new Map();
        this.init();
    }

    init() {
        this.loadPageContent();
    }

    async loadPageContent() {
        try {
            // Load content based on the current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';

            switch (currentPage) {
                case 'index.html':
                case '':
                    await this.loadHomeContent();
                    break;
                case 'services.html':
                    await this.loadServicesContent();
                    break;
                case 'portfolio.html':
                    await this.loadPortfolioContent();
                    break;
                case 'pricing.html':
                    await this.loadPricingContent();
                    break;
                case 'blog.html':
                    await this.loadBlogContent();
                    break;
                case 'faq.html':
                    await this.loadFAQContent();
                    break;
                case 'about.html':
                    await this.loadAboutContent();
                    break;
            }
        } catch (error) {
            console.error('Error loading page content:', error);
        }
    }

    async loadData(filename) {
        if (this.cache.has(filename)) {
            return this.cache.get(filename);
        }

        try {
            const response = await fetch(`data/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }

            const data = await response.json();
            this.cache.set(filename, data);
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    async loadHomeContent() {
        const quickSummariesElement = document.getElementById('quickSummaries');
        if (quickSummariesElement) {
            const summaries = [
                {
                    icon: '🎨',
                    title: 'Creative Design',
                    description: 'Stunning, user-friendly designs that capture your brand essence and engage your audience.'
                },
                {
                    icon: '⚡',
                    title: 'Fast Performance',
                    description: 'Lightning-fast websites optimized for speed, SEO, and mobile responsiveness.'
                },
                {
                    icon: '🚀',
                    title: 'Growth Focused',
                    description: 'Strategic digital solutions that drive traffic, leads, and business growth.'
                }
            ];

            quickSummariesElement.innerHTML = summaries.map(item => `
                <div class="card">
                    <div class="card-body">
                        <div class="service-icon" style="margin-bottom: 1.5rem;">
                            ${item.icon}
                        </div>
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-description">${item.description}</p>
                    </div>
                </div>
            `).join('');
        }

        const servicesData = await this.loadData('services.json');
        const servicesPreviewElement = document.getElementById('servicesPreview');
        
        if (servicesData && servicesPreviewElement) {
            const featuredServices = servicesData.slice(0, 3);
            servicesPreviewElement.innerHTML = `
                <div class="grid grid-3">
                    ${featuredServices.map(service => `
                        <div class="service-card">
                            <div class="service-icon">
                                ${service.icon}
                            </div>
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                            <ul style="text-align: left; margin-bottom: 2rem;">
                                ${service.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <a href="services.html#${service.id}" class="btn btn-outline">Learn More</a>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    async loadServicesContent() {
        const servicesData = await this.loadData('services.json');
        const servicesContainer = document.getElementById('servicesContainer');
        
        if (servicesData && servicesContainer) {
            servicesContainer.innerHTML = servicesData.map(service => `
                <section id="${service.id}" class="service-section">
                    <div class="container">
                        <div class="grid grid-2" style="gap: 4rem; align-items: center;">
                            <div>
                                <div class="service-icon" style="width: 80px; height: 80px; font-size: 2rem; margin-bottom: 2rem;">
                                    ${service.icon}
                                </div>
                                <h2>${service.title}</h2>
                                <p style="font-size: 1.125rem; margin-bottom: 2rem;">${service.description}</p>
                                <h3>What's Included:</h3>
                                <ul style="margin-bottom: 2rem;">
                                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                    <a href="contact.html" class="btn btn-primary">Request Quote</a>
                                    <a href="https://wa.me/254743750237" class="btn btn-accent">Chat on WhatsApp</a>
                                </div>
                            </div>
                            <div>
                                <img src="${service.image}" alt="${service.title}" style="border-radius: 1rem; box-shadow: var(--shadow-xl);">
                            </div>
                        </div>
                    </div>
                </section>
            `).join('');
        }
    }

    async loadPortfolioContent() {
        const portfolioData = await this.loadData('portfolio.json');
        const portfolioGrid = document.getElementById('portfolioGrid');
        
        if (portfolioData && portfolioGrid) {
            portfolioGrid.innerHTML = `
                <div class="grid grid-3">
                    ${portfolioData.map((project, index) => `
                        <div class="portfolio-card" data-category="${project.category}" data-index="${index}">
                            <div class="portfolio-image">
                                <img src="${project.image}" alt="${project.title}" loading="lazy">
                                <div class="portfolio-overlay">
                                    <div class="portfolio-overlay-content">
                                        <h4>${project.title}</h4>
                                        <button class="btn btn-secondary btn-small portfolio-view" data-index="${index}">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="portfolio-info">
                                <h4 class="portfolio-title">${project.title}</h4>
                                <p class="portfolio-description">${project.description}</p>
                                <div class="portfolio-tags">
                                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            this.initializePortfolioFilters(portfolioData);
        }
    }

    initializePortfolioFilters(portfolioData) {
        const categories = [...new Set(portfolioData.map(project => project.category))];
        const filtersContainer = document.getElementById('portfolioFilters');
        
        if (filtersContainer) {
            filtersContainer.innerHTML = `
                <button class="btn btn-outline portfolio-filter active" data-filter="all">All</button>
                ${categories.map(category => `
                    <button class="btn btn-outline portfolio-filter" data-filter="${category}">
                        ${category}
                    </button>
                `).join('')}
            `;

            const filterButtons = filtersContainer.querySelectorAll('.portfolio-filter');
            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter;
                    this.filterPortfolio(filter, filterButtons);
                });
            });
        }
    }

    filterPortfolio(filter, filterButtons) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = Array.from(filterButtons).find(btn => btn.dataset.filter === filter);
        if (activeButton) activeButton.classList.add('active');

        const portfolioItems = document.querySelectorAll('.portfolio-card');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize data loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DataLoader();
});
