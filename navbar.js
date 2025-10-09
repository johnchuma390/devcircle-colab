// navbar.js

class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('mobileMenuToggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    toggleMenu() {
        this.navbar.classList.toggle('open');
        this.menuToggle.classList.toggle('active');
        const expanded = this.navbar.classList.contains('open');
        this.menuToggle.setAttribute('aria-expanded', expanded);
    }

    closeMenu() {
        this.navbar.classList.remove('open');
        this.menuToggle.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// Initialize navbar on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
});
