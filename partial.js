// /js/partial.js

// Utility function to load HTML partials dynamically
class PartialLoader {
    constructor() {
        this.init();
    }

    init() {
        this.loadHeader();
        this.loadFooter();
    }

    loadHeader() {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            fetch('header.html')
                .then(response => response.text())
                .then(html => {
                    headerContainer.innerHTML = html;
                    this.setupHeaderLinks();
                })
                .catch(error => console.error('Error loading header:', error));
        }
    }

    loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            fetch('footer.html')
                .then(response => response.text())
                .then(html => {
                    footerContainer.innerHTML = html;
                    this.setupFooterLinks();
                })
                .catch(error => console.error('Error loading footer:', error));
        }
    }

    setupHeaderLinks() {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                // Close mobile menu after clicking a link
                const nav = document.getElementById('nav');
                nav.classList.remove('mobile-open');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    setupFooterLinks() {
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Any footer link functionality can go here (e.g., scroll to section)
            });
        });
    }
}

// Initialize the partial loader on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PartialLoader();
});
